
  /**
   * @license
   * jswebrtcfe.js v1.0.0
   * Released under the MIT License.
   */

// import { io } from "socket.io-client";
// const socket = io();
const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = navigator.mediaDevices.enumerateDevices();
    console.log(devices);
  } catch (e) {
    console.log(e);
  }
}

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    myFace.srcObject = myStream;
    await getCameras();
  } catch (e) {
    console.log(e.message);
  }
}

getMedia();
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
cameraBtn.addEventListener("click", () => {
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
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmVzLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGlvIH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuLy8gY29uc3Qgc29ja2V0ID0gaW8oKTtcbmNvbnN0IG15RmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGYWNlXCIpO1xuY29uc3QgbXV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXV0ZVwiKTtcbmNvbnN0IGNhbWVyYUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FtZXJhXCIpO1xuXG5sZXQgbXlTdHJlYW07XG5sZXQgbXV0ZWQgPSBmYWxzZTtcbmxldCBjYW1lcmFPZmYgPSBmYWxzZTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q2FtZXJhcygpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkZXZpY2VzID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCk7XG4gICAgY29uc29sZS5sb2coZGV2aWNlcyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZWRpYSgpIHtcbiAgdHJ5IHtcbiAgICBteVN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHtcbiAgICAgIGF1ZGlvOiB0cnVlLFxuICAgICAgdmlkZW86IHRydWUsXG4gICAgfSk7XG4gICAgbXlGYWNlLnNyY09iamVjdCA9IG15U3RyZWFtO1xuICAgIGF3YWl0IGdldENhbWVyYXMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XG4gIH1cbn1cblxuZ2V0TWVkaWEoKTtcblxubXV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBteVN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XG4gICAgdHJhY2suZW5hYmxlZCA9ICF0cmFjay5lbmFibGVkO1xuICB9KTtcbiAgaWYgKCFtdXRlZCkge1xuICAgIG11dGVCdG4uaW5uZXJUZXh0ID0gXCJVbm11dGVcIjtcbiAgICBtdXRlZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgbXV0ZUJ0bi5pbm5lclRleHQgPSBcIk11dGVcIjtcbiAgICBtdXRlZCA9IGZhbHNlO1xuICB9XG59KTtcbmNhbWVyYUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBteVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XG4gICAgdHJhY2suZW5hYmxlZCA9ICF0cmFjay5lbmFibGVkO1xuICB9KTtcbiAgaWYgKCFjYW1lcmFPZmYpIHtcbiAgICBjYW1lcmFCdG4uaW5uZXJUZXh0ID0gXCJUdXJuIENhbWVyYSBPblwiO1xuICAgIGNhbWVyYU9mZiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY2FtZXJhQnRuLmlubmVyVGV4dCA9IFwiVHVybiBDYW1lcmEgT2ZmXCI7XG4gICAgY2FtZXJhT2ZmID0gZmFsc2U7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbIm15RmFjZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJtdXRlQnRuIiwiY2FtZXJhQnRuIiwibXlTdHJlYW0iLCJtdXRlZCIsImNhbWVyYU9mZiIsImdldENhbWVyYXMiLCJkZXZpY2VzIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwiZW51bWVyYXRlRGV2aWNlcyIsImNvbnNvbGUiLCJsb2ciLCJlIiwiZ2V0TWVkaWEiLCJnZXRVc2VyTWVkaWEiLCJhdWRpbyIsInZpZGVvIiwic3JjT2JqZWN0IiwibWVzc2FnZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRBdWRpb1RyYWNrcyIsImZvckVhY2giLCJ0cmFjayIsImVuYWJsZWQiLCJpbm5lclRleHQiLCJnZXRWaWRlb1RyYWNr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
