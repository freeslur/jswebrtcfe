
  /**
   * @license
   * jswebrtcfe.js v1.0.0
   * Released under the MIT License.
   */

(function () {
  'use strict';

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
      const currentCamera = myStream.getVideoTracks()[0];
      cameras.forEach(camera => {
        const option = document.createElement("option");
        option.value = camera.deviceId;
        option.innerText = camera.label;

        if (currentCamera.label === camera.label) {
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
        console.log("get device");
        await getCameras();
      } else {
        console.log("what????");
      }
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

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGlvIH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuLy8gY29uc3Qgc29ja2V0ID0gaW8oKTtcbmNvbnN0IG15RmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGYWNlXCIpO1xuY29uc3QgbXV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXV0ZVwiKTtcbmNvbnN0IGNhbWVyYUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FtZXJhXCIpO1xuY29uc3QgY2FtZXJhc1NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FtZXJhc1wiKTtcblxubGV0IG15U3RyZWFtO1xubGV0IG11dGVkID0gZmFsc2U7XG5sZXQgY2FtZXJhT2ZmID0gZmFsc2U7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENhbWVyYXMoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGV2aWNlcyA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuICAgIGNvbnN0IGNhbWVyYXMgPSAoYXdhaXQgZGV2aWNlcykuZmlsdGVyKChkZXZpY2UpID0+IGRldmljZS5raW5kID09IFwidmlkZW9pbnB1dFwiKTtcbiAgICBjb25zdCBjdXJyZW50Q2FtZXJhID0gbXlTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXTtcbiAgICBjYW1lcmFzLmZvckVhY2goKGNhbWVyYSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IGNhbWVyYS5kZXZpY2VJZDtcbiAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBjYW1lcmEubGFiZWw7XG4gICAgICBpZiAoY3VycmVudENhbWVyYS5sYWJlbCA9PT0gY2FtZXJhLmxhYmVsKSB7XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBjYW1lcmFzU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZWRpYShkZXZpY2VJZCkge1xuICBjb25zdCBpbml0aWFsQ29uc3RyYWlucyA9IHtcbiAgICBhdWRpbzogdHJ1ZSxcbiAgICB2aWRlbzogeyBmYWNpbmdNb2RlOiBcInVzZXJcIiB9LFxuICB9O1xuICBjb25zdCBjYW1lcmFDb25zdHJhaW5zID0ge1xuICAgIGF1ZGlvOiB0cnVlLFxuICAgIHZpZGVvOiB7IGRldmljZUlkOiB7IGV4YWN0OiBkZXZpY2VJZCB9IH0sXG4gIH07XG4gIHRyeSB7XG4gICAgbXlTdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShkZXZpY2VJZCA/IGNhbWVyYUNvbnN0cmFpbnMgOiBpbml0aWFsQ29uc3RyYWlucyk7XG4gICAgbXlGYWNlLnNyY09iamVjdCA9IG15U3RyZWFtO1xuICAgIGlmICghZGV2aWNlSWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ2V0IGRldmljZVwiKTtcbiAgICAgIGF3YWl0IGdldENhbWVyYXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJ3aGF0Pz8/P1wiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICB9XG59XG5cbmdldE1lZGlhKCk7XG5cbm11dGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgbXlTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xuICAgIHRyYWNrLmVuYWJsZWQgPSAhdHJhY2suZW5hYmxlZDtcbiAgfSk7XG4gIGlmICghbXV0ZWQpIHtcbiAgICBtdXRlQnRuLmlubmVyVGV4dCA9IFwiVW5tdXRlXCI7XG4gICAgbXV0ZWQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIG11dGVCdG4uaW5uZXJUZXh0ID0gXCJNdXRlXCI7XG4gICAgbXV0ZWQgPSBmYWxzZTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGhhbmRsZVZpZGVvT2ZmKCkge1xuICBteVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XG4gICAgdHJhY2suZW5hYmxlZCA9ICF0cmFjay5lbmFibGVkO1xuICB9KTtcbiAgaWYgKCFjYW1lcmFPZmYpIHtcbiAgICBjYW1lcmFCdG4uaW5uZXJUZXh0ID0gXCJUdXJuIENhbWVyYSBPblwiO1xuICAgIGNhbWVyYU9mZiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY2FtZXJhQnRuLmlubmVyVGV4dCA9IFwiVHVybiBDYW1lcmEgT2ZmXCI7XG4gICAgY2FtZXJhT2ZmID0gZmFsc2U7XG4gIH1cbn1cblxuY2FtZXJhQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVWaWRlb09mZik7XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNhbWVyYUNoYW5nZSgpIHtcbiAgY29uc29sZS5sb2coY2FtZXJhc1NlbGVjdC52YWx1ZSk7XG4gIGlmIChjYW1lcmFzU2VsZWN0LnZhbHVlID09PSBcImRldmljZVwiKSB7XG4gICAgaGFuZGxlVmlkZW9PZmYoKTtcbiAgfSBlbHNlIHtcbiAgICBhd2FpdCBnZXRNZWRpYShjYW1lcmFzU2VsZWN0LnZhbHVlKTtcbiAgfVxufVxuXG5jYW1lcmFzU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBoYW5kbGVDYW1lcmFDaGFuZ2UpO1xuIl0sIm5hbWVzIjpbIm15RmFjZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJtdXRlQnRuIiwiY2FtZXJhQnRuIiwiY2FtZXJhc1NlbGVjdCIsIm15U3RyZWFtIiwibXV0ZWQiLCJjYW1lcmFPZmYiLCJnZXRDYW1lcmFzIiwiZGV2aWNlcyIsIm5hdmlnYXRvciIsIm1lZGlhRGV2aWNlcyIsImVudW1lcmF0ZURldmljZXMiLCJjYW1lcmFzIiwiZmlsdGVyIiwiZGV2aWNlIiwia2luZCIsImN1cnJlbnRDYW1lcmEiLCJnZXRWaWRlb1RyYWNrcyIsImZvckVhY2giLCJjYW1lcmEiLCJvcHRpb24iLCJjcmVhdGVFbGVtZW50IiwidmFsdWUiLCJkZXZpY2VJZCIsImlubmVyVGV4dCIsImxhYmVsIiwic2VsZWN0ZWQiLCJhcHBlbmRDaGlsZCIsImUiLCJjb25zb2xlIiwibG9nIiwiZ2V0TWVkaWEiLCJpbml0aWFsQ29uc3RyYWlucyIsImF1ZGlvIiwidmlkZW8iLCJmYWNpbmdNb2RlIiwiY2FtZXJhQ29uc3RyYWlucyIsImV4YWN0IiwiZ2V0VXNlck1lZGlhIiwic3JjT2JqZWN0IiwibWVzc2FnZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRBdWRpb1RyYWNrcyIsInRyYWNrIiwiZW5hYmxlZCIsImhhbmRsZVZpZGVvT2ZmIiwiaGFuZGxlQ2FtZXJhQ2hhbmdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0VBQUE7RUFFQTtFQUNBLE1BQU1BLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWY7RUFDQSxNQUFNQyxPQUFPLEdBQUdGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixNQUF4QixDQUFoQjtFQUNBLE1BQU1FLFNBQVMsR0FBR0gsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWxCO0VBQ0EsTUFBTUcsYUFBYSxHQUFHSixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBdEI7RUFFQSxJQUFJSSxRQUFKO0VBQ0EsSUFBSUMsS0FBSyxHQUFHLEtBQVo7RUFDQSxJQUFJQyxTQUFTLEdBQUcsS0FBaEI7O0VBRUEsZUFBZUMsVUFBZixHQUE0QjtFQUMxQixNQUFJO0VBQ0YsVUFBTUMsT0FBTyxHQUFHQyxTQUFTLENBQUNDLFlBQVYsQ0FBdUJDLGdCQUF2QixFQUFoQjtFQUNBLFVB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
