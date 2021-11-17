
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
      if (!deviceId) await getCameras();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGlvIH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuLy8gY29uc3Qgc29ja2V0ID0gaW8oKTtcbmNvbnN0IG15RmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGYWNlXCIpO1xuY29uc3QgbXV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXV0ZVwiKTtcbmNvbnN0IGNhbWVyYUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FtZXJhXCIpO1xuY29uc3QgY2FtZXJhc1NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FtZXJhc1wiKTtcblxubGV0IG15U3RyZWFtO1xubGV0IG11dGVkID0gZmFsc2U7XG5sZXQgY2FtZXJhT2ZmID0gZmFsc2U7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENhbWVyYXMoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGV2aWNlcyA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuICAgIGNvbnN0IGNhbWVyYXMgPSAoYXdhaXQgZGV2aWNlcykuZmlsdGVyKChkZXZpY2UpID0+IGRldmljZS5raW5kID09IFwidmlkZW9pbnB1dFwiKTtcbiAgICBjYW1lcmFzLmZvckVhY2goKGNhbWVyYSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IGNhbWVyYS5kZXZpY2VJZDtcbiAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBjYW1lcmEubGFiZWw7XG4gICAgICBjYW1lcmFzU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZWRpYShkZXZpY2VJZCkge1xuICBjb25zdCBpbml0aWFsQ29uc3RyYWlucyA9IHtcbiAgICBhdWRpbzogdHJ1ZSxcbiAgICB2aWRlbzogeyBmYWNpbmdNb2RlOiBcInVzZXJcIiB9LFxuICB9O1xuICBjb25zdCBjYW1lcmFDb25zdHJhaW5zID0ge1xuICAgIGF1ZGlvOiB0cnVlLFxuICAgIHZpZGVvOiB7IGRldmljZUlkOiB7IGV4YWN0OiBkZXZpY2VJZCB9IH0sXG4gIH07XG4gIHRyeSB7XG4gICAgbXlTdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShkZXZpY2VJZCA/IGNhbWVyYUNvbnN0cmFpbnMgOiBpbml0aWFsQ29uc3RyYWlucyk7XG4gICAgbXlGYWNlLnNyY09iamVjdCA9IG15U3RyZWFtO1xuICAgIGlmICghZGV2aWNlSWQpIGF3YWl0IGdldENhbWVyYXMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XG4gIH1cbn1cblxuZ2V0TWVkaWEoKTtcblxubXV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBteVN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XG4gICAgdHJhY2suZW5hYmxlZCA9ICF0cmFjay5lbmFibGVkO1xuICB9KTtcbiAgaWYgKCFtdXRlZCkge1xuICAgIG11dGVCdG4uaW5uZXJUZXh0ID0gXCJVbm11dGVcIjtcbiAgICBtdXRlZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgbXV0ZUJ0bi5pbm5lclRleHQgPSBcIk11dGVcIjtcbiAgICBtdXRlZCA9IGZhbHNlO1xuICB9XG59KTtcblxuZnVuY3Rpb24gaGFuZGxlVmlkZW9PZmYoKSB7XG4gIG15U3RyZWFtLmdldFZpZGVvVHJhY2tzKCkuZm9yRWFjaCgodHJhY2spID0+IHtcbiAgICB0cmFjay5lbmFibGVkID0gIXRyYWNrLmVuYWJsZWQ7XG4gIH0pO1xuICBpZiAoIWNhbWVyYU9mZikge1xuICAgIGNhbWVyYUJ0bi5pbm5lclRleHQgPSBcIlR1cm4gQ2FtZXJhIE9uXCI7XG4gICAgY2FtZXJhT2ZmID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBjYW1lcmFCdG4uaW5uZXJUZXh0ID0gXCJUdXJuIENhbWVyYSBPZmZcIjtcbiAgICBjYW1lcmFPZmYgPSBmYWxzZTtcbiAgfVxufVxuXG5jYW1lcmFCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVZpZGVvT2ZmKTtcblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ2FtZXJhQ2hhbmdlKCkge1xuICBjb25zb2xlLmxvZyhjYW1lcmFzU2VsZWN0LnZhbHVlKTtcbiAgaWYgKGNhbWVyYXNTZWxlY3QudmFsdWUgPT09IFwiZGV2aWNlXCIpIHtcbiAgICBoYW5kbGVWaWRlb09mZigpO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IGdldE1lZGlhKGNhbWVyYXNTZWxlY3QudmFsdWUpO1xuICB9XG59XG5cbmNhbWVyYXNTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGhhbmRsZUNhbWVyYUNoYW5nZSk7XG4iXSwibmFtZXMiOlsibXlGYWNlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm11dGVCdG4iLCJjYW1lcmFCdG4iLCJjYW1lcmFzU2VsZWN0IiwibXlTdHJlYW0iLCJtdXRlZCIsImNhbWVyYU9mZiIsImdldENhbWVyYXMiLCJkZXZpY2VzIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwiZW51bWVyYXRlRGV2aWNlcyIsImNhbWVyYXMiLCJmaWx0ZXIiLCJkZXZpY2UiLCJraW5kIiwiZm9yRWFjaCIsImNhbWVyYSIsIm9wdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsImRldmljZUlkIiwiaW5uZXJUZXh0IiwibGFiZWwiLCJhcHBlbmRDaGlsZCIsImUiLCJjb25zb2xlIiwibG9nIiwiZ2V0TWVkaWEiLCJpbml0aWFsQ29uc3RyYWlucyIsImF1ZGlvIiwidmlkZW8iLCJmYWNpbmdNb2RlIiwiY2FtZXJhQ29uc3RyYWlucyIsImV4YWN0IiwiZ2V0VXNlck1lZGlhIiwic3JjT2JqZWN0IiwibWVzc2FnZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRBdWRpb1RyYWNrcyIsInRyYWNrIiwiZW5hYmxlZCIsImhhbmRsZVZpZGVvT2ZmIiwiZ2V0VmlkZW9UcmFja3MiLCJoYW5kbGVDYW1lcmFDaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7RUFBQTtFQUVBO0VBQ0EsTUFBTUEsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtFQUNBLE1BQU1DLE9BQU8sR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLE1BQXhCLENBQWhCO0VBQ0EsTUFBTUUsU0FBUyxHQUFHSCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBbEI7RUFDQSxNQUFNRyxhQUFhLEdBQUdKLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixDQUF0QjtFQUVBLElBQUlJLFFBQUo7RUFDQSxJQUFJQyxLQUFLLEdBQUcsS0FBWjtFQUNBLElBQUlDLFNBQVMsR0FBRyxLQUFoQjs7RUFFQSxlQUFlQyxVQUFmLEdBQTRCO0VBQzFCLE1BQUk7RUFDRixVQUFNQyxPQUFPLEdBQUdDLFNBQVMsQ0FBQ0MsWUFBVixDQUF1QkMsZ0JBQXZCLEVBQWhCO0VBQ0EsVUFBTUMsT0FBTyxHQUFHLENBQUMsTUFBTUosT0FBUCxFQUFnQkssTUFBaEIsQ0FBd0JDLE1BQUQsSUFBWUEsTUFBTSxDQUFDQyxJQUFQLElBQWUsWUFBbEQsQ0FBaEI7RUFDQUgsSUFBQUEsT0FBTyxDQUFDSSxPQUFSLENBQWlCQyxNQUFELElBQVk7RUFDMUIsWUFBTUMsTUFBTSxHQUFHbkIsUUFBUSxDQUFDb0IsYUFBVCxDQUF1QixRQUF2QixDQUFmO0VBQ0FELE1BQUFBLE1BQU0sQ0FBQ0UsS0FBUCxHQUFlSCxNQUFNLENBQUNJLFFBQXRCO0VBQ0FILE1BQUFBLE1BQU0sQ0FBQ0ksU0FBUCxH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
