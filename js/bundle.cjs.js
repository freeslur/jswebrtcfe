
  /**
   * @license
   * jswebrtcfe.js v1.0.0
   * Released under the MIT License.
   */

'use strict';

// import { io } from "socket.io-client";
// const socket = io();
const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    myFace.srcObject = myStream;
  } catch (e) {
    console.log(e.message);
  }
}

getMedia();
muteBtn.addEventListener("click", () => {
  console.log(myStream.enabled);

  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
});
cameraBtn.addEventListener("click", () => {
  console.log(myStream.getVideoTracks());

  if (!cameraOff) {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  } else {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmNqcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBpbyB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5cbi8vIGNvbnN0IHNvY2tldCA9IGlvKCk7XG5jb25zdCBteUZhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RmFjZVwiKTtcbmNvbnN0IG11dGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm11dGVcIik7XG5jb25zdCBjYW1lcmFCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbWVyYVwiKTtcblxubGV0IG15U3RyZWFtO1xubGV0IG11dGVkID0gZmFsc2U7XG5sZXQgY2FtZXJhT2ZmID0gZmFsc2U7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhKCkge1xuICB0cnkge1xuICAgIG15U3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgYXVkaW86IHRydWUsXG4gICAgICB2aWRlbzogdHJ1ZSxcbiAgICB9KTtcbiAgICBteUZhY2Uuc3JjT2JqZWN0ID0gbXlTdHJlYW07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICB9XG59XG5cbmdldE1lZGlhKCk7XG5cbm11dGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc29sZS5sb2cobXlTdHJlYW0uZW5hYmxlZCk7XG4gIGlmICghbXV0ZWQpIHtcbiAgICBtdXRlQnRuLmlubmVyVGV4dCA9IFwiVW5tdXRlXCI7XG4gICAgbXV0ZWQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIG11dGVCdG4uaW5uZXJUZXh0ID0gXCJNdXRlXCI7XG4gICAgbXV0ZWQgPSBmYWxzZTtcbiAgfVxufSk7XG5jYW1lcmFCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc29sZS5sb2cobXlTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKSk7XG4gIGlmICghY2FtZXJhT2ZmKSB7XG4gICAgY2FtZXJhQnRuLmlubmVyVGV4dCA9IFwiVHVybiBDYW1lcmEgT25cIjtcbiAgICBjYW1lcmFPZmYgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGNhbWVyYUJ0bi5pbm5lclRleHQgPSBcIlR1cm4gQ2FtZXJhIE9mZlwiO1xuICAgIGNhbWVyYU9mZiA9IGZhbHNlO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6WyJteUZhY2UiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibXV0ZUJ0biIsImNhbWVyYUJ0biIsIm15U3RyZWFtIiwibXV0ZWQiLCJjYW1lcmFPZmYiLCJnZXRNZWRpYSIsIm5hdmlnYXRvciIsIm1lZGlhRGV2aWNlcyIsImdldFVzZXJNZWRpYSIsImF1ZGlvIiwidmlkZW8iLCJzcmNPYmplY3QiLCJlIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZW5hYmxlZCIsImlubmVyVGV4dCIsImdldFZpZGVvVHJhY2tzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0EsTUFBTUEsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNBLE1BQU1DLE9BQU8sR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLE1BQXhCLENBQWhCO0FBQ0EsTUFBTUUsU0FBUyxHQUFHSCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBbEI7QUFFQSxJQUFJRyxRQUFKO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLEtBQVo7QUFDQSxJQUFJQyxTQUFTLEdBQUcsS0FBaEI7O0FBRUEsZUFBZUMsUUFBZixHQUEwQjtBQUN4QixNQUFJO0FBQ0ZILElBQUFBLFFBQVEsR0FBRyxNQUFNSSxTQUFTLENBQUNDLFlBQVYsQ0FBdUJDLFlBQXZCLENBQW9DO0FBQ25EQyxNQUFBQSxLQUFLLEVBQUUsSUFENEM7QUFFbkRDLE1BQUFBLEtBQUssRUFBRTtBQUY0QyxLQUFwQyxDQUFqQjtBQUlBYixJQUFBQSxNQUFNLENBQUNjLFNBQVAsR0FBbUJULFFBQW5CO0FBQ0QsR0FORCxDQU1FLE9BQU9VLENBQVAsRUFBVTtBQUNWQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsQ0FBQyxDQUFDRyxPQUFkO0FBQ0Q7QUFDRjs7QUFFRFYsUUFBUTtBQUVSTCxPQUFPLENBQUNnQixnQkFBUixDQUF5QixPQUF6QixFQUFrQyxNQUFNO0FBQ3RDSCxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVosUUFBUSxDQUFDZSxPQUFyQjs7QUFDQSxNQUFJLENBQUNkLEtBQUwsRUFBWTtBQUNWSCxJQUFBQSxPQUFPLENBQUNrQixTQUFSLEdBQW9CLFFBQXBCO0FBQ0FmLElBQUFBLEtBQUssR0FBRyxJQUFSO0FBQ0QsR0FIRCxNQUdPO0FBQ0xILElBQUFBLE9BQU8sQ0FBQ2tCLFNBQVIsR0FBb0IsTUFBcEI7QUFDQWYsSUFBQUEsS0FBSyxHQUFHLEtBQVI7QUFDRDtBQUNGLENBVEQ7QUFVQUYsU0FBUyxDQUFDZSxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxNQUFNO0FBQ3hDSCxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVosUUFBUSxDQUFDaUIsY0FBVCxFQUFaOztBQUNBLE1BQUksQ0FBQ2YsU0FBTCxFQUFnQjtBQUNkSCxJQUFBQSxTQUFTLENBQUNpQixTQUFWLEdBQXNCLGdCQUF0QjtBQUNBZCxJQUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNELEdBSEQsTUFHTztBQUNMSCxJQUFBQSxTQUFTLENBQUNpQixTQUFWLEdBQXNCLGlCQUF0QjtBQUNBZCxJQUFBQSxTQUFTLEdBQUcsS0FBWjtBQUNEO0FBQ0YsQ0FURDs7In0=
