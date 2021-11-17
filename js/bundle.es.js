
  /**
   * @license
   * jswebrtcfe.js v1.0.0
   * Released under the MIT License.
   */

import { io } from 'socket.io-client';

const socket = io.connect("http://176.34.63.148:3000");
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
socket.on("connection", () => console.log("Socket io connected."));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmVzLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlvIH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuY29uc3Qgc29ja2V0ID0gaW8uY29ubmVjdChcImh0dHA6Ly8xNzYuMzQuNjMuMTQ4OjMwMDBcIik7XG5jb25zdCB3ZWxjb21lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWxjb21lXCIpO1xuY29uc3QgY2FsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FsbFwiKTtcbmNvbnN0IG15RmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGYWNlXCIpO1xuY29uc3QgbXV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXV0ZVwiKTtcbmNvbnN0IGNhbWVyYUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FtZXJhXCIpO1xuY29uc3QgY2FtZXJhc1NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FtZXJhc1wiKTtcblxuY2FsbC5oaWRkZW4gPSB0cnVlO1xuXG5sZXQgbXlTdHJlYW07XG5sZXQgbXV0ZWQgPSBmYWxzZTtcbmxldCBjYW1lcmFPZmYgPSBmYWxzZTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q2FtZXJhcygpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkZXZpY2VzID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCk7XG4gICAgY29uc3QgY2FtZXJhcyA9IChhd2FpdCBkZXZpY2VzKS5maWx0ZXIoKGRldmljZSkgPT4gZGV2aWNlLmtpbmQgPT0gXCJ2aWRlb2lucHV0XCIpO1xuICAgIGNvbnN0IGN1cnJlbnRDYW1lcmEgPSBteVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xuICAgIGNhbWVyYXMuZm9yRWFjaCgoY2FtZXJhKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgb3B0aW9uLnZhbHVlID0gY2FtZXJhLmRldmljZUlkO1xuICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IGNhbWVyYS5sYWJlbDtcbiAgICAgIGlmIChjdXJyZW50Q2FtZXJhLmRldmljZUlkID09PSBjYW1lcmEuZGV2aWNlSWQpIHtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNhbWVyYXNTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhKGRldmljZUlkKSB7XG4gIGNvbnN0IGluaXRpYWxDb25zdHJhaW5zID0ge1xuICAgIGF1ZGlvOiB0cnVlLFxuICAgIHZpZGVvOiB7IGZhY2luZ01vZGU6IFwidXNlclwiIH0sXG4gIH07XG4gIGNvbnN0IGNhbWVyYUNvbnN0cmFpbnMgPSB7XG4gICAgYXVkaW86IHRydWUsXG4gICAgdmlkZW86IHsgZGV2aWNlSWQ6IHsgZXhhY3Q6IGRldmljZUlkIH0gfSxcbiAgfTtcbiAgdHJ5IHtcbiAgICBteVN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGRldmljZUlkID8gY2FtZXJhQ29uc3RyYWlucyA6IGluaXRpYWxDb25zdHJhaW5zKTtcbiAgICBteUZhY2Uuc3JjT2JqZWN0ID0gbXlTdHJlYW07XG4gICAgaWYgKCFkZXZpY2VJZCkge1xuICAgICAgYXdhaXQgZ2V0Q2FtZXJhcygpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XG4gIH1cbn1cblxubXV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBteVN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XG4gICAgdHJhY2suZW5hYmxlZCA9ICF0cmFjay5lbmFibGVkO1xuICB9KTtcbiAgaWYgKCFtdXRlZCkge1xuICAgIG11dGVCdG4uaW5uZXJUZXh0ID0gXCJVbm11dGVcIjtcbiAgICBtdXRlZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgbXV0ZUJ0bi5pbm5lclRleHQgPSBcIk11dGVcIjtcbiAgICBtdXRlZCA9IGZhbHNlO1xuICB9XG59KTtcblxuZnVuY3Rpb24gaGFuZGxlVmlkZW9PZmYoKSB7XG4gIG15U3RyZWFtLmdldFZpZGVvVHJhY2tzKCkuZm9yRWFjaCgodHJhY2spID0+IHtcbiAgICB0cmFjay5lbmFibGVkID0gIXRyYWNrLmVuYWJsZWQ7XG4gIH0pO1xuICBpZiAoIWNhbWVyYU9mZikge1xuICAgIGNhbWVyYUJ0bi5pbm5lclRleHQgPSBcIlR1cm4gQ2FtZXJhIE9uXCI7XG4gICAgY2FtZXJhT2ZmID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBjYW1lcmFCdG4uaW5uZXJUZXh0ID0gXCJUdXJuIENhbWVyYSBPZmZcIjtcbiAgICBjYW1lcmFPZmYgPSBmYWxzZTtcbiAgfVxufVxuXG5jYW1lcmFCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVZpZGVvT2ZmKTtcblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ2FtZXJhQ2hhbmdlKCkge1xuICBhd2FpdCBnZXRNZWRpYShjYW1lcmFzU2VsZWN0LnZhbHVlKTtcbn1cblxuY2FtZXJhc1NlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgaGFuZGxlQ2FtZXJhQ2hhbmdlKTtcblxuY29uc3Qgd2VsY29tZUZvcm0gPSB3ZWxjb21lLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuXG5mdW5jdGlvbiBoYW5kbGVXZWxjb21lU3VibWl0KGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGlucHV0ID0gd2VsY29tZUZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICBjb25zb2xlLmxvZyhpbnB1dC52YWx1ZSk7XG59XG5cbndlbGNvbWVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlV2VsY29tZVN1Ym1pdCk7XG5cbnNvY2tldC5vbihcImNvbm5lY3Rpb25cIiwgKCkgPT4gY29uc29sZS5sb2coXCJTb2NrZXQgaW8gY29ubmVjdGVkLlwiKSk7XG4iXSwibmFtZXMiOlsic29ja2V0IiwiaW8iLCJjb25uZWN0Iiwid2VsY29tZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjYWxsIiwibXlGYWNlIiwibXV0ZUJ0biIsImNhbWVyYUJ0biIsImNhbWVyYXNTZWxlY3QiLCJoaWRkZW4iLCJteVN0cmVhbSIsIm11dGVkIiwiY2FtZXJhT2ZmIiwiZ2V0Q2FtZXJhcyIsImRldmljZXMiLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwiY2FtZXJhcyIsImZpbHRlciIsImRldmljZSIsImtpbmQiLCJjdXJyZW50Q2FtZXJhIiwiZ2V0VmlkZW9UcmFja3MiLCJmb3JFYWNoIiwiY2FtZXJhIiwib3B0aW9uIiwiY3JlYXRlRWxlbWVudCIsInZhbHVlIiwiZGV2aWNlSWQiLCJpbm5lclRleHQiLCJsYWJlbCIsInNlbGVjdGVkIiwiYXBwZW5kQ2hpbGQiLCJlIiwiY29uc29sZSIsImxvZyIsImdldE1lZGlhIiwiaW5pdGlhbENvbnN0cmFpbnMiLCJhdWRpbyIsInZpZGVvIiwiZmFjaW5nTW9kZSIsImNhbWVyYUNvbnN0cmFpbnMiLCJleGFjdCIsImdldFVzZXJNZWRpYSIsInNyY09iamVjdCIsIm1lc3NhZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0QXVkaW9UcmFja3MiLCJ0cmFjayIsImVuYWJsZWQiLCJoYW5kbGVWaWRlb09mZiIsImhhbmRsZUNhbWVyYUNoYW5nZSIsIndlbGNvbWVGb3JtIiwicXVlcnlTZWxlY3RvciIsImhhbmRsZVdlbGNvbWVTdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwi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
