
  /**
   * @license
   * jswebrtcfe.js v1.0.0
   * Released under the MIT License.
   */

import { io } from 'socket.io-client';

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

io();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmVzLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlvIH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuY29uc3Qgc29ja2V0ID0gaW8oKTtcbmNvbnN0IG15RmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGYWNlXCIpO1xuXG5sZXQgbXlTdHJlYW07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhKCkge1xuICB0cnkge1xuICAgIG15U3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgYXVkaW86IHRydWUsXG4gICAgICB2aWRlbzogdHJ1ZSxcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhteVN0cmVhbSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICB9XG59XG5cbmdldE1lZGlhKCk7XG4iXSwibmFtZXMiOlsiaW8iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibXlTdHJlYW0iLCJnZXRNZWRpYSIsIm5hdmlnYXRvciIsIm1lZGlhRGV2aWNlcyIsImdldFVzZXJNZWRpYSIsImF1ZGlvIiwidmlkZW8iLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWVBLEVBQUU7QUFDRkMsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCO0FBRWYsSUFBSUMsUUFBSjs7U0FFZUM7Ozs7O3NFQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRXFCQyxTQUFTLENBQUNDLFlBQVYsQ0FBdUJDLFlBQXZCLENBQW9DO0FBQ25EQyxjQUFBQSxLQUFLLEVBQUUsSUFENEM7QUFFbkRDLGNBQUFBLEtBQUssRUFBRTtBQUY0QyxhQUFwQyxDQUZyQjs7QUFBQTtBQUVJTixZQUFBQSxRQUZKO0FBTUlPLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUixRQUFaO0FBTko7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFRSU8sWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBRUMsT0FBZDs7QUFSSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQVlBUixRQUFRIn0=
