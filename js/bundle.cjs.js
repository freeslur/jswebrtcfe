
  /**
   * @license
   * jswebrtcfe.js v1.0.0
   * Released under the MIT License.
   */

'use strict';

// import { io } from "socket.io-client";
// const socket = io();
document.getElementById("myFace");
let myStream;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    console.log(myStream);
  } catch (e) {
    console.log(e.message);
  }
}

getMedia();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmNqcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBpbyB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5cbi8vIGNvbnN0IHNvY2tldCA9IGlvKCk7XG5jb25zdCBteUZhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RmFjZVwiKTtcblxubGV0IG15U3RyZWFtO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRNZWRpYSgpIHtcbiAgdHJ5IHtcbiAgICBteVN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHtcbiAgICAgIGF1ZGlvOiB0cnVlLFxuICAgICAgdmlkZW86IHRydWUsXG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobXlTdHJlYW0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcbiAgfVxufVxuXG5nZXRNZWRpYSgpO1xuIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJteVN0cmVhbSIsImdldE1lZGlhIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwiZ2V0VXNlck1lZGlhIiwiYXVkaW8iLCJ2aWRlbyIsImNvbnNvbGUiLCJsb2ciLCJlIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNlQSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEI7QUFFZixJQUFJQyxRQUFKOztBQUVBLGVBQWVDLFFBQWYsR0FBMEI7QUFDeEIsTUFBSTtBQUNGRCxJQUFBQSxRQUFRLEdBQUcsTUFBTUUsU0FBUyxDQUFDQyxZQUFWLENBQXVCQyxZQUF2QixDQUFvQztBQUNuREMsTUFBQUEsS0FBSyxFQUFFLElBRDRDO0FBRW5EQyxNQUFBQSxLQUFLLEVBQUU7QUFGNEMsS0FBcEMsQ0FBakI7QUFJQUMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlSLFFBQVo7QUFDRCxHQU5ELENBTUUsT0FBT1MsQ0FBUCxFQUFVO0FBQ1ZGLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxDQUFDLENBQUNDLE9BQWQ7QUFDRDtBQUNGOztBQUVEVCxRQUFROzsifQ==
