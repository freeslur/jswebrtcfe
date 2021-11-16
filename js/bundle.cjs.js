
  /**
   * @license
   * jswebrtcfe.js v1.0.0
   * Released under the MIT License.
   */

'use strict';

var socket_ioClient = require('socket.io-client');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

socket_ioClient.io();
document.getElementById("myFace");
var myStream;

function getMedia() {
  return _getMedia.apply(this, arguments);
}

function _getMedia() {
  _getMedia = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true
            });

          case 3:
            myStream = _context.sent;
            console.log(myStream);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.message);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getMedia.apply(this, arguments);
}

getMedia();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmNqcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbyB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5cbmNvbnN0IHNvY2tldCA9IGlvKCk7XG5jb25zdCBteUZhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RmFjZVwiKTtcblxubGV0IG15U3RyZWFtO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRNZWRpYSgpIHtcbiAgdHJ5IHtcbiAgICBteVN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHtcbiAgICAgIGF1ZGlvOiB0cnVlLFxuICAgICAgdmlkZW86IHRydWUsXG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobXlTdHJlYW0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcbiAgfVxufVxuXG5nZXRNZWRpYSgpO1xuIl0sIm5hbWVzIjpbImlvIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm15U3RyZWFtIiwiZ2V0TWVkaWEiLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJnZXRVc2VyTWVkaWEiLCJhdWRpbyIsInZpZGVvIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWVBLGtCQUFFO0FBQ0ZDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QjtBQUVmLElBQUlDLFFBQUo7O1NBRWVDOzs7OztzRUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVxQkMsU0FBUyxDQUFDQyxZQUFWLENBQXVCQyxZQUF2QixDQUFvQztBQUNuREMsY0FBQUEsS0FBSyxFQUFFLElBRDRDO0FBRW5EQyxjQUFBQSxLQUFLLEVBQUU7QUFGNEMsYUFBcEMsQ0FGckI7O0FBQUE7QUFFSU4sWUFBQUEsUUFGSjtBQU1JTyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVIsUUFBWjtBQU5KO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBUUlPLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQUVDLE9BQWQ7O0FBUko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFZQVIsUUFBUTs7In0=
