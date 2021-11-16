
  /**
   * @license
   * jswebrtcfe.js v1.0.0
   * Released under the MIT License.
   */

(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      };
    }

    return _get.apply(this, arguments);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * Parses an URI
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api private
   */
  var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

  var parseuri = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
      uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
      uri.source = src;
      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
      uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
      uri.ipv6uri = true;
    }

    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
  };

  function pathNames(obj, path) {
    var regx = /\/{2,9}/g,
        names = path.replace(regx, "/").split("/");

    if (path.substr(0, 1) == '/' || path.length === 0) {
      names.splice(0, 1);
    }

    if (path.substr(path.length - 1, 1) == '/') {
      names.splice(names.length - 1, 1);
    }

    return names;
  }

  function queryKey(uri, query) {
    var data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
      if ($1) {
        data[$1] = $2;
      }
    });
    return data;
  }

  /**
   * URL parser.
   *
   * @param uri - url
   * @param path - the request path of the connection
   * @param loc - An object meant to mimic window.location.
   *        Defaults to window.location.
   * @public
   */

  function url(uri) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var loc = arguments.length > 2 ? arguments[2] : undefined;
    var obj = uri; // default to window.location

    loc = loc || typeof location !== "undefined" && location;
    if (null == uri) uri = loc.protocol + "//" + loc.host; // relative path support

    if (typeof uri === "string") {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }

      if (!/^(https?|wss?):\/\//.test(uri)) {
        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      } // parse


      obj = parseuri(uri);
    } // make sure we treat `localhost:80` and `localhost` equally


    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }

    obj.path = obj.path || "/";
    var ipv6 = obj.host.indexOf(":") !== -1;
    var host = ipv6 ? "[" + obj.host + "]" : obj.host; // define unique id

    obj.id = obj.protocol + "://" + host + ":" + obj.port + path; // define href

    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }

  var hasCors = {exports: {}};

  /**
   * Module exports.
   *
   * Logic borrowed from Modernizr:
   *
   *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
   */

  try {
    hasCors.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
  } catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
    hasCors.exports = false;
  }

  var hasCORS = hasCors.exports;

  var globalThis = (function () {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  })();

  // browser shim for xmlhttprequest module
  function XMLHttpRequest$1 (opts) {
    var xdomain = opts.xdomain; // XMLHttpRequest can be disabled on IE

    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {}

    if (!xdomain) {
      try {
        return new globalThis[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }

  function pick(obj) {
    for (var _len = arguments.length, attr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      attr[_key - 1] = arguments[_key];
    }

    return attr.reduce(function (acc, k) {
      if (obj.hasOwnProperty(k)) {
        acc[k] = obj[k];
      }

      return acc;
    }, {});
  } // Keep a reference to the real timeout functions so they can be used when overridden

  var NATIVE_SET_TIMEOUT = setTimeout;
  var NATIVE_CLEAR_TIMEOUT = clearTimeout;
  function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis);
    } else {
      obj.setTimeoutFn = setTimeout.bind(globalThis);
      obj.clearTimeoutFn = clearTimeout.bind(globalThis);
    }
  }

  /**
   * Expose `Emitter`.
   */

  var Emitter_1 = Emitter;
  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */


  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }

    return obj;
  }
  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
    return this;
  };
  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.once = function (event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };
  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {}; // all

    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    } // specific event


    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this; // remove all handlers

    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    } // remove specific handler


    var cb;

    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];

      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    } // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.


    if (callbacks.length === 0) {
      delete this._callbacks['$' + event];
    }

    return this;
  };
  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */


  Emitter.prototype.emit = function (event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1),
        callbacks = this._callbacks['$' + event];

    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }

    if (callbacks) {
      callbacks = callbacks.slice(0);

      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  }; // alias used for reserved events (protected method)


  Emitter.prototype.emitReserved = Emitter.prototype.emit;
  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function (event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };
  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */


  Emitter.prototype.hasListeners = function (event) {
    return !!this.listeners(event).length;
  };

  var PACKET_TYPES = Object.create(null); // no Map = no polyfill

  PACKET_TYPES["open"] = "0";
  PACKET_TYPES["close"] = "1";
  PACKET_TYPES["ping"] = "2";
  PACKET_TYPES["pong"] = "3";
  PACKET_TYPES["message"] = "4";
  PACKET_TYPES["upgrade"] = "5";
  PACKET_TYPES["noop"] = "6";
  var PACKET_TYPES_REVERSE = Object.create(null);
  Object.keys(PACKET_TYPES).forEach(function (key) {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
  });
  var ERROR_PACKET = {
    type: "error",
    data: "parser error"
  };

  var withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
  var withNativeArrayBuffer$2 = typeof ArrayBuffer === "function"; // ArrayBuffer.isView method is not defined in IE10

  var isView$1 = function isView(obj) {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
  };

  var encodePacket = function encodePacket(_ref, supportsBinary, callback) {
    var type = _ref.type,
        data = _ref.data;

    if (withNativeBlob$1 && data instanceof Blob) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(data, callback);
      }
    } else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(new Blob([data]), callback);
      }
    } // plain string


    return callback(PACKET_TYPES[type] + (data || ""));
  };

  var encodeBlobAsBase64 = function encodeBlobAsBase64(data, callback) {
    var fileReader = new FileReader();

    fileReader.onload = function () {
      var content = fileReader.result.split(",")[1];
      callback("b" + content);
    };

    return fileReader.readAsDataURL(data);
  };

  /*
   * base64-arraybuffer 1.0.1 <https://github.com/niklasvh/base64-arraybuffer>
   * Copyright (c) 2021 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // Use a lookup table to find the index.

  var lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);

  for (var i$1 = 0; i$1 < chars.length; i$1++) {
    lookup$1[chars.charCodeAt(i$1)] = i$1;
  }

  var decode$1 = function decode(base64) {
    var bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;

    if (base64[base64.length - 1] === '=') {
      bufferLength--;

      if (base64[base64.length - 2] === '=') {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4) {
      encoded1 = lookup$1[base64.charCodeAt(i)];
      encoded2 = lookup$1[base64.charCodeAt(i + 1)];
      encoded3 = lookup$1[base64.charCodeAt(i + 2)];
      encoded4 = lookup$1[base64.charCodeAt(i + 3)];
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }

    return arraybuffer;
  };

  var withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";

  var decodePacket = function decodePacket(encodedPacket, binaryType) {
    if (typeof encodedPacket !== "string") {
      return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
      };
    }

    var type = encodedPacket.charAt(0);

    if (type === "b") {
      return {
        type: "message",
        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
      };
    }

    var packetType = PACKET_TYPES_REVERSE[type];

    if (!packetType) {
      return ERROR_PACKET;
    }

    return encodedPacket.length > 1 ? {
      type: PACKET_TYPES_REVERSE[type],
      data: encodedPacket.substring(1)
    } : {
      type: PACKET_TYPES_REVERSE[type]
    };
  };

  var decodeBase64Packet = function decodeBase64Packet(data, binaryType) {
    if (withNativeArrayBuffer$1) {
      var decoded = decode$1(data);
      return mapBinary(decoded, binaryType);
    } else {
      return {
        base64: true,
        data: data
      }; // fallback for old browsers
    }
  };

  var mapBinary = function mapBinary(data, binaryType) {
    switch (binaryType) {
      case "blob":
        return data instanceof ArrayBuffer ? new Blob([data]) : data;

      case "arraybuffer":
      default:
        return data;
      // assuming the data is already an ArrayBuffer
    }
  };

  var SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

  var encodePayload = function encodePayload(packets, callback) {
    // some packets may be added to the array while encoding, so the initial length must be saved
    var length = packets.length;
    var encodedPackets = new Array(length);
    var count = 0;
    packets.forEach(function (packet, i) {
      // force base64 encoding for binary packets
      encodePacket(packet, false, function (encodedPacket) {
        encodedPackets[i] = encodedPacket;

        if (++count === length) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };

  var decodePayload = function decodePayload(encodedPayload, binaryType) {
    var encodedPackets = encodedPayload.split(SEPARATOR);
    var packets = [];

    for (var i = 0; i < encodedPackets.length; i++) {
      var decodedPacket = decodePacket(encodedPackets[i], binaryType);
      packets.push(decodedPacket);

      if (decodedPacket.type === "error") {
        break;
      }
    }

    return packets;
  };

  var protocol$1 = 4;

  var Transport = /*#__PURE__*/function (_Emitter) {
    _inherits(Transport, _Emitter);

    var _super = _createSuper(Transport);

    /**
     * Transport abstract constructor.
     *
     * @param {Object} options.
     * @api private
     */
    function Transport(opts) {
      var _this;

      _classCallCheck(this, Transport);

      _this = _super.call(this);
      _this.writable = false;
      installTimerFunctions(_assertThisInitialized(_this), opts);
      _this.opts = opts;
      _this.query = opts.query;
      _this.readyState = "";
      _this.socket = opts.socket;
      return _this;
    }
    /**
     * Emits an error.
     *
     * @param {String} str
     * @return {Transport} for chaining
     * @api protected
     */


    _createClass(Transport, [{
      key: "onError",
      value: function onError(msg, desc) {
        var err = new Error(msg); // @ts-ignore

        err.type = "TransportError"; // @ts-ignore

        err.description = desc;

        _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "error", err);

        return this;
      }
      /**
       * Opens the transport.
       *
       * @api public
       */

    }, {
      key: "open",
      value: function open() {
        if ("closed" === this.readyState || "" === this.readyState) {
          this.readyState = "opening";
          this.doOpen();
        }

        return this;
      }
      /**
       * Closes the transport.
       *
       * @api public
       */

    }, {
      key: "close",
      value: function close() {
        if ("opening" === this.readyState || "open" === this.readyState) {
          this.doClose();
          this.onClose();
        }

        return this;
      }
      /**
       * Sends multiple packets.
       *
       * @param {Array} packets
       * @api public
       */

    }, {
      key: "send",
      value: function send(packets) {
        if ("open" === this.readyState) {
          this.write(packets);
        }
      }
      /**
       * Called upon open
       *
       * @api protected
       */

    }, {
      key: "onOpen",
      value: function onOpen() {
        this.readyState = "open";
        this.writable = true;

        _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "open");
      }
      /**
       * Called with data.
       *
       * @param {String} data
       * @api protected
       */

    }, {
      key: "onData",
      value: function onData(data) {
        var packet = decodePacket(data, this.socket.binaryType);
        this.onPacket(packet);
      }
      /**
       * Called with a decoded packet.
       *
       * @api protected
       */

    }, {
      key: "onPacket",
      value: function onPacket(packet) {
        _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "packet", packet);
      }
      /**
       * Called upon close.
       *
       * @api protected
       */

    }, {
      key: "onClose",
      value: function onClose() {
        this.readyState = "closed";

        _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "close");
      }
    }]);

    return Transport;
  }(Emitter_1);

  var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
      length = 64,
      map = {},
      seed = 0,
      i = 0,
      prev;
  /**
   * Return a string representing the specified number.
   *
   * @param {Number} num The number to convert.
   * @returns {String} The string representation of the number.
   * @api public
   */

  function encode(num) {
    var encoded = '';

    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);

    return encoded;
  }
  /**
   * Return the integer value specified by the given string.
   *
   * @param {String} str The string to convert.
   * @returns {Number} The integer value represented by the string.
   * @api public
   */


  function decode(str) {
    var decoded = 0;

    for (i = 0; i < str.length; i++) {
      decoded = decoded * length + map[str.charAt(i)];
    }

    return decoded;
  }
  /**
   * Yeast: A tiny growing id generator.
   *
   * @returns {String} A unique id.
   * @api public
   */


  function yeast() {
    var now = encode(+new Date());
    if (now !== prev) return seed = 0, prev = now;
    return now + '.' + encode(seed++);
  } //
  // Map each character to its index.
  //


  for (; i < length; i++) {
    map[alphabet[i]] = i;
  } //
  // Expose the `yeast`, `encode` and `decode` functions.
  //


  yeast.encode = encode;
  yeast.decode = decode;
  var yeast_1 = yeast;

  var parseqs = {};

  /**
   * Compiles a querystring
   * Returns string representation of the object
   *
   * @param {Object}
   * @api private
   */

  parseqs.encode = function (obj) {
    var str = '';

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length) str += '&';
        str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
      }
    }

    return str;
  };
  /**
   * Parses a simple querystring into an object
   *
   * @param {String} qs
   * @api private
   */


  parseqs.decode = function (qs) {
    var qry = {};
    var pairs = qs.split('&');

    for (var i = 0, l = pairs.length; i < l; i++) {
      var pair = pairs[i].split('=');
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return qry;
  };

  var Polling = /*#__PURE__*/function (_Transport) {
    _inherits(Polling, _Transport);

    var _super = _createSuper(Polling);

    function Polling() {
      var _this;

      _classCallCheck(this, Polling);

      _this = _super.apply(this, arguments);
      _this.polling = false;
      return _this;
    }
    /**
     * Transport name.
     */


    _createClass(Polling, [{
      key: "name",
      get: function get() {
        return "polling";
      }
      /**
       * Opens the socket (triggers polling). We write a PING message to determine
       * when the transport is open.
       *
       * @api private
       */

    }, {
      key: "doOpen",
      value: function doOpen() {
        this.poll();
      }
      /**
       * Pauses polling.
       *
       * @param {Function} callback upon buffers are flushed and transport is paused
       * @api private
       */

    }, {
      key: "pause",
      value: function pause(onPause) {
        var _this2 = this;

        this.readyState = "pausing";

        var pause = function pause() {
          _this2.readyState = "paused";
          onPause();
        };

        if (this.polling || !this.writable) {
          var total = 0;

          if (this.polling) {
            total++;
            this.once("pollComplete", function () {
              --total || pause();
            });
          }

          if (!this.writable) {
            total++;
            this.once("drain", function () {
              --total || pause();
            });
          }
        } else {
          pause();
        }
      }
      /**
       * Starts polling cycle.
       *
       * @api public
       */

    }, {
      key: "poll",
      value: function poll() {
        this.polling = true;
        this.doPoll();
        this.emit("poll");
      }
      /**
       * Overloads onData to detect payloads.
       *
       * @api private
       */

    }, {
      key: "onData",
      value: function onData(data) {
        var _this3 = this;

        var callback = function callback(packet) {
          // if its the first message we consider the transport open
          if ("opening" === _this3.readyState && packet.type === "open") {
            _this3.onOpen();
          } // if its a close packet, we close the ongoing requests


          if ("close" === packet.type) {
            _this3.onClose();

            return false;
          } // otherwise bypass onData and handle the message


          _this3.onPacket(packet);
        }; // decode payload


        decodePayload(data, this.socket.binaryType).forEach(callback); // if an event did not trigger closing

        if ("closed" !== this.readyState) {
          // if we got data we're not polling
          this.polling = false;
          this.emit("pollComplete");

          if ("open" === this.readyState) {
            this.poll();
          }
        }
      }
      /**
       * For polling, send a close packet.
       *
       * @api private
       */

    }, {
      key: "doClose",
      value: function doClose() {
        var _this4 = this;

        var close = function close() {
          _this4.write([{
            type: "close"
          }]);
        };

        if ("open" === this.readyState) {
          close();
        } else {
          // in case we're trying to close while
          // handshaking is in progress (GH-164)
          this.once("open", close);
        }
      }
      /**
       * Writes a packets payload.
       *
       * @param {Array} data packets
       * @param {Function} drain callback
       * @api private
       */

    }, {
      key: "write",
      value: function write(packets) {
        var _this5 = this;

        this.writable = false;
        encodePayload(packets, function (data) {
          _this5.doWrite(data, function () {
            _this5.writable = true;

            _this5.emit("drain");
          });
        });
      }
      /**
       * Generates uri for connection.
       *
       * @api private
       */

    }, {
      key: "uri",
      value: function uri() {
        var query = this.query || {};
        var schema = this.opts.secure ? "https" : "http";
        var port = ""; // cache busting is forced

        if (false !== this.opts.timestampRequests) {
          query[this.opts.timestampParam] = yeast_1();
        }

        if (!this.supportsBinary && !query.sid) {
          query.b64 = 1;
        } // avoid port if default for schema


        if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        }

        var encodedQuery = parseqs.encode(query);
        var ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
      }
    }]);

    return Polling;
  }(Transport);

  /**
   * Empty function
   */

  function empty() {}

  var hasXHR2 = function () {
    var xhr = new XMLHttpRequest$1({
      xdomain: false
    });
    return null != xhr.responseType;
  }();

  var XHR = /*#__PURE__*/function (_Polling) {
    _inherits(XHR, _Polling);

    var _super = _createSuper(XHR);

    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @api public
     */
    function XHR(opts) {
      var _this;

      _classCallCheck(this, XHR);

      _this = _super.call(this, opts);

      if (typeof location !== "undefined") {
        var isSSL = "https:" === location.protocol;
        var port = location.port; // some user agents have empty `location.port`

        if (!port) {
          port = isSSL ? "443" : "80";
        }

        _this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
        _this.xs = opts.secure !== isSSL;
      }
      /**
       * XHR supports binary
       */


      var forceBase64 = opts && opts.forceBase64;
      _this.supportsBinary = hasXHR2 && !forceBase64;
      return _this;
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @api private
     */


    _createClass(XHR, [{
      key: "request",
      value: function request() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        Object.assign(opts, {
          xd: this.xd,
          xs: this.xs
        }, this.opts);
        return new Request(this.uri(), opts);
      }
      /**
       * Sends data.
       *
       * @param {String} data to send.
       * @param {Function} called upon flush.
       * @api private
       */

    }, {
      key: "doWrite",
      value: function doWrite(data, fn) {
        var _this2 = this;

        var req = this.request({
          method: "POST",
          data: data
        });
        req.on("success", fn);
        req.on("error", function (err) {
          _this2.onError("xhr post error", err);
        });
      }
      /**
       * Starts a poll cycle.
       *
       * @api private
       */

    }, {
      key: "doPoll",
      value: function doPoll() {
        var _this3 = this;

        var req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", function (err) {
          _this3.onError("xhr poll error", err);
        });
        this.pollXhr = req;
      }
    }]);

    return XHR;
  }(Polling);
  var Request = /*#__PURE__*/function (_Emitter) {
    _inherits(Request, _Emitter);

    var _super2 = _createSuper(Request);

    /**
     * Request constructor
     *
     * @param {Object} options
     * @api public
     */
    function Request(uri, opts) {
      var _this4;

      _classCallCheck(this, Request);

      _this4 = _super2.call(this);
      installTimerFunctions(_assertThisInitialized(_this4), opts);
      _this4.opts = opts;
      _this4.method = opts.method || "GET";
      _this4.uri = uri;
      _this4.async = false !== opts.async;
      _this4.data = undefined !== opts.data ? opts.data : null;

      _this4.create();

      return _this4;
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @api private
     */


    _createClass(Request, [{
      key: "create",
      value: function create() {
        var _this5 = this;

        var opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        var xhr = this.xhr = new XMLHttpRequest$1(opts);

        try {
          xhr.open(this.method, this.uri, this.async);

          try {
            if (this.opts.extraHeaders) {
              xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);

              for (var i in this.opts.extraHeaders) {
                if (this.opts.extraHeaders.hasOwnProperty(i)) {
                  xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                }
              }
            }
          } catch (e) {}

          if ("POST" === this.method) {
            try {
              xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
            } catch (e) {}
          }

          try {
            xhr.setRequestHeader("Accept", "*/*");
          } catch (e) {} // ie6 check


          if ("withCredentials" in xhr) {
            xhr.withCredentials = this.opts.withCredentials;
          }

          if (this.opts.requestTimeout) {
            xhr.timeout = this.opts.requestTimeout;
          }

          xhr.onreadystatechange = function () {
            if (4 !== xhr.readyState) return;

            if (200 === xhr.status || 1223 === xhr.status) {
              _this5.onLoad();
            } else {
              // make sure the `error` event handler that's user-set
              // does not throw in the same tick and gets caught here
              _this5.setTimeoutFn(function () {
                _this5.onError(typeof xhr.status === "number" ? xhr.status : 0);
              }, 0);
            }
          };

          xhr.send(this.data);
        } catch (e) {
          // Need to defer since .create() is called directly from the constructor
          // and thus the 'error' event can only be only bound *after* this exception
          // occurs.  Therefore, also, we cannot throw here at all.
          this.setTimeoutFn(function () {
            _this5.onError(e);
          }, 0);
          return;
        }

        if (typeof document !== "undefined") {
          this.index = Request.requestsCount++;
          Request.requests[this.index] = this;
        }
      }
      /**
       * Called upon successful response.
       *
       * @api private
       */

    }, {
      key: "onSuccess",
      value: function onSuccess() {
        this.emit("success");
        this.cleanup();
      }
      /**
       * Called if we have data.
       *
       * @api private
       */

    }, {
      key: "onData",
      value: function onData(data) {
        this.emit("data", data);
        this.onSuccess();
      }
      /**
       * Called upon error.
       *
       * @api private
       */

    }, {
      key: "onError",
      value: function onError(err) {
        this.emit("error", err);
        this.cleanup(true);
      }
      /**
       * Cleans up house.
       *
       * @api private
       */

    }, {
      key: "cleanup",
      value: function cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
          return;
        }

        this.xhr.onreadystatechange = empty;

        if (fromError) {
          try {
            this.xhr.abort();
          } catch (e) {}
        }

        if (typeof document !== "undefined") {
          delete Request.requests[this.index];
        }

        this.xhr = null;
      }
      /**
       * Called upon load.
       *
       * @api private
       */

    }, {
      key: "onLoad",
      value: function onLoad() {
        var data = this.xhr.responseText;

        if (data !== null) {
          this.onData(data);
        }
      }
      /**
       * Aborts the request.
       *
       * @api public
       */

    }, {
      key: "abort",
      value: function abort() {
        this.cleanup();
      }
    }]);

    return Request;
  }(Emitter_1);
  Request.requestsCount = 0;
  Request.requests = {};
  /**
   * Aborts pending requests when unloading the window. This is needed to prevent
   * memory leaks (e.g. when using IE) and to ensure that no spurious error is
   * emitted.
   */

  if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
      // @ts-ignore
      attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
      var terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }

  function unloadHandler() {
    for (var i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }

  var nextTick = function () {
    var isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";

    if (isPromiseAvailable) {
      return function (cb) {
        return Promise.resolve().then(cb);
      };
    } else {
      return function (cb, setTimeoutFn) {
        return setTimeoutFn(cb, 0);
      };
    }
  }();
  var WebSocket = globalThis.WebSocket || globalThis.MozWebSocket;
  var usingBrowserWebSocket = true;
  var defaultBinaryType = "arraybuffer";

  var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  var WS = /*#__PURE__*/function (_Transport) {
    _inherits(WS, _Transport);

    var _super = _createSuper(WS);

    /**
     * WebSocket transport constructor.
     *
     * @api {Object} connection options
     * @api public
     */
    function WS(opts) {
      var _this;

      _classCallCheck(this, WS);

      _this = _super.call(this, opts);
      _this.supportsBinary = !opts.forceBase64;
      return _this;
    }
    /**
     * Transport name.
     *
     * @api public
     */


    _createClass(WS, [{
      key: "name",
      get: function get() {
        return "websocket";
      }
      /**
       * Opens socket.
       *
       * @api private
       */

    }, {
      key: "doOpen",
      value: function doOpen() {
        if (!this.check()) {
          // let probe timeout
          return;
        }

        var uri = this.uri();
        var protocols = this.opts.protocols; // React Native only supports the 'headers' option, and will print a warning if anything else is passed

        var opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");

        if (this.opts.extraHeaders) {
          opts.headers = this.opts.extraHeaders;
        }

        try {
          this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
        } catch (err) {
          return this.emit("error", err);
        }

        this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
        this.addEventListeners();
      }
      /**
       * Adds event listeners to the socket
       *
       * @api private
       */

    }, {
      key: "addEventListeners",
      value: function addEventListeners() {
        var _this2 = this;

        this.ws.onopen = function () {
          if (_this2.opts.autoUnref) {
            _this2.ws._socket.unref();
          }

          _this2.onOpen();
        };

        this.ws.onclose = this.onClose.bind(this);

        this.ws.onmessage = function (ev) {
          return _this2.onData(ev.data);
        };

        this.ws.onerror = function (e) {
          return _this2.onError("websocket error", e);
        };
      }
      /**
       * Writes data to socket.
       *
       * @param {Array} array of packets.
       * @api private
       */

    }, {
      key: "write",
      value: function write(packets) {
        var _this3 = this;

        this.writable = false; // encodePacket efficient as it uses WS framing
        // no need for encodePayload

        var _loop = function _loop(i) {
          var packet = packets[i];
          var lastPacket = i === packets.length - 1;
          encodePacket(packet, _this3.supportsBinary, function (data) {
            // always create a new object (GH-437)
            var opts = {};
            // have a chance of informing us about it yet, in that case send will
            // throw an error


            try {
              if (usingBrowserWebSocket) {
                // TypeError is thrown when passing the second argument on Safari
                _this3.ws.send(data);
              }
            } catch (e) {}

            if (lastPacket) {
              // fake drain
              // defer to next tick to allow Socket to clear writeBuffer
              nextTick(function () {
                _this3.writable = true;

                _this3.emit("drain");
              }, _this3.setTimeoutFn);
            }
          });
        };

        for (var i = 0; i < packets.length; i++) {
          _loop(i);
        }
      }
      /**
       * Closes socket.
       *
       * @api private
       */

    }, {
      key: "doClose",
      value: function doClose() {
        if (typeof this.ws !== "undefined") {
          this.ws.close();
          this.ws = null;
        }
      }
      /**
       * Generates uri for connection.
       *
       * @api private
       */

    }, {
      key: "uri",
      value: function uri() {
        var query = this.query || {};
        var schema = this.opts.secure ? "wss" : "ws";
        var port = ""; // avoid port if default for schema

        if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        } // append timestamp to URI


        if (this.opts.timestampRequests) {
          query[this.opts.timestampParam] = yeast_1();
        } // communicate binary support capabilities


        if (!this.supportsBinary) {
          query.b64 = 1;
        }

        var encodedQuery = parseqs.encode(query);
        var ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
      }
      /**
       * Feature detection for WebSocket.
       *
       * @return {Boolean} whether this transport is available.
       * @api public
       */

    }, {
      key: "check",
      value: function check() {
        return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
      }
    }]);

    return WS;
  }(Transport);

  var transports = {
    websocket: WS,
    polling: XHR
  };

  var Socket$1 = /*#__PURE__*/function (_Emitter) {
    _inherits(Socket, _Emitter);

    var _super = _createSuper(Socket);

    /**
     * Socket constructor.
     *
     * @param {String|Object} uri or options
     * @param {Object} opts - options
     * @api public
     */
    function Socket(uri) {
      var _this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Socket);

      _this = _super.call(this);

      if (uri && "object" === _typeof(uri)) {
        opts = uri;
        uri = null;
      }

      if (uri) {
        uri = parseuri(uri);
        opts.hostname = uri.host;
        opts.secure = uri.protocol === "https" || uri.protocol === "wss";
        opts.port = uri.port;
        if (uri.query) opts.query = uri.query;
      } else if (opts.host) {
        opts.hostname = parseuri(opts.host).host;
      }

      installTimerFunctions(_assertThisInitialized(_this), opts);
      _this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;

      if (opts.hostname && !opts.port) {
        // if no port is specified manually, use the protocol default
        opts.port = _this.secure ? "443" : "80";
      }

      _this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
      _this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : _this.secure ? "443" : "80");
      _this.transports = opts.transports || ["polling", "websocket"];
      _this.readyState = "";
      _this.writeBuffer = [];
      _this.prevBufferLen = 0;
      _this.opts = Object.assign({
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        timestampParam: "t",
        rememberUpgrade: false,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {},
        closeOnBeforeunload: true
      }, opts);
      _this.opts.path = _this.opts.path.replace(/\/$/, "") + "/";

      if (typeof _this.opts.query === "string") {
        _this.opts.query = parseqs.decode(_this.opts.query);
      } // set on handshake


      _this.id = null;
      _this.upgrades = null;
      _this.pingInterval = null;
      _this.pingTimeout = null; // set on heartbeat

      _this.pingTimeoutTimer = null;

      if (typeof addEventListener === "function") {
        if (_this.opts.closeOnBeforeunload) {
          // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
          // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
          // closed/reloaded)
          addEventListener("beforeunload", function () {
            if (_this.transport) {
              // silently close the transport
              _this.transport.removeAllListeners();

              _this.transport.close();
            }
          }, false);
        }

        if (_this.hostname !== "localhost") {
          _this.offlineEventListener = function () {
            _this.onClose("transport close");
          };

          addEventListener("offline", _this.offlineEventListener, false);
        }
      }

      _this.open();

      return _this;
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} transport name
     * @return {Transport}
     * @api private
     */


    _createClass(Socket, [{
      key: "createTransport",
      value: function createTransport(name) {
        var query = clone(this.opts.query); // append engine.io protocol identifier

        query.EIO = protocol$1; // transport name

        query.transport = name; // session id if we already have one

        if (this.id) query.sid = this.id;
        var opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
          query: query,
          socket: this,
          hostname: this.hostname,
          secure: this.secure,
          port: this.port
        });
        return new transports[name](opts);
      }
      /**
       * Initializes transport to use and starts probe.
       *
       * @api private
       */

    }, {
      key: "open",
      value: function open() {
        var _this2 = this;

        var transport;

        if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
          transport = "websocket";
        } else if (0 === this.transports.length) {
          // Emit error on next tick so it can be listened to
          this.setTimeoutFn(function () {
            _this2.emitReserved("error", "No transports available");
          }, 0);
          return;
        } else {
          transport = this.transports[0];
        }

        this.readyState = "opening"; // Retry with the next transport if the transport is disabled (jsonp: false)

        try {
          transport = this.createTransport(transport);
        } catch (e) {
          this.transports.shift();
          this.open();
          return;
        }

        transport.open();
        this.setTransport(transport);
      }
      /**
       * Sets the current transport. Disables the existing one (if any).
       *
       * @api private
       */

    }, {
      key: "setTransport",
      value: function setTransport(transport) {
        var _this3 = this;

        if (this.transport) {
          this.transport.removeAllListeners();
        } // set up transport


        this.transport = transport; // set up transport listeners

        transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", function () {
          _this3.onClose("transport close");
        });
      }
      /**
       * Probes a transport.
       *
       * @param {String} transport name
       * @api private
       */

    }, {
      key: "probe",
      value: function probe(name) {
        var _this4 = this;

        var transport = this.createTransport(name);
        var failed = false;
        Socket.priorWebsocketSuccess = false;

        var onTransportOpen = function onTransportOpen() {
          if (failed) return;
          transport.send([{
            type: "ping",
            data: "probe"
          }]);
          transport.once("packet", function (msg) {
            if (failed) return;

            if ("pong" === msg.type && "probe" === msg.data) {
              _this4.upgrading = true;

              _this4.emitReserved("upgrading", transport);

              if (!transport) return;
              Socket.priorWebsocketSuccess = "websocket" === transport.name;

              _this4.transport.pause(function () {
                if (failed) return;
                if ("closed" === _this4.readyState) return;
                cleanup();

                _this4.setTransport(transport);

                transport.send([{
                  type: "upgrade"
                }]);

                _this4.emitReserved("upgrade", transport);

                transport = null;
                _this4.upgrading = false;

                _this4.flush();
              });
            } else {
              var err = new Error("probe error"); // @ts-ignore

              err.transport = transport.name;

              _this4.emitReserved("upgradeError", err);
            }
          });
        };

        function freezeTransport() {
          if (failed) return; // Any callback called by transport should be ignored since now

          failed = true;
          cleanup();
          transport.close();
          transport = null;
        } // Handle any error that happens while probing


        var onerror = function onerror(err) {
          var error = new Error("probe error: " + err); // @ts-ignore

          error.transport = transport.name;
          freezeTransport();

          _this4.emitReserved("upgradeError", error);
        };

        function onTransportClose() {
          onerror("transport closed");
        } // When the socket is closed while we're probing


        function onclose() {
          onerror("socket closed");
        } // When the socket is upgraded while we're probing


        function onupgrade(to) {
          if (transport && to.name !== transport.name) {
            freezeTransport();
          }
        } // Remove all listeners on the transport and on self


        var cleanup = function cleanup() {
          transport.removeListener("open", onTransportOpen);
          transport.removeListener("error", onerror);
          transport.removeListener("close", onTransportClose);

          _this4.off("close", onclose);

          _this4.off("upgrading", onupgrade);
        };

        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
      }
      /**
       * Called when connection is deemed open.
       *
       * @api private
       */

    }, {
      key: "onOpen",
      value: function onOpen() {
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush(); // we check for `readyState` in case an `open`
        // listener already closed the socket

        if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
          var i = 0;
          var l = this.upgrades.length;

          for (; i < l; i++) {
            this.probe(this.upgrades[i]);
          }
        }
      }
      /**
       * Handles a packet.
       *
       * @api private
       */

    }, {
      key: "onPacket",
      value: function onPacket(packet) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
          this.emitReserved("packet", packet); // Socket is live - any packet counts

          this.emitReserved("heartbeat");

          switch (packet.type) {
            case "open":
              this.onHandshake(JSON.parse(packet.data));
              break;

            case "ping":
              this.resetPingTimeout();
              this.sendPacket("pong");
              this.emitReserved("ping");
              this.emitReserved("pong");
              break;

            case "error":
              var err = new Error("server error"); // @ts-ignore

              err.code = packet.data;
              this.onError(err);
              break;

            case "message":
              this.emitReserved("data", packet.data);
              this.emitReserved("message", packet.data);
              break;
          }
        }
      }
      /**
       * Called upon handshake completion.
       *
       * @param {Object} data - handshake obj
       * @api private
       */

    }, {
      key: "onHandshake",
      value: function onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.onOpen(); // In case open handler closes socket

        if ("closed" === this.readyState) return;
        this.resetPingTimeout();
      }
      /**
       * Sets and resets ping timeout timer based on server pings.
       *
       * @api private
       */

    }, {
      key: "resetPingTimeout",
      value: function resetPingTimeout() {
        var _this5 = this;

        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(function () {
          _this5.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);

        if (this.opts.autoUnref) {
          this.pingTimeoutTimer.unref();
        }
      }
      /**
       * Called on `drain` event
       *
       * @api private
       */

    }, {
      key: "onDrain",
      value: function onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen); // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`

        this.prevBufferLen = 0;

        if (0 === this.writeBuffer.length) {
          this.emitReserved("drain");
        } else {
          this.flush();
        }
      }
      /**
       * Flush write buffers.
       *
       * @api private
       */

    }, {
      key: "flush",
      value: function flush() {
        if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
          this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
          // splice writeBuffer and callbackBuffer on `drain`

          this.prevBufferLen = this.writeBuffer.length;
          this.emitReserved("flush");
        }
      }
      /**
       * Sends a message.
       *
       * @param {String} message.
       * @param {Function} callback function.
       * @param {Object} options.
       * @return {Socket} for chaining.
       * @api public
       */

    }, {
      key: "write",
      value: function write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }
    }, {
      key: "send",
      value: function send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }
      /**
       * Sends a packet.
       *
       * @param {String} packet type.
       * @param {String} data.
       * @param {Object} options.
       * @param {Function} callback function.
       * @api private
       */

    }, {
      key: "sendPacket",
      value: function sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
          fn = data;
          data = undefined;
        }

        if ("function" === typeof options) {
          fn = options;
          options = null;
        }

        if ("closing" === this.readyState || "closed" === this.readyState) {
          return;
        }

        options = options || {};
        options.compress = false !== options.compress;
        var packet = {
          type: type,
          data: data,
          options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn) this.once("flush", fn);
        this.flush();
      }
      /**
       * Closes the connection.
       *
       * @api public
       */

    }, {
      key: "close",
      value: function close() {
        var _this6 = this;

        var close = function close() {
          _this6.onClose("forced close");

          _this6.transport.close();
        };

        var cleanupAndClose = function cleanupAndClose() {
          _this6.off("upgrade", cleanupAndClose);

          _this6.off("upgradeError", cleanupAndClose);

          close();
        };

        var waitForUpgrade = function waitForUpgrade() {
          // wait for upgrade to finish since we can't send packets while pausing a transport
          _this6.once("upgrade", cleanupAndClose);

          _this6.once("upgradeError", cleanupAndClose);
        };

        if ("opening" === this.readyState || "open" === this.readyState) {
          this.readyState = "closing";

          if (this.writeBuffer.length) {
            this.once("drain", function () {
              if (_this6.upgrading) {
                waitForUpgrade();
              } else {
                close();
              }
            });
          } else if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        }

        return this;
      }
      /**
       * Called upon transport error
       *
       * @api private
       */

    }, {
      key: "onError",
      value: function onError(err) {
        Socket.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
      }
      /**
       * Called upon transport close.
       *
       * @api private
       */

    }, {
      key: "onClose",
      value: function onClose(reason, desc) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
          // clear timers
          this.clearTimeoutFn(this.pingTimeoutTimer); // stop event from firing again for transport

          this.transport.removeAllListeners("close"); // ensure transport won't stay open

          this.transport.close(); // ignore further transport communication

          this.transport.removeAllListeners();

          if (typeof removeEventListener === "function") {
            removeEventListener("offline", this.offlineEventListener, false);
          } // set ready state


          this.readyState = "closed"; // clear session id

          this.id = null; // emit close event

          this.emitReserved("close", reason, desc); // clean buffers after, so users can still
          // grab the buffers on `close` event

          this.writeBuffer = [];
          this.prevBufferLen = 0;
        }
      }
      /**
       * Filters upgrades, returning only those matching client transports.
       *
       * @param {Array} server upgrades
       * @api private
       *
       */

    }, {
      key: "filterUpgrades",
      value: function filterUpgrades(upgrades) {
        var filteredUpgrades = [];
        var i = 0;
        var j = upgrades.length;

        for (; i < j; i++) {
          if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
        }

        return filteredUpgrades;
      }
    }]);

    return Socket;
  }(Emitter_1);
  Socket$1.protocol = protocol$1;

  function clone(obj) {
    var o = {};

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = obj[i];
      }
    }

    return o;
  }

  var withNativeArrayBuffer = typeof ArrayBuffer === "function";

  var isView = function isView(obj) {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };

  var toString = Object.prototype.toString;
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  /**
   * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
   *
   * @private
   */

  function isBinary(obj) {
    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
  }
  function hasBinary(obj, toJSON) {
    if (!obj || _typeof(obj) !== "object") {
      return false;
    }

    if (Array.isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }

      return false;
    }

    if (isBinary(obj)) {
      return true;
    }

    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }

    return false;
  }

  /**
   * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
   *
   * @param {Object} packet - socket.io event packet
   * @return {Object} with deconstructed packet and list of buffers
   * @public
   */

  function deconstructPacket(packet) {
    var buffers = [];
    var packetData = packet.data;
    var pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'

    return {
      packet: pack,
      buffers: buffers
    };
  }

  function _deconstructPacket(data, buffers) {
    if (!data) return data;

    if (isBinary(data)) {
      var placeholder = {
        _placeholder: true,
        num: buffers.length
      };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      var newData = new Array(data.length);

      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }

      return newData;
    } else if (_typeof(data) === "object" && !(data instanceof Date)) {
      var _newData = {};

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          _newData[key] = _deconstructPacket(data[key], buffers);
        }
      }

      return _newData;
    }

    return data;
  }
  /**
   * Reconstructs a binary packet from its placeholder packet and buffers
   *
   * @param {Object} packet - event packet with placeholders
   * @param {Array} buffers - binary buffers to put in placeholder positions
   * @return {Object} reconstructed packet
   * @public
   */


  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful

    return packet;
  }

  function _reconstructPacket(data, buffers) {
    if (!data) return data;

    if (data && data._placeholder) {
      return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    } else if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (_typeof(data) === "object") {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }

    return data;
  }

  /**
   * Protocol version.
   *
   * @public
   */

  var protocol = 5;
  var PacketType;

  (function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType || (PacketType = {}));
  /**
   * A socket.io Encoder instance
   */


  var Encoder = /*#__PURE__*/function () {
    function Encoder() {
      _classCallCheck(this, Encoder);
    }

    _createClass(Encoder, [{
      key: "encode",
      value:
      /**
       * Encode a packet as a single string if non-binary, or as a
       * buffer sequence, depending on packet type.
       *
       * @param {Object} obj - packet object
       */
      function encode(obj) {
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
          if (hasBinary(obj)) {
            obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
            return this.encodeAsBinary(obj);
          }
        }

        return [this.encodeAsString(obj)];
      }
      /**
       * Encode packet as string.
       */

    }, {
      key: "encodeAsString",
      value: function encodeAsString(obj) {
        // first is type
        var str = "" + obj.type; // attachments if we have them

        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
          str += obj.attachments + "-";
        } // if we have a namespace other than `/`
        // we append it followed by a comma `,`


        if (obj.nsp && "/" !== obj.nsp) {
          str += obj.nsp + ",";
        } // immediately followed by the id


        if (null != obj.id) {
          str += obj.id;
        } // json data


        if (null != obj.data) {
          str += JSON.stringify(obj.data);
        }

        return str;
      }
      /**
       * Encode packet as 'buffer sequence' by removing blobs, and
       * deconstructing packet into object with placeholders and
       * a list of buffers.
       */

    }, {
      key: "encodeAsBinary",
      value: function encodeAsBinary(obj) {
        var deconstruction = deconstructPacket(obj);
        var pack = this.encodeAsString(deconstruction.packet);
        var buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list

        return buffers; // write all the buffers
      }
    }]);

    return Encoder;
  }();
  /**
   * A socket.io Decoder instance
   *
   * @return {Object} decoder
   */

  var Decoder = /*#__PURE__*/function (_Emitter) {
    _inherits(Decoder, _Emitter);

    var _super = _createSuper(Decoder);

    function Decoder() {
      _classCallCheck(this, Decoder);

      return _super.call(this);
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */


    _createClass(Decoder, [{
      key: "add",
      value: function add(obj) {
        var packet;

        if (typeof obj === "string") {
          packet = this.decodeString(obj);

          if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
            // binary packet's json
            this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

            if (packet.attachments === 0) {
              _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
            }
          } else {
            // non-binary full packet
            _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
          }
        } else if (isBinary(obj) || obj.base64) {
          // raw binary data
          if (!this.reconstructor) {
            throw new Error("got binary data when not reconstructing a packet");
          } else {
            packet = this.reconstructor.takeBinaryData(obj);

            if (packet) {
              // received final buffer
              this.reconstructor = null;

              _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
            }
          }
        } else {
          throw new Error("Unknown type: " + obj);
        }
      }
      /**
       * Decode a packet String (JSON data)
       *
       * @param {String} str
       * @return {Object} packet
       */

    }, {
      key: "decodeString",
      value: function decodeString(str) {
        var i = 0; // look up type

        var p = {
          type: Number(str.charAt(0))
        };

        if (PacketType[p.type] === undefined) {
          throw new Error("unknown packet type " + p.type);
        } // look up attachments if type binary


        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
          var start = i + 1;

          while (str.charAt(++i) !== "-" && i != str.length) {}

          var buf = str.substring(start, i);

          if (buf != Number(buf) || str.charAt(i) !== "-") {
            throw new Error("Illegal attachments");
          }

          p.attachments = Number(buf);
        } // look up namespace (if any)


        if ("/" === str.charAt(i + 1)) {
          var _start = i + 1;

          while (++i) {
            var c = str.charAt(i);
            if ("," === c) break;
            if (i === str.length) break;
          }

          p.nsp = str.substring(_start, i);
        } else {
          p.nsp = "/";
        } // look up id


        var next = str.charAt(i + 1);

        if ("" !== next && Number(next) == next) {
          var _start2 = i + 1;

          while (++i) {
            var _c = str.charAt(i);

            if (null == _c || Number(_c) != _c) {
              --i;
              break;
            }

            if (i === str.length) break;
          }

          p.id = Number(str.substring(_start2, i + 1));
        } // look up json data


        if (str.charAt(++i)) {
          var payload = tryParse(str.substr(i));

          if (Decoder.isPayloadValid(p.type, payload)) {
            p.data = payload;
          } else {
            throw new Error("invalid payload");
          }
        }

        return p;
      }
    }, {
      key: "destroy",
      value:
      /**
       * Deallocates a parser's resources
       */
      function destroy() {
        if (this.reconstructor) {
          this.reconstructor.finishedReconstruction();
        }
      }
    }], [{
      key: "isPayloadValid",
      value: function isPayloadValid(type, payload) {
        switch (type) {
          case PacketType.CONNECT:
            return _typeof(payload) === "object";

          case PacketType.DISCONNECT:
            return payload === undefined;

          case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || _typeof(payload) === "object";

          case PacketType.EVENT:
          case PacketType.BINARY_EVENT:
            return Array.isArray(payload) && payload.length > 0;

          case PacketType.ACK:
          case PacketType.BINARY_ACK:
            return Array.isArray(payload);
        }
      }
    }]);

    return Decoder;
  }(Emitter_1);

  function tryParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }
  /**
   * A manager of a binary event's 'buffer sequence'. Should
   * be constructed whenever a packet of type BINARY_EVENT is
   * decoded.
   *
   * @param {Object} packet
   * @return {BinaryReconstructor} initialized reconstructor
   */


  var BinaryReconstructor = /*#__PURE__*/function () {
    function BinaryReconstructor(packet) {
      _classCallCheck(this, BinaryReconstructor);

      this.packet = packet;
      this.buffers = [];
      this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */


    _createClass(BinaryReconstructor, [{
      key: "takeBinaryData",
      value: function takeBinaryData(binData) {
        this.buffers.push(binData);

        if (this.buffers.length === this.reconPack.attachments) {
          // done with buffer list
          var packet = reconstructPacket(this.reconPack, this.buffers);
          this.finishedReconstruction();
          return packet;
        }

        return null;
      }
      /**
       * Cleans up binary packet reconstruction variables.
       */

    }, {
      key: "finishedReconstruction",
      value: function finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
      }
    }]);

    return BinaryReconstructor;
  }();

  var parser = /*#__PURE__*/Object.freeze({
    __proto__: null,
    protocol: protocol,
    get PacketType () { return PacketType; },
    Encoder: Encoder,
    Decoder: Decoder
  });

  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
      obj.off(ev, fn);
    };
  }

  /**
   * Internal events.
   * These events can't be emitted by the user.
   */

  var RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
  });
  var Socket = /*#__PURE__*/function (_Emitter) {
    _inherits(Socket, _Emitter);

    var _super = _createSuper(Socket);

    /**
     * `Socket` constructor.
     *
     * @public
     */
    function Socket(io, nsp, opts) {
      var _this;

      _classCallCheck(this, Socket);

      _this = _super.call(this);
      _this.connected = false;
      _this.disconnected = true;
      _this.receiveBuffer = [];
      _this.sendBuffer = [];
      _this.ids = 0;
      _this.acks = {};
      _this.flags = {};
      _this.io = io;
      _this.nsp = nsp;

      if (opts && opts.auth) {
        _this.auth = opts.auth;
      }

      if (_this.io._autoConnect) _this.open();
      return _this;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */


    _createClass(Socket, [{
      key: "subEvents",
      value: function subEvents() {
        if (this.subs) return;
        var io = this.io;
        this.subs = [on(io, "open", this.onopen.bind(this)), on(io, "packet", this.onpacket.bind(this)), on(io, "error", this.onerror.bind(this)), on(io, "close", this.onclose.bind(this))];
      }
      /**
       * Whether the Socket will try to reconnect when its Manager connects or reconnects
       */

    }, {
      key: "active",
      get: function get() {
        return !!this.subs;
      }
      /**
       * "Opens" the socket.
       *
       * @public
       */

    }, {
      key: "connect",
      value: function connect() {
        if (this.connected) return this;
        this.subEvents();
        if (!this.io["_reconnecting"]) this.io.open(); // ensure open

        if ("open" === this.io._readyState) this.onopen();
        return this;
      }
      /**
       * Alias for connect()
       */

    }, {
      key: "open",
      value: function open() {
        return this.connect();
      }
      /**
       * Sends a `message` event.
       *
       * @return self
       * @public
       */

    }, {
      key: "send",
      value: function send() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        args.unshift("message");
        this.emit.apply(this, args);
        return this;
      }
      /**
       * Override `emit`.
       * If the event is in `events`, it's emitted normally.
       *
       * @return self
       * @public
       */

    }, {
      key: "emit",
      value: function emit(ev) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
          throw new Error('"' + ev + '" is a reserved event name');
        }

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        args.unshift(ev);
        var packet = {
          type: PacketType.EVENT,
          data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false; // event ack callback

        if ("function" === typeof args[args.length - 1]) {
          this.acks[this.ids] = args.pop();
          packet.id = this.ids++;
        }

        var isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        var discardPacket = this.flags["volatile"] && (!isTransportWritable || !this.connected);

        if (discardPacket) ; else if (this.connected) {
          this.packet(packet);
        } else {
          this.sendBuffer.push(packet);
        }

        this.flags = {};
        return this;
      }
      /**
       * Sends a packet.
       *
       * @param packet
       * @private
       */

    }, {
      key: "packet",
      value: function packet(_packet) {
        _packet.nsp = this.nsp;

        this.io._packet(_packet);
      }
      /**
       * Called upon engine `open`.
       *
       * @private
       */

    }, {
      key: "onopen",
      value: function onopen() {
        var _this2 = this;

        if (typeof this.auth == "function") {
          this.auth(function (data) {
            _this2.packet({
              type: PacketType.CONNECT,
              data: data
            });
          });
        } else {
          this.packet({
            type: PacketType.CONNECT,
            data: this.auth
          });
        }
      }
      /**
       * Called upon engine or manager `error`.
       *
       * @param err
       * @private
       */

    }, {
      key: "onerror",
      value: function onerror(err) {
        if (!this.connected) {
          this.emitReserved("connect_error", err);
        }
      }
      /**
       * Called upon engine `close`.
       *
       * @param reason
       * @private
       */

    }, {
      key: "onclose",
      value: function onclose(reason) {
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        this.emitReserved("disconnect", reason);
      }
      /**
       * Called with socket packet.
       *
       * @param packet
       * @private
       */

    }, {
      key: "onpacket",
      value: function onpacket(packet) {
        var sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace) return;

        switch (packet.type) {
          case PacketType.CONNECT:
            if (packet.data && packet.data.sid) {
              var id = packet.data.sid;
              this.onconnect(id);
            } else {
              this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
            }

            break;

          case PacketType.EVENT:
            this.onevent(packet);
            break;

          case PacketType.BINARY_EVENT:
            this.onevent(packet);
            break;

          case PacketType.ACK:
            this.onack(packet);
            break;

          case PacketType.BINARY_ACK:
            this.onack(packet);
            break;

          case PacketType.DISCONNECT:
            this.ondisconnect();
            break;

          case PacketType.CONNECT_ERROR:
            var err = new Error(packet.data.message); // @ts-ignore

            err.data = packet.data.data;
            this.emitReserved("connect_error", err);
            break;
        }
      }
      /**
       * Called upon a server event.
       *
       * @param packet
       * @private
       */

    }, {
      key: "onevent",
      value: function onevent(packet) {
        var args = packet.data || [];

        if (null != packet.id) {
          args.push(this.ack(packet.id));
        }

        if (this.connected) {
          this.emitEvent(args);
        } else {
          this.receiveBuffer.push(Object.freeze(args));
        }
      }
    }, {
      key: "emitEvent",
      value: function emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
          var listeners = this._anyListeners.slice();

          var _iterator = _createForOfIteratorHelper(listeners),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var listener = _step.value;
              listener.apply(this, args);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        _get(_getPrototypeOf(Socket.prototype), "emit", this).apply(this, args);
      }
      /**
       * Produces an ack callback to emit with an event.
       *
       * @private
       */

    }, {
      key: "ack",
      value: function ack(id) {
        var self = this;
        var sent = false;
        return function () {
          // prevent double callbacks
          if (sent) return;
          sent = true;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          self.packet({
            type: PacketType.ACK,
            id: id,
            data: args
          });
        };
      }
      /**
       * Called upon a server acknowlegement.
       *
       * @param packet
       * @private
       */

    }, {
      key: "onack",
      value: function onack(packet) {
        var ack = this.acks[packet.id];

        if ("function" === typeof ack) {
          ack.apply(this, packet.data);
          delete this.acks[packet.id];
        }
      }
      /**
       * Called upon server connect.
       *
       * @private
       */

    }, {
      key: "onconnect",
      value: function onconnect(id) {
        this.id = id;
        this.connected = true;
        this.disconnected = false;
        this.emitBuffered();
        this.emitReserved("connect");
      }
      /**
       * Emit buffered events (received and emitted).
       *
       * @private
       */

    }, {
      key: "emitBuffered",
      value: function emitBuffered() {
        var _this3 = this;

        this.receiveBuffer.forEach(function (args) {
          return _this3.emitEvent(args);
        });
        this.receiveBuffer = [];
        this.sendBuffer.forEach(function (packet) {
          return _this3.packet(packet);
        });
        this.sendBuffer = [];
      }
      /**
       * Called upon server disconnect.
       *
       * @private
       */

    }, {
      key: "ondisconnect",
      value: function ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
      }
      /**
       * Called upon forced client/server side disconnections,
       * this method ensures the manager stops tracking us and
       * that reconnections don't get triggered for this.
       *
       * @private
       */

    }, {
      key: "destroy",
      value: function destroy() {
        if (this.subs) {
          // clean subscriptions to avoid reconnections
          this.subs.forEach(function (subDestroy) {
            return subDestroy();
          });
          this.subs = undefined;
        }

        this.io["_destroy"](this);
      }
      /**
       * Disconnects the socket manually.
       *
       * @return self
       * @public
       */

    }, {
      key: "disconnect",
      value: function disconnect() {
        if (this.connected) {
          this.packet({
            type: PacketType.DISCONNECT
          });
        } // remove socket from pool


        this.destroy();

        if (this.connected) {
          // fire events
          this.onclose("io client disconnect");
        }

        return this;
      }
      /**
       * Alias for disconnect()
       *
       * @return self
       * @public
       */

    }, {
      key: "close",
      value: function close() {
        return this.disconnect();
      }
      /**
       * Sets the compress flag.
       *
       * @param compress - if `true`, compresses the sending data
       * @return self
       * @public
       */

    }, {
      key: "compress",
      value: function compress(_compress) {
        this.flags.compress = _compress;
        return this;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
       * ready to send messages.
       *
       * @returns self
       * @public
       */

    }, {
      key: "volatile",
      get: function get() {
        this.flags["volatile"] = true;
        return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback.
       *
       * @param listener
       * @public
       */

    }, {
      key: "onAny",
      value: function onAny(listener) {
        this._anyListeners = this._anyListeners || [];

        this._anyListeners.push(listener);

        return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback. The listener is added to the beginning of the listeners array.
       *
       * @param listener
       * @public
       */

    }, {
      key: "prependAny",
      value: function prependAny(listener) {
        this._anyListeners = this._anyListeners || [];

        this._anyListeners.unshift(listener);

        return this;
      }
      /**
       * Removes the listener that will be fired when any event is emitted.
       *
       * @param listener
       * @public
       */

    }, {
      key: "offAny",
      value: function offAny(listener) {
        if (!this._anyListeners) {
          return this;
        }

        if (listener) {
          var listeners = this._anyListeners;

          for (var i = 0; i < listeners.length; i++) {
            if (listener === listeners[i]) {
              listeners.splice(i, 1);
              return this;
            }
          }
        } else {
          this._anyListeners = [];
        }

        return this;
      }
      /**
       * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
       * e.g. to remove listeners.
       *
       * @public
       */

    }, {
      key: "listenersAny",
      value: function listenersAny() {
        return this._anyListeners || [];
      }
    }]);

    return Socket;
  }(Emitter_1);

  /**
   * Expose `Backoff`.
   */

  var backo2 = Backoff;
  /**
   * Initialize backoff timer with `opts`.
   *
   * - `min` initial timeout in milliseconds [100]
   * - `max` max timeout [10000]
   * - `jitter` [0]
   * - `factor` [2]
   *
   * @param {Object} opts
   * @api public
   */

  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  /**
   * Return the backoff duration.
   *
   * @return {Number}
   * @api public
   */


  Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);

    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }

    return Math.min(ms, this.max) | 0;
  };
  /**
   * Reset the number of attempts.
   *
   * @api public
   */


  Backoff.prototype.reset = function () {
    this.attempts = 0;
  };
  /**
   * Set the minimum duration
   *
   * @api public
   */


  Backoff.prototype.setMin = function (min) {
    this.ms = min;
  };
  /**
   * Set the maximum duration
   *
   * @api public
   */


  Backoff.prototype.setMax = function (max) {
    this.max = max;
  };
  /**
   * Set the jitter
   *
   * @api public
   */


  Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
  };

  var Manager = /*#__PURE__*/function (_Emitter) {
    _inherits(Manager, _Emitter);

    var _super = _createSuper(Manager);

    function Manager(uri, opts) {
      var _this;

      _classCallCheck(this, Manager);

      var _a;

      _this = _super.call(this);
      _this.nsps = {};
      _this.subs = [];

      if (uri && "object" === _typeof(uri)) {
        opts = uri;
        uri = undefined;
      }

      opts = opts || {};
      opts.path = opts.path || "/socket.io";
      _this.opts = opts;
      installTimerFunctions(_assertThisInitialized(_this), opts);

      _this.reconnection(opts.reconnection !== false);

      _this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);

      _this.reconnectionDelay(opts.reconnectionDelay || 1000);

      _this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);

      _this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);

      _this.backoff = new backo2({
        min: _this.reconnectionDelay(),
        max: _this.reconnectionDelayMax(),
        jitter: _this.randomizationFactor()
      });

      _this.timeout(null == opts.timeout ? 20000 : opts.timeout);

      _this._readyState = "closed";
      _this.uri = uri;

      var _parser = opts.parser || parser;

      _this.encoder = new _parser.Encoder();
      _this.decoder = new _parser.Decoder();
      _this._autoConnect = opts.autoConnect !== false;
      if (_this._autoConnect) _this.open();
      return _this;
    }

    _createClass(Manager, [{
      key: "reconnection",
      value: function reconnection(v) {
        if (!arguments.length) return this._reconnection;
        this._reconnection = !!v;
        return this;
      }
    }, {
      key: "reconnectionAttempts",
      value: function reconnectionAttempts(v) {
        if (v === undefined) return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
      }
    }, {
      key: "reconnectionDelay",
      value: function reconnectionDelay(v) {
        var _a;

        if (v === undefined) return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
      }
    }, {
      key: "randomizationFactor",
      value: function randomizationFactor(v) {
        var _a;

        if (v === undefined) return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
      }
    }, {
      key: "reconnectionDelayMax",
      value: function reconnectionDelayMax(v) {
        var _a;

        if (v === undefined) return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
      }
    }, {
      key: "timeout",
      value: function timeout(v) {
        if (!arguments.length) return this._timeout;
        this._timeout = v;
        return this;
      }
      /**
       * Starts trying to reconnect if reconnection is enabled and we have not
       * started reconnecting yet
       *
       * @private
       */

    }, {
      key: "maybeReconnectOnOpen",
      value: function maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
          // keeps reconnection from firing twice for the same reconnection loop
          this.reconnect();
        }
      }
      /**
       * Sets the current transport `socket`.
       *
       * @param {Function} fn - optional, callback
       * @return self
       * @public
       */

    }, {
      key: "open",
      value: function open(fn) {
        var _this2 = this;

        if (~this._readyState.indexOf("open")) return this;
        this.engine = new Socket$1(this.uri, this.opts);
        var socket = this.engine;
        var self = this;
        this._readyState = "opening";
        this.skipReconnect = false; // emit `open`

        var openSubDestroy = on(socket, "open", function () {
          self.onopen();
          fn && fn();
        }); // emit `error`

        var errorSub = on(socket, "error", function (err) {
          self.cleanup();
          self._readyState = "closed";

          _this2.emitReserved("error", err);

          if (fn) {
            fn(err);
          } else {
            // Only do this if there is no fn to handle the error
            self.maybeReconnectOnOpen();
          }
        });

        if (false !== this._timeout) {
          var timeout = this._timeout;

          if (timeout === 0) {
            openSubDestroy(); // prevents a race condition with the 'open' event
          } // set timer


          var timer = this.setTimeoutFn(function () {
            openSubDestroy();
            socket.close(); // @ts-ignore

            socket.emit("error", new Error("timeout"));
          }, timeout);

          if (this.opts.autoUnref) {
            timer.unref();
          }

          this.subs.push(function subDestroy() {
            clearTimeout(timer);
          });
        }

        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
      }
      /**
       * Alias for open()
       *
       * @return self
       * @public
       */

    }, {
      key: "connect",
      value: function connect(fn) {
        return this.open(fn);
      }
      /**
       * Called upon transport open.
       *
       * @private
       */

    }, {
      key: "onopen",
      value: function onopen() {
        // clear old subs
        this.cleanup(); // mark as open

        this._readyState = "open";
        this.emitReserved("open"); // add new subs

        var socket = this.engine;
        this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
      }
      /**
       * Called upon a ping.
       *
       * @private
       */

    }, {
      key: "onping",
      value: function onping() {
        this.emitReserved("ping");
      }
      /**
       * Called with data.
       *
       * @private
       */

    }, {
      key: "ondata",
      value: function ondata(data) {
        this.decoder.add(data);
      }
      /**
       * Called when parser fully decodes a packet.
       *
       * @private
       */

    }, {
      key: "ondecoded",
      value: function ondecoded(packet) {
        this.emitReserved("packet", packet);
      }
      /**
       * Called upon socket error.
       *
       * @private
       */

    }, {
      key: "onerror",
      value: function onerror(err) {
        this.emitReserved("error", err);
      }
      /**
       * Creates a new socket for the given `nsp`.
       *
       * @return {Socket}
       * @public
       */

    }, {
      key: "socket",
      value: function socket(nsp, opts) {
        var socket = this.nsps[nsp];

        if (!socket) {
          socket = new Socket(this, nsp, opts);
          this.nsps[nsp] = socket;
        }

        return socket;
      }
      /**
       * Called upon a socket close.
       *
       * @param socket
       * @private
       */

    }, {
      key: "_destroy",
      value: function _destroy(socket) {
        var nsps = Object.keys(this.nsps);

        for (var _i = 0, _nsps = nsps; _i < _nsps.length; _i++) {
          var nsp = _nsps[_i];
          var _socket = this.nsps[nsp];

          if (_socket.active) {
            return;
          }
        }

        this._close();
      }
      /**
       * Writes a packet.
       *
       * @param packet
       * @private
       */

    }, {
      key: "_packet",
      value: function _packet(packet) {
        var encodedPackets = this.encoder.encode(packet);

        for (var i = 0; i < encodedPackets.length; i++) {
          this.engine.write(encodedPackets[i], packet.options);
        }
      }
      /**
       * Clean up transport subscriptions and packet buffer.
       *
       * @private
       */

    }, {
      key: "cleanup",
      value: function cleanup() {
        this.subs.forEach(function (subDestroy) {
          return subDestroy();
        });
        this.subs.length = 0;
        this.decoder.destroy();
      }
      /**
       * Close the current socket.
       *
       * @private
       */

    }, {
      key: "_close",
      value: function _close() {
        this.skipReconnect = true;
        this._reconnecting = false;

        if ("opening" === this._readyState) {
          // `onclose` will not fire because
          // an open event never happened
          this.cleanup();
        }

        this.backoff.reset();
        this._readyState = "closed";
        if (this.engine) this.engine.close();
      }
      /**
       * Alias for close()
       *
       * @private
       */

    }, {
      key: "disconnect",
      value: function disconnect() {
        return this._close();
      }
      /**
       * Called upon engine close.
       *
       * @private
       */

    }, {
      key: "onclose",
      value: function onclose(reason) {
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason);

        if (this._reconnection && !this.skipReconnect) {
          this.reconnect();
        }
      }
      /**
       * Attempt a reconnection.
       *
       * @private
       */

    }, {
      key: "reconnect",
      value: function reconnect() {
        var _this3 = this;

        if (this._reconnecting || this.skipReconnect) return this;
        var self = this;

        if (this.backoff.attempts >= this._reconnectionAttempts) {
          this.backoff.reset();
          this.emitReserved("reconnect_failed");
          this._reconnecting = false;
        } else {
          var delay = this.backoff.duration();
          this._reconnecting = true;
          var timer = this.setTimeoutFn(function () {
            if (self.skipReconnect) return;

            _this3.emitReserved("reconnect_attempt", self.backoff.attempts); // check again for the case socket closed in above events


            if (self.skipReconnect) return;
            self.open(function (err) {
              if (err) {
                self._reconnecting = false;
                self.reconnect();

                _this3.emitReserved("reconnect_error", err);
              } else {
                self.onreconnect();
              }
            });
          }, delay);

          if (this.opts.autoUnref) {
            timer.unref();
          }

          this.subs.push(function subDestroy() {
            clearTimeout(timer);
          });
        }
      }
      /**
       * Called upon successful reconnect.
       *
       * @private
       */

    }, {
      key: "onreconnect",
      value: function onreconnect() {
        var attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
      }
    }]);

    return Manager;
  }(Emitter_1);

  /**
   * Managers cache.
   */

  var cache = {};

  function lookup(uri, opts) {
    if (_typeof(uri) === "object") {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};
    var parsed = url(uri, opts.path || "/socket.io");
    var source = parsed.source;
    var id = parsed.id;
    var path = parsed.path;
    var sameNamespace = cache[id] && path in cache[id]["nsps"];
    var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    var io;

    if (newConnection) {
      io = new Manager(source, opts);
    } else {
      if (!cache[id]) {
        cache[id] = new Manager(source, opts);
      }

      io = cache[id];
    }

    if (parsed.query && !opts.query) {
      opts.query = parsed.queryKey;
    }

    return io.socket(parsed.path, opts);
  } // so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
  // namespace (e.g. `io.connect(...)`), for backward compatibility


  Object.assign(lookup, {
    Manager: Manager,
    Socket: Socket,
    io: lookup,
    connect: lookup
  });

  lookup();
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

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvcGFyc2V1cmkvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vdXJsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy1jb3JzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2dsb2JhbFRoaXMuYnJvd3Nlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3htbGh0dHByZXF1ZXN0LmJyb3dzZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ac29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2NvbW1vbnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vZW5jb2RlUGFja2V0LmJyb3dzZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFzZTY0LWFycmF5YnVmZmVyL2Rpc3QvYmFzZTY0LWFycmF5YnVmZmVyLmVzNS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9kZWNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMveWVhc3QvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvcGFyc2Vxcy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3BvbGxpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5icm93c2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtL2lzLWJpbmFyeS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2J1aWxkL2VzbS9iaW5hcnkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhY2tvMi9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9tYW5hZ2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL2luZGV4LmpzIiwiLi4vLi4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBhcnNlcyBhbiBVUklcbiAqXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcblxudmFyIHBhcnRzID0gW1xuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpIHtcbiAgICB2YXIgc3JjID0gc3RyLFxuICAgICAgICBiID0gc3RyLmluZGV4T2YoJ1snKSxcbiAgICAgICAgZSA9IHN0ci5pbmRleE9mKCddJyk7XG5cbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJyksXG4gICAgICAgIHVyaSA9IHt9LFxuICAgICAgICBpID0gMTQ7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cblxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcbiAgICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdC5zdWJzdHJpbmcoMSwgdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXJpLnBhdGhOYW1lcyA9IHBhdGhOYW1lcyh1cmksIHVyaVsncGF0aCddKTtcbiAgICB1cmkucXVlcnlLZXkgPSBxdWVyeUtleSh1cmksIHVyaVsncXVlcnknXSk7XG5cbiAgICByZXR1cm4gdXJpO1xufTtcblxuZnVuY3Rpb24gcGF0aE5hbWVzKG9iaiwgcGF0aCkge1xuICAgIHZhciByZWd4ID0gL1xcL3syLDl9L2csXG4gICAgICAgIG5hbWVzID0gcGF0aC5yZXBsYWNlKHJlZ3gsIFwiL1wiKS5zcGxpdChcIi9cIik7XG5cbiAgICBpZiAocGF0aC5zdWJzdHIoMCwgMSkgPT0gJy8nIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZSgwLCAxKTtcbiAgICB9XG4gICAgaWYgKHBhdGguc3Vic3RyKHBhdGgubGVuZ3RoIC0gMSwgMSkgPT0gJy8nKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZShuYW1lcy5sZW5ndGggLSAxLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZXM7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5S2V5KHVyaSwgcXVlcnkpIHtcbiAgICB2YXIgZGF0YSA9IHt9O1xuXG4gICAgcXVlcnkucmVwbGFjZSgvKD86XnwmKShbXiY9XSopPT8oW14mXSopL2csIGZ1bmN0aW9uICgkMCwgJDEsICQyKSB7XG4gICAgICAgIGlmICgkMSkge1xuICAgICAgICAgICAgZGF0YVskMV0gPSAkMjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJpbXBvcnQgcGFyc2V1cmkgZnJvbSBcInBhcnNldXJpXCI7XG4vKipcbiAqIFVSTCBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHVyaSAtIHVybFxuICogQHBhcmFtIHBhdGggLSB0aGUgcmVxdWVzdCBwYXRoIG9mIHRoZSBjb25uZWN0aW9uXG4gKiBAcGFyYW0gbG9jIC0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cbiAqICAgICAgICBEZWZhdWx0cyB0byB3aW5kb3cubG9jYXRpb24uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cmwodXJpLCBwYXRoID0gXCJcIiwgbG9jKSB7XG4gICAgbGV0IG9iaiA9IHVyaTtcbiAgICAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxuICAgIGxvYyA9IGxvYyB8fCAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIGxvY2F0aW9uKTtcbiAgICBpZiAobnVsbCA9PSB1cmkpXG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIFwiLy9cIiArIGxvYy5ob3N0O1xuICAgIC8vIHJlbGF0aXZlIHBhdGggc3VwcG9ydFxuICAgIGlmICh0eXBlb2YgdXJpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChcIi9cIiA9PT0gdXJpLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgaWYgKFwiL1wiID09PSB1cmkuY2hhckF0KDEpKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLmhvc3QgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvXihodHRwcz98d3NzPyk6XFwvXFwvLy50ZXN0KHVyaSkpIHtcbiAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgbG9jKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgXCIvL1wiICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJpID0gXCJodHRwczovL1wiICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHBhcnNlXG4gICAgICAgIG9iaiA9IHBhcnNldXJpKHVyaSk7XG4gICAgfVxuICAgIC8vIG1ha2Ugc3VyZSB3ZSB0cmVhdCBgbG9jYWxob3N0OjgwYCBhbmQgYGxvY2FsaG9zdGAgZXF1YWxseVxuICAgIGlmICghb2JqLnBvcnQpIHtcbiAgICAgICAgaWYgKC9eKGh0dHB8d3MpJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICAgICAgICBvYmoucG9ydCA9IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgvXihodHRwfHdzKXMkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgICAgICAgIG9iai5wb3J0ID0gXCI0NDNcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvYmoucGF0aCA9IG9iai5wYXRoIHx8IFwiL1wiO1xuICAgIGNvbnN0IGlwdjYgPSBvYmouaG9zdC5pbmRleE9mKFwiOlwiKSAhPT0gLTE7XG4gICAgY29uc3QgaG9zdCA9IGlwdjYgPyBcIltcIiArIG9iai5ob3N0ICsgXCJdXCIgOiBvYmouaG9zdDtcbiAgICAvLyBkZWZpbmUgdW5pcXVlIGlkXG4gICAgb2JqLmlkID0gb2JqLnByb3RvY29sICsgXCI6Ly9cIiArIGhvc3QgKyBcIjpcIiArIG9iai5wb3J0ICsgcGF0aDtcbiAgICAvLyBkZWZpbmUgaHJlZlxuICAgIG9iai5ocmVmID1cbiAgICAgICAgb2JqLnByb3RvY29sICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgaG9zdCArXG4gICAgICAgICAgICAobG9jICYmIGxvYy5wb3J0ID09PSBvYmoucG9ydCA/IFwiXCIgOiBcIjpcIiArIG9iai5wb3J0KTtcbiAgICByZXR1cm4gb2JqO1xufVxuIiwiXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICpcbiAqIExvZ2ljIGJvcnJvd2VkIGZyb20gTW9kZXJuaXpyOlxuICpcbiAqICAgLSBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvY29ycy5qc1xuICovXG5cbnRyeSB7XG4gIG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufSBjYXRjaCAoZXJyKSB7XG4gIC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbiAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG4gIG1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG59XG4iLCJleHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgICB9XG59KSgpO1xuIiwiLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcbmltcG9ydCBoYXNDT1JTIGZyb20gXCJoYXMtY29yc1wiO1xuaW1wb3J0IGdsb2JhbFRoaXMgZnJvbSBcIi4uL2dsb2JhbFRoaXMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgY29uc3QgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcbiAgICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgICB0cnkge1xuICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7IH1cbiAgICBpZiAoIXhkb21haW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgZ2xvYmFsVGhpc1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXShcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICB9XG59XG4iLCJpbXBvcnQgZ2xvYmFsVGhpcyBmcm9tIFwiLi9nbG9iYWxUaGlzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gcGljayhvYmosIC4uLmF0dHIpIHtcbiAgICByZXR1cm4gYXR0ci5yZWR1Y2UoKGFjYywgaykgPT4ge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBhY2Nba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4vLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSByZWFsIHRpbWVvdXQgZnVuY3Rpb25zIHNvIHRoZXkgY2FuIGJlIHVzZWQgd2hlbiBvdmVycmlkZGVuXG5jb25zdCBOQVRJVkVfU0VUX1RJTUVPVVQgPSBzZXRUaW1lb3V0O1xuY29uc3QgTkFUSVZFX0NMRUFSX1RJTUVPVVQgPSBjbGVhclRpbWVvdXQ7XG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbFRpbWVyRnVuY3Rpb25zKG9iaiwgb3B0cykge1xuICAgIGlmIChvcHRzLnVzZU5hdGl2ZVRpbWVycykge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gTkFUSVZFX1NFVF9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgICAgIG9iai5jbGVhclRpbWVvdXRGbiA9IE5BVElWRV9DTEVBUl9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gc2V0VGltZW91dC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgICAgICBvYmouY2xlYXJUaW1lb3V0Rm4gPSBjbGVhclRpbWVvdXQuYmluZChnbG9iYWxUaGlzKTtcbiAgICB9XG59XG4iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5leHBvcnRzLkVtaXR0ZXIgPSBFbWl0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGV2ZW50IHNwZWNpZmljIGFycmF5cyBmb3IgZXZlbnQgdHlwZXMgdGhhdCBub1xuICAvLyBvbmUgaXMgc3Vic2NyaWJlZCBmb3IgdG8gYXZvaWQgbWVtb3J5IGxlYWsuXG4gIGlmIChjYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICB9XG5cbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBhbGlhcyB1c2VkIGZvciByZXNlcnZlZCBldmVudHMgKHByb3RlY3RlZCBtZXRob2QpXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0UmVzZXJ2ZWQgPSBFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4vKipcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xufTtcbiIsImNvbnN0IFBBQ0tFVF9UWVBFUyA9IE9iamVjdC5jcmVhdGUobnVsbCk7IC8vIG5vIE1hcCA9IG5vIHBvbHlmaWxsXG5QQUNLRVRfVFlQRVNbXCJvcGVuXCJdID0gXCIwXCI7XG5QQUNLRVRfVFlQRVNbXCJjbG9zZVwiXSA9IFwiMVwiO1xuUEFDS0VUX1RZUEVTW1wicGluZ1wiXSA9IFwiMlwiO1xuUEFDS0VUX1RZUEVTW1wicG9uZ1wiXSA9IFwiM1wiO1xuUEFDS0VUX1RZUEVTW1wibWVzc2FnZVwiXSA9IFwiNFwiO1xuUEFDS0VUX1RZUEVTW1widXBncmFkZVwiXSA9IFwiNVwiO1xuUEFDS0VUX1RZUEVTW1wibm9vcFwiXSA9IFwiNlwiO1xuY29uc3QgUEFDS0VUX1RZUEVTX1JFVkVSU0UgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuT2JqZWN0LmtleXMoUEFDS0VUX1RZUEVTKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgUEFDS0VUX1RZUEVTX1JFVkVSU0VbUEFDS0VUX1RZUEVTW2tleV1dID0ga2V5O1xufSk7XG5jb25zdCBFUlJPUl9QQUNLRVQgPSB7IHR5cGU6IFwiZXJyb3JcIiwgZGF0YTogXCJwYXJzZXIgZXJyb3JcIiB9O1xuZXhwb3J0IHsgUEFDS0VUX1RZUEVTLCBQQUNLRVRfVFlQRVNfUkVWRVJTRSwgRVJST1JfUEFDS0VUIH07XG4iLCJpbXBvcnQgeyBQQUNLRVRfVFlQRVMgfSBmcm9tIFwiLi9jb21tb25zLmpzXCI7XG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKEJsb2IpID09PSBcIltvYmplY3QgQmxvYkNvbnN0cnVjdG9yXVwiKTtcbmNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuLy8gQXJyYXlCdWZmZXIuaXNWaWV3IG1ldGhvZCBpcyBub3QgZGVmaW5lZCBpbiBJRTEwXG5jb25zdCBpc1ZpZXcgPSBvYmogPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iaiAmJiBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59O1xuY29uc3QgZW5jb2RlUGFja2V0ID0gKHsgdHlwZSwgZGF0YSB9LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spID0+IHtcbiAgICBpZiAod2l0aE5hdGl2ZUJsb2IgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYkFzQmFzZTY0KGRhdGEsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiZcbiAgICAgICAgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcoZGF0YSkpKSB7XG4gICAgICAgIGlmIChzdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZUJsb2JBc0Jhc2U2NChuZXcgQmxvYihbZGF0YV0pLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcGxhaW4gc3RyaW5nXG4gICAgcmV0dXJuIGNhbGxiYWNrKFBBQ0tFVF9UWVBFU1t0eXBlXSArIChkYXRhIHx8IFwiXCIpKTtcbn07XG5jb25zdCBlbmNvZGVCbG9iQXNCYXNlNjQgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGZpbGVSZWFkZXIucmVzdWx0LnNwbGl0KFwiLFwiKVsxXTtcbiAgICAgICAgY2FsbGJhY2soXCJiXCIgKyBjb250ZW50KTtcbiAgICB9O1xuICAgIHJldHVybiBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZGF0YSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZW5jb2RlUGFja2V0O1xuIiwiLypcbiAqIGJhc2U2NC1hcnJheWJ1ZmZlciAxLjAuMSA8aHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlcj5cbiAqIENvcHlyaWdodCAoYykgMjAyMSBOaWtsYXMgdm9uIEhlcnR6ZW4gPGh0dHBzOi8vaGVydHplbi5jb20+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgTGljZW5zZVxuICovXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG4vLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguXG52YXIgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG59XG52YXIgZW5jb2RlID0gZnVuY3Rpb24gKGFycmF5YnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykge1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107XG4gICAgfVxuICAgIGlmIChsZW4gJSAzID09PSAyKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nO1xuICAgIH1cbiAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JztcbiAgICB9XG4gICAgcmV0dXJuIGJhc2U2NDtcbn07XG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKGJhc2U2NCkge1xuICAgIHZhciBidWZmZXJMZW5ndGggPSBiYXNlNjQubGVuZ3RoICogMC43NSwgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSAnPScpIHtcbiAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSAnPScpIHtcbiAgICAgICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICAgICAgZW5jb2RlZDEgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSldO1xuICAgICAgICBlbmNvZGVkMiA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMSldO1xuICAgICAgICBlbmNvZGVkMyA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMildO1xuICAgICAgICBlbmNvZGVkNCA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMyldO1xuICAgICAgICBieXRlc1twKytdID0gKGVuY29kZWQxIDw8IDIpIHwgKGVuY29kZWQyID4+IDQpO1xuICAgICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMiAmIDE1KSA8PCA0KSB8IChlbmNvZGVkMyA+PiAyKTtcbiAgICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDMgJiAzKSA8PCA2KSB8IChlbmNvZGVkNCAmIDYzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5YnVmZmVyO1xufTtcblxuZXhwb3J0IHsgZGVjb2RlLCBlbmNvZGUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2U2NC1hcnJheWJ1ZmZlci5lczUuanMubWFwXG4iLCJpbXBvcnQgeyBFUlJPUl9QQUNLRVQsIFBBQ0tFVF9UWVBFU19SRVZFUlNFIH0gZnJvbSBcIi4vY29tbW9ucy5qc1wiO1xuaW1wb3J0IHsgZGVjb2RlIH0gZnJvbSBcImJhc2U2NC1hcnJheWJ1ZmZlclwiO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBkZWNvZGVQYWNrZXQgPSAoZW5jb2RlZFBhY2tldCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZW5jb2RlZFBhY2tldCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICBkYXRhOiBtYXBCaW5hcnkoZW5jb2RlZFBhY2tldCwgYmluYXJ5VHlwZSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGVuY29kZWRQYWNrZXQuY2hhckF0KDApO1xuICAgIGlmICh0eXBlID09PSBcImJcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICBkYXRhOiBkZWNvZGVCYXNlNjRQYWNrZXQoZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSksIGJpbmFyeVR5cGUpXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHBhY2tldFR5cGUgPSBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXTtcbiAgICBpZiAoIXBhY2tldFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIEVSUk9SX1BBQ0tFVDtcbiAgICB9XG4gICAgcmV0dXJuIGVuY29kZWRQYWNrZXQubGVuZ3RoID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdLFxuICAgICAgICAgICAgZGF0YTogZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSlcbiAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdXG4gICAgICAgIH07XG59O1xuY29uc3QgZGVjb2RlQmFzZTY0UGFja2V0ID0gKGRhdGEsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBpZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyKSB7XG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSBkZWNvZGUoZGF0YSk7XG4gICAgICAgIHJldHVybiBtYXBCaW5hcnkoZGVjb2RlZCwgYmluYXJ5VHlwZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4geyBiYXNlNjQ6IHRydWUsIGRhdGEgfTsgLy8gZmFsbGJhY2sgZm9yIG9sZCBicm93c2Vyc1xuICAgIH1cbn07XG5jb25zdCBtYXBCaW5hcnkgPSAoZGF0YSwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIHN3aXRjaCAoYmluYXJ5VHlwZSkge1xuICAgICAgICBjYXNlIFwiYmxvYlwiOlxuICAgICAgICAgICAgcmV0dXJuIGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciA/IG5ldyBCbG9iKFtkYXRhXSkgOiBkYXRhO1xuICAgICAgICBjYXNlIFwiYXJyYXlidWZmZXJcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBkYXRhOyAvLyBhc3N1bWluZyB0aGUgZGF0YSBpcyBhbHJlYWR5IGFuIEFycmF5QnVmZmVyXG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGRlY29kZVBhY2tldDtcbiIsImltcG9ydCBlbmNvZGVQYWNrZXQgZnJvbSBcIi4vZW5jb2RlUGFja2V0LmpzXCI7XG5pbXBvcnQgZGVjb2RlUGFja2V0IGZyb20gXCIuL2RlY29kZVBhY2tldC5qc1wiO1xuY29uc3QgU0VQQVJBVE9SID0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMCk7IC8vIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZWxpbWl0ZXIjQVNDSUlfZGVsaW1pdGVkX3RleHRcbmNvbnN0IGVuY29kZVBheWxvYWQgPSAocGFja2V0cywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzb21lIHBhY2tldHMgbWF5IGJlIGFkZGVkIHRvIHRoZSBhcnJheSB3aGlsZSBlbmNvZGluZywgc28gdGhlIGluaXRpYWwgbGVuZ3RoIG11c3QgYmUgc2F2ZWRcbiAgICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcGFja2V0cy5mb3JFYWNoKChwYWNrZXQsIGkpID0+IHtcbiAgICAgICAgLy8gZm9yY2UgYmFzZTY0IGVuY29kaW5nIGZvciBiaW5hcnkgcGFja2V0c1xuICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgZW5jb2RlZFBhY2tldCA9PiB7XG4gICAgICAgICAgICBlbmNvZGVkUGFja2V0c1tpXSA9IGVuY29kZWRQYWNrZXQ7XG4gICAgICAgICAgICBpZiAoKytjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZW5jb2RlZFBhY2tldHMuam9pbihTRVBBUkFUT1IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgZGVjb2RlUGF5bG9hZCA9IChlbmNvZGVkUGF5bG9hZCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gZW5jb2RlZFBheWxvYWQuc3BsaXQoU0VQQVJBVE9SKTtcbiAgICBjb25zdCBwYWNrZXRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZWNvZGVkUGFja2V0ID0gZGVjb2RlUGFja2V0KGVuY29kZWRQYWNrZXRzW2ldLCBiaW5hcnlUeXBlKTtcbiAgICAgICAgcGFja2V0cy5wdXNoKGRlY29kZWRQYWNrZXQpO1xuICAgICAgICBpZiAoZGVjb2RlZFBhY2tldC50eXBlID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYWNrZXRzO1xufTtcbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDQ7XG5leHBvcnQgeyBlbmNvZGVQYWNrZXQsIGVuY29kZVBheWxvYWQsIGRlY29kZVBhY2tldCwgZGVjb2RlUGF5bG9hZCB9O1xuIiwiaW1wb3J0IHsgZGVjb2RlUGFja2V0IH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuaW1wb3J0IHsgaW5zdGFsbFRpbWVyRnVuY3Rpb25zIH0gZnJvbSBcIi4vdXRpbC5qc1wiO1xuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydCBleHRlbmRzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLnNvY2tldCA9IG9wdHMuc29ja2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xuICAgICAqIEBhcGkgcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25FcnJvcihtc2csIGRlc2MpIHtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZXJyLnR5cGUgPSBcIlRyYW5zcG9ydEVycm9yXCI7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZXJyLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICAgICAgc3VwZXIuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBvcGVuKCkge1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwiXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuaW5nXCI7XG4gICAgICAgICAgICB0aGlzLmRvT3BlbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIHRyYW5zcG9ydC5cbiAgICAgKlxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZG9DbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBzZW5kKHBhY2tldHMpIHtcbiAgICAgICAgaWYgKFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGUocGFja2V0cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIG1pZ2h0IGhhcHBlbiBpZiB0aGUgdHJhbnNwb3J0IHdhcyBzaWxlbnRseSBjbG9zZWQgaW4gdGhlIGJlZm9yZXVubG9hZCBldmVudCBoYW5kbGVyXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gb3BlblxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlblwiO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgc3VwZXIuZW1pdChcIm9wZW5cIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICAgICAqIEBhcGkgcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25EYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcGFja2V0ID0gZGVjb2RlUGFja2V0KGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO1xuICAgICAgICB0aGlzLm9uUGFja2V0KHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIGEgZGVjb2RlZCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uUGFja2V0KHBhY2tldCkge1xuICAgICAgICBzdXBlci5lbWl0KFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICBzdXBlci5lbWl0KFwiY2xvc2VcIik7XG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpXG4gICwgbGVuZ3RoID0gNjRcbiAgLCBtYXAgPSB7fVxuICAsIHNlZWQgPSAwXG4gICwgaSA9IDBcbiAgLCBwcmV2O1xuXG4vKipcbiAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBlbmNvZGUobnVtKSB7XG4gIHZhciBlbmNvZGVkID0gJyc7XG5cbiAgZG8ge1xuICAgIGVuY29kZWQgPSBhbHBoYWJldFtudW0gJSBsZW5ndGhdICsgZW5jb2RlZDtcbiAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gIH0gd2hpbGUgKG51bSA+IDApO1xuXG4gIHJldHVybiBlbmNvZGVkO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gIHZhciBkZWNvZGVkID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVjb2RlZCA9IGRlY29kZWQgKiBsZW5ndGggKyBtYXBbc3RyLmNoYXJBdChpKV07XG4gIH1cblxuICByZXR1cm4gZGVjb2RlZDtcbn1cblxuLyoqXG4gKiBZZWFzdDogQSB0aW55IGdyb3dpbmcgaWQgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24geWVhc3QoKSB7XG4gIHZhciBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuXG4gIGlmIChub3cgIT09IHByZXYpIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgcmV0dXJuIG5vdyArJy4nKyBlbmNvZGUoc2VlZCsrKTtcbn1cblxuLy9cbi8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4vL1xuZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgbWFwW2FscGhhYmV0W2ldXSA9IGk7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4vL1xueWVhc3QuZW5jb2RlID0gZW5jb2RlO1xueWVhc3QuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMgPSB5ZWFzdDtcbiIsIi8qKlxuICogQ29tcGlsZXMgYSBxdWVyeXN0cmluZ1xuICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBzdHIgPSAnJztcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIGlmIChzdHIubGVuZ3RoKSBzdHIgKz0gJyYnO1xuICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG4vKipcbiAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihxcyl7XG4gIHZhciBxcnkgPSB7fTtcbiAgdmFyIHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYWlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgcXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gIH1cbiAgcmV0dXJuIHFyeTtcbn07XG4iLCJpbXBvcnQgeyBUcmFuc3BvcnQgfSBmcm9tIFwiLi4vdHJhbnNwb3J0LmpzXCI7XG5pbXBvcnQgeWVhc3QgZnJvbSBcInllYXN0XCI7XG5pbXBvcnQgcGFyc2VxcyBmcm9tIFwicGFyc2Vxc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGF5bG9hZCwgZGVjb2RlUGF5bG9hZCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5leHBvcnQgY2xhc3MgUG9sbGluZyBleHRlbmRzIFRyYW5zcG9ydCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMucG9sbGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwicG9sbGluZ1wiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gICAgICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIHRoaXMucG9sbCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgcG9sbGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhdXNlKG9uUGF1c2UpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzaW5nXCI7XG4gICAgICAgIGNvbnN0IHBhdXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzZWRcIjtcbiAgICAgICAgICAgIG9uUGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcInBvbGxDb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBwb2xsKCkge1xuICAgICAgICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvUG9sbCgpO1xuICAgICAgICB0aGlzLmVtaXQoXCJwb2xsXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gcGFja2V0ID0+IHtcbiAgICAgICAgICAgIC8vIGlmIGl0cyB0aGUgZmlyc3QgbWVzc2FnZSB3ZSBjb25zaWRlciB0aGUgdHJhbnNwb3J0IG9wZW5cbiAgICAgICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmIHBhY2tldC50eXBlID09PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBpdHMgYSBjbG9zZSBwYWNrZXQsIHdlIGNsb3NlIHRoZSBvbmdvaW5nIHJlcXVlc3RzXG4gICAgICAgICAgICBpZiAoXCJjbG9zZVwiID09PSBwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBieXBhc3Mgb25EYXRhIGFuZCBoYW5kbGUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIHRoaXMub25QYWNrZXQocGFja2V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZGVjb2RlIHBheWxvYWRcbiAgICAgICAgZGVjb2RlUGF5bG9hZChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKS5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICAgICAgLy8gaWYgYW4gZXZlbnQgZGlkIG5vdCB0cmlnZ2VyIGNsb3NpbmdcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgIT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgLy8gaWYgd2UgZ290IGRhdGEgd2UncmUgbm90IHBvbGxpbmdcbiAgICAgICAgICAgIHRoaXMucG9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicG9sbENvbXBsZXRlXCIpO1xuICAgICAgICAgICAgaWYgKFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvciBwb2xsaW5nLCBzZW5kIGEgY2xvc2UgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZG9DbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndyaXRlKFt7IHR5cGU6IFwiY2xvc2VcIiB9XSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbiAgICAgICAgICAgIC8vIGhhbmRzaGFraW5nIGlzIGluIHByb2dyZXNzIChHSC0xNjQpXG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJvcGVuXCIsIGNsb3NlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYSBwYWNrZXRzIHBheWxvYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIHBhY2tldHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBkcmFpbiBjYWxsYmFja1xuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICBlbmNvZGVQYXlsb2FkKHBhY2tldHMsIGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb1dyaXRlKGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHVyaSgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5vcHRzLnNlY3VyZSA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgICAgICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICAgICAgICBpZiAodGhpcy5vcHRzLnBvcnQgJiZcbiAgICAgICAgICAgICgoXCJodHRwc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcImh0dHBcIiA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCkgIT09IDgwKSkpIHtcbiAgICAgICAgICAgIHBvcnQgPSBcIjpcIiArIHRoaXMub3B0cy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgaXB2NiA9IHRoaXMub3B0cy5ob3N0bmFtZS5pbmRleE9mKFwiOlwiKSAhPT0gLTE7XG4gICAgICAgIHJldHVybiAoc2NoZW1hICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgKGlwdjYgPyBcIltcIiArIHRoaXMub3B0cy5ob3N0bmFtZSArIFwiXVwiIDogdGhpcy5vcHRzLmhvc3RuYW1lKSArXG4gICAgICAgICAgICBwb3J0ICtcbiAgICAgICAgICAgIHRoaXMub3B0cy5wYXRoICtcbiAgICAgICAgICAgIChlbmNvZGVkUXVlcnkubGVuZ3RoID8gXCI/XCIgKyBlbmNvZGVkUXVlcnkgOiBcIlwiKSk7XG4gICAgfVxufVxuIiwiLyogZ2xvYmFsIGF0dGFjaEV2ZW50ICovXG5pbXBvcnQgWE1MSHR0cFJlcXVlc3QgZnJvbSBcIi4veG1saHR0cHJlcXVlc3QuanNcIjtcbmltcG9ydCBnbG9iYWxUaGlzIGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBQb2xsaW5nIH0gZnJvbSBcIi4vcG9sbGluZy5qc1wiO1xuLyoqXG4gKiBFbXB0eSBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBlbXB0eSgpIHsgfVxuY29uc3QgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHtcbiAgICAgICAgeGRvbWFpbjogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO1xufSkoKTtcbmV4cG9ydCBjbGFzcyBYSFIgZXh0ZW5kcyBQb2xsaW5nIHtcbiAgICAvKipcbiAgICAgKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjb25zdCBpc1NTTCA9IFwiaHR0cHM6XCIgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICAgICAgbGV0IHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuICAgICAgICAgICAgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuICAgICAgICAgICAgaWYgKCFwb3J0KSB7XG4gICAgICAgICAgICAgICAgcG9ydCA9IGlzU1NMID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueGQgPVxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICAgICAgICAgIHRoaXMueHMgPSBvcHRzLnNlY3VyZSAhPT0gaXNTU0w7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFhIUiBzdXBwb3J0cyBiaW5hcnlcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGZvcmNlQmFzZTY0ID0gb3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0O1xuICAgICAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gaGFzWEhSMiAmJiAhZm9yY2VCYXNlNjQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlcXVlc3Qob3B0cyA9IHt9KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3B0cywgeyB4ZDogdGhpcy54ZCwgeHM6IHRoaXMueHMgfSwgdGhpcy5vcHRzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMudXJpKCksIG9wdHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb1dyaXRlKGRhdGEsIGZuKSB7XG4gICAgICAgIGNvbnN0IHJlcSA9IHRoaXMucmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgcmVxLm9uKFwic3VjY2Vzc1wiLCBmbik7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9zdCBlcnJvclwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvUG9sbCgpIHtcbiAgICAgICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5vbihcImRhdGFcIiwgdGhpcy5vbkRhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9sbCBlcnJvclwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wb2xsWGhyID0gcmVxO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVyaSwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgXCJHRVRcIjtcbiAgICAgICAgdGhpcy51cmkgPSB1cmk7XG4gICAgICAgIHRoaXMuYXN5bmMgPSBmYWxzZSAhPT0gb3B0cy5hc3luYztcbiAgICAgICAgdGhpcy5kYXRhID0gdW5kZWZpbmVkICE9PSBvcHRzLmRhdGEgPyBvcHRzLmRhdGEgOiBudWxsO1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHBpY2sodGhpcy5vcHRzLCBcImFnZW50XCIsIFwicGZ4XCIsIFwia2V5XCIsIFwicGFzc3BocmFzZVwiLCBcImNlcnRcIiwgXCJjYVwiLCBcImNpcGhlcnNcIiwgXCJyZWplY3RVbmF1dGhvcml6ZWRcIiwgXCJhdXRvVW5yZWZcIik7XG4gICAgICAgIG9wdHMueGRvbWFpbiA9ICEhdGhpcy5vcHRzLnhkO1xuICAgICAgICBvcHRzLnhzY2hlbWUgPSAhIXRoaXMub3B0cy54cztcbiAgICAgICAgY29uc3QgeGhyID0gKHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVyaSwgdGhpcy5hc3luYyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sgJiYgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGksIHRoaXMub3B0cy5leHRyYUhlYWRlcnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgaWYgKFwiUE9TVFwiID09PSB0aGlzLm1ldGhvZCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiKi8qXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgLy8gaWU2IGNoZWNrXG4gICAgICAgICAgICBpZiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdGhpcy5vcHRzLndpdGhDcmVkZW50aWFscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucmVxdWVzdFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB4aHIudGltZW91dCA9IHRoaXMub3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKDQgIT09IHhoci5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKDIwMCA9PT0geGhyLnN0YXR1cyB8fCAxMjIzID09PSB4aHIuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGBlcnJvcmAgZXZlbnQgaGFuZGxlciB0aGF0J3MgdXNlci1zZXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9lcyBub3QgdGhyb3cgaW4gdGhlIHNhbWUgdGljayBhbmQgZ2V0cyBjYXVnaHQgaGVyZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IodHlwZW9mIHhoci5zdGF0dXMgPT09IFwibnVtYmVyXCIgPyB4aHIuc3RhdHVzIDogMCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBOZWVkIHRvIGRlZmVyIHNpbmNlIC5jcmVhdGUoKSBpcyBjYWxsZWQgZGlyZWN0bHkgZnJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgICAgIC8vIGFuZCB0aHVzIHRoZSAnZXJyb3InIGV2ZW50IGNhbiBvbmx5IGJlIG9ubHkgYm91bmQgKmFmdGVyKiB0aGlzIGV4Y2VwdGlvblxuICAgICAgICAgICAgLy8gb2NjdXJzLiAgVGhlcmVmb3JlLCBhbHNvLCB3ZSBjYW5ub3QgdGhyb3cgaGVyZSBhdCBhbGwuXG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKGUpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IFJlcXVlc3QucmVxdWVzdHNDb3VudCsrO1xuICAgICAgICAgICAgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uU3VjY2VzcygpIHtcbiAgICAgICAgdGhpcy5lbWl0KFwic3VjY2Vzc1wiKTtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCBpZiB3ZSBoYXZlIGRhdGEuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkRhdGEoZGF0YSkge1xuICAgICAgICB0aGlzLmVtaXQoXCJkYXRhXCIsIGRhdGEpO1xuICAgICAgICB0aGlzLm9uU3VjY2VzcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHRoaXMuY2xlYW51cCh0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGhvdXNlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgY2xlYW51cChmcm9tRXJyb3IpIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICAgICAgICBpZiAoZnJvbUVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBsb2FkLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGEoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBhYm9ydCgpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxufVxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodHlwZW9mIGF0dGFjaEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhdHRhY2hFdmVudChcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IHRlcm1pbmF0aW9uRXZlbnQgPSBcIm9ucGFnZWhpZGVcIiBpbiBnbG9iYWxUaGlzID8gXCJwYWdlaGlkZVwiIDogXCJ1bmxvYWRcIjtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0ZXJtaW5hdGlvbkV2ZW50LCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgICBmb3IgKGxldCBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICAgICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBnbG9iYWxUaGlzIGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5leHBvcnQgY29uc3QgbmV4dFRpY2sgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGlzUHJvbWlzZUF2YWlsYWJsZSA9IHR5cGVvZiBQcm9taXNlID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFByb21pc2UucmVzb2x2ZSA9PT0gXCJmdW5jdGlvblwiO1xuICAgIGlmIChpc1Byb21pc2VBdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIGNiID0+IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oY2IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChjYiwgc2V0VGltZW91dEZuKSA9PiBzZXRUaW1lb3V0Rm4oY2IsIDApO1xuICAgIH1cbn0pKCk7XG5leHBvcnQgY29uc3QgV2ViU29ja2V0ID0gZ2xvYmFsVGhpcy5XZWJTb2NrZXQgfHwgZ2xvYmFsVGhpcy5Nb3pXZWJTb2NrZXQ7XG5leHBvcnQgY29uc3QgdXNpbmdCcm93c2VyV2ViU29ja2V0ID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0QmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiIsImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCBwYXJzZXFzIGZyb20gXCJwYXJzZXFzXCI7XG5pbXBvcnQgeWVhc3QgZnJvbSBcInllYXN0XCI7XG5pbXBvcnQgeyBwaWNrIH0gZnJvbSBcIi4uL3V0aWwuanNcIjtcbmltcG9ydCB7IGRlZmF1bHRCaW5hcnlUeXBlLCBuZXh0VGljaywgdXNpbmdCcm93c2VyV2ViU29ja2V0LCBXZWJTb2NrZXQgfSBmcm9tIFwiLi93ZWJzb2NrZXQtY29uc3RydWN0b3IuanNcIjtcbmltcG9ydCB7IGVuY29kZVBhY2tldCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG4vLyBkZXRlY3QgUmVhY3ROYXRpdmUgZW52aXJvbm1lbnRcbmNvbnN0IGlzUmVhY3ROYXRpdmUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgdHlwZW9mIG5hdmlnYXRvci5wcm9kdWN0ID09PSBcInN0cmluZ1wiICYmXG4gICAgbmF2aWdhdG9yLnByb2R1Y3QudG9Mb3dlckNhc2UoKSA9PT0gXCJyZWFjdG5hdGl2ZVwiO1xuZXhwb3J0IGNsYXNzIFdTIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICAvKipcbiAgICAgKiBXZWJTb2NrZXQgdHJhbnNwb3J0IGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQGFwaSB7T2JqZWN0fSBjb25uZWN0aW9uIG9wdGlvbnNcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cyk7XG4gICAgICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSAhb3B0cy5mb3JjZUJhc2U2NDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNwb3J0IG5hbWUuXG4gICAgICpcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJ3ZWJzb2NrZXRcIjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlbnMgc29ja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZG9PcGVuKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2soKSkge1xuICAgICAgICAgICAgLy8gbGV0IHByb2JlIHRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmkgPSB0aGlzLnVyaSgpO1xuICAgICAgICBjb25zdCBwcm90b2NvbHMgPSB0aGlzLm9wdHMucHJvdG9jb2xzO1xuICAgICAgICAvLyBSZWFjdCBOYXRpdmUgb25seSBzdXBwb3J0cyB0aGUgJ2hlYWRlcnMnIG9wdGlvbiwgYW5kIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIGFueXRoaW5nIGVsc2UgaXMgcGFzc2VkXG4gICAgICAgIGNvbnN0IG9wdHMgPSBpc1JlYWN0TmF0aXZlXG4gICAgICAgICAgICA/IHt9XG4gICAgICAgICAgICA6IHBpY2sodGhpcy5vcHRzLCBcImFnZW50XCIsIFwicGVyTWVzc2FnZURlZmxhdGVcIiwgXCJwZnhcIiwgXCJrZXlcIiwgXCJwYXNzcGhyYXNlXCIsIFwiY2VydFwiLCBcImNhXCIsIFwiY2lwaGVyc1wiLCBcInJlamVjdFVuYXV0aG9yaXplZFwiLCBcImxvY2FsQWRkcmVzc1wiLCBcInByb3RvY29sVmVyc2lvblwiLCBcIm9yaWdpblwiLCBcIm1heFBheWxvYWRcIiwgXCJmYW1pbHlcIiwgXCJjaGVja1NlcnZlcklkZW50aXR5XCIpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgb3B0cy5oZWFkZXJzID0gdGhpcy5vcHRzLmV4dHJhSGVhZGVycztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy53cyA9XG4gICAgICAgICAgICAgICAgdXNpbmdCcm93c2VyV2ViU29ja2V0ICYmICFpc1JlYWN0TmF0aXZlXG4gICAgICAgICAgICAgICAgICAgID8gcHJvdG9jb2xzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBXZWJTb2NrZXQodXJpKVxuICAgICAgICAgICAgICAgICAgICA6IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3MuYmluYXJ5VHlwZSA9IHRoaXMuc29ja2V0LmJpbmFyeVR5cGUgfHwgZGVmYXVsdEJpbmFyeVR5cGU7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHNvY2tldFxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndzLl9zb2NrZXQudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IGV2ID0+IHRoaXMub25EYXRhKGV2LmRhdGEpO1xuICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSBlID0+IHRoaXMub25FcnJvcihcIndlYnNvY2tldCBlcnJvclwiLCBlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgb2YgcGFja2V0cy5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB3cml0ZShwYWNrZXRzKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLy8gZW5jb2RlUGFja2V0IGVmZmljaWVudCBhcyBpdCB1c2VzIFdTIGZyYW1pbmdcbiAgICAgICAgLy8gbm8gbmVlZCBmb3IgZW5jb2RlUGF5bG9hZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldCA9IHBhY2tldHNbaV07XG4gICAgICAgICAgICBjb25zdCBsYXN0UGFja2V0ID0gaSA9PT0gcGFja2V0cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgZW5jb2RlUGFja2V0KHBhY2tldCwgdGhpcy5zdXBwb3J0c0JpbmFyeSwgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gYWx3YXlzIGNyZWF0ZSBhIG5ldyBvYmplY3QgKEdILTQzNylcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRzID0ge307XG4gICAgICAgICAgICAgICAgaWYgKCF1c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhY2tldC5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuID0gXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGRhdGEgPyBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKSA6IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA8IHRoaXMub3B0cy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU29tZXRpbWVzIHRoZSB3ZWJzb2NrZXQgaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQgYnV0IHRoZSBicm93c2VyIGRpZG4ndFxuICAgICAgICAgICAgICAgIC8vIGhhdmUgYSBjaGFuY2Ugb2YgaW5mb3JtaW5nIHVzIGFib3V0IGl0IHlldCwgaW4gdGhhdCBjYXNlIHNlbmQgd2lsbFxuICAgICAgICAgICAgICAgIC8vIHRocm93IGFuIGVycm9yXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZUVycm9yIGlzIHRocm93biB3aGVuIHBhc3NpbmcgdGhlIHNlY29uZCBhcmd1bWVudCBvbiBTYWZhcmlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZChkYXRhLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGFzdFBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmYWtlIGRyYWluXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXRUaW1lb3V0Rm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb0Nsb3NlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMud3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMud3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcIndzc1wiIDogXCJ3c1wiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gICAgICAgIGlmICh0aGlzLm9wdHMucG9ydCAmJlxuICAgICAgICAgICAgKChcIndzc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcIndzXCIgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgICAgICAgICBwb3J0ID0gXCI6XCIgKyB0aGlzLm9wdHMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgaXB2NiA9IHRoaXMub3B0cy5ob3N0bmFtZS5pbmRleE9mKFwiOlwiKSAhPT0gLTE7XG4gICAgICAgIHJldHVybiAoc2NoZW1hICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgKGlwdjYgPyBcIltcIiArIHRoaXMub3B0cy5ob3N0bmFtZSArIFwiXVwiIDogdGhpcy5vcHRzLmhvc3RuYW1lKSArXG4gICAgICAgICAgICBwb3J0ICtcbiAgICAgICAgICAgIHRoaXMub3B0cy5wYXRoICtcbiAgICAgICAgICAgIChlbmNvZGVkUXVlcnkubGVuZ3RoID8gXCI/XCIgKyBlbmNvZGVkUXVlcnkgOiBcIlwiKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZlYXR1cmUgZGV0ZWN0aW9uIGZvciBXZWJTb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIHRoaXMgdHJhbnNwb3J0IGlzIGF2YWlsYWJsZS5cbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGNoZWNrKCkge1xuICAgICAgICByZXR1cm4gKCEhV2ViU29ja2V0ICYmXG4gICAgICAgICAgICAhKFwiX19pbml0aWFsaXplXCIgaW4gV2ViU29ja2V0ICYmIHRoaXMubmFtZSA9PT0gV1MucHJvdG90eXBlLm5hbWUpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBYSFIgfSBmcm9tIFwiLi9wb2xsaW5nLXhoci5qc1wiO1xuaW1wb3J0IHsgV1MgfSBmcm9tIFwiLi93ZWJzb2NrZXQuanNcIjtcbmV4cG9ydCBjb25zdCB0cmFuc3BvcnRzID0ge1xuICAgIHdlYnNvY2tldDogV1MsXG4gICAgcG9sbGluZzogWEhSXG59O1xuIiwiaW1wb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucyB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCBwYXJzZXFzIGZyb20gXCJwYXJzZXFzXCI7XG5pbXBvcnQgcGFyc2V1cmkgZnJvbSBcInBhcnNldXJpXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IHByb3RvY29sIH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmkpIHtcbiAgICAgICAgICAgIHVyaSA9IHBhcnNldXJpKHVyaSk7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gdXJpLmhvc3Q7XG4gICAgICAgICAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gXCJodHRwc1wiIHx8IHVyaS5wcm90b2NvbCA9PT0gXCJ3c3NcIjtcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgICAgICAgICAgaWYgKHVyaS5xdWVyeSlcbiAgICAgICAgICAgICAgICBvcHRzLnF1ZXJ5ID0gdXJpLnF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdHMuaG9zdCkge1xuICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNldXJpKG9wdHMuaG9zdCkuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMuc2VjdXJlID1cbiAgICAgICAgICAgIG51bGwgIT0gb3B0cy5zZWN1cmVcbiAgICAgICAgICAgICAgICA/IG9wdHMuc2VjdXJlXG4gICAgICAgICAgICAgICAgOiB0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3RuYW1lID1cbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiID8gbG9jYXRpb24uaG9zdG5hbWUgOiBcImxvY2FsaG9zdFwiKTtcbiAgICAgICAgdGhpcy5wb3J0ID1cbiAgICAgICAgICAgIG9wdHMucG9ydCB8fFxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24ucG9ydFxuICAgICAgICAgICAgICAgICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNlY3VyZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIjQ0M1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiODBcIik7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbXCJwb2xsaW5nXCIsIFwid2Vic29ja2V0XCJdO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcGF0aDogXCIvZW5naW5lLmlvXCIsXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgdXBncmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcFBhcmFtOiBcInRcIixcbiAgICAgICAgICAgIHJlbWVtYmVyVXBncmFkZTogZmFsc2UsXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZToge1xuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMTAyNFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zcG9ydE9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgY2xvc2VPbkJlZm9yZXVubG9hZDogdHJ1ZVxuICAgICAgICB9LCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzLnBhdGggPSB0aGlzLm9wdHMucGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgKyBcIi9cIjtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMucXVlcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0cy5xdWVyeSA9IHBhcnNlcXMuZGVjb2RlKHRoaXMub3B0cy5xdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IG9uIGhhbmRzaGFrZVxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgdGhpcy51cGdyYWRlcyA9IG51bGw7XG4gICAgICAgIHRoaXMucGluZ0ludGVydmFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IG51bGw7XG4gICAgICAgIC8vIHNldCBvbiBoZWFydGJlYXRcbiAgICAgICAgdGhpcy5waW5nVGltZW91dFRpbWVyID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuY2xvc2VPbkJlZm9yZXVubG9hZCkge1xuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggY2xvc2VzIHRoZSBjb25uZWN0aW9uIHdoZW4gdGhlIFwiYmVmb3JldW5sb2FkXCIgZXZlbnQgaXMgZW1pdHRlZCBidXQgbm90IENocm9tZS4gVGhpcyBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIC8vIGVuc3VyZXMgZXZlcnkgYnJvd3NlciBiZWhhdmVzIHRoZSBzYW1lIChubyBcImRpc2Nvbm5lY3RcIiBldmVudCBhdCB0aGUgU29ja2V0LklPIGxldmVsIHdoZW4gdGhlIHBhZ2UgaXNcbiAgICAgICAgICAgICAgICAvLyBjbG9zZWQvcmVsb2FkZWQpXG4gICAgICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2lsZW50bHkgY2xvc2UgdGhlIHRyYW5zcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaG9zdG5hbWUgIT09IFwibG9jYWxob3N0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJ0cmFuc3BvcnQgY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQHJldHVybiB7VHJhbnNwb3J0fVxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZVRyYW5zcG9ydChuYW1lKSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gY2xvbmUodGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gICAgICAgIHF1ZXJ5LkVJTyA9IHByb3RvY29sO1xuICAgICAgICAvLyB0cmFuc3BvcnQgbmFtZVxuICAgICAgICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuICAgICAgICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgICAgICAgaWYgKHRoaXMuaWQpXG4gICAgICAgICAgICBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuICAgICAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnRyYW5zcG9ydE9wdGlvbnNbbmFtZV0sIHRoaXMub3B0cywge1xuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICBzb2NrZXQ6IHRoaXMsXG4gICAgICAgICAgICBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSxcbiAgICAgICAgICAgIHNlY3VyZTogdGhpcy5zZWN1cmUsXG4gICAgICAgICAgICBwb3J0OiB0aGlzLnBvcnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgdHJhbnNwb3J0c1tuYW1lXShvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgbGV0IHRyYW5zcG9ydDtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5yZW1lbWJlclVwZ3JhZGUgJiZcbiAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKFwid2Vic29ja2V0XCIpICE9PSAtMSkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gXCJ3ZWJzb2NrZXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIFwiTm8gdHJhbnNwb3J0cyBhdmFpbGFibGVcIik7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICAgICAgICB0cmFuc3BvcnRcbiAgICAgICAgICAgIC5vbihcImRyYWluXCIsIHRoaXMub25EcmFpbi5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwicGFja2V0XCIsIHRoaXMub25QYWNrZXQuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcImVycm9yXCIsIHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKFwidHJhbnNwb3J0IGNsb3NlXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvYmUobmFtZSkge1xuICAgICAgICBsZXQgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSk7XG4gICAgICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvblRyYW5zcG9ydE9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6IFwicGluZ1wiLCBkYXRhOiBcInByb2JlXCIgfV0pO1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJwYWNrZXRcIiwgbXNnID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKFwicG9uZ1wiID09PSBtc2cudHlwZSAmJiBcInByb2JlXCIgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRpbmdcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInVwZ3JhZGVcIiB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0KCkge1xuICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICAgICAgICBjb25zdCBvbmVycm9yID0gZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwicHJvYmUgZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVFcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UoKSB7XG4gICAgICAgICAgICBvbmVycm9yKFwidHJhbnNwb3J0IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgICAgICAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoXCJzb2NrZXQgY2xvc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gdGhlIHNvY2tldCBpcyB1cGdyYWRlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gICAgICAgIGZ1bmN0aW9uIG9udXBncmFkZSh0bykge1xuICAgICAgICAgICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9PSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbiAgICAgICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcIm9wZW5cIiwgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsIG9uZXJyb3IpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJvcGVuXCIsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiZXJyb3JcIiwgb25lcnJvcik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgIHRoaXMub25jZShcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gY29ubmVjdGlvbiBpcyBkZWVtZWQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgLy8gd2UgY2hlY2sgZm9yIGByZWFkeVN0YXRlYCBpbiBjYXNlIGFuIGBvcGVuYFxuICAgICAgICAvLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmXG4gICAgICAgICAgICB0aGlzLm9wdHMudXBncmFkZSAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UpIHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnVwZ3JhZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25QYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoZWFydGJlYXRcIik7XG4gICAgICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRQaW5nVGltZW91dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJwb25nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInNlcnZlciBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBlcnIuY29kZSA9IHBhY2tldC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1lc3NhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJtZXNzYWdlXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGhhbmRzaGFrZSBvYmpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkhhbmRzaGFrZShkYXRhKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiaGFuZHNoYWtlXCIsIGRhdGEpO1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICAgICAgICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5yZXNldFBpbmdUaW1lb3V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYW5kIHJlc2V0cyBwaW5nIHRpbWVvdXQgdGltZXIgYmFzZWQgb24gc2VydmVyIHBpbmdzLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcmVzZXRQaW5nVGltZW91dCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuICAgICAgICB0aGlzLnBpbmdUaW1lb3V0VGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJwaW5nIHRpbWVvdXRcIik7XG4gICAgICAgIH0sIHRoaXMucGluZ0ludGVydmFsICsgdGhpcy5waW5nVGltZW91dCk7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBpbmdUaW1lb3V0VGltZXIudW5yZWYoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25EcmFpbigpIHtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCwgdGhpcy5wcmV2QnVmZmVyTGVuKTtcbiAgICAgICAgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuICAgICAgICAvLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3ZlcixcbiAgICAgICAgLy8gYW5kIGEgbm9uemVybyBwcmV2QnVmZmVyTGVuIGNvdWxkIGNhdXNlIHByb2JsZW1zIG9uIGBkcmFpbmBcbiAgICAgICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcbiAgICAgICAgaWYgKDAgPT09IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRyYWluXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmbHVzaCgpIHtcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgIT09IHRoaXMucmVhZHlTdGF0ZSAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQud3JpdGFibGUgJiZcbiAgICAgICAgICAgICF0aGlzLnVwZ3JhZGluZyAmJlxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnNlbmQodGhpcy53cml0ZUJ1ZmZlcik7XG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJmbHVzaFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIHdyaXRlKG1zZywgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgdGhpcy5zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNlbmQobXNnLCBvcHRpb25zLCBmbikge1xuICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJtZXNzYWdlXCIsIG1zZywgb3B0aW9ucywgZm4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFja2V0IHR5cGUuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgc2VuZFBhY2tldCh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZGF0YSkge1xuICAgICAgICAgICAgZm4gPSBkYXRhO1xuICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgZm4gPSBvcHRpb25zO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiY2xvc2luZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgY29uc3QgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGFja2V0Q3JlYXRlXCIsIHBhY2tldCk7XG4gICAgICAgIHRoaXMud3JpdGVCdWZmZXIucHVzaChwYWNrZXQpO1xuICAgICAgICBpZiAoZm4pXG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJmbHVzaFwiLCBmbik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJmb3JjZWQgY2xvc2VcIik7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjbGVhbnVwQW5kQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGVcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub2ZmKFwidXBncmFkZUVycm9yXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3YWl0Rm9yVXBncmFkZSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIHdhaXQgZm9yIHVwZ3JhZGUgdG8gZmluaXNoIHNpbmNlIHdlIGNhbid0IHNlbmQgcGFja2V0cyB3aGlsZSBwYXVzaW5nIGEgdHJhbnNwb3J0XG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRlXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRlRXJyb3JcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zaW5nXCI7XG4gICAgICAgICAgICBpZiAodGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2UoXCJkcmFpblwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgICAgICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBlcnJvclxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25FcnJvcihlcnIpIHtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHRoaXMub25DbG9zZShcInRyYW5zcG9ydCBlcnJvclwiLCBlcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgY2xvc2UuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNsb3NlKHJlYXNvbiwgZGVzYykge1xuICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgICAgICAgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgICAgICAgXCJjbG9zaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgLy8gY2xlYXIgdGltZXJzXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZW91dEZuKHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG4gICAgICAgICAgICAvLyBzdG9wIGV2ZW50IGZyb20gZmlyaW5nIGFnYWluIGZvciB0cmFuc3BvcnRcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycyhcImNsb3NlXCIpO1xuICAgICAgICAgICAgLy8gZW5zdXJlIHRyYW5zcG9ydCB3b24ndCBzdGF5IG9wZW5cbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgICAgICAvLyBpZ25vcmUgZnVydGhlciB0cmFuc3BvcnQgY29tbXVuaWNhdGlvblxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlbW92ZUV2ZW50TGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsIHRoaXMub2ZmbGluZUV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCByZWFkeSBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgICAgIC8vIGNsZWFyIHNlc3Npb24gaWRcbiAgICAgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICAgICAgLy8gZW1pdCBjbG9zZSBldmVudFxuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24sIGRlc2MpO1xuICAgICAgICAgICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgICAgICAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzZXJ2ZXIgdXBncmFkZXNcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGZpbHRlclVwZ3JhZGVzKHVwZ3JhZGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVXBncmFkZXMgPSBbXTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCBqID0gdXBncmFkZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgaWYgKH50aGlzLnRyYW5zcG9ydHMuaW5kZXhPZih1cGdyYWRlc1tpXSkpXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbiAgICB9XG59XG5Tb2NrZXQucHJvdG9jb2wgPSBwcm90b2NvbDtcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xuICAgIGNvbnN0IG8gPSB7fTtcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBvW2ldID0gb2JqW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvO1xufVxuIiwiY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1ZpZXcgPSAob2JqKSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/IEFycmF5QnVmZmVyLmlzVmlldyhvYmopXG4gICAgICAgIDogb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xufTtcbmNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmNvbnN0IHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0b1N0cmluZy5jYWxsKEJsb2IpID09PSBcIltvYmplY3QgQmxvYkNvbnN0cnVjdG9yXVwiKTtcbmNvbnN0IHdpdGhOYXRpdmVGaWxlID0gdHlwZW9mIEZpbGUgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgRmlsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0b1N0cmluZy5jYWxsKEZpbGUpID09PSBcIltvYmplY3QgRmlsZUNvbnN0cnVjdG9yXVwiKTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIG9iaiBpcyBhIEJ1ZmZlciwgYW4gQXJyYXlCdWZmZXIsIGEgQmxvYiBvciBhIEZpbGUuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQmluYXJ5KG9iaikge1xuICAgIHJldHVybiAoKHdpdGhOYXRpdmVBcnJheUJ1ZmZlciAmJiAob2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgaXNWaWV3KG9iaikpKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVGaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoYXNCaW5hcnkob2JqLCB0b0pTT04pIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChoYXNCaW5hcnkob2JqW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGlzQmluYXJ5KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvYmoudG9KU09OICYmXG4gICAgICAgIHR5cGVvZiBvYmoudG9KU09OID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gaGFzQmluYXJ5KG9iai50b0pTT04oKSwgdHJ1ZSk7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiBoYXNCaW5hcnkob2JqW2tleV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4iLCJpbXBvcnQgeyBpc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuLyoqXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciB8IEJsb2IgfCBGaWxlIGluIHBhY2tldCB3aXRoIGEgbnVtYmVyZWQgcGxhY2Vob2xkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbnN0cnVjdFBhY2tldChwYWNrZXQpIHtcbiAgICBjb25zdCBidWZmZXJzID0gW107XG4gICAgY29uc3QgcGFja2V0RGF0YSA9IHBhY2tldC5kYXRhO1xuICAgIGNvbnN0IHBhY2sgPSBwYWNrZXQ7XG4gICAgcGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEsIGJ1ZmZlcnMpO1xuICAgIHBhY2suYXR0YWNobWVudHMgPSBidWZmZXJzLmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJpbmFyeSAnYXR0YWNobWVudHMnXG4gICAgcmV0dXJuIHsgcGFja2V0OiBwYWNrLCBidWZmZXJzOiBidWZmZXJzIH07XG59XG5mdW5jdGlvbiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICAgIGlmICghZGF0YSlcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgaWYgKGlzQmluYXJ5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0geyBfcGxhY2Vob2xkZXI6IHRydWUsIG51bTogYnVmZmVycy5sZW5ndGggfTtcbiAgICAgICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xufVxuLyoqXG4gKiBSZWNvbnN0cnVjdHMgYSBiaW5hcnkgcGFja2V0IGZyb20gaXRzIHBsYWNlaG9sZGVyIHBhY2tldCBhbmQgYnVmZmVyc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBldmVudCBwYWNrZXQgd2l0aCBwbGFjZWhvbGRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGJ1ZmZlcnMgLSBiaW5hcnkgYnVmZmVycyB0byBwdXQgaW4gcGxhY2Vob2xkZXIgcG9zaXRpb25zXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlY29uc3RydWN0ZWQgcGFja2V0XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWNvbnN0cnVjdFBhY2tldChwYWNrZXQsIGJ1ZmZlcnMpIHtcbiAgICBwYWNrZXQuZGF0YSA9IF9yZWNvbnN0cnVjdFBhY2tldChwYWNrZXQuZGF0YSwgYnVmZmVycyk7XG4gICAgcGFja2V0LmF0dGFjaG1lbnRzID0gdW5kZWZpbmVkOyAvLyBubyBsb25nZXIgdXNlZnVsXG4gICAgcmV0dXJuIHBhY2tldDtcbn1cbmZ1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhLCBidWZmZXJzKSB7XG4gICAgaWYgKCFkYXRhKVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLl9wbGFjZWhvbGRlcikge1xuICAgICAgICByZXR1cm4gYnVmZmVyc1tkYXRhLm51bV07IC8vIGFwcHJvcHJpYXRlIGJ1ZmZlciAoc2hvdWxkIGJlIG5hdHVyYWwgb3JkZXIgYW55d2F5KVxuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGF0YVtpXSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJpbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IGRlY29uc3RydWN0UGFja2V0LCByZWNvbnN0cnVjdFBhY2tldCB9IGZyb20gXCIuL2JpbmFyeS5qc1wiO1xuaW1wb3J0IHsgaXNCaW5hcnksIGhhc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHByb3RvY29sID0gNTtcbmV4cG9ydCB2YXIgUGFja2V0VHlwZTtcbihmdW5jdGlvbiAoUGFja2V0VHlwZSkge1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkNPTk5FQ1RcIl0gPSAwXSA9IFwiQ09OTkVDVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkRJU0NPTk5FQ1RcIl0gPSAxXSA9IFwiRElTQ09OTkVDVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkVWRU5UXCJdID0gMl0gPSBcIkVWRU5UXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQUNLXCJdID0gM10gPSBcIkFDS1wiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkNPTk5FQ1RfRVJST1JcIl0gPSA0XSA9IFwiQ09OTkVDVF9FUlJPUlwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkJJTkFSWV9FVkVOVFwiXSA9IDVdID0gXCJCSU5BUllfRVZFTlRcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJCSU5BUllfQUNLXCJdID0gNl0gPSBcIkJJTkFSWV9BQ0tcIjtcbn0pKFBhY2tldFR5cGUgfHwgKFBhY2tldFR5cGUgPSB7fSkpO1xuLyoqXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmNvZGVyIHtcbiAgICAvKipcbiAgICAgKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcbiAgICAgKiBidWZmZXIgc2VxdWVuY2UsIGRlcGVuZGluZyBvbiBwYWNrZXQgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XG4gICAgICovXG4gICAgZW5jb2RlKG9iaikge1xuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuRVZFTlQgfHwgb2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQUNLKSB7XG4gICAgICAgICAgICBpZiAoaGFzQmluYXJ5KG9iaikpIHtcbiAgICAgICAgICAgICAgICBvYmoudHlwZSA9XG4gICAgICAgICAgICAgICAgICAgIG9iai50eXBlID09PSBQYWNrZXRUeXBlLkVWRU5UXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFBhY2tldFR5cGUuQklOQVJZX0FDSztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGVBc0JpbmFyeShvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdGhpcy5lbmNvZGVBc1N0cmluZyhvYmopXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyBzdHJpbmcuXG4gICAgICovXG4gICAgZW5jb2RlQXNTdHJpbmcob2JqKSB7XG4gICAgICAgIC8vIGZpcnN0IGlzIHR5cGVcbiAgICAgICAgbGV0IHN0ciA9IFwiXCIgKyBvYmoudHlwZTtcbiAgICAgICAgLy8gYXR0YWNobWVudHMgaWYgd2UgaGF2ZSB0aGVtXG4gICAgICAgIGlmIChvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgIG9iai50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0spIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmouYXR0YWNobWVudHMgKyBcIi1cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbmFtZXNwYWNlIG90aGVyIHRoYW4gYC9gXG4gICAgICAgIC8vIHdlIGFwcGVuZCBpdCBmb2xsb3dlZCBieSBhIGNvbW1hIGAsYFxuICAgICAgICBpZiAob2JqLm5zcCAmJiBcIi9cIiAhPT0gb2JqLm5zcCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5uc3AgKyBcIixcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGUgaWRcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmlkKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmlkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGpzb24gZGF0YVxuICAgICAgICBpZiAobnVsbCAhPSBvYmouZGF0YSkge1xuICAgICAgICAgICAgc3RyICs9IEpTT04uc3RyaW5naWZ5KG9iai5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcbiAgICAgKiBkZWNvbnN0cnVjdGluZyBwYWNrZXQgaW50byBvYmplY3Qgd2l0aCBwbGFjZWhvbGRlcnMgYW5kXG4gICAgICogYSBsaXN0IG9mIGJ1ZmZlcnMuXG4gICAgICovXG4gICAgZW5jb2RlQXNCaW5hcnkob2JqKSB7XG4gICAgICAgIGNvbnN0IGRlY29uc3RydWN0aW9uID0gZGVjb25zdHJ1Y3RQYWNrZXQob2JqKTtcbiAgICAgICAgY29uc3QgcGFjayA9IHRoaXMuZW5jb2RlQXNTdHJpbmcoZGVjb25zdHJ1Y3Rpb24ucGFja2V0KTtcbiAgICAgICAgY29uc3QgYnVmZmVycyA9IGRlY29uc3RydWN0aW9uLmJ1ZmZlcnM7XG4gICAgICAgIGJ1ZmZlcnMudW5zaGlmdChwYWNrKTsgLy8gYWRkIHBhY2tldCBpbmZvIHRvIGJlZ2lubmluZyBvZiBkYXRhIGxpc3RcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcnM7IC8vIHdyaXRlIGFsbCB0aGUgYnVmZmVyc1xuICAgIH1cbn1cbi8qKlxuICogQSBzb2NrZXQuaW8gRGVjb2RlciBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVjb2RlclxuICovXG5leHBvcnQgY2xhc3MgRGVjb2RlciBleHRlbmRzIEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGFuIGVuY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9iaiAtIGVuY29kZWQgcGFja2V0XG4gICAgICovXG4gICAgYWRkKG9iaikge1xuICAgICAgICBsZXQgcGFja2V0O1xuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcGFja2V0ID0gdGhpcy5kZWNvZGVTdHJpbmcob2JqKTtcbiAgICAgICAgICAgIGlmIChwYWNrZXQudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgICAgICBwYWNrZXQudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICAgICAgLy8gYmluYXJ5IHBhY2tldCdzIGpzb25cbiAgICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBuZXcgQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpO1xuICAgICAgICAgICAgICAgIC8vIG5vIGF0dGFjaG1lbnRzLCBsYWJlbGVkIGJpbmFyeSBidXQgbm8gYmluYXJ5IGRhdGEgdG8gZm9sbG93XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC5hdHRhY2htZW50cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgICAgICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImRlY29kZWRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0JpbmFyeShvYmopIHx8IG9iai5iYXNlNjQpIHtcbiAgICAgICAgICAgIC8vIHJhdyBiaW5hcnkgZGF0YVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnb3QgYmluYXJ5IGRhdGEgd2hlbiBub3QgcmVjb25zdHJ1Y3RpbmcgYSBwYWNrZXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY2VpdmVkIGZpbmFsIGJ1ZmZlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biB0eXBlOiBcIiArIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlIGEgcGFja2V0IFN0cmluZyAoSlNPTiBkYXRhKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgICAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XG4gICAgICovXG4gICAgZGVjb2RlU3RyaW5nKHN0cikge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIC8vIGxvb2sgdXAgdHlwZVxuICAgICAgICBjb25zdCBwID0ge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyKHN0ci5jaGFyQXQoMCkpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoUGFja2V0VHlwZVtwLnR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVua25vd24gcGFja2V0IHR5cGUgXCIgKyBwLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgYXR0YWNobWVudHMgaWYgdHlwZSBiaW5hcnlcbiAgICAgICAgaWYgKHAudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgIHAudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKHN0ci5jaGFyQXQoKytpKSAhPT0gXCItXCIgJiYgaSAhPSBzdHIubGVuZ3RoKSB7IH1cbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICAgICAgaWYgKGJ1ZiAhPSBOdW1iZXIoYnVmKSB8fCBzdHIuY2hhckF0KGkpICE9PSBcIi1cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmF0dGFjaG1lbnRzID0gTnVtYmVyKGJ1Zik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBuYW1lc3BhY2UgKGlmIGFueSlcbiAgICAgICAgaWYgKFwiL1wiID09PSBzdHIuY2hhckF0KGkgKyAxKSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlICgrK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAoXCIsXCIgPT09IGMpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAubnNwID0gc3RyLnN1YnN0cmluZyhzdGFydCwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwLm5zcCA9IFwiL1wiO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgaWRcbiAgICAgICAgY29uc3QgbmV4dCA9IHN0ci5jaGFyQXQoaSArIDEpO1xuICAgICAgICBpZiAoXCJcIiAhPT0gbmV4dCAmJiBOdW1iZXIobmV4dCkgPT0gbmV4dCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlICgrK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAobnVsbCA9PSBjIHx8IE51bWJlcihjKSAhPSBjKSB7XG4gICAgICAgICAgICAgICAgICAgIC0taTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuaWQgPSBOdW1iZXIoc3RyLnN1YnN0cmluZyhzdGFydCwgaSArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGpzb24gZGF0YVxuICAgICAgICBpZiAoc3RyLmNoYXJBdCgrK2kpKSB7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdHJ5UGFyc2Uoc3RyLnN1YnN0cihpKSk7XG4gICAgICAgICAgICBpZiAoRGVjb2Rlci5pc1BheWxvYWRWYWxpZChwLnR5cGUsIHBheWxvYWQpKSB7XG4gICAgICAgICAgICAgICAgcC5kYXRhID0gcGF5bG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgcGF5bG9hZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgc3RhdGljIGlzUGF5bG9hZFZhbGlkKHR5cGUsIHBheWxvYWQpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwib2JqZWN0XCI7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZCA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1RfRVJST1I6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkVWRU5UOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJiBwYXlsb2FkLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQUNLOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVhbGxvY2F0ZXMgYSBwYXJzZXIncyByZXNvdXJjZXNcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gdHJ5UGFyc2Uoc3RyKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbi8qKlxuICogQSBtYW5hZ2VyIG9mIGEgYmluYXJ5IGV2ZW50J3MgJ2J1ZmZlciBzZXF1ZW5jZScuIFNob3VsZFxuICogYmUgY29uc3RydWN0ZWQgd2hlbmV2ZXIgYSBwYWNrZXQgb2YgdHlwZSBCSU5BUllfRVZFTlQgaXNcbiAqIGRlY29kZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QmluYXJ5UmVjb25zdHJ1Y3Rvcn0gaW5pdGlhbGl6ZWQgcmVjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBCaW5hcnlSZWNvbnN0cnVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYWNrZXQpIHtcbiAgICAgICAgdGhpcy5wYWNrZXQgPSBwYWNrZXQ7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IHBhY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIGJpbmFyeSBkYXRhIHJlY2VpdmVkIGZyb20gY29ubmVjdGlvblxuICAgICAqIGFmdGVyIGEgQklOQVJZX0VWRU5UIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QnVmZmVyIHwgQXJyYXlCdWZmZXJ9IGJpbkRhdGEgLSB0aGUgcmF3IGJpbmFyeSBkYXRhIHJlY2VpdmVkXG4gICAgICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gcmV0dXJucyBudWxsIGlmIG1vcmUgYmluYXJ5IGRhdGEgaXMgZXhwZWN0ZWQgb3JcbiAgICAgKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cbiAgICAgKi9cbiAgICB0YWtlQmluYXJ5RGF0YShiaW5EYXRhKSB7XG4gICAgICAgIHRoaXMuYnVmZmVycy5wdXNoKGJpbkRhdGEpO1xuICAgICAgICBpZiAodGhpcy5idWZmZXJzLmxlbmd0aCA9PT0gdGhpcy5yZWNvblBhY2suYXR0YWNobWVudHMpIHtcbiAgICAgICAgICAgIC8vIGRvbmUgd2l0aCBidWZmZXIgbGlzdFxuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcmVjb25zdHJ1Y3RQYWNrZXQodGhpcy5yZWNvblBhY2ssIHRoaXMuYnVmZmVycyk7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBwYWNrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFucyB1cCBiaW5hcnkgcGFja2V0IHJlY29uc3RydWN0aW9uIHZhcmlhYmxlcy5cbiAgICAgKi9cbiAgICBmaW5pc2hlZFJlY29uc3RydWN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IG51bGw7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBvbihvYmosIGV2LCBmbikge1xuICAgIG9iai5vbihldiwgZm4pO1xuICAgIHJldHVybiBmdW5jdGlvbiBzdWJEZXN0cm95KCkge1xuICAgICAgICBvYmoub2ZmKGV2LCBmbik7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IFBhY2tldFR5cGUgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqL1xuY29uc3QgUkVTRVJWRURfRVZFTlRTID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29ubmVjdDogMSxcbiAgICBjb25uZWN0X2Vycm9yOiAxLFxuICAgIGRpc2Nvbm5lY3Q6IDEsXG4gICAgZGlzY29ubmVjdGluZzogMSxcbiAgICAvLyBFdmVudEVtaXR0ZXIgcmVzZXJ2ZWQgZXZlbnRzOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19ldmVudF9uZXdsaXN0ZW5lclxuICAgIG5ld0xpc3RlbmVyOiAxLFxuICAgIHJlbW92ZUxpc3RlbmVyOiAxLFxufSk7XG5leHBvcnQgY2xhc3MgU29ja2V0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogYFNvY2tldGAgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaW8sIG5zcCwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5pZHMgPSAwO1xuICAgICAgICB0aGlzLmFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5mbGFncyA9IHt9O1xuICAgICAgICB0aGlzLmlvID0gaW87XG4gICAgICAgIHRoaXMubnNwID0gbnNwO1xuICAgICAgICBpZiAob3B0cyAmJiBvcHRzLmF1dGgpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aCA9IG9wdHMuYXV0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pby5fYXV0b0Nvbm5lY3QpXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN1YkV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3VicylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaW8gPSB0aGlzLmlvO1xuICAgICAgICB0aGlzLnN1YnMgPSBbXG4gICAgICAgICAgICBvbihpbywgXCJvcGVuXCIsIHRoaXMub25vcGVuLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb24oaW8sIFwicGFja2V0XCIsIHRoaXMub25wYWNrZXQuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksXG4gICAgICAgIF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIFNvY2tldCB3aWxsIHRyeSB0byByZWNvbm5lY3Qgd2hlbiBpdHMgTWFuYWdlciBjb25uZWN0cyBvciByZWNvbm5lY3RzXG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdWJzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5zdWJFdmVudHMoKTtcbiAgICAgICAgaWYgKCF0aGlzLmlvW1wiX3JlY29ubmVjdGluZ1wiXSlcbiAgICAgICAgICAgIHRoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMuaW8uX3JlYWR5U3RhdGUpXG4gICAgICAgICAgICB0aGlzLm9ub3BlbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGNvbm5lY3QoKVxuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc2VuZCguLi5hcmdzKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIGBlbWl0YC5cbiAgICAgKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBlbWl0KGV2LCAuLi5hcmdzKSB7XG4gICAgICAgIGlmIChSRVNFUlZFRF9FVkVOVFMuaGFzT3duUHJvcGVydHkoZXYpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGV2ICsgJ1wiIGlzIGEgcmVzZXJ2ZWQgZXZlbnQgbmFtZScpO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MudW5zaGlmdChldik7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IFBhY2tldFR5cGUuRVZFTlQsXG4gICAgICAgICAgICBkYXRhOiBhcmdzLFxuICAgICAgICB9O1xuICAgICAgICBwYWNrZXQub3B0aW9ucyA9IHt9O1xuICAgICAgICBwYWNrZXQub3B0aW9ucy5jb21wcmVzcyA9IHRoaXMuZmxhZ3MuY29tcHJlc3MgIT09IGZhbHNlO1xuICAgICAgICAvLyBldmVudCBhY2sgY2FsbGJhY2tcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgdGhpcy5hY2tzW3RoaXMuaWRzXSA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICBwYWNrZXQuaWQgPSB0aGlzLmlkcysrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzVHJhbnNwb3J0V3JpdGFibGUgPSB0aGlzLmlvLmVuZ2luZSAmJlxuICAgICAgICAgICAgdGhpcy5pby5lbmdpbmUudHJhbnNwb3J0ICYmXG4gICAgICAgICAgICB0aGlzLmlvLmVuZ2luZS50cmFuc3BvcnQud3JpdGFibGU7XG4gICAgICAgIGNvbnN0IGRpc2NhcmRQYWNrZXQgPSB0aGlzLmZsYWdzLnZvbGF0aWxlICYmICghaXNUcmFuc3BvcnRXcml0YWJsZSB8fCAhdGhpcy5jb25uZWN0ZWQpO1xuICAgICAgICBpZiAoZGlzY2FyZFBhY2tldCkge1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZsYWdzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgcGFja2V0Lm5zcCA9IHRoaXMubnNwO1xuICAgICAgICB0aGlzLmlvLl9wYWNrZXQocGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXV0aCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aCgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogUGFja2V0VHlwZS5DT05ORUNULCBkYXRhIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IFBhY2tldFR5cGUuQ09OTkVDVCwgZGF0YTogdGhpcy5hdXRoIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBvciBtYW5hZ2VyIGBlcnJvcmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXJyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWFzb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY2xvc2UocmVhc29uKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgZGVsZXRlIHRoaXMuaWQ7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZGlzY29ubmVjdFwiLCByZWFzb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IHNhbWVOYW1lc3BhY2UgPSBwYWNrZXQubnNwID09PSB0aGlzLm5zcDtcbiAgICAgICAgaWYgKCFzYW1lTmFtZXNwYWNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmRhdGEgJiYgcGFja2V0LmRhdGEuc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gcGFja2V0LmRhdGEuc2lkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uY29ubmVjdChpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgbmV3IEVycm9yKFwiSXQgc2VlbXMgeW91IGFyZSB0cnlpbmcgdG8gcmVhY2ggYSBTb2NrZXQuSU8gc2VydmVyIGluIHYyLnggd2l0aCBhIHYzLnggY2xpZW50LCBidXQgdGhleSBhcmUgbm90IGNvbXBhdGlibGUgKG1vcmUgaW5mb3JtYXRpb24gaGVyZTogaHR0cHM6Ly9zb2NrZXQuaW8vZG9jcy92My9taWdyYXRpbmctZnJvbS0yLXgtdG8tMy0wLylcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5FVkVOVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfRVZFTlQ6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQUNLOlxuICAgICAgICAgICAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfQUNLOlxuICAgICAgICAgICAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5ESVNDT05ORUNUOlxuICAgICAgICAgICAgICAgIHRoaXMub25kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVF9FUlJPUjpcbiAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IocGFja2V0LmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGVyci5kYXRhID0gcGFja2V0LmRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBldmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZXZlbnQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBwYWNrZXQuZGF0YSB8fCBbXTtcbiAgICAgICAgaWYgKG51bGwgIT0gcGFja2V0LmlkKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2godGhpcy5hY2socGFja2V0LmlkKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRFdmVudChhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5wdXNoKE9iamVjdC5mcmVlemUoYXJncykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVtaXRFdmVudChhcmdzKSB7XG4gICAgICAgIGlmICh0aGlzLl9hbnlMaXN0ZW5lcnMgJiYgdGhpcy5fYW55TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2R1Y2VzIGFuIGFjayBjYWxsYmFjayB0byBlbWl0IHdpdGggYW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFjayhpZCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHNlbnQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGRvdWJsZSBjYWxsYmFja3NcbiAgICAgICAgICAgIGlmIChzZW50KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5wYWNrZXQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFBhY2tldFR5cGUuQUNLLFxuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBhcmdzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGFja25vd2xlZ2VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25hY2socGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGFjayA9IHRoaXMuYWNrc1twYWNrZXQuaWRdO1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgYWNrKSB7XG4gICAgICAgICAgICBhY2suYXBwbHkodGhpcywgcGFja2V0LmRhdGEpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWNrc1twYWNrZXQuaWRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNlcnZlciBjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNvbm5lY3QoaWQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdEJ1ZmZlcmVkKCk7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdCBidWZmZXJlZCBldmVudHMgKHJlY2VpdmVkIGFuZCBlbWl0dGVkKS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZW1pdEJ1ZmZlcmVkKCkge1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIuZm9yRWFjaCgoYXJncykgPT4gdGhpcy5lbWl0RXZlbnQoYXJncykpO1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyLmZvckVhY2goKHBhY2tldCkgPT4gdGhpcy5wYWNrZXQocGFja2V0KSk7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiaW8gc2VydmVyIGRpc2Nvbm5lY3RcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGZvcmNlZCBjbGllbnQvc2VydmVyIHNpZGUgZGlzY29ubmVjdGlvbnMsXG4gICAgICogdGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgbWFuYWdlciBzdG9wcyB0cmFja2luZyB1cyBhbmRcbiAgICAgKiB0aGF0IHJlY29ubmVjdGlvbnMgZG9uJ3QgZ2V0IHRyaWdnZXJlZCBmb3IgdGhpcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vicykge1xuICAgICAgICAgICAgLy8gY2xlYW4gc3Vic2NyaXB0aW9ucyB0byBhdm9pZCByZWNvbm5lY3Rpb25zXG4gICAgICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgICAgIHRoaXMuc3VicyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlvW1wiX2Rlc3Ryb3lcIl0odGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgbWFudWFsbHkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IFBhY2tldFR5cGUuRElTQ09OTkVDVCB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAvLyBmaXJlIGV2ZW50c1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKFwiaW8gY2xpZW50IGRpc2Nvbm5lY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBkaXNjb25uZWN0KClcbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjb21wcmVzcyBmbGFnLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbXByZXNzIC0gaWYgYHRydWVgLCBjb21wcmVzc2VzIHRoZSBzZW5kaW5nIGRhdGFcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29tcHJlc3MoY29tcHJlc3MpIHtcbiAgICAgICAgdGhpcy5mbGFncy5jb21wcmVzcyA9IGNvbXByZXNzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhIG1vZGlmaWVyIGZvciBhIHN1YnNlcXVlbnQgZXZlbnQgZW1pc3Npb24gdGhhdCB0aGUgZXZlbnQgbWVzc2FnZSB3aWxsIGJlIGRyb3BwZWQgd2hlbiB0aGlzIHNvY2tldCBpcyBub3RcbiAgICAgKiByZWFkeSB0byBzZW5kIG1lc3NhZ2VzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBnZXQgdm9sYXRpbGUoKSB7XG4gICAgICAgIHRoaXMuZmxhZ3Mudm9sYXRpbGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9uQW55KGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLiBUaGUgbGlzdGVuZXIgaXMgYWRkZWQgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdGVuZXJzIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHByZXBlbmRBbnkobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvZmZBbnkobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbnlMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IGxpc3RlbmVyc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdGhhdCBhcmUgbGlzdGVuaW5nIGZvciBhbnkgZXZlbnQgdGhhdCBpcyBzcGVjaWZpZWQuIFRoaXMgYXJyYXkgY2FuIGJlIG1hbmlwdWxhdGVkLFxuICAgICAqIGUuZy4gdG8gcmVtb3ZlIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBsaXN0ZW5lcnNBbnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgfVxufVxuIiwiXG4vKipcbiAqIEV4cG9zZSBgQmFja29mZmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrb2ZmO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cbiAqXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxuICogLSBgaml0dGVyYCBbMF1cbiAqIC0gYGZhY3RvcmAgWzJdXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gQmFja29mZihvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICB0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO1xuICB0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO1xuICB0aGlzLmZhY3RvciA9IG9wdHMuZmFjdG9yIHx8IDI7XG4gIHRoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDEgPyBvcHRzLmppdHRlciA6IDA7XG4gIHRoaXMuYXR0ZW1wdHMgPSAwO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgYmFja29mZiBkdXJhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24oKXtcbiAgdmFyIG1zID0gdGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmF0dGVtcHRzKyspO1xuICBpZiAodGhpcy5qaXR0ZXIpIHtcbiAgICB2YXIgcmFuZCA9ICBNYXRoLnJhbmRvbSgpO1xuICAgIHZhciBkZXZpYXRpb24gPSBNYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTtcbiAgICBtcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwICA/IG1zIC0gZGV2aWF0aW9uIDogbXMgKyBkZXZpYXRpb247XG4gIH1cbiAgcmV0dXJuIE1hdGgubWluKG1zLCB0aGlzLm1heCkgfCAwO1xufTtcblxuLyoqXG4gKiBSZXNldCB0aGUgbnVtYmVyIG9mIGF0dGVtcHRzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xuICB0aGlzLmF0dGVtcHRzID0gMDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtaW5pbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbihtaW4pe1xuICB0aGlzLm1zID0gbWluO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1heGltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uKG1heCl7XG4gIHRoaXMubWF4ID0gbWF4O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGppdHRlclxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0Sml0dGVyID0gZnVuY3Rpb24oaml0dGVyKXtcbiAgdGhpcy5qaXR0ZXIgPSBqaXR0ZXI7XG59O1xuXG4iLCJpbXBvcnQgeyBTb2NrZXQgYXMgRW5naW5lLCBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuaW1wb3J0ICogYXMgcGFyc2VyIGZyb20gXCJzb2NrZXQuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBvbiB9IGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgQmFja29mZiBmcm9tIFwiYmFja28yXCI7XG5pbXBvcnQgeyBFbWl0dGVyLCB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5leHBvcnQgY2xhc3MgTWFuYWdlciBleHRlbmRzIEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHVyaSwgb3B0cykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubnNwcyA9IHt9O1xuICAgICAgICB0aGlzLnN1YnMgPSBbXTtcbiAgICAgICAgaWYgKHVyaSAmJiBcIm9iamVjdFwiID09PSB0eXBlb2YgdXJpKSB7XG4gICAgICAgICAgICBvcHRzID0gdXJpO1xuICAgICAgICAgICAgdXJpID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICBvcHRzLnBhdGggPSBvcHRzLnBhdGggfHwgXCIvc29ja2V0LmlvXCI7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIGluc3RhbGxUaW1lckZ1bmN0aW9ucyh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb24ob3B0cy5yZWNvbm5lY3Rpb24gIT09IGZhbHNlKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25BdHRlbXB0cyhvcHRzLnJlY29ubmVjdGlvbkF0dGVtcHRzIHx8IEluZmluaXR5KTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheShvcHRzLnJlY29ubmVjdGlvbkRlbGF5IHx8IDEwMDApO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KG9wdHMucmVjb25uZWN0aW9uRGVsYXlNYXggfHwgNTAwMCk7XG4gICAgICAgIHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigoX2EgPSBvcHRzLnJhbmRvbWl6YXRpb25GYWN0b3IpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDAuNSk7XG4gICAgICAgIHRoaXMuYmFja29mZiA9IG5ldyBCYWNrb2ZmKHtcbiAgICAgICAgICAgIG1pbjogdGhpcy5yZWNvbm5lY3Rpb25EZWxheSgpLFxuICAgICAgICAgICAgbWF4OiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KCksXG4gICAgICAgICAgICBqaXR0ZXI6IHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigpLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50aW1lb3V0KG51bGwgPT0gb3B0cy50aW1lb3V0ID8gMjAwMDAgOiBvcHRzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgdGhpcy51cmkgPSB1cmk7XG4gICAgICAgIGNvbnN0IF9wYXJzZXIgPSBvcHRzLnBhcnNlciB8fCBwYXJzZXI7XG4gICAgICAgIHRoaXMuZW5jb2RlciA9IG5ldyBfcGFyc2VyLkVuY29kZXIoKTtcbiAgICAgICAgdGhpcy5kZWNvZGVyID0gbmV3IF9wYXJzZXIuRGVjb2RlcigpO1xuICAgICAgICB0aGlzLl9hdXRvQ29ubmVjdCA9IG9wdHMuYXV0b0Nvbm5lY3QgIT09IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fYXV0b0Nvbm5lY3QpXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uKHYpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbjtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uID0gISF2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uQXR0ZW1wdHModikge1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IHY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb25EZWxheSh2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheTtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXkgPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRNaW4odik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByYW5kb21pemF0aW9uRmFjdG9yKHYpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3I7XG4gICAgICAgIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3IgPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRKaXR0ZXIodik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb25EZWxheU1heCh2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRNYXgodik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aW1lb3V0KHYpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVvdXQ7XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRyeWluZyB0byByZWNvbm5lY3QgaWYgcmVjb25uZWN0aW9uIGlzIGVuYWJsZWQgYW5kIHdlIGhhdmUgbm90XG4gICAgICogc3RhcnRlZCByZWNvbm5lY3RpbmcgeWV0XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG1heWJlUmVjb25uZWN0T25PcGVuKCkge1xuICAgICAgICAvLyBPbmx5IHRyeSB0byByZWNvbm5lY3QgaWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBjb25uZWN0aW5nXG4gICAgICAgIGlmICghdGhpcy5fcmVjb25uZWN0aW5nICYmXG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb24gJiZcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5hdHRlbXB0cyA9PT0gMCkge1xuICAgICAgICAgICAgLy8ga2VlcHMgcmVjb25uZWN0aW9uIGZyb20gZmlyaW5nIHR3aWNlIGZvciB0aGUgc2FtZSByZWNvbm5lY3Rpb24gbG9vcFxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydCBgc29ja2V0YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gb3B0aW9uYWwsIGNhbGxiYWNrXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9wZW4oZm4pIHtcbiAgICAgICAgaWYgKH50aGlzLl9yZWFkeVN0YXRlLmluZGV4T2YoXCJvcGVuXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEVuZ2luZSh0aGlzLnVyaSwgdGhpcy5vcHRzKTtcbiAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuaW5nXCI7XG4gICAgICAgIHRoaXMuc2tpcFJlY29ubmVjdCA9IGZhbHNlO1xuICAgICAgICAvLyBlbWl0IGBvcGVuYFxuICAgICAgICBjb25zdCBvcGVuU3ViRGVzdHJveSA9IG9uKHNvY2tldCwgXCJvcGVuXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYub25vcGVuKCk7XG4gICAgICAgICAgICBmbiAmJiBmbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gZW1pdCBgZXJyb3JgXG4gICAgICAgIGNvbnN0IGVycm9yU3ViID0gb24oc29ja2V0LCBcImVycm9yXCIsIChlcnIpID0+IHtcbiAgICAgICAgICAgIHNlbGYuY2xlYW51cCgpO1xuICAgICAgICAgICAgc2VsZi5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbiAgICAgICAgICAgICAgICBzZWxmLm1heWJlUmVjb25uZWN0T25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZmFsc2UgIT09IHRoaXMuX3RpbWVvdXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICAgICAgICAgICAgaWYgKHRpbWVvdXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBvcGVuU3ViRGVzdHJveSgpOyAvLyBwcmV2ZW50cyBhIHJhY2UgY29uZGl0aW9uIHdpdGggdGhlICdvcGVuJyBldmVudFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0IHRpbWVyXG4gICAgICAgICAgICBjb25zdCB0aW1lciA9IHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBvcGVuU3ViRGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdChcImVycm9yXCIsIG5ldyBFcnJvcihcInRpbWVvdXRcIikpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG9VbnJlZikge1xuICAgICAgICAgICAgICAgIHRpbWVyLnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YnMucHVzaChmdW5jdGlvbiBzdWJEZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnMucHVzaChvcGVuU3ViRGVzdHJveSk7XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKGVycm9yU3ViKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBvcGVuKClcbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25uZWN0KGZuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW4oZm4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICAvLyBjbGVhciBvbGQgc3Vic1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgLy8gbWFyayBhcyBvcGVuXG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcIm9wZW5cIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJvcGVuXCIpO1xuICAgICAgICAvLyBhZGQgbmV3IHN1YnNcbiAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgXCJwaW5nXCIsIHRoaXMub25waW5nLmJpbmQodGhpcykpLCBvbihzb2NrZXQsIFwiZGF0YVwiLCB0aGlzLm9uZGF0YS5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImVycm9yXCIsIHRoaXMub25lcnJvci5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImNsb3NlXCIsIHRoaXMub25jbG9zZS5iaW5kKHRoaXMpKSwgb24odGhpcy5kZWNvZGVyLCBcImRlY29kZWRcIiwgdGhpcy5vbmRlY29kZWQuYmluZCh0aGlzKSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHBpbmcuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucGluZygpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwaW5nXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRhdGEoZGF0YSkge1xuICAgICAgICB0aGlzLmRlY29kZXIuYWRkKGRhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBwYXJzZXIgZnVsbHkgZGVjb2RlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kZWNvZGVkKHBhY2tldCkge1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzb2NrZXQgZXJyb3IuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzb2NrZXQgZm9yIHRoZSBnaXZlbiBgbnNwYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1NvY2tldH1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc29ja2V0KG5zcCwgb3B0cykge1xuICAgICAgICBsZXQgc29ja2V0ID0gdGhpcy5uc3BzW25zcF07XG4gICAgICAgIGlmICghc29ja2V0KSB7XG4gICAgICAgICAgICBzb2NrZXQgPSBuZXcgU29ja2V0KHRoaXMsIG5zcCwgb3B0cyk7XG4gICAgICAgICAgICB0aGlzLm5zcHNbbnNwXSA9IHNvY2tldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc29ja2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHNvY2tldCBjbG9zZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzb2NrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kZXN0cm95KHNvY2tldCkge1xuICAgICAgICBjb25zdCBuc3BzID0gT2JqZWN0LmtleXModGhpcy5uc3BzKTtcbiAgICAgICAgZm9yIChjb25zdCBuc3Agb2YgbnNwcykge1xuICAgICAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5uc3BzW25zcF07XG4gICAgICAgICAgICBpZiAoc29ja2V0LmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcGFja2V0KHBhY2tldCkge1xuICAgICAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IHRoaXMuZW5jb2Rlci5lbmNvZGUocGFja2V0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUud3JpdGUoZW5jb2RlZFBhY2tldHNbaV0sIHBhY2tldC5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhbiB1cCB0cmFuc3BvcnQgc3Vic2NyaXB0aW9ucyBhbmQgcGFja2V0IGJ1ZmZlci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgdGhpcy5zdWJzLmZvckVhY2goKHN1YkRlc3Ryb3kpID0+IHN1YkRlc3Ryb3koKSk7XG4gICAgICAgIHRoaXMuc3Vicy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmRlY29kZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZSB0aGUgY3VycmVudCBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9jbG9zZSgpIHtcbiAgICAgICAgdGhpcy5za2lwUmVjb25uZWN0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5fcmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgLy8gYG9uY2xvc2VgIHdpbGwgbm90IGZpcmUgYmVjYXVzZVxuICAgICAgICAgICAgLy8gYW4gb3BlbiBldmVudCBuZXZlciBoYXBwZW5lZFxuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICBpZiAodGhpcy5lbmdpbmUpXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5jbG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgY2xvc2UoKVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNsb3NlKHJlYXNvbikge1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNsb3NlXCIsIHJlYXNvbik7XG4gICAgICAgIGlmICh0aGlzLl9yZWNvbm5lY3Rpb24gJiYgIXRoaXMuc2tpcFJlY29ubmVjdCkge1xuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0IGEgcmVjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICByZWNvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZWNvbm5lY3RpbmcgfHwgdGhpcy5za2lwUmVjb25uZWN0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5iYWNrb2ZmLmF0dGVtcHRzID49IHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2ZhaWxlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSB0aGlzLmJhY2tvZmYuZHVyYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX3JlY29ubmVjdGluZyA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCB0aW1lciA9IHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfYXR0ZW1wdFwiLCBzZWxmLmJhY2tvZmYuYXR0ZW1wdHMpO1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGFnYWluIGZvciB0aGUgY2FzZSBzb2NrZXQgY2xvc2VkIGluIGFib3ZlIGV2ZW50c1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBzZWxmLm9wZW4oKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdF9lcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vbnJlY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG9VbnJlZikge1xuICAgICAgICAgICAgICAgIHRpbWVyLnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YnMucHVzaChmdW5jdGlvbiBzdWJEZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlY29ubmVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25yZWNvbm5lY3QoKSB7XG4gICAgICAgIGNvbnN0IGF0dGVtcHQgPSB0aGlzLmJhY2tvZmYuYXR0ZW1wdHM7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RcIiwgYXR0ZW1wdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgdXJsIH0gZnJvbSBcIi4vdXJsLmpzXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4vbWFuYWdlci5qc1wiO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG4vKipcbiAqIE1hbmFnZXJzIGNhY2hlLlxuICovXG5jb25zdCBjYWNoZSA9IHt9O1xuZnVuY3Rpb24gbG9va3VwKHVyaSwgb3B0cykge1xuICAgIGlmICh0eXBlb2YgdXJpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgY29uc3QgcGFyc2VkID0gdXJsKHVyaSwgb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiKTtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXJzZWQuc291cmNlO1xuICAgIGNvbnN0IGlkID0gcGFyc2VkLmlkO1xuICAgIGNvbnN0IHBhdGggPSBwYXJzZWQucGF0aDtcbiAgICBjb25zdCBzYW1lTmFtZXNwYWNlID0gY2FjaGVbaWRdICYmIHBhdGggaW4gY2FjaGVbaWRdW1wibnNwc1wiXTtcbiAgICBjb25zdCBuZXdDb25uZWN0aW9uID0gb3B0cy5mb3JjZU5ldyB8fFxuICAgICAgICBvcHRzW1wiZm9yY2UgbmV3IGNvbm5lY3Rpb25cIl0gfHxcbiAgICAgICAgZmFsc2UgPT09IG9wdHMubXVsdGlwbGV4IHx8XG4gICAgICAgIHNhbWVOYW1lc3BhY2U7XG4gICAgbGV0IGlvO1xuICAgIGlmIChuZXdDb25uZWN0aW9uKSB7XG4gICAgICAgIGlvID0gbmV3IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghY2FjaGVbaWRdKSB7XG4gICAgICAgICAgICBjYWNoZVtpZF0gPSBuZXcgTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGlvID0gY2FjaGVbaWRdO1xuICAgIH1cbiAgICBpZiAocGFyc2VkLnF1ZXJ5ICYmICFvcHRzLnF1ZXJ5KSB7XG4gICAgICAgIG9wdHMucXVlcnkgPSBwYXJzZWQucXVlcnlLZXk7XG4gICAgfVxuICAgIHJldHVybiBpby5zb2NrZXQocGFyc2VkLnBhdGgsIG9wdHMpO1xufVxuLy8gc28gdGhhdCBcImxvb2t1cFwiIGNhbiBiZSB1c2VkIGJvdGggYXMgYSBmdW5jdGlvbiAoZS5nLiBgaW8oLi4uKWApIGFuZCBhcyBhXG4vLyBuYW1lc3BhY2UgKGUuZy4gYGlvLmNvbm5lY3QoLi4uKWApLCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuT2JqZWN0LmFzc2lnbihsb29rdXAsIHtcbiAgICBNYW5hZ2VyLFxuICAgIFNvY2tldCxcbiAgICBpbzogbG9va3VwLFxuICAgIGNvbm5lY3Q6IGxvb2t1cCxcbn0pO1xuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHsgcHJvdG9jb2wgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuLyoqXG4gKiBFeHBvc2UgY29uc3RydWN0b3JzIGZvciBzdGFuZGFsb25lIGJ1aWxkLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHsgTWFuYWdlciwgU29ja2V0LCBsb29rdXAgYXMgaW8sIGxvb2t1cCBhcyBjb25uZWN0LCBsb29rdXAgYXMgZGVmYXVsdCwgfTtcbiIsImltcG9ydCB7IGlvIH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuY29uc3Qgc29ja2V0ID0gaW8oKTtcbmNvbnN0IG15RmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGYWNlXCIpO1xuXG5sZXQgbXlTdHJlYW07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhKCkge1xuICB0cnkge1xuICAgIG15U3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgYXVkaW86IHRydWUsXG4gICAgICB2aWRlbzogdHJ1ZSxcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhteVN0cmVhbSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICB9XG59XG5cbmdldE1lZGlhKCk7XG4iXSwibmFtZXMiOlsicmUiLCJwYXJ0cyIsInBhcnNldXJpIiwic3RyIiwic3JjIiwiYiIsImluZGV4T2YiLCJlIiwic3Vic3RyaW5nIiwicmVwbGFjZSIsImxlbmd0aCIsIm0iLCJleGVjIiwidXJpIiwiaSIsInNvdXJjZSIsImhvc3QiLCJhdXRob3JpdHkiLCJpcHY2dXJpIiwicGF0aE5hbWVzIiwicXVlcnlLZXkiLCJvYmoiLCJwYXRoIiwicmVneCIsIm5hbWVzIiwic3BsaXQiLCJzdWJzdHIiLCJzcGxpY2UiLCJxdWVyeSIsImRhdGEiLCIkMCIsIiQxIiwiJDIiLCJ1cmwiLCJsb2MiLCJsb2NhdGlvbiIsInByb3RvY29sIiwiY2hhckF0IiwidGVzdCIsInBvcnQiLCJpcHY2IiwiaWQiLCJocmVmIiwiaGFzQ29yc01vZHVsZSIsIlhNTEh0dHBSZXF1ZXN0IiwiZXJyIiwic2VsZiIsIndpbmRvdyIsIkZ1bmN0aW9uIiwib3B0cyIsInhkb21haW4iLCJoYXNDT1JTIiwiZ2xvYmFsVGhpcyIsImNvbmNhdCIsImpvaW4iLCJwaWNrIiwiYXR0ciIsInJlZHVjZSIsImFjYyIsImsiLCJoYXNPd25Qcm9wZXJ0eSIsIk5BVElWRV9TRVRfVElNRU9VVCIsInNldFRpbWVvdXQiLCJOQVRJVkVfQ0xFQVJfVElNRU9VVCIsImNsZWFyVGltZW91dCIsImluc3RhbGxUaW1lckZ1bmN0aW9ucyIsInVzZU5hdGl2ZVRpbWVycyIsInNldFRpbWVvdXRGbiIsImJpbmQiLCJjbGVhclRpbWVvdXRGbiIsIkVtaXR0ZXIiLCJtaXhpbiIsImtleSIsInByb3RvdHlwZSIsIm9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZm4iLCJfY2FsbGJhY2tzIiwicHVzaCIsIm9uY2UiLCJvZmYiLCJhcHBseSIsImFyZ3VtZW50cyIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNhbGxiYWNrcyIsImNiIiwiZW1pdCIsImFyZ3MiLCJBcnJheSIsInNsaWNlIiwibGVuIiwiZW1pdFJlc2VydmVkIiwibGlzdGVuZXJzIiwiaGFzTGlzdGVuZXJzIiwiUEFDS0VUX1RZUEVTIiwiT2JqZWN0IiwiY3JlYXRlIiwiUEFDS0VUX1RZUEVTX1JFVkVSU0UiLCJrZXlzIiwiZm9yRWFjaCIsIkVSUk9SX1BBQ0tFVCIsInR5cGUiLCJ3aXRoTmF0aXZlQmxvYiIsIkJsb2IiLCJ0b1N0cmluZyIsImNhbGwiLCJ3aXRoTmF0aXZlQXJyYXlCdWZmZXIiLCJBcnJheUJ1ZmZlciIsImlzVmlldyIsImJ1ZmZlciIsImVuY29kZVBhY2tldCIsInN1cHBvcnRzQmluYXJ5IiwiY2FsbGJhY2siLCJlbmNvZGVCbG9iQXNCYXNlNjQiLCJmaWxlUmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImNvbnRlbnQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwibG9va3VwIiwiZGVjb2RlIiwiZGVjb2RlUGFja2V0IiwiZW5jb2RlZFBhY2tldCIsImJpbmFyeVR5cGUiLCJtYXBCaW5hcnkiLCJkZWNvZGVCYXNlNjRQYWNrZXQiLCJwYWNrZXRUeXBlIiwiZGVjb2RlZCIsImJhc2U2NCIsIlNFUEFSQVRPUiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImVuY29kZVBheWxvYWQiLCJwYWNrZXRzIiwiZW5jb2RlZFBhY2tldHMiLCJjb3VudCIsInBhY2tldCIsImRlY29kZVBheWxvYWQiLCJlbmNvZGVkUGF5bG9hZCIsImRlY29kZWRQYWNrZXQiLCJUcmFuc3BvcnQiLCJ3cml0YWJsZSIsInJlYWR5U3RhdGUiLCJzb2NrZXQiLCJtc2ciLCJkZXNjIiwiRXJyb3IiLCJkZXNjcmlwdGlvbiIsImRvT3BlbiIsImRvQ2xvc2UiLCJvbkNsb3NlIiwid3JpdGUiLCJvblBhY2tldCIsImFscGhhYmV0IiwibWFwIiwic2VlZCIsInByZXYiLCJlbmNvZGUiLCJudW0iLCJlbmNvZGVkIiwiTWF0aCIsImZsb29yIiwieWVhc3QiLCJub3ciLCJEYXRlIiwieWVhc3RfMSIsImVuY29kZVVSSUNvbXBvbmVudCIsInFzIiwicXJ5IiwicGFpcnMiLCJsIiwicGFpciIsImRlY29kZVVSSUNvbXBvbmVudCIsIlBvbGxpbmciLCJwb2xsaW5nIiwicG9sbCIsIm9uUGF1c2UiLCJwYXVzZSIsInRvdGFsIiwiZG9Qb2xsIiwib25PcGVuIiwiY2xvc2UiLCJkb1dyaXRlIiwic2NoZW1hIiwic2VjdXJlIiwidGltZXN0YW1wUmVxdWVzdHMiLCJ0aW1lc3RhbXBQYXJhbSIsInNpZCIsImI2NCIsIk51bWJlciIsImVuY29kZWRRdWVyeSIsInBhcnNlcXMiLCJob3N0bmFtZSIsImVtcHR5IiwiaGFzWEhSMiIsInhociIsInJlc3BvbnNlVHlwZSIsIlhIUiIsImlzU1NMIiwieGQiLCJ4cyIsImZvcmNlQmFzZTY0IiwiYXNzaWduIiwiUmVxdWVzdCIsInJlcSIsInJlcXVlc3QiLCJtZXRob2QiLCJvbkVycm9yIiwib25EYXRhIiwicG9sbFhociIsImFzeW5jIiwidW5kZWZpbmVkIiwieHNjaGVtZSIsIm9wZW4iLCJleHRyYUhlYWRlcnMiLCJzZXREaXNhYmxlSGVhZGVyQ2hlY2siLCJzZXRSZXF1ZXN0SGVhZGVyIiwid2l0aENyZWRlbnRpYWxzIiwicmVxdWVzdFRpbWVvdXQiLCJ0aW1lb3V0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwic3RhdHVzIiwib25Mb2FkIiwic2VuZCIsImRvY3VtZW50IiwiaW5kZXgiLCJyZXF1ZXN0c0NvdW50IiwicmVxdWVzdHMiLCJjbGVhbnVwIiwib25TdWNjZXNzIiwiZnJvbUVycm9yIiwiYWJvcnQiLCJyZXNwb25zZVRleHQiLCJhdHRhY2hFdmVudCIsInVubG9hZEhhbmRsZXIiLCJ0ZXJtaW5hdGlvbkV2ZW50IiwibmV4dFRpY2siLCJpc1Byb21pc2VBdmFpbGFibGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJXZWJTb2NrZXQiLCJNb3pXZWJTb2NrZXQiLCJ1c2luZ0Jyb3dzZXJXZWJTb2NrZXQiLCJkZWZhdWx0QmluYXJ5VHlwZSIsImlzUmVhY3ROYXRpdmUiLCJuYXZpZ2F0b3IiLCJwcm9kdWN0IiwidG9Mb3dlckNhc2UiLCJXUyIsImNoZWNrIiwicHJvdG9jb2xzIiwiaGVhZGVycyIsIndzIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJvbm9wZW4iLCJhdXRvVW5yZWYiLCJfc29ja2V0IiwidW5yZWYiLCJvbmNsb3NlIiwib25tZXNzYWdlIiwiZXYiLCJvbmVycm9yIiwibGFzdFBhY2tldCIsIm5hbWUiLCJ0cmFuc3BvcnRzIiwid2Vic29ja2V0IiwiU29ja2V0Iiwid3JpdGVCdWZmZXIiLCJwcmV2QnVmZmVyTGVuIiwiYWdlbnQiLCJ1cGdyYWRlIiwicmVtZW1iZXJVcGdyYWRlIiwicmVqZWN0VW5hdXRob3JpemVkIiwicGVyTWVzc2FnZURlZmxhdGUiLCJ0aHJlc2hvbGQiLCJ0cmFuc3BvcnRPcHRpb25zIiwiY2xvc2VPbkJlZm9yZXVubG9hZCIsInVwZ3JhZGVzIiwicGluZ0ludGVydmFsIiwicGluZ1RpbWVvdXQiLCJwaW5nVGltZW91dFRpbWVyIiwidHJhbnNwb3J0Iiwib2ZmbGluZUV2ZW50TGlzdGVuZXIiLCJjbG9uZSIsIkVJTyIsInByaW9yV2Vic29ja2V0U3VjY2VzcyIsImNyZWF0ZVRyYW5zcG9ydCIsInNoaWZ0Iiwic2V0VHJhbnNwb3J0Iiwib25EcmFpbiIsImZhaWxlZCIsIm9uVHJhbnNwb3J0T3BlbiIsInVwZ3JhZGluZyIsImZsdXNoIiwiZnJlZXplVHJhbnNwb3J0IiwiZXJyb3IiLCJvblRyYW5zcG9ydENsb3NlIiwib251cGdyYWRlIiwidG8iLCJwcm9iZSIsIm9uSGFuZHNoYWtlIiwiSlNPTiIsInBhcnNlIiwicmVzZXRQaW5nVGltZW91dCIsInNlbmRQYWNrZXQiLCJjb2RlIiwiZmlsdGVyVXBncmFkZXMiLCJvcHRpb25zIiwiY29tcHJlc3MiLCJjbGVhbnVwQW5kQ2xvc2UiLCJ3YWl0Rm9yVXBncmFkZSIsInJlYXNvbiIsImZpbHRlcmVkVXBncmFkZXMiLCJqIiwibyIsIndpdGhOYXRpdmVGaWxlIiwiRmlsZSIsImlzQmluYXJ5IiwiaGFzQmluYXJ5IiwidG9KU09OIiwiaXNBcnJheSIsImRlY29uc3RydWN0UGFja2V0IiwiYnVmZmVycyIsInBhY2tldERhdGEiLCJwYWNrIiwiX2RlY29uc3RydWN0UGFja2V0IiwiYXR0YWNobWVudHMiLCJwbGFjZWhvbGRlciIsIl9wbGFjZWhvbGRlciIsIm5ld0RhdGEiLCJyZWNvbnN0cnVjdFBhY2tldCIsIl9yZWNvbnN0cnVjdFBhY2tldCIsIlBhY2tldFR5cGUiLCJFbmNvZGVyIiwiRVZFTlQiLCJBQ0siLCJCSU5BUllfRVZFTlQiLCJCSU5BUllfQUNLIiwiZW5jb2RlQXNCaW5hcnkiLCJlbmNvZGVBc1N0cmluZyIsIm5zcCIsInN0cmluZ2lmeSIsImRlY29uc3RydWN0aW9uIiwidW5zaGlmdCIsIkRlY29kZXIiLCJkZWNvZGVTdHJpbmciLCJyZWNvbnN0cnVjdG9yIiwiQmluYXJ5UmVjb25zdHJ1Y3RvciIsInRha2VCaW5hcnlEYXRhIiwicCIsInN0YXJ0IiwiYnVmIiwiYyIsIm5leHQiLCJwYXlsb2FkIiwidHJ5UGFyc2UiLCJpc1BheWxvYWRWYWxpZCIsImZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24iLCJDT05ORUNUIiwiRElTQ09OTkVDVCIsIkNPTk5FQ1RfRVJST1IiLCJyZWNvblBhY2siLCJiaW5EYXRhIiwic3ViRGVzdHJveSIsIlJFU0VSVkVEX0VWRU5UUyIsImZyZWV6ZSIsImNvbm5lY3QiLCJjb25uZWN0X2Vycm9yIiwiZGlzY29ubmVjdCIsImRpc2Nvbm5lY3RpbmciLCJuZXdMaXN0ZW5lciIsImlvIiwiY29ubmVjdGVkIiwiZGlzY29ubmVjdGVkIiwicmVjZWl2ZUJ1ZmZlciIsInNlbmRCdWZmZXIiLCJpZHMiLCJhY2tzIiwiZmxhZ3MiLCJhdXRoIiwiX2F1dG9Db25uZWN0Iiwic3VicyIsIm9ucGFja2V0Iiwic3ViRXZlbnRzIiwiX3JlYWR5U3RhdGUiLCJwb3AiLCJpc1RyYW5zcG9ydFdyaXRhYmxlIiwiZW5naW5lIiwiZGlzY2FyZFBhY2tldCIsIl9wYWNrZXQiLCJzYW1lTmFtZXNwYWNlIiwib25jb25uZWN0Iiwib25ldmVudCIsIm9uYWNrIiwib25kaXNjb25uZWN0IiwibWVzc2FnZSIsImFjayIsImVtaXRFdmVudCIsIl9hbnlMaXN0ZW5lcnMiLCJsaXN0ZW5lciIsInNlbnQiLCJlbWl0QnVmZmVyZWQiLCJkZXN0cm95IiwiYmFja28yIiwiQmFja29mZiIsIm1zIiwibWluIiwibWF4IiwiZmFjdG9yIiwiaml0dGVyIiwiYXR0ZW1wdHMiLCJkdXJhdGlvbiIsInBvdyIsInJhbmQiLCJyYW5kb20iLCJkZXZpYXRpb24iLCJyZXNldCIsInNldE1pbiIsInNldE1heCIsInNldEppdHRlciIsIk1hbmFnZXIiLCJfYSIsIm5zcHMiLCJyZWNvbm5lY3Rpb24iLCJyZWNvbm5lY3Rpb25BdHRlbXB0cyIsIkluZmluaXR5IiwicmVjb25uZWN0aW9uRGVsYXkiLCJyZWNvbm5lY3Rpb25EZWxheU1heCIsInJhbmRvbWl6YXRpb25GYWN0b3IiLCJiYWNrb2ZmIiwiX3BhcnNlciIsInBhcnNlciIsImVuY29kZXIiLCJkZWNvZGVyIiwiYXV0b0Nvbm5lY3QiLCJ2IiwiX3JlY29ubmVjdGlvbiIsIl9yZWNvbm5lY3Rpb25BdHRlbXB0cyIsIl9yZWNvbm5lY3Rpb25EZWxheSIsIl9yYW5kb21pemF0aW9uRmFjdG9yIiwiX3JlY29ubmVjdGlvbkRlbGF5TWF4IiwiX3RpbWVvdXQiLCJfcmVjb25uZWN0aW5nIiwicmVjb25uZWN0IiwiRW5naW5lIiwic2tpcFJlY29ubmVjdCIsIm9wZW5TdWJEZXN0cm95IiwiZXJyb3JTdWIiLCJtYXliZVJlY29ubmVjdE9uT3BlbiIsInRpbWVyIiwib25waW5nIiwib25kYXRhIiwib25kZWNvZGVkIiwiYWRkIiwiYWN0aXZlIiwiX2Nsb3NlIiwiZGVsYXkiLCJvbnJlY29ubmVjdCIsImF0dGVtcHQiLCJjYWNoZSIsInBhcnNlZCIsIm5ld0Nvbm5lY3Rpb24iLCJmb3JjZU5ldyIsIm11bHRpcGxleCIsImdldEVsZW1lbnRCeUlkIiwibXlTdHJlYW0iLCJnZXRNZWRpYSIsIm1lZGlhRGV2aWNlcyIsImdldFVzZXJNZWRpYSIsImF1ZGlvIiwidmlkZW8iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQU9BLElBQUlBLEVBQUUsR0FBRyx5T0FBVDtFQUVBLElBQUlDLEtBQUssR0FBRyxDQUNSLFFBRFEsRUFDRSxVQURGLEVBQ2MsV0FEZCxFQUMyQixVQUQzQixFQUN1QyxNQUR2QyxFQUMrQyxVQUQvQyxFQUMyRCxNQUQzRCxFQUNtRSxNQURuRSxFQUMyRSxVQUQzRSxFQUN1RixNQUR2RixFQUMrRixXQUQvRixFQUM0RyxNQUQ1RyxFQUNvSCxPQURwSCxFQUM2SCxRQUQ3SCxDQUFaOztNQUlBQyxRQUFjLEdBQUcsU0FBU0EsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUI7RUFDcEMsTUFBSUMsR0FBRyxHQUFHRCxHQUFWO0VBQUEsTUFDSUUsQ0FBQyxHQUFHRixHQUFHLENBQUNHLE9BQUosQ0FBWSxHQUFaLENBRFI7RUFBQSxNQUVJQyxDQUFDLEdBQUdKLEdBQUcsQ0FBQ0csT0FBSixDQUFZLEdBQVosQ0FGUjs7RUFJQSxNQUFJRCxDQUFDLElBQUksQ0FBQyxDQUFOLElBQVdFLENBQUMsSUFBSSxDQUFDLENBQXJCLEVBQXdCO0VBQ3BCSixJQUFBQSxHQUFHLEdBQUdB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
