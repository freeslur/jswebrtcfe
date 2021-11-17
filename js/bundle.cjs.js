
  /**
   * @license
   * jswebrtcfe.js v1.0.0
   * Released under the MIT License.
   */

'use strict';

var socket_ioClient = require('socket.io-client');

socket_ioClient.io.connect("http://176.34.63.148:3000");
const welcome = document.getElementById("welcome");
const call = document.getElementById("call");
const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
call.hidden = true;
let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = navigator.mediaDevices.enumerateDevices();
    const cameras = (await devices).filter(device => device.kind == "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach(camera => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;

      if (currentCamera.deviceId === camera.deviceId) {
        option.selected = true;
      }

      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true,
    video: {
      facingMode: "user"
    }
  };
  const cameraConstrains = {
    audio: true,
    video: {
      deviceId: {
        exact: deviceId
      }
    }
  };

  try {
    myStream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstrains : initialConstrains);
    myFace.srcObject = myStream;

    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e.message);
  }
}

muteBtn.addEventListener("click", () => {
  myStream.getAudioTracks().forEach(track => {
    track.enabled = !track.enabled;
  });

  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
});

function handleVideoOff() {
  myStream.getVideoTracks().forEach(track => {
    track.enabled = !track.enabled;
  });

  if (!cameraOff) {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  } else {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  }
}

cameraBtn.addEventListener("click", handleVideoOff);

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
}

camerasSelect.addEventListener("input", handleCameraChange);
const welcomeForm = welcome.querySelector("form");

function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  console.log(input.value);
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmNqcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbyB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5cbmNvbnN0IHNvY2tldCA9IGlvLmNvbm5lY3QoXCJodHRwOi8vMTc2LjM0LjYzLjE0ODozMDAwXCIpO1xuY29uc3Qgd2VsY29tZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VsY29tZVwiKTtcbmNvbnN0IGNhbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGxcIik7XG5jb25zdCBteUZhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RmFjZVwiKTtcbmNvbnN0IG11dGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm11dGVcIik7XG5jb25zdCBjYW1lcmFCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbWVyYVwiKTtcbmNvbnN0IGNhbWVyYXNTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbWVyYXNcIik7XG5cbmNhbGwuaGlkZGVuID0gdHJ1ZTtcblxubGV0IG15U3RyZWFtO1xubGV0IG11dGVkID0gZmFsc2U7XG5sZXQgY2FtZXJhT2ZmID0gZmFsc2U7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENhbWVyYXMoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGV2aWNlcyA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuICAgIGNvbnN0IGNhbWVyYXMgPSAoYXdhaXQgZGV2aWNlcykuZmlsdGVyKChkZXZpY2UpID0+IGRldmljZS5raW5kID09IFwidmlkZW9pbnB1dFwiKTtcbiAgICBjb25zdCBjdXJyZW50Q2FtZXJhID0gbXlTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXTtcbiAgICBjYW1lcmFzLmZvckVhY2goKGNhbWVyYSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IGNhbWVyYS5kZXZpY2VJZDtcbiAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBjYW1lcmEubGFiZWw7XG4gICAgICBpZiAoY3VycmVudENhbWVyYS5kZXZpY2VJZCA9PT0gY2FtZXJhLmRldmljZUlkKSB7XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBjYW1lcmFzU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZWRpYShkZXZpY2VJZCkge1xuICBjb25zdCBpbml0aWFsQ29uc3RyYWlucyA9IHtcbiAgICBhdWRpbzogdHJ1ZSxcbiAgICB2aWRlbzogeyBmYWNpbmdNb2RlOiBcInVzZXJcIiB9LFxuICB9O1xuICBjb25zdCBjYW1lcmFDb25zdHJhaW5zID0ge1xuICAgIGF1ZGlvOiB0cnVlLFxuICAgIHZpZGVvOiB7IGRldmljZUlkOiB7IGV4YWN0OiBkZXZpY2VJZCB9IH0sXG4gIH07XG4gIHRyeSB7XG4gICAgbXlTdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShkZXZpY2VJZCA/IGNhbWVyYUNvbnN0cmFpbnMgOiBpbml0aWFsQ29uc3RyYWlucyk7XG4gICAgbXlGYWNlLnNyY09iamVjdCA9IG15U3RyZWFtO1xuICAgIGlmICghZGV2aWNlSWQpIHtcbiAgICAgIGF3YWl0IGdldENhbWVyYXMoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICB9XG59XG5cbm11dGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgbXlTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xuICAgIHRyYWNrLmVuYWJsZWQgPSAhdHJhY2suZW5hYmxlZDtcbiAgfSk7XG4gIGlmICghbXV0ZWQpIHtcbiAgICBtdXRlQnRuLmlubmVyVGV4dCA9IFwiVW5tdXRlXCI7XG4gICAgbXV0ZWQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIG11dGVCdG4uaW5uZXJUZXh0ID0gXCJNdXRlXCI7XG4gICAgbXV0ZWQgPSBmYWxzZTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGhhbmRsZVZpZGVvT2ZmKCkge1xuICBteVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XG4gICAgdHJhY2suZW5hYmxlZCA9ICF0cmFjay5lbmFibGVkO1xuICB9KTtcbiAgaWYgKCFjYW1lcmFPZmYpIHtcbiAgICBjYW1lcmFCdG4uaW5uZXJUZXh0ID0gXCJUdXJuIENhbWVyYSBPblwiO1xuICAgIGNhbWVyYU9mZiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY2FtZXJhQnRuLmlubmVyVGV4dCA9IFwiVHVybiBDYW1lcmEgT2ZmXCI7XG4gICAgY2FtZXJhT2ZmID0gZmFsc2U7XG4gIH1cbn1cblxuY2FtZXJhQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVWaWRlb09mZik7XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNhbWVyYUNoYW5nZSgpIHtcbiAgYXdhaXQgZ2V0TWVkaWEoY2FtZXJhc1NlbGVjdC52YWx1ZSk7XG59XG5cbmNhbWVyYXNTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGhhbmRsZUNhbWVyYUNoYW5nZSk7XG5cbmNvbnN0IHdlbGNvbWVGb3JtID0gd2VsY29tZS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcblxuZnVuY3Rpb24gaGFuZGxlV2VsY29tZVN1Ym1pdChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBpbnB1dCA9IHdlbGNvbWVGb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgY29uc29sZS5sb2coaW5wdXQudmFsdWUpO1xufVxuXG53ZWxjb21lRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZVdlbGNvbWVTdWJtaXQpO1xuIl0sIm5hbWVzIjpbImlvIiwiY29ubmVjdCIsIndlbGNvbWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2FsbCIsIm15RmFjZSIsIm11dGVCdG4iLCJjYW1lcmFCdG4iLCJjYW1lcmFzU2VsZWN0IiwiaGlkZGVuIiwibXlTdHJlYW0iLCJtdXRlZCIsImNhbWVyYU9mZiIsImdldENhbWVyYXMiLCJkZXZpY2VzIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwiZW51bWVyYXRlRGV2aWNlcyIsImNhbWVyYXMiLCJmaWx0ZXIiLCJkZXZpY2UiLCJraW5kIiwiY3VycmVudENhbWVyYSIsImdldFZpZGVvVHJhY2tzIiwiZm9yRWFjaCIsImNhbWVyYSIsIm9wdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsImRldmljZUlkIiwiaW5uZXJUZXh0IiwibGFiZWwiLCJzZWxlY3RlZCIsImFwcGVuZENoaWxkIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRNZWRpYSIsImluaXRpYWxDb25zdHJhaW5zIiwiYXVkaW8iLCJ2aWRlbyIsImZhY2luZ01vZGUiLCJjYW1lcmFDb25zdHJhaW5zIiwiZXhhY3QiLCJnZXRVc2VyTWVkaWEiLCJzcmNPYmplY3QiLCJtZXNzYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldEF1ZGlvVHJhY2tzIiwidHJhY2siLCJlbmFibGVkIiwiaGFuZGxlVmlkZW9PZmYiLCJoYW5kbGVDYW1lcmFDaGFuZ2UiLCJ3ZWxjb21lRm9ybSIsInF1ZXJ5U2VsZWN0b3IiLCJoYW5kbGVXZWxjb21lU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVlQSxrQkFBRSxDQUFDQyxPQUFILENBQVcsMkJBQVg7QUFDZixNQUFNQyxPQUFPLEdB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
