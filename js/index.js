// import { ZoomMtg } from "@zoomus/websdk";

// // console.log("checkSystemRequirements");
// // console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

// var API_KEY = "5V0V--QuSi6WJP-5Is6VHg";

// testTool = window.testTool;
// document.getElementById("meeting_number").value = testTool.getCookie(
//   "meeting_number"
// );
// document.getElementById("meeting_pwd").value = testTool.getCookie(
//   "meeting_pwd"
// );
// if (testTool.getCookie("meeting_lang"))
//   document.getElementById("meeting_lang").value = testTool.getCookie(
//     "meeting_lang"
//   );

// document.getElementById("meeting_lang").addEventListener("change", (e) => {
//   testTool.setCookie(
//     "meeting_lang",
//     document.getElementById("meeting_lang").value
//   );
//   ZoomMtg.i18n.load(document.getElementById("meeting_lang").value);
//   ZoomMtg.i18n.reload(document.getElementById("meeting_lang").value);
//   ZoomMtg.reRender({ lang: document.getElementById("meeting_lang").value });
// });

// // copy zoom invite link to mn, autofill mn and pwd.
// document
//   .getElementById("meeting_number")
//   .addEventListener("input", function (e) {
//     let tmpMn = e.target.value.replace(/([^0-9])+/i, "");
//     if (tmpMn.match(/([0-9]{9,11})/)) {
//       tmpMn = tmpMn.match(/([0-9]{9,11})/)[1];
//     }
//     let tmpPwd = e.target.value.match(/pwd=([\d,\w]+)/);
//     if (tmpPwd) {
//       document.getElementById("meeting_pwd").value = tmpPwd[1];
//       testTool.setCookie("meeting_pwd", tmpPwd[1]);
//     }
//     document.getElementById("meeting_number").value = tmpMn;
//     testTool.setCookie(
//       "meeting_number",
//       document.getElementById("meeting_number").value
//     );
//   });


// document.getElementById("join_meeting").addEventListener("click", (e) => {
//   e.preventDefault();

//   const meetingConfig = testTool.getMeetingConfig();
//   if (!meetingConfig.mn || !meetingConfig.name) {
//     alert("Meeting number or username is empty");
//     return false;
//   }
//   testTool.setCookie("meeting_number", meetingConfig.mn);
//   testTool.setCookie("meeting_pwd", meetingConfig.pwd);

//   var settings = {
//     "url": "https://zoom-participant-counter-be.herokuapp.com/",
//     "method": "POST",
//     "timeout": 0,
//     "headers": {
//       "Content-Type": "application/json"
//     },
//     "data": JSON.stringify({
//       "meetingNumber": meetingConfig.mn,
//       "role": 0
//     }),
//   };
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//     // console.log(res.result);
//     meetingConfig.signature = response.signature;
//     meetingConfig.apiKey = API_KEY;
//     const joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
//     console.log(joinUrl);
//     window.open(joinUrl, "_self");
//   });

// });

// function copyToClipboard(elementId) {
//   var aux = document.createElement("input");
//   aux.setAttribute("value", document.getElementById(elementId).getAttribute('link'));
//   document.body.appendChild(aux);  
//   aux.select();
//   document.execCommand("copy");
//   document.body.removeChild(aux);
// }

// // click copy join link button
// window.copyJoinLink = function (element) {
  
// };


// --------------
window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');
  websdkready();
});

function websdkready() {
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();
  
  var API_KEY = "5V0V--QuSi6WJP-5Is6VHg";
  
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
    
  };
  

}
