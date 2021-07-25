import { ZoomMtg } from "@zoomus/websdk";

console.log("checkSystemRequirements");
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
// if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.6/lib', '/av'); // CDN version default
// else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.9.6/lib', '/av'); // china cdn option
// ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

var API_KEY = "5V0V--QuSi6WJP-5Is6VHg";

/**
 * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
 * The below generateSignature should be done server side as not to expose your api secret in public
 * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
 */
// var API_SECRET = process.env.API_SECRET;

testTool = window.testTool;
document.getElementById("meeting_number").value = testTool.getCookie(
  "meeting_number"
);
document.getElementById("meeting_pwd").value = testTool.getCookie(
  "meeting_pwd"
);
if (testTool.getCookie("meeting_lang"))
  document.getElementById("meeting_lang").value = testTool.getCookie(
    "meeting_lang"
  );

document.getElementById("meeting_lang").addEventListener("change", (e) => {
  testTool.setCookie(
    "meeting_lang",
    document.getElementById("meeting_lang").value
  );
  ZoomMtg.i18n.load(document.getElementById("meeting_lang").value);
  ZoomMtg.i18n.reload(document.getElementById("meeting_lang").value);
  ZoomMtg.reRender({ lang: document.getElementById("meeting_lang").value });
});

// copy zoom invite link to mn, autofill mn and pwd.
document
  .getElementById("meeting_number")
  .addEventListener("input", function (e) {
    let tmpMn = e.target.value.replace(/([^0-9])+/i, "");
    if (tmpMn.match(/([0-9]{9,11})/)) {
      tmpMn = tmpMn.match(/([0-9]{9,11})/)[1];
    }
    let tmpPwd = e.target.value.match(/pwd=([\d,\w]+)/);
    if (tmpPwd) {
      document.getElementById("meeting_pwd").value = tmpPwd[1];
      testTool.setCookie("meeting_pwd", tmpPwd[1]);
    }
    document.getElementById("meeting_number").value = tmpMn;
    testTool.setCookie(
      "meeting_number",
      document.getElementById("meeting_number").value
    );
  });

// document.getElementById("clear_all").addEventListener("click", (e) => {
//   testTool.deleteAllCookies();
//   document.getElementById("display_name").value = "";
//   document.getElementById("meeting_number").value = "";
//   document.getElementById("meeting_pwd").value = "";
//   document.getElementById("meeting_lang").value = "en-US";
//   document.getElementById("meeting_role").value = 0;
//   window.location.href = "/index.html";
// });

document.getElementById("join_meeting").addEventListener("click", (e) => {
  e.preventDefault();

  const meetingConfig = testTool.getMeetingConfig();
  if (!meetingConfig.mn || !meetingConfig.name) {
    alert("Meeting number or username is empty");
    return false;
  }
  testTool.setCookie("meeting_number", meetingConfig.mn);
  testTool.setCookie("meeting_pwd", meetingConfig.pwd);

  var settings = {
    "url": "https://zoom-participant-counter-be.herokuapp.com/",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "meetingNumber": meetingConfig.mn,
      "role": 0
    }),
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    // console.log(res.result);
    meetingConfig.signature = response.signature;
    meetingConfig.apiKey = API_KEY;
    const joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
    console.log(joinUrl);
    window.open(joinUrl, "_self");
  });

  // const signature = ZoomMtg.generateSignature({
  //   meetingNumber: meetingConfig.mn,
  //   apiKey: API_KEY,
  //   apiSecret: API_SECRET,
  //   role: 0,
  //   success: function (res) {
  //     console.log(res.result);
  //     meetingConfig.signature = res.result;
  //     meetingConfig.apiKey = API_KEY;
  //     const joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
  //     console.log(joinUrl);
  //     window.open(joinUrl, "_self");
  //   },
  // });
});

function copyToClipboard(elementId) {
  var aux = document.createElement("input");
  aux.setAttribute("value", document.getElementById(elementId).getAttribute('link'));
  document.body.appendChild(aux);  
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
}

// click copy join link button
window.copyJoinLink = function (element) {
  const meetingConfig = testTool.getMeetingConfig();
  if (!meetingConfig.mn || !meetingConfig.name) {
    alert("Meeting number or username is empty");
    return false;
  }
  const signature = ZoomMtg.generateSignature({
    meetingNumber: meetingConfig.mn,
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    role: meetingConfig.role,
    success: function (res) {
      console.log(res.result);
      meetingConfig.signature = res.result;
      meetingConfig.apiKey = API_KEY;
      const joinUrl =
        testTool.getCurrentDomain() +
        "/meeting.html?" +
        testTool.serialize(meetingConfig);
      document.getElementById('copy_link_value').setAttribute('link', joinUrl);
      copyToClipboard('copy_link_value');
    },
  });
};

