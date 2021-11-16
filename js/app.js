"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var myFace = document.getElementById("myFace");
var myStream;

function getMedia() {
  return _getMedia.apply(this, arguments);
}

function _getMedia() {
  _getMedia = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return myFace.style.width;

          case 3:
            myStream = _context.sent;
            // myStream = await navigator.mediaDevices.getUserMedia({
            //   audio: true,
            //   video: true,
            // });
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