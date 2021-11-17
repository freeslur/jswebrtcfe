
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
  let myStream;

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

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGlvIH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuLy8gY29uc3Qgc29ja2V0ID0gaW8oKTtcbmNvbnN0IG15RmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGYWNlXCIpO1xuXG5sZXQgbXlTdHJlYW07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhKCkge1xuICB0cnkge1xuICAgIG15U3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgYXVkaW86IHRydWUsXG4gICAgICB2aWRlbzogdHJ1ZSxcbiAgICB9KTtcbiAgICBteUZhY2Uuc3JjT2JqZWN0ID0gbXlTdHJlYW07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICB9XG59XG5cbmdldE1lZGlhKCk7XG4iXSwibmFtZXMiOlsibXlGYWNlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm15U3RyZWFtIiwiZ2V0TWVkaWEiLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJnZXRVc2VyTWVkaWEiLCJhdWRpbyIsInZpZGVvIiwic3JjT2JqZWN0IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0VBQUE7RUFFQTtFQUNBLE1BQU1BLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWY7RUFFQSxJQUFJQyxRQUFKOztFQUVBLGVBQWVDLFFBQWYsR0FBMEI7RUFDeEIsTUFBSTtFQUNGRCxJQUFBQSxRQUFRLEdBQUcsTUFBTUUsU0FBUyxDQUFDQyxZQUFWLENBQXVCQyxZQUF2QixDQUFvQztFQUNuREMsTUFBQUEsS0FBSyxFQUFFLElBRDRDO0VBRW5EQyxNQUFBQSxLQUFLLEVBQUU7RUFGNEMsS0FBcEMsQ0FBakI7RUFJQVQsSUFBQUEsTUFBTSxDQUFDVSxTQUFQLEdBQW1CUCxRQUFuQjtFQUNELEdBTkQsQ0FNRSxPQUFPUSxDQUFQLEVBQVU7RUFDVkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLENBQUMsQ0FBQ0csT0FBZDtFQUNEO0VBQ0Y7O0VBRURWLFFBQVE7Ozs7OzsifQ==
