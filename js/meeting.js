
window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');
  websdkready();
});

function websdkready() {
  var testTool = window.testTool;
  // get meeting args from url
  var tmpArgs = testTool.parseQuery();
  var meetingConfig = {
    apiKey: tmpArgs.apiKey,
    meetingNumber: tmpArgs.mn,
    userName: (function () {
      if (tmpArgs.name) {
        try {
          return testTool.b64DecodeUnicode(tmpArgs.name);
        } catch (e) {
          return tmpArgs.name;
        }
      }
      return (
        "CDN#" +
        tmpArgs.version +
        "#" +
        testTool.detectOS() +
        "#" +
        testTool.getBrowserInfo()
      );
    })(),
    passWord: tmpArgs.pwd,
    leaveUrl: "http://jordanthewebdesigner.github.io/zoom-participant-counter/",
    role: parseInt(tmpArgs.role, 10),
    userEmail: (function () {
      try {
        return testTool.b64DecodeUnicode(tmpArgs.email);
      } catch (e) {
        return tmpArgs.email;
      }
    })(),
    lang: tmpArgs.lang,
    signature: tmpArgs.signature || "",
    china: tmpArgs.china === "1",
  };

  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();
  function beginJoin(signature) {
    ZoomMtg.init({
      leaveUrl: meetingConfig.leaveUrl,
      disableCORP: !window.crossOriginIsolated, // default true
      disablePreview: true,
      audioPanelAlwaysOpen: true,
      disableJoinAudio: true,
      showMeetingHeader: false,
      disableInvite: true, //optional
      disableCallOut: true, //optional
      disableRecord: true,
      showPureSharingContent: false, //optional
      isSupportAV: false, //optional,
      isSupportChat: false, //optional,
      isSupportQA: false, //optional,
      isSupportPolling: false, //optional
      isSupportBreakout: false, //optional
      isSupportCC: false, //optional,
      screenShare: false,
      videoHeader: false, //optional,
      isLockBottom: false,
      success: function () {
        ZoomMtg.i18n.load(meetingConfig.lang);
        ZoomMtg.i18n.reload(meetingConfig.lang);
        ZoomMtg.join({
          meetingNumber: meetingConfig.meetingNumber,
          userName: meetingConfig.userName,
          signature: signature,
          apiKey: meetingConfig.apiKey,
          userEmail: meetingConfig.userEmail,
          passWord: meetingConfig.passWord,
          success: function (res) {
            console.log("join meeting success");            
          },
          error: function (res) {
            console.log(res);
          },
        });
      },
      error: function (res) {
        console.log(res);
      },
    });

  //   ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
  //     console.log('inMeetingServiceListener onUserJoin', data);
  //   });
  
  //   ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
  //     console.log('inMeetingServiceListener onUserLeave', data);
  //   });
  
  //   ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
  //     console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
  //   });
  
  //   ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
  //     console.log('inMeetingServiceListener onMeetingStatus', data);
  //   });
  // }
  }
  beginJoin(meetingConfig.signature);
};
