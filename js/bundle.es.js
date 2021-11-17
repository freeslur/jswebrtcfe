
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
const camerasSelect = document.getElementById("cameras");
let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = navigator.mediaDevices.enumerateDevices();
    const cameras = (await devices).filter(device => device.kind == "videoinput");
    cameras.forEach(camera => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        deviceId: deviceId
      }
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
  console.log(camerasSelect.value);

  if (camerasSelect.value === "device") {
    handleVideoOff();
  } else {
    await getMedia(camerasSelect.value);
  }
}

camerasSelect.addEventListener("input", handleCameraChange);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmVzLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGlvIH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuLy8gY29uc3Qgc29ja2V0ID0gaW8oKTtcbmNvbnN0IG15RmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGYWNlXCIpO1xuY29uc3QgbXV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXV0ZVwiKTtcbmNvbnN0IGNhbWVyYUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FtZXJhXCIpO1xuY29uc3QgY2FtZXJhc1NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FtZXJhc1wiKTtcblxubGV0IG15U3RyZWFtO1xubGV0IG11dGVkID0gZmFsc2U7XG5sZXQgY2FtZXJhT2ZmID0gZmFsc2U7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENhbWVyYXMoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGV2aWNlcyA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuICAgIGNvbnN0IGNhbWVyYXMgPSAoYXdhaXQgZGV2aWNlcykuZmlsdGVyKChkZXZpY2UpID0+IGRldmljZS5raW5kID09IFwidmlkZW9pbnB1dFwiKTtcbiAgICBjYW1lcmFzLmZvckVhY2goKGNhbWVyYSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IGNhbWVyYS5kZXZpY2VJZDtcbiAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBjYW1lcmEubGFiZWw7XG4gICAgICBjYW1lcmFzU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZWRpYShkZXZpY2VJZCkge1xuICB0cnkge1xuICAgIG15U3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgYXVkaW86IHRydWUsXG4gICAgICB2aWRlbzogeyBkZXZpY2VJZDogZGV2aWNlSWQgfSxcbiAgICB9KTtcbiAgICBteUZhY2Uuc3JjT2JqZWN0ID0gbXlTdHJlYW07XG4gICAgYXdhaXQgZ2V0Q2FtZXJhcygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcbiAgfVxufVxuXG5nZXRNZWRpYSgpO1xuXG5tdXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIG15U3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkuZm9yRWFjaCgodHJhY2spID0+IHtcbiAgICB0cmFjay5lbmFibGVkID0gIXRyYWNrLmVuYWJsZWQ7XG4gIH0pO1xuICBpZiAoIW11dGVkKSB7XG4gICAgbXV0ZUJ0bi5pbm5lclRleHQgPSBcIlVubXV0ZVwiO1xuICAgIG11dGVkID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBtdXRlQnRuLmlubmVyVGV4dCA9IFwiTXV0ZVwiO1xuICAgIG11dGVkID0gZmFsc2U7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBoYW5kbGVWaWRlb09mZigpIHtcbiAgbXlTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xuICAgIHRyYWNrLmVuYWJsZWQgPSAhdHJhY2suZW5hYmxlZDtcbiAgfSk7XG4gIGlmICghY2FtZXJhT2ZmKSB7XG4gICAgY2FtZXJhQnRuLmlubmVyVGV4dCA9IFwiVHVybiBDYW1lcmEgT25cIjtcbiAgICBjYW1lcmFPZmYgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGNhbWVyYUJ0bi5pbm5lclRleHQgPSBcIlR1cm4gQ2FtZXJhIE9mZlwiO1xuICAgIGNhbWVyYU9mZiA9IGZhbHNlO1xuICB9XG59XG5cbmNhbWVyYUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVmlkZW9PZmYpO1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDYW1lcmFDaGFuZ2UoKSB7XG4gIGNvbnNvbGUubG9nKGNhbWVyYXNTZWxlY3QudmFsdWUpO1xuICBpZiAoY2FtZXJhc1NlbGVjdC52YWx1ZSA9PT0gXCJkZXZpY2VcIikge1xuICAgIGhhbmRsZVZpZGVvT2ZmKCk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgZ2V0TWVkaWEoY2FtZXJhc1NlbGVjdC52YWx1ZSk7XG4gIH1cbn1cblxuY2FtZXJhc1NlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgaGFuZGxlQ2FtZXJhQ2hhbmdlKTtcbiJdLCJuYW1lcyI6WyJteUZhY2UiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibXV0ZUJ0biIsImNhbWVyYUJ0biIsImNhbWVyYXNTZWxlY3QiLCJteVN0cmVhbSIsIm11dGVkIiwiY2FtZXJhT2ZmIiwiZ2V0Q2FtZXJhcyIsImRldmljZXMiLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwiY2FtZXJhcyIsImZpbHRlciIsImRldmljZSIsImtpbmQiLCJmb3JFYWNoIiwiY2FtZXJhIiwib3B0aW9uIiwiY3JlYXRlRWxlbWVudCIsInZhbHVlIiwiZGV2aWNlSWQiLCJpbm5lclRleHQiLCJsYWJlbCIsImFwcGVuZENoaWxkIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRNZWRpYSIsImdldFVzZXJNZWRpYSIsImF1ZGlvIiwidmlkZW8iLCJzcmNPYmplY3QiLCJtZXNzYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldEF1ZGlvVHJhY2tzIiwidHJhY2siLCJlbmFibGVkIiwiaGFuZGxlVmlkZW9PZmYiLCJnZXRWaWRlb1RyYWNrcyIsImhhbmRsZUNhbWVyYUNoYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBRUE7QUFDQSxNQUFNQSxNQUFNLEdB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
