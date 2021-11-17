
  /**
   * @license
   * jswebrtcfe.js v1.0.0
   * Released under the MIT License.
   */

(function () {
    'use strict';

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

    function url(uri, path = "", loc) {
      let obj = uri; // default to window.location

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
      const ipv6 = obj.host.indexOf(":") !== -1;
      const host = ipv6 ? "[" + obj.host + "]" : obj.host; // define unique id

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

    var globalThis = (() => {
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
      const xdomain = opts.xdomain; // XMLHttpRequest can be disabled on IE

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

    function pick(obj, ...attr) {
      return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
          acc[k] = obj[k];
        }

        return acc;
      }, {});
    } // Keep a reference to the real timeout functions so they can be used when overridden

    const NATIVE_SET_TIMEOUT = setTimeout;
    const NATIVE_CLEAR_TIMEOUT = clearTimeout;
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

    const PACKET_TYPES = Object.create(null); // no Map = no polyfill

    PACKET_TYPES["open"] = "0";
    PACKET_TYPES["close"] = "1";
    PACKET_TYPES["ping"] = "2";
    PACKET_TYPES["pong"] = "3";
    PACKET_TYPES["message"] = "4";
    PACKET_TYPES["upgrade"] = "5";
    PACKET_TYPES["noop"] = "6";
    const PACKET_TYPES_REVERSE = Object.create(null);
    Object.keys(PACKET_TYPES).forEach(key => {
      PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
    });
    const ERROR_PACKET = {
      type: "error",
      data: "parser error"
    };

    const withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
    const withNativeArrayBuffer$2 = typeof ArrayBuffer === "function"; // ArrayBuffer.isView method is not defined in IE10

    const isView$1 = obj => {
      return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
    };

    const encodePacket = ({
      type,
      data
    }, supportsBinary, callback) => {
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

    const encodeBlobAsBase64 = (data, callback) => {
      const fileReader = new FileReader();

      fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
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

    var decode$1 = function (base64) {
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

    const withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";

    const decodePacket = (encodedPacket, binaryType) => {
      if (typeof encodedPacket !== "string") {
        return {
          type: "message",
          data: mapBinary(encodedPacket, binaryType)
        };
      }

      const type = encodedPacket.charAt(0);

      if (type === "b") {
        return {
          type: "message",
          data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
      }

      const packetType = PACKET_TYPES_REVERSE[type];

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

    const decodeBase64Packet = (data, binaryType) => {
      if (withNativeArrayBuffer$1) {
        const decoded = decode$1(data);
        return mapBinary(decoded, binaryType);
      } else {
        return {
          base64: true,
          data
        }; // fallback for old browsers
      }
    };

    const mapBinary = (data, binaryType) => {
      switch (binaryType) {
        case "blob":
          return data instanceof ArrayBuffer ? new Blob([data]) : data;

        case "arraybuffer":
        default:
          return data;
        // assuming the data is already an ArrayBuffer
      }
    };

    const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

    const encodePayload = (packets, callback) => {
      // some packets may be added to the array while encoding, so the initial length must be saved
      const length = packets.length;
      const encodedPackets = new Array(length);
      let count = 0;
      packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        encodePacket(packet, false, encodedPacket => {
          encodedPackets[i] = encodedPacket;

          if (++count === length) {
            callback(encodedPackets.join(SEPARATOR));
          }
        });
      });
    };

    const decodePayload = (encodedPayload, binaryType) => {
      const encodedPackets = encodedPayload.split(SEPARATOR);
      const packets = [];

      for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = decodePacket(encodedPackets[i], binaryType);
        packets.push(decodedPacket);

        if (decodedPacket.type === "error") {
          break;
        }
      }

      return packets;
    };

    const protocol$1 = 4;

    class Transport extends Emitter_1 {
      /**
       * Transport abstract constructor.
       *
       * @param {Object} options.
       * @api private
       */
      constructor(opts) {
        super();
        this.writable = false;
        installTimerFunctions(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.readyState = "";
        this.socket = opts.socket;
      }
      /**
       * Emits an error.
       *
       * @param {String} str
       * @return {Transport} for chaining
       * @api protected
       */


      onError(msg, desc) {
        const err = new Error(msg); // @ts-ignore

        err.type = "TransportError"; // @ts-ignore

        err.description = desc;
        super.emit("error", err);
        return this;
      }
      /**
       * Opens the transport.
       *
       * @api public
       */


      open() {
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


      close() {
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


      send(packets) {
        if ("open" === this.readyState) {
          this.write(packets);
        }
      }
      /**
       * Called upon open
       *
       * @api protected
       */


      onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emit("open");
      }
      /**
       * Called with data.
       *
       * @param {String} data
       * @api protected
       */


      onData(data) {
        const packet = decodePacket(data, this.socket.binaryType);
        this.onPacket(packet);
      }
      /**
       * Called with a decoded packet.
       *
       * @api protected
       */


      onPacket(packet) {
        super.emit("packet", packet);
      }
      /**
       * Called upon close.
       *
       * @api protected
       */


      onClose() {
        this.readyState = "closed";
        super.emit("close");
      }

    }

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


    for (; i < length; i++) map[alphabet[i]] = i; //
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

    class Polling extends Transport {
      constructor() {
        super(...arguments);
        this.polling = false;
      }
      /**
       * Transport name.
       */


      get name() {
        return "polling";
      }
      /**
       * Opens the socket (triggers polling). We write a PING message to determine
       * when the transport is open.
       *
       * @api private
       */


      doOpen() {
        this.poll();
      }
      /**
       * Pauses polling.
       *
       * @param {Function} callback upon buffers are flushed and transport is paused
       * @api private
       */


      pause(onPause) {
        this.readyState = "pausing";

        const pause = () => {
          this.readyState = "paused";
          onPause();
        };

        if (this.polling || !this.writable) {
          let total = 0;

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


      poll() {
        this.polling = true;
        this.doPoll();
        this.emit("poll");
      }
      /**
       * Overloads onData to detect payloads.
       *
       * @api private
       */


      onData(data) {
        const callback = packet => {
          // if its the first message we consider the transport open
          if ("opening" === this.readyState && packet.type === "open") {
            this.onOpen();
          } // if its a close packet, we close the ongoing requests


          if ("close" === packet.type) {
            this.onClose();
            return false;
          } // otherwise bypass onData and handle the message


          this.onPacket(packet);
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


      doClose() {
        const close = () => {
          this.write([{
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


      write(packets) {
        this.writable = false;
        encodePayload(packets, data => {
          this.doWrite(data, () => {
            this.writable = true;
            this.emit("drain");
          });
        });
      }
      /**
       * Generates uri for connection.
       *
       * @api private
       */


      uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "https" : "http";
        let port = ""; // cache busting is forced

        if (false !== this.opts.timestampRequests) {
          query[this.opts.timestampParam] = yeast_1();
        }

        if (!this.supportsBinary && !query.sid) {
          query.b64 = 1;
        } // avoid port if default for schema


        if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        }

        const encodedQuery = parseqs.encode(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
      }

    }

    /* global attachEvent */
    /**
     * Empty function
     */

    function empty() {}

    const hasXHR2 = function () {
      const xhr = new XMLHttpRequest$1({
        xdomain: false
      });
      return null != xhr.responseType;
    }();

    class XHR extends Polling {
      /**
       * XHR Polling constructor.
       *
       * @param {Object} opts
       * @api public
       */
      constructor(opts) {
        super(opts);

        if (typeof location !== "undefined") {
          const isSSL = "https:" === location.protocol;
          let port = location.port; // some user agents have empty `location.port`

          if (!port) {
            port = isSSL ? "443" : "80";
          }

          this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
          this.xs = opts.secure !== isSSL;
        }
        /**
         * XHR supports binary
         */


        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
      }
      /**
       * Creates a request.
       *
       * @param {String} method
       * @api private
       */


      request(opts = {}) {
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


      doWrite(data, fn) {
        const req = this.request({
          method: "POST",
          data: data
        });
        req.on("success", fn);
        req.on("error", err => {
          this.onError("xhr post error", err);
        });
      }
      /**
       * Starts a poll cycle.
       *
       * @api private
       */


      doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", err => {
          this.onError("xhr poll error", err);
        });
        this.pollXhr = req;
      }

    }
    class Request extends Emitter_1 {
      /**
       * Request constructor
       *
       * @param {Object} options
       * @api public
       */
      constructor(uri, opts) {
        super();
        installTimerFunctions(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.async = false !== opts.async;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
      }
      /**
       * Creates the XHR object and sends the request.
       *
       * @api private
       */


      create() {
        const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        const xhr = this.xhr = new XMLHttpRequest$1(opts);

        try {
          xhr.open(this.method, this.uri, this.async);

          try {
            if (this.opts.extraHeaders) {
              xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);

              for (let i in this.opts.extraHeaders) {
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

          xhr.onreadystatechange = () => {
            if (4 !== xhr.readyState) return;

            if (200 === xhr.status || 1223 === xhr.status) {
              this.onLoad();
            } else {
              // make sure the `error` event handler that's user-set
              // does not throw in the same tick and gets caught here
              this.setTimeoutFn(() => {
                this.onError(typeof xhr.status === "number" ? xhr.status : 0);
              }, 0);
            }
          };

          xhr.send(this.data);
        } catch (e) {
          // Need to defer since .create() is called directly from the constructor
          // and thus the 'error' event can only be only bound *after* this exception
          // occurs.  Therefore, also, we cannot throw here at all.
          this.setTimeoutFn(() => {
            this.onError(e);
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


      onSuccess() {
        this.emit("success");
        this.cleanup();
      }
      /**
       * Called if we have data.
       *
       * @api private
       */


      onData(data) {
        this.emit("data", data);
        this.onSuccess();
      }
      /**
       * Called upon error.
       *
       * @api private
       */


      onError(err) {
        this.emit("error", err);
        this.cleanup(true);
      }
      /**
       * Cleans up house.
       *
       * @api private
       */


      cleanup(fromError) {
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


      onLoad() {
        const data = this.xhr.responseText;

        if (data !== null) {
          this.onData(data);
        }
      }
      /**
       * Aborts the request.
       *
       * @api public
       */


      abort() {
        this.cleanup();
      }

    }
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
        const terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
      }
    }

    function unloadHandler() {
      for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
          Request.requests[i].abort();
        }
      }
    }

    const nextTick = (() => {
      const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";

      if (isPromiseAvailable) {
        return cb => Promise.resolve().then(cb);
      } else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
      }
    })();
    const WebSocket = globalThis.WebSocket || globalThis.MozWebSocket;
    const usingBrowserWebSocket = true;
    const defaultBinaryType = "arraybuffer";

    const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
    class WS extends Transport {
      /**
       * WebSocket transport constructor.
       *
       * @api {Object} connection options
       * @api public
       */
      constructor(opts) {
        super(opts);
        this.supportsBinary = !opts.forceBase64;
      }
      /**
       * Transport name.
       *
       * @api public
       */


      get name() {
        return "websocket";
      }
      /**
       * Opens socket.
       *
       * @api private
       */


      doOpen() {
        if (!this.check()) {
          // let probe timeout
          return;
        }

        const uri = this.uri();
        const protocols = this.opts.protocols; // React Native only supports the 'headers' option, and will print a warning if anything else is passed

        const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");

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


      addEventListeners() {
        this.ws.onopen = () => {
          if (this.opts.autoUnref) {
            this.ws._socket.unref();
          }

          this.onOpen();
        };

        this.ws.onclose = this.onClose.bind(this);

        this.ws.onmessage = ev => this.onData(ev.data);

        this.ws.onerror = e => this.onError("websocket error", e);
      }
      /**
       * Writes data to socket.
       *
       * @param {Array} array of packets.
       * @api private
       */


      write(packets) {
        this.writable = false; // encodePacket efficient as it uses WS framing
        // no need for encodePayload

        for (let i = 0; i < packets.length; i++) {
          const packet = packets[i];
          const lastPacket = i === packets.length - 1;
          encodePacket(packet, this.supportsBinary, data => {
            // always create a new object (GH-437)
            const opts = {};
            // have a chance of informing us about it yet, in that case send will
            // throw an error


            try {
              if (usingBrowserWebSocket) {
                // TypeError is thrown when passing the second argument on Safari
                this.ws.send(data);
              }
            } catch (e) {}

            if (lastPacket) {
              // fake drain
              // defer to next tick to allow Socket to clear writeBuffer
              nextTick(() => {
                this.writable = true;
                this.emit("drain");
              }, this.setTimeoutFn);
            }
          });
        }
      }
      /**
       * Closes socket.
       *
       * @api private
       */


      doClose() {
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


      uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "wss" : "ws";
        let port = ""; // avoid port if default for schema

        if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        } // append timestamp to URI


        if (this.opts.timestampRequests) {
          query[this.opts.timestampParam] = yeast_1();
        } // communicate binary support capabilities


        if (!this.supportsBinary) {
          query.b64 = 1;
        }

        const encodedQuery = parseqs.encode(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
      }
      /**
       * Feature detection for WebSocket.
       *
       * @return {Boolean} whether this transport is available.
       * @api public
       */


      check() {
        return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
      }

    }

    const transports = {
      websocket: WS,
      polling: XHR
    };

    class Socket$1 extends Emitter_1 {
      /**
       * Socket constructor.
       *
       * @param {String|Object} uri or options
       * @param {Object} opts - options
       * @api public
       */
      constructor(uri, opts = {}) {
        super();

        if (uri && "object" === typeof uri) {
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

        installTimerFunctions(this, opts);
        this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;

        if (opts.hostname && !opts.port) {
          // if no port is specified manually, use the protocol default
          opts.port = this.secure ? "443" : "80";
        }

        this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
        this.transports = opts.transports || ["polling", "websocket"];
        this.readyState = "";
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
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
        this.opts.path = this.opts.path.replace(/\/$/, "") + "/";

        if (typeof this.opts.query === "string") {
          this.opts.query = parseqs.decode(this.opts.query);
        } // set on handshake


        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null; // set on heartbeat

        this.pingTimeoutTimer = null;

        if (typeof addEventListener === "function") {
          if (this.opts.closeOnBeforeunload) {
            // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
            // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
            // closed/reloaded)
            addEventListener("beforeunload", () => {
              if (this.transport) {
                // silently close the transport
                this.transport.removeAllListeners();
                this.transport.close();
              }
            }, false);
          }

          if (this.hostname !== "localhost") {
            this.offlineEventListener = () => {
              this.onClose("transport close");
            };

            addEventListener("offline", this.offlineEventListener, false);
          }
        }

        this.open();
      }
      /**
       * Creates transport of the given type.
       *
       * @param {String} transport name
       * @return {Transport}
       * @api private
       */


      createTransport(name) {
        const query = clone(this.opts.query); // append engine.io protocol identifier

        query.EIO = protocol$1; // transport name

        query.transport = name; // session id if we already have one

        if (this.id) query.sid = this.id;
        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
          query,
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


      open() {
        let transport;

        if (this.opts.rememberUpgrade && Socket$1.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
          transport = "websocket";
        } else if (0 === this.transports.length) {
          // Emit error on next tick so it can be listened to
          this.setTimeoutFn(() => {
            this.emitReserved("error", "No transports available");
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


      setTransport(transport) {
        if (this.transport) {
          this.transport.removeAllListeners();
        } // set up transport


        this.transport = transport; // set up transport listeners

        transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", () => {
          this.onClose("transport close");
        });
      }
      /**
       * Probes a transport.
       *
       * @param {String} transport name
       * @api private
       */


      probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        Socket$1.priorWebsocketSuccess = false;

        const onTransportOpen = () => {
          if (failed) return;
          transport.send([{
            type: "ping",
            data: "probe"
          }]);
          transport.once("packet", msg => {
            if (failed) return;

            if ("pong" === msg.type && "probe" === msg.data) {
              this.upgrading = true;
              this.emitReserved("upgrading", transport);
              if (!transport) return;
              Socket$1.priorWebsocketSuccess = "websocket" === transport.name;
              this.transport.pause(() => {
                if (failed) return;
                if ("closed" === this.readyState) return;
                cleanup();
                this.setTransport(transport);
                transport.send([{
                  type: "upgrade"
                }]);
                this.emitReserved("upgrade", transport);
                transport = null;
                this.upgrading = false;
                this.flush();
              });
            } else {
              const err = new Error("probe error"); // @ts-ignore

              err.transport = transport.name;
              this.emitReserved("upgradeError", err);
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


        const onerror = err => {
          const error = new Error("probe error: " + err); // @ts-ignore

          error.transport = transport.name;
          freezeTransport();
          this.emitReserved("upgradeError", error);
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


        const cleanup = () => {
          transport.removeListener("open", onTransportOpen);
          transport.removeListener("error", onerror);
          transport.removeListener("close", onTransportClose);
          this.off("close", onclose);
          this.off("upgrading", onupgrade);
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


      onOpen() {
        this.readyState = "open";
        Socket$1.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush(); // we check for `readyState` in case an `open`
        // listener already closed the socket

        if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
          let i = 0;
          const l = this.upgrades.length;

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


      onPacket(packet) {
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
              const err = new Error("server error"); // @ts-ignore

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


      onHandshake(data) {
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


      resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(() => {
          this.onClose("ping timeout");
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


      onDrain() {
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


      flush() {
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


      write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }

      send(msg, options, fn) {
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


      sendPacket(type, data, options, fn) {
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
        const packet = {
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


      close() {
        const close = () => {
          this.onClose("forced close");
          this.transport.close();
        };

        const cleanupAndClose = () => {
          this.off("upgrade", cleanupAndClose);
          this.off("upgradeError", cleanupAndClose);
          close();
        };

        const waitForUpgrade = () => {
          // wait for upgrade to finish since we can't send packets while pausing a transport
          this.once("upgrade", cleanupAndClose);
          this.once("upgradeError", cleanupAndClose);
        };

        if ("opening" === this.readyState || "open" === this.readyState) {
          this.readyState = "closing";

          if (this.writeBuffer.length) {
            this.once("drain", () => {
              if (this.upgrading) {
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


      onError(err) {
        Socket$1.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
      }
      /**
       * Called upon transport close.
       *
       * @api private
       */


      onClose(reason, desc) {
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


      filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;

        for (; i < j; i++) {
          if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
        }

        return filteredUpgrades;
      }

    }
    Socket$1.protocol = protocol$1;

    function clone(obj) {
      const o = {};

      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          o[i] = obj[i];
        }
      }

      return o;
    }

    Socket$1.protocol;

    const withNativeArrayBuffer = typeof ArrayBuffer === "function";

    const isView = obj => {
      return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
    };

    const toString = Object.prototype.toString;
    const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
    const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
    /**
     * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
     *
     * @private
     */

    function isBinary(obj) {
      return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
    }
    function hasBinary(obj, toJSON) {
      if (!obj || typeof obj !== "object") {
        return false;
      }

      if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
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

      for (const key in obj) {
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
      const buffers = [];
      const packetData = packet.data;
      const pack = packet;
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
        const placeholder = {
          _placeholder: true,
          num: buffers.length
        };
        buffers.push(data);
        return placeholder;
      } else if (Array.isArray(data)) {
        const newData = new Array(data.length);

        for (let i = 0; i < data.length; i++) {
          newData[i] = _deconstructPacket(data[i], buffers);
        }

        return newData;
      } else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            newData[key] = _deconstructPacket(data[key], buffers);
          }
        }

        return newData;
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
        for (let i = 0; i < data.length; i++) {
          data[i] = _reconstructPacket(data[i], buffers);
        }
      } else if (typeof data === "object") {
        for (const key in data) {
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

    const protocol = 5;
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


    class Encoder {
      /**
       * Encode a packet as a single string if non-binary, or as a
       * buffer sequence, depending on packet type.
       *
       * @param {Object} obj - packet object
       */
      encode(obj) {
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


      encodeAsString(obj) {
        // first is type
        let str = "" + obj.type; // attachments if we have them

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


      encodeAsBinary(obj) {
        const deconstruction = deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list

        return buffers; // write all the buffers
      }

    }
    /**
     * A socket.io Decoder instance
     *
     * @return {Object} decoder
     */

    class Decoder extends Emitter_1 {
      constructor() {
        super();
      }
      /**
       * Decodes an encoded packet string into packet JSON.
       *
       * @param {String} obj - encoded packet
       */


      add(obj) {
        let packet;

        if (typeof obj === "string") {
          packet = this.decodeString(obj);

          if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
            // binary packet's json
            this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

            if (packet.attachments === 0) {
              super.emitReserved("decoded", packet);
            }
          } else {
            // non-binary full packet
            super.emitReserved("decoded", packet);
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
              super.emitReserved("decoded", packet);
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


      decodeString(str) {
        let i = 0; // look up type

        const p = {
          type: Number(str.charAt(0))
        };

        if (PacketType[p.type] === undefined) {
          throw new Error("unknown packet type " + p.type);
        } // look up attachments if type binary


        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
          const start = i + 1;

          while (str.charAt(++i) !== "-" && i != str.length) {}

          const buf = str.substring(start, i);

          if (buf != Number(buf) || str.charAt(i) !== "-") {
            throw new Error("Illegal attachments");
          }

          p.attachments = Number(buf);
        } // look up namespace (if any)


        if ("/" === str.charAt(i + 1)) {
          const start = i + 1;

          while (++i) {
            const c = str.charAt(i);
            if ("," === c) break;
            if (i === str.length) break;
          }

          p.nsp = str.substring(start, i);
        } else {
          p.nsp = "/";
        } // look up id


        const next = str.charAt(i + 1);

        if ("" !== next && Number(next) == next) {
          const start = i + 1;

          while (++i) {
            const c = str.charAt(i);

            if (null == c || Number(c) != c) {
              --i;
              break;
            }

            if (i === str.length) break;
          }

          p.id = Number(str.substring(start, i + 1));
        } // look up json data


        if (str.charAt(++i)) {
          const payload = tryParse(str.substr(i));

          if (Decoder.isPayloadValid(p.type, payload)) {
            p.data = payload;
          } else {
            throw new Error("invalid payload");
          }
        }

        return p;
      }

      static isPayloadValid(type, payload) {
        switch (type) {
          case PacketType.CONNECT:
            return typeof payload === "object";

          case PacketType.DISCONNECT:
            return payload === undefined;

          case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || typeof payload === "object";

          case PacketType.EVENT:
          case PacketType.BINARY_EVENT:
            return Array.isArray(payload) && payload.length > 0;

          case PacketType.ACK:
          case PacketType.BINARY_ACK:
            return Array.isArray(payload);
        }
      }
      /**
       * Deallocates a parser's resources
       */


      destroy() {
        if (this.reconstructor) {
          this.reconstructor.finishedReconstruction();
        }
      }

    }

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


    class BinaryReconstructor {
      constructor(packet) {
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


      takeBinaryData(binData) {
        this.buffers.push(binData);

        if (this.buffers.length === this.reconPack.attachments) {
          // done with buffer list
          const packet = reconstructPacket(this.reconPack, this.buffers);
          this.finishedReconstruction();
          return packet;
        }

        return null;
      }
      /**
       * Cleans up binary packet reconstruction variables.
       */


      finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
      }

    }

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

    const RESERVED_EVENTS = Object.freeze({
      connect: 1,
      connect_error: 1,
      disconnect: 1,
      disconnecting: 1,
      // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
      newListener: 1,
      removeListener: 1
    });
    class Socket extends Emitter_1 {
      /**
       * `Socket` constructor.
       *
       * @public
       */
      constructor(io, nsp, opts) {
        super();
        this.connected = false;
        this.disconnected = true;
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;

        if (opts && opts.auth) {
          this.auth = opts.auth;
        }

        if (this.io._autoConnect) this.open();
      }
      /**
       * Subscribe to open, close and packet events
       *
       * @private
       */


      subEvents() {
        if (this.subs) return;
        const io = this.io;
        this.subs = [on(io, "open", this.onopen.bind(this)), on(io, "packet", this.onpacket.bind(this)), on(io, "error", this.onerror.bind(this)), on(io, "close", this.onclose.bind(this))];
      }
      /**
       * Whether the Socket will try to reconnect when its Manager connects or reconnects
       */


      get active() {
        return !!this.subs;
      }
      /**
       * "Opens" the socket.
       *
       * @public
       */


      connect() {
        if (this.connected) return this;
        this.subEvents();
        if (!this.io["_reconnecting"]) this.io.open(); // ensure open

        if ("open" === this.io._readyState) this.onopen();
        return this;
      }
      /**
       * Alias for connect()
       */


      open() {
        return this.connect();
      }
      /**
       * Sends a `message` event.
       *
       * @return self
       * @public
       */


      send(...args) {
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


      emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
          throw new Error('"' + ev + '" is a reserved event name');
        }

        args.unshift(ev);
        const packet = {
          type: PacketType.EVENT,
          data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false; // event ack callback

        if ("function" === typeof args[args.length - 1]) {
          this.acks[this.ids] = args.pop();
          packet.id = this.ids++;
        }

        const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);

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


      packet(packet) {
        packet.nsp = this.nsp;

        this.io._packet(packet);
      }
      /**
       * Called upon engine `open`.
       *
       * @private
       */


      onopen() {
        if (typeof this.auth == "function") {
          this.auth(data => {
            this.packet({
              type: PacketType.CONNECT,
              data
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


      onerror(err) {
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


      onclose(reason) {
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


      onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace) return;

        switch (packet.type) {
          case PacketType.CONNECT:
            if (packet.data && packet.data.sid) {
              const id = packet.data.sid;
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
            const err = new Error(packet.data.message); // @ts-ignore

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


      onevent(packet) {
        const args = packet.data || [];

        if (null != packet.id) {
          args.push(this.ack(packet.id));
        }

        if (this.connected) {
          this.emitEvent(args);
        } else {
          this.receiveBuffer.push(Object.freeze(args));
        }
      }

      emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
          const listeners = this._anyListeners.slice();

          for (const listener of listeners) {
            listener.apply(this, args);
          }
        }

        super.emit.apply(this, args);
      }
      /**
       * Produces an ack callback to emit with an event.
       *
       * @private
       */


      ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
          // prevent double callbacks
          if (sent) return;
          sent = true;
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


      onack(packet) {
        const ack = this.acks[packet.id];

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


      onconnect(id) {
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


      emitBuffered() {
        this.receiveBuffer.forEach(args => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach(packet => this.packet(packet));
        this.sendBuffer = [];
      }
      /**
       * Called upon server disconnect.
       *
       * @private
       */


      ondisconnect() {
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


      destroy() {
        if (this.subs) {
          // clean subscriptions to avoid reconnections
          this.subs.forEach(subDestroy => subDestroy());
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


      disconnect() {
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


      close() {
        return this.disconnect();
      }
      /**
       * Sets the compress flag.
       *
       * @param compress - if `true`, compresses the sending data
       * @return self
       * @public
       */


      compress(compress) {
        this.flags.compress = compress;
        return this;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
       * ready to send messages.
       *
       * @returns self
       * @public
       */


      get volatile() {
        this.flags.volatile = true;
        return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback.
       *
       * @param listener
       * @public
       */


      onAny(listener) {
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


      prependAny(listener) {
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


      offAny(listener) {
        if (!this._anyListeners) {
          return this;
        }

        if (listener) {
          const listeners = this._anyListeners;

          for (let i = 0; i < listeners.length; i++) {
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


      listenersAny() {
        return this._anyListeners || [];
      }

    }

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

    class Manager extends Emitter_1 {
      constructor(uri, opts) {
        var _a;

        super();
        this.nsps = {};
        this.subs = [];

        if (uri && "object" === typeof uri) {
          opts = uri;
          uri = undefined;
        }

        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        installTimerFunctions(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new backo2({
          min: this.reconnectionDelay(),
          max: this.reconnectionDelayMax(),
          jitter: this.randomizationFactor()
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;

        const _parser = opts.parser || parser;

        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect) this.open();
      }

      reconnection(v) {
        if (!arguments.length) return this._reconnection;
        this._reconnection = !!v;
        return this;
      }

      reconnectionAttempts(v) {
        if (v === undefined) return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
      }

      reconnectionDelay(v) {
        var _a;

        if (v === undefined) return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
      }

      randomizationFactor(v) {
        var _a;

        if (v === undefined) return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
      }

      reconnectionDelayMax(v) {
        var _a;

        if (v === undefined) return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
      }

      timeout(v) {
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


      maybeReconnectOnOpen() {
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


      open(fn) {
        if (~this._readyState.indexOf("open")) return this;
        this.engine = new Socket$1(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false; // emit `open`

        const openSubDestroy = on(socket, "open", function () {
          self.onopen();
          fn && fn();
        }); // emit `error`

        const errorSub = on(socket, "error", err => {
          self.cleanup();
          self._readyState = "closed";
          this.emitReserved("error", err);

          if (fn) {
            fn(err);
          } else {
            // Only do this if there is no fn to handle the error
            self.maybeReconnectOnOpen();
          }
        });

        if (false !== this._timeout) {
          const timeout = this._timeout;

          if (timeout === 0) {
            openSubDestroy(); // prevents a race condition with the 'open' event
          } // set timer


          const timer = this.setTimeoutFn(() => {
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


      connect(fn) {
        return this.open(fn);
      }
      /**
       * Called upon transport open.
       *
       * @private
       */


      onopen() {
        // clear old subs
        this.cleanup(); // mark as open

        this._readyState = "open";
        this.emitReserved("open"); // add new subs

        const socket = this.engine;
        this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
      }
      /**
       * Called upon a ping.
       *
       * @private
       */


      onping() {
        this.emitReserved("ping");
      }
      /**
       * Called with data.
       *
       * @private
       */


      ondata(data) {
        this.decoder.add(data);
      }
      /**
       * Called when parser fully decodes a packet.
       *
       * @private
       */


      ondecoded(packet) {
        this.emitReserved("packet", packet);
      }
      /**
       * Called upon socket error.
       *
       * @private
       */


      onerror(err) {
        this.emitReserved("error", err);
      }
      /**
       * Creates a new socket for the given `nsp`.
       *
       * @return {Socket}
       * @public
       */


      socket(nsp, opts) {
        let socket = this.nsps[nsp];

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


      _destroy(socket) {
        const nsps = Object.keys(this.nsps);

        for (const nsp of nsps) {
          const socket = this.nsps[nsp];

          if (socket.active) {
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


      _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);

        for (let i = 0; i < encodedPackets.length; i++) {
          this.engine.write(encodedPackets[i], packet.options);
        }
      }
      /**
       * Clean up transport subscriptions and packet buffer.
       *
       * @private
       */


      cleanup() {
        this.subs.forEach(subDestroy => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
      }
      /**
       * Close the current socket.
       *
       * @private
       */


      _close() {
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


      disconnect() {
        return this._close();
      }
      /**
       * Called upon engine close.
       *
       * @private
       */


      onclose(reason) {
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


      reconnect() {
        if (this._reconnecting || this.skipReconnect) return this;
        const self = this;

        if (this.backoff.attempts >= this._reconnectionAttempts) {
          this.backoff.reset();
          this.emitReserved("reconnect_failed");
          this._reconnecting = false;
        } else {
          const delay = this.backoff.duration();
          this._reconnecting = true;
          const timer = this.setTimeoutFn(() => {
            if (self.skipReconnect) return;
            this.emitReserved("reconnect_attempt", self.backoff.attempts); // check again for the case socket closed in above events

            if (self.skipReconnect) return;
            self.open(err => {
              if (err) {
                self._reconnecting = false;
                self.reconnect();
                this.emitReserved("reconnect_error", err);
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


      onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
      }

    }

    /**
     * Managers cache.
     */

    const cache = {};

    function lookup(uri, opts) {
      if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
      }

      opts = opts || {};
      const parsed = url(uri, opts.path || "/socket.io");
      const source = parsed.source;
      const id = parsed.id;
      const path = parsed.path;
      const sameNamespace = cache[id] && path in cache[id]["nsps"];
      const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
      let io;

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
      Manager,
      Socket,
      io: lookup,
      connect: lookup
    });

    const socket = lookup.connect("http://176.34.63.148:3000");
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

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvcGFyc2V1cmkvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vdXJsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy1jb3JzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2dsb2JhbFRoaXMuYnJvd3Nlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3htbGh0dHByZXF1ZXN0LmJyb3dzZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ac29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2NvbW1vbnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vZW5jb2RlUGFja2V0LmJyb3dzZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFzZTY0LWFycmF5YnVmZmVyL2Rpc3QvYmFzZTY0LWFycmF5YnVmZmVyLmVzNS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9kZWNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMveWVhc3QvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvcGFyc2Vxcy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3BvbGxpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5icm93c2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtL2lzLWJpbmFyeS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2J1aWxkL2VzbS9iaW5hcnkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhY2tvMi9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9tYW5hZ2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL2luZGV4LmpzIiwiLi4vLi4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBhcnNlcyBhbiBVUklcbiAqXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcblxudmFyIHBhcnRzID0gW1xuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpIHtcbiAgICB2YXIgc3JjID0gc3RyLFxuICAgICAgICBiID0gc3RyLmluZGV4T2YoJ1snKSxcbiAgICAgICAgZSA9IHN0ci5pbmRleE9mKCddJyk7XG5cbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJyksXG4gICAgICAgIHVyaSA9IHt9LFxuICAgICAgICBpID0gMTQ7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cblxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcbiAgICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdC5zdWJzdHJpbmcoMSwgdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXJpLnBhdGhOYW1lcyA9IHBhdGhOYW1lcyh1cmksIHVyaVsncGF0aCddKTtcbiAgICB1cmkucXVlcnlLZXkgPSBxdWVyeUtleSh1cmksIHVyaVsncXVlcnknXSk7XG5cbiAgICByZXR1cm4gdXJpO1xufTtcblxuZnVuY3Rpb24gcGF0aE5hbWVzKG9iaiwgcGF0aCkge1xuICAgIHZhciByZWd4ID0gL1xcL3syLDl9L2csXG4gICAgICAgIG5hbWVzID0gcGF0aC5yZXBsYWNlKHJlZ3gsIFwiL1wiKS5zcGxpdChcIi9cIik7XG5cbiAgICBpZiAocGF0aC5zdWJzdHIoMCwgMSkgPT0gJy8nIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZSgwLCAxKTtcbiAgICB9XG4gICAgaWYgKHBhdGguc3Vic3RyKHBhdGgubGVuZ3RoIC0gMSwgMSkgPT0gJy8nKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZShuYW1lcy5sZW5ndGggLSAxLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZXM7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5S2V5KHVyaSwgcXVlcnkpIHtcbiAgICB2YXIgZGF0YSA9IHt9O1xuXG4gICAgcXVlcnkucmVwbGFjZSgvKD86XnwmKShbXiY9XSopPT8oW14mXSopL2csIGZ1bmN0aW9uICgkMCwgJDEsICQyKSB7XG4gICAgICAgIGlmICgkMSkge1xuICAgICAgICAgICAgZGF0YVskMV0gPSAkMjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJpbXBvcnQgcGFyc2V1cmkgZnJvbSBcInBhcnNldXJpXCI7XG4vKipcbiAqIFVSTCBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHVyaSAtIHVybFxuICogQHBhcmFtIHBhdGggLSB0aGUgcmVxdWVzdCBwYXRoIG9mIHRoZSBjb25uZWN0aW9uXG4gKiBAcGFyYW0gbG9jIC0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cbiAqICAgICAgICBEZWZhdWx0cyB0byB3aW5kb3cubG9jYXRpb24uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cmwodXJpLCBwYXRoID0gXCJcIiwgbG9jKSB7XG4gICAgbGV0IG9iaiA9IHVyaTtcbiAgICAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxuICAgIGxvYyA9IGxvYyB8fCAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIGxvY2F0aW9uKTtcbiAgICBpZiAobnVsbCA9PSB1cmkpXG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIFwiLy9cIiArIGxvYy5ob3N0O1xuICAgIC8vIHJlbGF0aXZlIHBhdGggc3VwcG9ydFxuICAgIGlmICh0eXBlb2YgdXJpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChcIi9cIiA9PT0gdXJpLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgaWYgKFwiL1wiID09PSB1cmkuY2hhckF0KDEpKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLmhvc3QgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvXihodHRwcz98d3NzPyk6XFwvXFwvLy50ZXN0KHVyaSkpIHtcbiAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgbG9jKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgXCIvL1wiICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJpID0gXCJodHRwczovL1wiICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHBhcnNlXG4gICAgICAgIG9iaiA9IHBhcnNldXJpKHVyaSk7XG4gICAgfVxuICAgIC8vIG1ha2Ugc3VyZSB3ZSB0cmVhdCBgbG9jYWxob3N0OjgwYCBhbmQgYGxvY2FsaG9zdGAgZXF1YWxseVxuICAgIGlmICghb2JqLnBvcnQpIHtcbiAgICAgICAgaWYgKC9eKGh0dHB8d3MpJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICAgICAgICBvYmoucG9ydCA9IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgvXihodHRwfHdzKXMkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgICAgICAgIG9iai5wb3J0ID0gXCI0NDNcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvYmoucGF0aCA9IG9iai5wYXRoIHx8IFwiL1wiO1xuICAgIGNvbnN0IGlwdjYgPSBvYmouaG9zdC5pbmRleE9mKFwiOlwiKSAhPT0gLTE7XG4gICAgY29uc3QgaG9zdCA9IGlwdjYgPyBcIltcIiArIG9iai5ob3N0ICsgXCJdXCIgOiBvYmouaG9zdDtcbiAgICAvLyBkZWZpbmUgdW5pcXVlIGlkXG4gICAgb2JqLmlkID0gb2JqLnByb3RvY29sICsgXCI6Ly9cIiArIGhvc3QgKyBcIjpcIiArIG9iai5wb3J0ICsgcGF0aDtcbiAgICAvLyBkZWZpbmUgaHJlZlxuICAgIG9iai5ocmVmID1cbiAgICAgICAgb2JqLnByb3RvY29sICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgaG9zdCArXG4gICAgICAgICAgICAobG9jICYmIGxvYy5wb3J0ID09PSBvYmoucG9ydCA/IFwiXCIgOiBcIjpcIiArIG9iai5wb3J0KTtcbiAgICByZXR1cm4gb2JqO1xufVxuIiwiXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICpcbiAqIExvZ2ljIGJvcnJvd2VkIGZyb20gTW9kZXJuaXpyOlxuICpcbiAqICAgLSBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvY29ycy5qc1xuICovXG5cbnRyeSB7XG4gIG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufSBjYXRjaCAoZXJyKSB7XG4gIC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbiAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG4gIG1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG59XG4iLCJleHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgICB9XG59KSgpO1xuIiwiLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcbmltcG9ydCBoYXNDT1JTIGZyb20gXCJoYXMtY29yc1wiO1xuaW1wb3J0IGdsb2JhbFRoaXMgZnJvbSBcIi4uL2dsb2JhbFRoaXMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgY29uc3QgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcbiAgICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgICB0cnkge1xuICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7IH1cbiAgICBpZiAoIXhkb21haW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgZ2xvYmFsVGhpc1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXShcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICB9XG59XG4iLCJpbXBvcnQgZ2xvYmFsVGhpcyBmcm9tIFwiLi9nbG9iYWxUaGlzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gcGljayhvYmosIC4uLmF0dHIpIHtcbiAgICByZXR1cm4gYXR0ci5yZWR1Y2UoKGFjYywgaykgPT4ge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBhY2Nba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4vLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSByZWFsIHRpbWVvdXQgZnVuY3Rpb25zIHNvIHRoZXkgY2FuIGJlIHVzZWQgd2hlbiBvdmVycmlkZGVuXG5jb25zdCBOQVRJVkVfU0VUX1RJTUVPVVQgPSBzZXRUaW1lb3V0O1xuY29uc3QgTkFUSVZFX0NMRUFSX1RJTUVPVVQgPSBjbGVhclRpbWVvdXQ7XG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbFRpbWVyRnVuY3Rpb25zKG9iaiwgb3B0cykge1xuICAgIGlmIChvcHRzLnVzZU5hdGl2ZVRpbWVycykge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gTkFUSVZFX1NFVF9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgICAgIG9iai5jbGVhclRpbWVvdXRGbiA9IE5BVElWRV9DTEVBUl9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gc2V0VGltZW91dC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgICAgICBvYmouY2xlYXJUaW1lb3V0Rm4gPSBjbGVhclRpbWVvdXQuYmluZChnbG9iYWxUaGlzKTtcbiAgICB9XG59XG4iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5leHBvcnRzLkVtaXR0ZXIgPSBFbWl0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGV2ZW50IHNwZWNpZmljIGFycmF5cyBmb3IgZXZlbnQgdHlwZXMgdGhhdCBub1xuICAvLyBvbmUgaXMgc3Vic2NyaWJlZCBmb3IgdG8gYXZvaWQgbWVtb3J5IGxlYWsuXG4gIGlmIChjYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICB9XG5cbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBhbGlhcyB1c2VkIGZvciByZXNlcnZlZCBldmVudHMgKHByb3RlY3RlZCBtZXRob2QpXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0UmVzZXJ2ZWQgPSBFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4vKipcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xufTtcbiIsImNvbnN0IFBBQ0tFVF9UWVBFUyA9IE9iamVjdC5jcmVhdGUobnVsbCk7IC8vIG5vIE1hcCA9IG5vIHBvbHlmaWxsXG5QQUNLRVRfVFlQRVNbXCJvcGVuXCJdID0gXCIwXCI7XG5QQUNLRVRfVFlQRVNbXCJjbG9zZVwiXSA9IFwiMVwiO1xuUEFDS0VUX1RZUEVTW1wicGluZ1wiXSA9IFwiMlwiO1xuUEFDS0VUX1RZUEVTW1wicG9uZ1wiXSA9IFwiM1wiO1xuUEFDS0VUX1RZUEVTW1wibWVzc2FnZVwiXSA9IFwiNFwiO1xuUEFDS0VUX1RZUEVTW1widXBncmFkZVwiXSA9IFwiNVwiO1xuUEFDS0VUX1RZUEVTW1wibm9vcFwiXSA9IFwiNlwiO1xuY29uc3QgUEFDS0VUX1RZUEVTX1JFVkVSU0UgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuT2JqZWN0LmtleXMoUEFDS0VUX1RZUEVTKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgUEFDS0VUX1RZUEVTX1JFVkVSU0VbUEFDS0VUX1RZUEVTW2tleV1dID0ga2V5O1xufSk7XG5jb25zdCBFUlJPUl9QQUNLRVQgPSB7IHR5cGU6IFwiZXJyb3JcIiwgZGF0YTogXCJwYXJzZXIgZXJyb3JcIiB9O1xuZXhwb3J0IHsgUEFDS0VUX1RZUEVTLCBQQUNLRVRfVFlQRVNfUkVWRVJTRSwgRVJST1JfUEFDS0VUIH07XG4iLCJpbXBvcnQgeyBQQUNLRVRfVFlQRVMgfSBmcm9tIFwiLi9jb21tb25zLmpzXCI7XG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKEJsb2IpID09PSBcIltvYmplY3QgQmxvYkNvbnN0cnVjdG9yXVwiKTtcbmNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuLy8gQXJyYXlCdWZmZXIuaXNWaWV3IG1ldGhvZCBpcyBub3QgZGVmaW5lZCBpbiBJRTEwXG5jb25zdCBpc1ZpZXcgPSBvYmogPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iaiAmJiBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59O1xuY29uc3QgZW5jb2RlUGFja2V0ID0gKHsgdHlwZSwgZGF0YSB9LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spID0+IHtcbiAgICBpZiAod2l0aE5hdGl2ZUJsb2IgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYkFzQmFzZTY0KGRhdGEsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiZcbiAgICAgICAgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcoZGF0YSkpKSB7XG4gICAgICAgIGlmIChzdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZUJsb2JBc0Jhc2U2NChuZXcgQmxvYihbZGF0YV0pLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcGxhaW4gc3RyaW5nXG4gICAgcmV0dXJuIGNhbGxiYWNrKFBBQ0tFVF9UWVBFU1t0eXBlXSArIChkYXRhIHx8IFwiXCIpKTtcbn07XG5jb25zdCBlbmNvZGVCbG9iQXNCYXNlNjQgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGZpbGVSZWFkZXIucmVzdWx0LnNwbGl0KFwiLFwiKVsxXTtcbiAgICAgICAgY2FsbGJhY2soXCJiXCIgKyBjb250ZW50KTtcbiAgICB9O1xuICAgIHJldHVybiBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZGF0YSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZW5jb2RlUGFja2V0O1xuIiwiLypcbiAqIGJhc2U2NC1hcnJheWJ1ZmZlciAxLjAuMSA8aHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlcj5cbiAqIENvcHlyaWdodCAoYykgMjAyMSBOaWtsYXMgdm9uIEhlcnR6ZW4gPGh0dHBzOi8vaGVydHplbi5jb20+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgTGljZW5zZVxuICovXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG4vLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguXG52YXIgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG59XG52YXIgZW5jb2RlID0gZnVuY3Rpb24gKGFycmF5YnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykge1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107XG4gICAgfVxuICAgIGlmIChsZW4gJSAzID09PSAyKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nO1xuICAgIH1cbiAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JztcbiAgICB9XG4gICAgcmV0dXJuIGJhc2U2NDtcbn07XG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKGJhc2U2NCkge1xuICAgIHZhciBidWZmZXJMZW5ndGggPSBiYXNlNjQubGVuZ3RoICogMC43NSwgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSAnPScpIHtcbiAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSAnPScpIHtcbiAgICAgICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICAgICAgZW5jb2RlZDEgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSldO1xuICAgICAgICBlbmNvZGVkMiA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMSldO1xuICAgICAgICBlbmNvZGVkMyA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMildO1xuICAgICAgICBlbmNvZGVkNCA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMyldO1xuICAgICAgICBieXRlc1twKytdID0gKGVuY29kZWQxIDw8IDIpIHwgKGVuY29kZWQyID4+IDQpO1xuICAgICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMiAmIDE1KSA8PCA0KSB8IChlbmNvZGVkMyA+PiAyKTtcbiAgICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDMgJiAzKSA8PCA2KSB8IChlbmNvZGVkNCAmIDYzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5YnVmZmVyO1xufTtcblxuZXhwb3J0IHsgZGVjb2RlLCBlbmNvZGUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2U2NC1hcnJheWJ1ZmZlci5lczUuanMubWFwXG4iLCJpbXBvcnQgeyBFUlJPUl9QQUNLRVQsIFBBQ0tFVF9UWVBFU19SRVZFUlNFIH0gZnJvbSBcIi4vY29tbW9ucy5qc1wiO1xuaW1wb3J0IHsgZGVjb2RlIH0gZnJvbSBcImJhc2U2NC1hcnJheWJ1ZmZlclwiO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBkZWNvZGVQYWNrZXQgPSAoZW5jb2RlZFBhY2tldCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZW5jb2RlZFBhY2tldCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICBkYXRhOiBtYXBCaW5hcnkoZW5jb2RlZFBhY2tldCwgYmluYXJ5VHlwZSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGVuY29kZWRQYWNrZXQuY2hhckF0KDApO1xuICAgIGlmICh0eXBlID09PSBcImJcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICBkYXRhOiBkZWNvZGVCYXNlNjRQYWNrZXQoZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSksIGJpbmFyeVR5cGUpXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHBhY2tldFR5cGUgPSBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXTtcbiAgICBpZiAoIXBhY2tldFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIEVSUk9SX1BBQ0tFVDtcbiAgICB9XG4gICAgcmV0dXJuIGVuY29kZWRQYWNrZXQubGVuZ3RoID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdLFxuICAgICAgICAgICAgZGF0YTogZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSlcbiAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdXG4gICAgICAgIH07XG59O1xuY29uc3QgZGVjb2RlQmFzZTY0UGFja2V0ID0gKGRhdGEsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBpZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyKSB7XG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSBkZWNvZGUoZGF0YSk7XG4gICAgICAgIHJldHVybiBtYXBCaW5hcnkoZGVjb2RlZCwgYmluYXJ5VHlwZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4geyBiYXNlNjQ6IHRydWUsIGRhdGEgfTsgLy8gZmFsbGJhY2sgZm9yIG9sZCBicm93c2Vyc1xuICAgIH1cbn07XG5jb25zdCBtYXBCaW5hcnkgPSAoZGF0YSwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIHN3aXRjaCAoYmluYXJ5VHlwZSkge1xuICAgICAgICBjYXNlIFwiYmxvYlwiOlxuICAgICAgICAgICAgcmV0dXJuIGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciA/IG5ldyBCbG9iKFtkYXRhXSkgOiBkYXRhO1xuICAgICAgICBjYXNlIFwiYXJyYXlidWZmZXJcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBkYXRhOyAvLyBhc3N1bWluZyB0aGUgZGF0YSBpcyBhbHJlYWR5IGFuIEFycmF5QnVmZmVyXG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGRlY29kZVBhY2tldDtcbiIsImltcG9ydCBlbmNvZGVQYWNrZXQgZnJvbSBcIi4vZW5jb2RlUGFja2V0LmpzXCI7XG5pbXBvcnQgZGVjb2RlUGFja2V0IGZyb20gXCIuL2RlY29kZVBhY2tldC5qc1wiO1xuY29uc3QgU0VQQVJBVE9SID0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMCk7IC8vIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZWxpbWl0ZXIjQVNDSUlfZGVsaW1pdGVkX3RleHRcbmNvbnN0IGVuY29kZVBheWxvYWQgPSAocGFja2V0cywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzb21lIHBhY2tldHMgbWF5IGJlIGFkZGVkIHRvIHRoZSBhcnJheSB3aGlsZSBlbmNvZGluZywgc28gdGhlIGluaXRpYWwgbGVuZ3RoIG11c3QgYmUgc2F2ZWRcbiAgICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcGFja2V0cy5mb3JFYWNoKChwYWNrZXQsIGkpID0+IHtcbiAgICAgICAgLy8gZm9yY2UgYmFzZTY0IGVuY29kaW5nIGZvciBiaW5hcnkgcGFja2V0c1xuICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgZW5jb2RlZFBhY2tldCA9PiB7XG4gICAgICAgICAgICBlbmNvZGVkUGFja2V0c1tpXSA9IGVuY29kZWRQYWNrZXQ7XG4gICAgICAgICAgICBpZiAoKytjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZW5jb2RlZFBhY2tldHMuam9pbihTRVBBUkFUT1IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgZGVjb2RlUGF5bG9hZCA9IChlbmNvZGVkUGF5bG9hZCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gZW5jb2RlZFBheWxvYWQuc3BsaXQoU0VQQVJBVE9SKTtcbiAgICBjb25zdCBwYWNrZXRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZWNvZGVkUGFja2V0ID0gZGVjb2RlUGFja2V0KGVuY29kZWRQYWNrZXRzW2ldLCBiaW5hcnlUeXBlKTtcbiAgICAgICAgcGFja2V0cy5wdXNoKGRlY29kZWRQYWNrZXQpO1xuICAgICAgICBpZiAoZGVjb2RlZFBhY2tldC50eXBlID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYWNrZXRzO1xufTtcbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDQ7XG5leHBvcnQgeyBlbmNvZGVQYWNrZXQsIGVuY29kZVBheWxvYWQsIGRlY29kZVBhY2tldCwgZGVjb2RlUGF5bG9hZCB9O1xuIiwiaW1wb3J0IHsgZGVjb2RlUGFja2V0IH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuaW1wb3J0IHsgaW5zdGFsbFRpbWVyRnVuY3Rpb25zIH0gZnJvbSBcIi4vdXRpbC5qc1wiO1xuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydCBleHRlbmRzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLnNvY2tldCA9IG9wdHMuc29ja2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xuICAgICAqIEBhcGkgcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25FcnJvcihtc2csIGRlc2MpIHtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZXJyLnR5cGUgPSBcIlRyYW5zcG9ydEVycm9yXCI7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZXJyLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICAgICAgc3VwZXIuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBvcGVuKCkge1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwiXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuaW5nXCI7XG4gICAgICAgICAgICB0aGlzLmRvT3BlbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIHRyYW5zcG9ydC5cbiAgICAgKlxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZG9DbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBzZW5kKHBhY2tldHMpIHtcbiAgICAgICAgaWYgKFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGUocGFja2V0cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIG1pZ2h0IGhhcHBlbiBpZiB0aGUgdHJhbnNwb3J0IHdhcyBzaWxlbnRseSBjbG9zZWQgaW4gdGhlIGJlZm9yZXVubG9hZCBldmVudCBoYW5kbGVyXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gb3BlblxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlblwiO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgc3VwZXIuZW1pdChcIm9wZW5cIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICAgICAqIEBhcGkgcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25EYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcGFja2V0ID0gZGVjb2RlUGFja2V0KGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO1xuICAgICAgICB0aGlzLm9uUGFja2V0KHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIGEgZGVjb2RlZCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uUGFja2V0KHBhY2tldCkge1xuICAgICAgICBzdXBlci5lbWl0KFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICBzdXBlci5lbWl0KFwiY2xvc2VcIik7XG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpXG4gICwgbGVuZ3RoID0gNjRcbiAgLCBtYXAgPSB7fVxuICAsIHNlZWQgPSAwXG4gICwgaSA9IDBcbiAgLCBwcmV2O1xuXG4vKipcbiAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBlbmNvZGUobnVtKSB7XG4gIHZhciBlbmNvZGVkID0gJyc7XG5cbiAgZG8ge1xuICAgIGVuY29kZWQgPSBhbHBoYWJldFtudW0gJSBsZW5ndGhdICsgZW5jb2RlZDtcbiAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gIH0gd2hpbGUgKG51bSA+IDApO1xuXG4gIHJldHVybiBlbmNvZGVkO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gIHZhciBkZWNvZGVkID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVjb2RlZCA9IGRlY29kZWQgKiBsZW5ndGggKyBtYXBbc3RyLmNoYXJBdChpKV07XG4gIH1cblxuICByZXR1cm4gZGVjb2RlZDtcbn1cblxuLyoqXG4gKiBZZWFzdDogQSB0aW55IGdyb3dpbmcgaWQgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24geWVhc3QoKSB7XG4gIHZhciBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuXG4gIGlmIChub3cgIT09IHByZXYpIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgcmV0dXJuIG5vdyArJy4nKyBlbmNvZGUoc2VlZCsrKTtcbn1cblxuLy9cbi8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4vL1xuZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgbWFwW2FscGhhYmV0W2ldXSA9IGk7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4vL1xueWVhc3QuZW5jb2RlID0gZW5jb2RlO1xueWVhc3QuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMgPSB5ZWFzdDtcbiIsIi8qKlxuICogQ29tcGlsZXMgYSBxdWVyeXN0cmluZ1xuICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBzdHIgPSAnJztcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIGlmIChzdHIubGVuZ3RoKSBzdHIgKz0gJyYnO1xuICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG4vKipcbiAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihxcyl7XG4gIHZhciBxcnkgPSB7fTtcbiAgdmFyIHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYWlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgcXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gIH1cbiAgcmV0dXJuIHFyeTtcbn07XG4iLCJpbXBvcnQgeyBUcmFuc3BvcnQgfSBmcm9tIFwiLi4vdHJhbnNwb3J0LmpzXCI7XG5pbXBvcnQgeWVhc3QgZnJvbSBcInllYXN0XCI7XG5pbXBvcnQgcGFyc2VxcyBmcm9tIFwicGFyc2Vxc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGF5bG9hZCwgZGVjb2RlUGF5bG9hZCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5leHBvcnQgY2xhc3MgUG9sbGluZyBleHRlbmRzIFRyYW5zcG9ydCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMucG9sbGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwicG9sbGluZ1wiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gICAgICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIHRoaXMucG9sbCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgcG9sbGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhdXNlKG9uUGF1c2UpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzaW5nXCI7XG4gICAgICAgIGNvbnN0IHBhdXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzZWRcIjtcbiAgICAgICAgICAgIG9uUGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcInBvbGxDb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBwb2xsKCkge1xuICAgICAgICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvUG9sbCgpO1xuICAgICAgICB0aGlzLmVtaXQoXCJwb2xsXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gcGFja2V0ID0+IHtcbiAgICAgICAgICAgIC8vIGlmIGl0cyB0aGUgZmlyc3QgbWVzc2FnZSB3ZSBjb25zaWRlciB0aGUgdHJhbnNwb3J0IG9wZW5cbiAgICAgICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmIHBhY2tldC50eXBlID09PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBpdHMgYSBjbG9zZSBwYWNrZXQsIHdlIGNsb3NlIHRoZSBvbmdvaW5nIHJlcXVlc3RzXG4gICAgICAgICAgICBpZiAoXCJjbG9zZVwiID09PSBwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBieXBhc3Mgb25EYXRhIGFuZCBoYW5kbGUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIHRoaXMub25QYWNrZXQocGFja2V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZGVjb2RlIHBheWxvYWRcbiAgICAgICAgZGVjb2RlUGF5bG9hZChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKS5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICAgICAgLy8gaWYgYW4gZXZlbnQgZGlkIG5vdCB0cmlnZ2VyIGNsb3NpbmdcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgIT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgLy8gaWYgd2UgZ290IGRhdGEgd2UncmUgbm90IHBvbGxpbmdcbiAgICAgICAgICAgIHRoaXMucG9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicG9sbENvbXBsZXRlXCIpO1xuICAgICAgICAgICAgaWYgKFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvciBwb2xsaW5nLCBzZW5kIGEgY2xvc2UgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZG9DbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndyaXRlKFt7IHR5cGU6IFwiY2xvc2VcIiB9XSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbiAgICAgICAgICAgIC8vIGhhbmRzaGFraW5nIGlzIGluIHByb2dyZXNzIChHSC0xNjQpXG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJvcGVuXCIsIGNsb3NlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYSBwYWNrZXRzIHBheWxvYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIHBhY2tldHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBkcmFpbiBjYWxsYmFja1xuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICBlbmNvZGVQYXlsb2FkKHBhY2tldHMsIGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb1dyaXRlKGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHVyaSgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5vcHRzLnNlY3VyZSA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgICAgICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICAgICAgICBpZiAodGhpcy5vcHRzLnBvcnQgJiZcbiAgICAgICAgICAgICgoXCJodHRwc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcImh0dHBcIiA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCkgIT09IDgwKSkpIHtcbiAgICAgICAgICAgIHBvcnQgPSBcIjpcIiArIHRoaXMub3B0cy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgaXB2NiA9IHRoaXMub3B0cy5ob3N0bmFtZS5pbmRleE9mKFwiOlwiKSAhPT0gLTE7XG4gICAgICAgIHJldHVybiAoc2NoZW1hICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgKGlwdjYgPyBcIltcIiArIHRoaXMub3B0cy5ob3N0bmFtZSArIFwiXVwiIDogdGhpcy5vcHRzLmhvc3RuYW1lKSArXG4gICAgICAgICAgICBwb3J0ICtcbiAgICAgICAgICAgIHRoaXMub3B0cy5wYXRoICtcbiAgICAgICAgICAgIChlbmNvZGVkUXVlcnkubGVuZ3RoID8gXCI/XCIgKyBlbmNvZGVkUXVlcnkgOiBcIlwiKSk7XG4gICAgfVxufVxuIiwiLyogZ2xvYmFsIGF0dGFjaEV2ZW50ICovXG5pbXBvcnQgWE1MSHR0cFJlcXVlc3QgZnJvbSBcIi4veG1saHR0cHJlcXVlc3QuanNcIjtcbmltcG9ydCBnbG9iYWxUaGlzIGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBQb2xsaW5nIH0gZnJvbSBcIi4vcG9sbGluZy5qc1wiO1xuLyoqXG4gKiBFbXB0eSBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBlbXB0eSgpIHsgfVxuY29uc3QgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHtcbiAgICAgICAgeGRvbWFpbjogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO1xufSkoKTtcbmV4cG9ydCBjbGFzcyBYSFIgZXh0ZW5kcyBQb2xsaW5nIHtcbiAgICAvKipcbiAgICAgKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjb25zdCBpc1NTTCA9IFwiaHR0cHM6XCIgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICAgICAgbGV0IHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuICAgICAgICAgICAgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuICAgICAgICAgICAgaWYgKCFwb3J0KSB7XG4gICAgICAgICAgICAgICAgcG9ydCA9IGlzU1NMID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueGQgPVxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICAgICAgICAgIHRoaXMueHMgPSBvcHRzLnNlY3VyZSAhPT0gaXNTU0w7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFhIUiBzdXBwb3J0cyBiaW5hcnlcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGZvcmNlQmFzZTY0ID0gb3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0O1xuICAgICAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gaGFzWEhSMiAmJiAhZm9yY2VCYXNlNjQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlcXVlc3Qob3B0cyA9IHt9KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3B0cywgeyB4ZDogdGhpcy54ZCwgeHM6IHRoaXMueHMgfSwgdGhpcy5vcHRzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMudXJpKCksIG9wdHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb1dyaXRlKGRhdGEsIGZuKSB7XG4gICAgICAgIGNvbnN0IHJlcSA9IHRoaXMucmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgcmVxLm9uKFwic3VjY2Vzc1wiLCBmbik7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9zdCBlcnJvclwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvUG9sbCgpIHtcbiAgICAgICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5vbihcImRhdGFcIiwgdGhpcy5vbkRhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9sbCBlcnJvclwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wb2xsWGhyID0gcmVxO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVyaSwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgXCJHRVRcIjtcbiAgICAgICAgdGhpcy51cmkgPSB1cmk7XG4gICAgICAgIHRoaXMuYXN5bmMgPSBmYWxzZSAhPT0gb3B0cy5hc3luYztcbiAgICAgICAgdGhpcy5kYXRhID0gdW5kZWZpbmVkICE9PSBvcHRzLmRhdGEgPyBvcHRzLmRhdGEgOiBudWxsO1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHBpY2sodGhpcy5vcHRzLCBcImFnZW50XCIsIFwicGZ4XCIsIFwia2V5XCIsIFwicGFzc3BocmFzZVwiLCBcImNlcnRcIiwgXCJjYVwiLCBcImNpcGhlcnNcIiwgXCJyZWplY3RVbmF1dGhvcml6ZWRcIiwgXCJhdXRvVW5yZWZcIik7XG4gICAgICAgIG9wdHMueGRvbWFpbiA9ICEhdGhpcy5vcHRzLnhkO1xuICAgICAgICBvcHRzLnhzY2hlbWUgPSAhIXRoaXMub3B0cy54cztcbiAgICAgICAgY29uc3QgeGhyID0gKHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVyaSwgdGhpcy5hc3luYyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sgJiYgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGksIHRoaXMub3B0cy5leHRyYUhlYWRlcnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgaWYgKFwiUE9TVFwiID09PSB0aGlzLm1ldGhvZCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiKi8qXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgLy8gaWU2IGNoZWNrXG4gICAgICAgICAgICBpZiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdGhpcy5vcHRzLndpdGhDcmVkZW50aWFscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucmVxdWVzdFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB4aHIudGltZW91dCA9IHRoaXMub3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKDQgIT09IHhoci5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKDIwMCA9PT0geGhyLnN0YXR1cyB8fCAxMjIzID09PSB4aHIuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGBlcnJvcmAgZXZlbnQgaGFuZGxlciB0aGF0J3MgdXNlci1zZXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9lcyBub3QgdGhyb3cgaW4gdGhlIHNhbWUgdGljayBhbmQgZ2V0cyBjYXVnaHQgaGVyZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IodHlwZW9mIHhoci5zdGF0dXMgPT09IFwibnVtYmVyXCIgPyB4aHIuc3RhdHVzIDogMCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBOZWVkIHRvIGRlZmVyIHNpbmNlIC5jcmVhdGUoKSBpcyBjYWxsZWQgZGlyZWN0bHkgZnJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgICAgIC8vIGFuZCB0aHVzIHRoZSAnZXJyb3InIGV2ZW50IGNhbiBvbmx5IGJlIG9ubHkgYm91bmQgKmFmdGVyKiB0aGlzIGV4Y2VwdGlvblxuICAgICAgICAgICAgLy8gb2NjdXJzLiAgVGhlcmVmb3JlLCBhbHNvLCB3ZSBjYW5ub3QgdGhyb3cgaGVyZSBhdCBhbGwuXG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKGUpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IFJlcXVlc3QucmVxdWVzdHNDb3VudCsrO1xuICAgICAgICAgICAgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uU3VjY2VzcygpIHtcbiAgICAgICAgdGhpcy5lbWl0KFwic3VjY2Vzc1wiKTtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCBpZiB3ZSBoYXZlIGRhdGEuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkRhdGEoZGF0YSkge1xuICAgICAgICB0aGlzLmVtaXQoXCJkYXRhXCIsIGRhdGEpO1xuICAgICAgICB0aGlzLm9uU3VjY2VzcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHRoaXMuY2xlYW51cCh0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGhvdXNlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgY2xlYW51cChmcm9tRXJyb3IpIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICAgICAgICBpZiAoZnJvbUVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBsb2FkLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGEoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBhYm9ydCgpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxufVxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodHlwZW9mIGF0dGFjaEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhdHRhY2hFdmVudChcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IHRlcm1pbmF0aW9uRXZlbnQgPSBcIm9ucGFnZWhpZGVcIiBpbiBnbG9iYWxUaGlzID8gXCJwYWdlaGlkZVwiIDogXCJ1bmxvYWRcIjtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0ZXJtaW5hdGlvbkV2ZW50LCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgICBmb3IgKGxldCBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICAgICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBnbG9iYWxUaGlzIGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5leHBvcnQgY29uc3QgbmV4dFRpY2sgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGlzUHJvbWlzZUF2YWlsYWJsZSA9IHR5cGVvZiBQcm9taXNlID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFByb21pc2UucmVzb2x2ZSA9PT0gXCJmdW5jdGlvblwiO1xuICAgIGlmIChpc1Byb21pc2VBdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIGNiID0+IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oY2IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChjYiwgc2V0VGltZW91dEZuKSA9PiBzZXRUaW1lb3V0Rm4oY2IsIDApO1xuICAgIH1cbn0pKCk7XG5leHBvcnQgY29uc3QgV2ViU29ja2V0ID0gZ2xvYmFsVGhpcy5XZWJTb2NrZXQgfHwgZ2xvYmFsVGhpcy5Nb3pXZWJTb2NrZXQ7XG5leHBvcnQgY29uc3QgdXNpbmdCcm93c2VyV2ViU29ja2V0ID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0QmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiIsImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCBwYXJzZXFzIGZyb20gXCJwYXJzZXFzXCI7XG5pbXBvcnQgeWVhc3QgZnJvbSBcInllYXN0XCI7XG5pbXBvcnQgeyBwaWNrIH0gZnJvbSBcIi4uL3V0aWwuanNcIjtcbmltcG9ydCB7IGRlZmF1bHRCaW5hcnlUeXBlLCBuZXh0VGljaywgdXNpbmdCcm93c2VyV2ViU29ja2V0LCBXZWJTb2NrZXQgfSBmcm9tIFwiLi93ZWJzb2NrZXQtY29uc3RydWN0b3IuanNcIjtcbmltcG9ydCB7IGVuY29kZVBhY2tldCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG4vLyBkZXRlY3QgUmVhY3ROYXRpdmUgZW52aXJvbm1lbnRcbmNvbnN0IGlzUmVhY3ROYXRpdmUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgdHlwZW9mIG5hdmlnYXRvci5wcm9kdWN0ID09PSBcInN0cmluZ1wiICYmXG4gICAgbmF2aWdhdG9yLnByb2R1Y3QudG9Mb3dlckNhc2UoKSA9PT0gXCJyZWFjdG5hdGl2ZVwiO1xuZXhwb3J0IGNsYXNzIFdTIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICAvKipcbiAgICAgKiBXZWJTb2NrZXQgdHJhbnNwb3J0IGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQGFwaSB7T2JqZWN0fSBjb25uZWN0aW9uIG9wdGlvbnNcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cyk7XG4gICAgICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSAhb3B0cy5mb3JjZUJhc2U2NDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNwb3J0IG5hbWUuXG4gICAgICpcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJ3ZWJzb2NrZXRcIjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlbnMgc29ja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZG9PcGVuKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2soKSkge1xuICAgICAgICAgICAgLy8gbGV0IHByb2JlIHRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmkgPSB0aGlzLnVyaSgpO1xuICAgICAgICBjb25zdCBwcm90b2NvbHMgPSB0aGlzLm9wdHMucHJvdG9jb2xzO1xuICAgICAgICAvLyBSZWFjdCBOYXRpdmUgb25seSBzdXBwb3J0cyB0aGUgJ2hlYWRlcnMnIG9wdGlvbiwgYW5kIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIGFueXRoaW5nIGVsc2UgaXMgcGFzc2VkXG4gICAgICAgIGNvbnN0IG9wdHMgPSBpc1JlYWN0TmF0aXZlXG4gICAgICAgICAgICA/IHt9XG4gICAgICAgICAgICA6IHBpY2sodGhpcy5vcHRzLCBcImFnZW50XCIsIFwicGVyTWVzc2FnZURlZmxhdGVcIiwgXCJwZnhcIiwgXCJrZXlcIiwgXCJwYXNzcGhyYXNlXCIsIFwiY2VydFwiLCBcImNhXCIsIFwiY2lwaGVyc1wiLCBcInJlamVjdFVuYXV0aG9yaXplZFwiLCBcImxvY2FsQWRkcmVzc1wiLCBcInByb3RvY29sVmVyc2lvblwiLCBcIm9yaWdpblwiLCBcIm1heFBheWxvYWRcIiwgXCJmYW1pbHlcIiwgXCJjaGVja1NlcnZlcklkZW50aXR5XCIpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgb3B0cy5oZWFkZXJzID0gdGhpcy5vcHRzLmV4dHJhSGVhZGVycztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy53cyA9XG4gICAgICAgICAgICAgICAgdXNpbmdCcm93c2VyV2ViU29ja2V0ICYmICFpc1JlYWN0TmF0aXZlXG4gICAgICAgICAgICAgICAgICAgID8gcHJvdG9jb2xzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBXZWJTb2NrZXQodXJpKVxuICAgICAgICAgICAgICAgICAgICA6IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3MuYmluYXJ5VHlwZSA9IHRoaXMuc29ja2V0LmJpbmFyeVR5cGUgfHwgZGVmYXVsdEJpbmFyeVR5cGU7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHNvY2tldFxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndzLl9zb2NrZXQudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IGV2ID0+IHRoaXMub25EYXRhKGV2LmRhdGEpO1xuICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSBlID0+IHRoaXMub25FcnJvcihcIndlYnNvY2tldCBlcnJvclwiLCBlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgb2YgcGFja2V0cy5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB3cml0ZShwYWNrZXRzKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLy8gZW5jb2RlUGFja2V0IGVmZmljaWVudCBhcyBpdCB1c2VzIFdTIGZyYW1pbmdcbiAgICAgICAgLy8gbm8gbmVlZCBmb3IgZW5jb2RlUGF5bG9hZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldCA9IHBhY2tldHNbaV07XG4gICAgICAgICAgICBjb25zdCBsYXN0UGFja2V0ID0gaSA9PT0gcGFja2V0cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgZW5jb2RlUGFja2V0KHBhY2tldCwgdGhpcy5zdXBwb3J0c0JpbmFyeSwgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gYWx3YXlzIGNyZWF0ZSBhIG5ldyBvYmplY3QgKEdILTQzNylcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRzID0ge307XG4gICAgICAgICAgICAgICAgaWYgKCF1c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhY2tldC5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuID0gXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGRhdGEgPyBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKSA6IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA8IHRoaXMub3B0cy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU29tZXRpbWVzIHRoZSB3ZWJzb2NrZXQgaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQgYnV0IHRoZSBicm93c2VyIGRpZG4ndFxuICAgICAgICAgICAgICAgIC8vIGhhdmUgYSBjaGFuY2Ugb2YgaW5mb3JtaW5nIHVzIGFib3V0IGl0IHlldCwgaW4gdGhhdCBjYXNlIHNlbmQgd2lsbFxuICAgICAgICAgICAgICAgIC8vIHRocm93IGFuIGVycm9yXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZUVycm9yIGlzIHRocm93biB3aGVuIHBhc3NpbmcgdGhlIHNlY29uZCBhcmd1bWVudCBvbiBTYWZhcmlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZChkYXRhLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGFzdFBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmYWtlIGRyYWluXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXRUaW1lb3V0Rm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb0Nsb3NlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMud3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMud3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcIndzc1wiIDogXCJ3c1wiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gICAgICAgIGlmICh0aGlzLm9wdHMucG9ydCAmJlxuICAgICAgICAgICAgKChcIndzc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcIndzXCIgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgICAgICAgICBwb3J0ID0gXCI6XCIgKyB0aGlzLm9wdHMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgaXB2NiA9IHRoaXMub3B0cy5ob3N0bmFtZS5pbmRleE9mKFwiOlwiKSAhPT0gLTE7XG4gICAgICAgIHJldHVybiAoc2NoZW1hICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgKGlwdjYgPyBcIltcIiArIHRoaXMub3B0cy5ob3N0bmFtZSArIFwiXVwiIDogdGhpcy5vcHRzLmhvc3RuYW1lKSArXG4gICAgICAgICAgICBwb3J0ICtcbiAgICAgICAgICAgIHRoaXMub3B0cy5wYXRoICtcbiAgICAgICAgICAgIChlbmNvZGVkUXVlcnkubGVuZ3RoID8gXCI/XCIgKyBlbmNvZGVkUXVlcnkgOiBcIlwiKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZlYXR1cmUgZGV0ZWN0aW9uIGZvciBXZWJTb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIHRoaXMgdHJhbnNwb3J0IGlzIGF2YWlsYWJsZS5cbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGNoZWNrKCkge1xuICAgICAgICByZXR1cm4gKCEhV2ViU29ja2V0ICYmXG4gICAgICAgICAgICAhKFwiX19pbml0aWFsaXplXCIgaW4gV2ViU29ja2V0ICYmIHRoaXMubmFtZSA9PT0gV1MucHJvdG90eXBlLm5hbWUpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBYSFIgfSBmcm9tIFwiLi9wb2xsaW5nLXhoci5qc1wiO1xuaW1wb3J0IHsgV1MgfSBmcm9tIFwiLi93ZWJzb2NrZXQuanNcIjtcbmV4cG9ydCBjb25zdCB0cmFuc3BvcnRzID0ge1xuICAgIHdlYnNvY2tldDogV1MsXG4gICAgcG9sbGluZzogWEhSXG59O1xuIiwiaW1wb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucyB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCBwYXJzZXFzIGZyb20gXCJwYXJzZXFzXCI7XG5pbXBvcnQgcGFyc2V1cmkgZnJvbSBcInBhcnNldXJpXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IHByb3RvY29sIH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmkpIHtcbiAgICAgICAgICAgIHVyaSA9IHBhcnNldXJpKHVyaSk7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gdXJpLmhvc3Q7XG4gICAgICAgICAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gXCJodHRwc1wiIHx8IHVyaS5wcm90b2NvbCA9PT0gXCJ3c3NcIjtcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgICAgICAgICAgaWYgKHVyaS5xdWVyeSlcbiAgICAgICAgICAgICAgICBvcHRzLnF1ZXJ5ID0gdXJpLnF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdHMuaG9zdCkge1xuICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNldXJpKG9wdHMuaG9zdCkuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMuc2VjdXJlID1cbiAgICAgICAgICAgIG51bGwgIT0gb3B0cy5zZWN1cmVcbiAgICAgICAgICAgICAgICA/IG9wdHMuc2VjdXJlXG4gICAgICAgICAgICAgICAgOiB0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3RuYW1lID1cbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiID8gbG9jYXRpb24uaG9zdG5hbWUgOiBcImxvY2FsaG9zdFwiKTtcbiAgICAgICAgdGhpcy5wb3J0ID1cbiAgICAgICAgICAgIG9wdHMucG9ydCB8fFxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24ucG9ydFxuICAgICAgICAgICAgICAgICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNlY3VyZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIjQ0M1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiODBcIik7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbXCJwb2xsaW5nXCIsIFwid2Vic29ja2V0XCJdO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcGF0aDogXCIvZW5naW5lLmlvXCIsXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgdXBncmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcFBhcmFtOiBcInRcIixcbiAgICAgICAgICAgIHJlbWVtYmVyVXBncmFkZTogZmFsc2UsXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZToge1xuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMTAyNFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zcG9ydE9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgY2xvc2VPbkJlZm9yZXVubG9hZDogdHJ1ZVxuICAgICAgICB9LCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzLnBhdGggPSB0aGlzLm9wdHMucGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgKyBcIi9cIjtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMucXVlcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0cy5xdWVyeSA9IHBhcnNlcXMuZGVjb2RlKHRoaXMub3B0cy5xdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IG9uIGhhbmRzaGFrZVxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgdGhpcy51cGdyYWRlcyA9IG51bGw7XG4gICAgICAgIHRoaXMucGluZ0ludGVydmFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IG51bGw7XG4gICAgICAgIC8vIHNldCBvbiBoZWFydGJlYXRcbiAgICAgICAgdGhpcy5waW5nVGltZW91dFRpbWVyID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuY2xvc2VPbkJlZm9yZXVubG9hZCkge1xuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggY2xvc2VzIHRoZSBjb25uZWN0aW9uIHdoZW4gdGhlIFwiYmVmb3JldW5sb2FkXCIgZXZlbnQgaXMgZW1pdHRlZCBidXQgbm90IENocm9tZS4gVGhpcyBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIC8vIGVuc3VyZXMgZXZlcnkgYnJvd3NlciBiZWhhdmVzIHRoZSBzYW1lIChubyBcImRpc2Nvbm5lY3RcIiBldmVudCBhdCB0aGUgU29ja2V0LklPIGxldmVsIHdoZW4gdGhlIHBhZ2UgaXNcbiAgICAgICAgICAgICAgICAvLyBjbG9zZWQvcmVsb2FkZWQpXG4gICAgICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2lsZW50bHkgY2xvc2UgdGhlIHRyYW5zcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaG9zdG5hbWUgIT09IFwibG9jYWxob3N0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJ0cmFuc3BvcnQgY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQHJldHVybiB7VHJhbnNwb3J0fVxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZVRyYW5zcG9ydChuYW1lKSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gY2xvbmUodGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gICAgICAgIHF1ZXJ5LkVJTyA9IHByb3RvY29sO1xuICAgICAgICAvLyB0cmFuc3BvcnQgbmFtZVxuICAgICAgICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuICAgICAgICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgICAgICAgaWYgKHRoaXMuaWQpXG4gICAgICAgICAgICBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuICAgICAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnRyYW5zcG9ydE9wdGlvbnNbbmFtZV0sIHRoaXMub3B0cywge1xuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICBzb2NrZXQ6IHRoaXMsXG4gICAgICAgICAgICBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSxcbiAgICAgICAgICAgIHNlY3VyZTogdGhpcy5zZWN1cmUsXG4gICAgICAgICAgICBwb3J0OiB0aGlzLnBvcnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgdHJhbnNwb3J0c1tuYW1lXShvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgbGV0IHRyYW5zcG9ydDtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5yZW1lbWJlclVwZ3JhZGUgJiZcbiAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKFwid2Vic29ja2V0XCIpICE9PSAtMSkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gXCJ3ZWJzb2NrZXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIFwiTm8gdHJhbnNwb3J0cyBhdmFpbGFibGVcIik7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICAgICAgICB0cmFuc3BvcnRcbiAgICAgICAgICAgIC5vbihcImRyYWluXCIsIHRoaXMub25EcmFpbi5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwicGFja2V0XCIsIHRoaXMub25QYWNrZXQuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcImVycm9yXCIsIHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKFwidHJhbnNwb3J0IGNsb3NlXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvYmUobmFtZSkge1xuICAgICAgICBsZXQgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSk7XG4gICAgICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvblRyYW5zcG9ydE9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6IFwicGluZ1wiLCBkYXRhOiBcInByb2JlXCIgfV0pO1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJwYWNrZXRcIiwgbXNnID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKFwicG9uZ1wiID09PSBtc2cudHlwZSAmJiBcInByb2JlXCIgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRpbmdcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInVwZ3JhZGVcIiB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0KCkge1xuICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICAgICAgICBjb25zdCBvbmVycm9yID0gZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwicHJvYmUgZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVFcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UoKSB7XG4gICAgICAgICAgICBvbmVycm9yKFwidHJhbnNwb3J0IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgICAgICAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoXCJzb2NrZXQgY2xvc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gdGhlIHNvY2tldCBpcyB1cGdyYWRlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gICAgICAgIGZ1bmN0aW9uIG9udXBncmFkZSh0bykge1xuICAgICAgICAgICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9PSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbiAgICAgICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcIm9wZW5cIiwgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsIG9uZXJyb3IpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJvcGVuXCIsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiZXJyb3JcIiwgb25lcnJvcik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgIHRoaXMub25jZShcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gY29ubmVjdGlvbiBpcyBkZWVtZWQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgLy8gd2UgY2hlY2sgZm9yIGByZWFkeVN0YXRlYCBpbiBjYXNlIGFuIGBvcGVuYFxuICAgICAgICAvLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmXG4gICAgICAgICAgICB0aGlzLm9wdHMudXBncmFkZSAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UpIHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnVwZ3JhZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25QYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoZWFydGJlYXRcIik7XG4gICAgICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRQaW5nVGltZW91dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJwb25nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInNlcnZlciBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBlcnIuY29kZSA9IHBhY2tldC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1lc3NhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJtZXNzYWdlXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGhhbmRzaGFrZSBvYmpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkhhbmRzaGFrZShkYXRhKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiaGFuZHNoYWtlXCIsIGRhdGEpO1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICAgICAgICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5yZXNldFBpbmdUaW1lb3V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYW5kIHJlc2V0cyBwaW5nIHRpbWVvdXQgdGltZXIgYmFzZWQgb24gc2VydmVyIHBpbmdzLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcmVzZXRQaW5nVGltZW91dCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuICAgICAgICB0aGlzLnBpbmdUaW1lb3V0VGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJwaW5nIHRpbWVvdXRcIik7XG4gICAgICAgIH0sIHRoaXMucGluZ0ludGVydmFsICsgdGhpcy5waW5nVGltZW91dCk7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBpbmdUaW1lb3V0VGltZXIudW5yZWYoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25EcmFpbigpIHtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCwgdGhpcy5wcmV2QnVmZmVyTGVuKTtcbiAgICAgICAgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuICAgICAgICAvLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3ZlcixcbiAgICAgICAgLy8gYW5kIGEgbm9uemVybyBwcmV2QnVmZmVyTGVuIGNvdWxkIGNhdXNlIHByb2JsZW1zIG9uIGBkcmFpbmBcbiAgICAgICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcbiAgICAgICAgaWYgKDAgPT09IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRyYWluXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmbHVzaCgpIHtcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgIT09IHRoaXMucmVhZHlTdGF0ZSAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQud3JpdGFibGUgJiZcbiAgICAgICAgICAgICF0aGlzLnVwZ3JhZGluZyAmJlxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnNlbmQodGhpcy53cml0ZUJ1ZmZlcik7XG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJmbHVzaFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIHdyaXRlKG1zZywgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgdGhpcy5zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNlbmQobXNnLCBvcHRpb25zLCBmbikge1xuICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJtZXNzYWdlXCIsIG1zZywgb3B0aW9ucywgZm4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFja2V0IHR5cGUuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgc2VuZFBhY2tldCh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZGF0YSkge1xuICAgICAgICAgICAgZm4gPSBkYXRhO1xuICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgZm4gPSBvcHRpb25zO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiY2xvc2luZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgY29uc3QgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGFja2V0Q3JlYXRlXCIsIHBhY2tldCk7XG4gICAgICAgIHRoaXMud3JpdGVCdWZmZXIucHVzaChwYWNrZXQpO1xuICAgICAgICBpZiAoZm4pXG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJmbHVzaFwiLCBmbik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJmb3JjZWQgY2xvc2VcIik7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjbGVhbnVwQW5kQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGVcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub2ZmKFwidXBncmFkZUVycm9yXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3YWl0Rm9yVXBncmFkZSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIHdhaXQgZm9yIHVwZ3JhZGUgdG8gZmluaXNoIHNpbmNlIHdlIGNhbid0IHNlbmQgcGFja2V0cyB3aGlsZSBwYXVzaW5nIGEgdHJhbnNwb3J0XG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRlXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRlRXJyb3JcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zaW5nXCI7XG4gICAgICAgICAgICBpZiAodGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2UoXCJkcmFpblwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgICAgICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBlcnJvclxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25FcnJvcihlcnIpIHtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHRoaXMub25DbG9zZShcInRyYW5zcG9ydCBlcnJvclwiLCBlcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgY2xvc2UuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNsb3NlKHJlYXNvbiwgZGVzYykge1xuICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgICAgICAgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgICAgICAgXCJjbG9zaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgLy8gY2xlYXIgdGltZXJzXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZW91dEZuKHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG4gICAgICAgICAgICAvLyBzdG9wIGV2ZW50IGZyb20gZmlyaW5nIGFnYWluIGZvciB0cmFuc3BvcnRcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycyhcImNsb3NlXCIpO1xuICAgICAgICAgICAgLy8gZW5zdXJlIHRyYW5zcG9ydCB3b24ndCBzdGF5IG9wZW5cbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgICAgICAvLyBpZ25vcmUgZnVydGhlciB0cmFuc3BvcnQgY29tbXVuaWNhdGlvblxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlbW92ZUV2ZW50TGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsIHRoaXMub2ZmbGluZUV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCByZWFkeSBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgICAgIC8vIGNsZWFyIHNlc3Npb24gaWRcbiAgICAgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICAgICAgLy8gZW1pdCBjbG9zZSBldmVudFxuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24sIGRlc2MpO1xuICAgICAgICAgICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgICAgICAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzZXJ2ZXIgdXBncmFkZXNcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGZpbHRlclVwZ3JhZGVzKHVwZ3JhZGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVXBncmFkZXMgPSBbXTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCBqID0gdXBncmFkZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgaWYgKH50aGlzLnRyYW5zcG9ydHMuaW5kZXhPZih1cGdyYWRlc1tpXSkpXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbiAgICB9XG59XG5Tb2NrZXQucHJvdG9jb2wgPSBwcm90b2NvbDtcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xuICAgIGNvbnN0IG8gPSB7fTtcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBvW2ldID0gb2JqW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvO1xufVxuIiwiaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG5leHBvcnQgeyBTb2NrZXQgfTtcbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IFNvY2tldC5wcm90b2NvbDtcbmV4cG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuL3RyYW5zcG9ydC5qc1wiO1xuZXhwb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmV4cG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucyB9IGZyb20gXCIuL3V0aWwuanNcIjtcbiIsImNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNWaWV3ID0gKG9iaikgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn07XG5jb25zdCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChCbG9iKSA9PT0gXCJbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl1cIik7XG5jb25zdCB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBGaWxlID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEZpbGUgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChGaWxlKSA9PT0gXCJbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl1cIik7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBCdWZmZXIsIGFuIEFycmF5QnVmZmVyLCBhIEJsb2Igb3IgYSBGaWxlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0JpbmFyeShvYmopIHtcbiAgICByZXR1cm4gKCh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhvYmopKSkgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVCbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFzQmluYXJ5KG9iaiwgdG9KU09OKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpc0JpbmFyeShvYmopKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAob2JqLnRvSlNPTiAmJlxuICAgICAgICB0eXBlb2Ygb2JqLnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGhhc0JpbmFyeShvYmoudG9KU09OKCksIHRydWUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHsgaXNCaW5hcnkgfSBmcm9tIFwiLi9pcy1iaW5hcnkuanNcIjtcbi8qKlxuICogUmVwbGFjZXMgZXZlcnkgQnVmZmVyIHwgQXJyYXlCdWZmZXIgfCBCbG9iIHwgRmlsZSBpbiBwYWNrZXQgd2l0aCBhIG51bWJlcmVkIHBsYWNlaG9sZGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBzb2NrZXQuaW8gZXZlbnQgcGFja2V0XG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggZGVjb25zdHJ1Y3RlZCBwYWNrZXQgYW5kIGxpc3Qgb2YgYnVmZmVyc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0KSB7XG4gICAgY29uc3QgYnVmZmVycyA9IFtdO1xuICAgIGNvbnN0IHBhY2tldERhdGEgPSBwYWNrZXQuZGF0YTtcbiAgICBjb25zdCBwYWNrID0gcGFja2V0O1xuICAgIHBhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhLCBidWZmZXJzKTtcbiAgICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICAgIHJldHVybiB7IHBhY2tldDogcGFjaywgYnVmZmVyczogYnVmZmVycyB9O1xufVxuZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIGlmIChpc0JpbmFyeShkYXRhKSkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHsgX3BsYWNlaG9sZGVyOiB0cnVlLCBudW06IGJ1ZmZlcnMubGVuZ3RoIH07XG4gICAgICAgIGJ1ZmZlcnMucHVzaChkYXRhKTtcbiAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGEgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5ld0RhdGFbaV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGEgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbn1cbi8qKlxuICogUmVjb25zdHJ1Y3RzIGEgYmluYXJ5IHBhY2tldCBmcm9tIGl0cyBwbGFjZWhvbGRlciBwYWNrZXQgYW5kIGJ1ZmZlcnNcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gZXZlbnQgcGFja2V0IHdpdGggcGxhY2Vob2xkZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBidWZmZXJzIC0gYmluYXJ5IGJ1ZmZlcnMgdG8gcHV0IGluIHBsYWNlaG9sZGVyIHBvc2l0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSByZWNvbnN0cnVjdGVkIHBhY2tldFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LCBidWZmZXJzKSB7XG4gICAgcGFja2V0LmRhdGEgPSBfcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LmRhdGEsIGJ1ZmZlcnMpO1xuICAgIHBhY2tldC5hdHRhY2htZW50cyA9IHVuZGVmaW5lZDsgLy8gbm8gbG9uZ2VyIHVzZWZ1bFxuICAgIHJldHVybiBwYWNrZXQ7XG59XG5mdW5jdGlvbiBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICAgIGlmICghZGF0YSlcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5fcGxhY2Vob2xkZXIpIHtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xufVxuIiwiaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBkZWNvbnN0cnVjdFBhY2tldCwgcmVjb25zdHJ1Y3RQYWNrZXQgfSBmcm9tIFwiLi9iaW5hcnkuanNcIjtcbmltcG9ydCB7IGlzQmluYXJ5LCBoYXNCaW5hcnkgfSBmcm9tIFwiLi9pcy1iaW5hcnkuanNcIjtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDU7XG5leHBvcnQgdmFyIFBhY2tldFR5cGU7XG4oZnVuY3Rpb24gKFBhY2tldFR5cGUpIHtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUXCJdID0gMF0gPSBcIkNPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJESVNDT05ORUNUXCJdID0gMV0gPSBcIkRJU0NPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJFVkVOVFwiXSA9IDJdID0gXCJFVkVOVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkFDS1wiXSA9IDNdID0gXCJBQ0tcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUX0VSUk9SXCJdID0gNF0gPSBcIkNPTk5FQ1RfRVJST1JcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJCSU5BUllfRVZFTlRcIl0gPSA1XSA9IFwiQklOQVJZX0VWRU5UXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQklOQVJZX0FDS1wiXSA9IDZdID0gXCJCSU5BUllfQUNLXCI7XG59KShQYWNrZXRUeXBlIHx8IChQYWNrZXRUeXBlID0ge30pKTtcbi8qKlxuICogQSBzb2NrZXQuaW8gRW5jb2RlciBpbnN0YW5jZVxuICovXG5leHBvcnQgY2xhc3MgRW5jb2RlciB7XG4gICAgLyoqXG4gICAgICogRW5jb2RlIGEgcGFja2V0IGFzIGEgc2luZ2xlIHN0cmluZyBpZiBub24tYmluYXJ5LCBvciBhcyBhXG4gICAgICogYnVmZmVyIHNlcXVlbmNlLCBkZXBlbmRpbmcgb24gcGFja2V0IHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gcGFja2V0IG9iamVjdFxuICAgICAqL1xuICAgIGVuY29kZShvYmopIHtcbiAgICAgICAgaWYgKG9iai50eXBlID09PSBQYWNrZXRUeXBlLkVWRU5UIHx8IG9iai50eXBlID09PSBQYWNrZXRUeXBlLkFDSykge1xuICAgICAgICAgICAgaWYgKGhhc0JpbmFyeShvYmopKSB7XG4gICAgICAgICAgICAgICAgb2JqLnR5cGUgPVxuICAgICAgICAgICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5FVkVOVFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlQXNCaW5hcnkob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3RoaXMuZW5jb2RlQXNTdHJpbmcob2JqKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuY29kZSBwYWNrZXQgYXMgc3RyaW5nLlxuICAgICAqL1xuICAgIGVuY29kZUFzU3RyaW5nKG9iaikge1xuICAgICAgICAvLyBmaXJzdCBpcyB0eXBlXG4gICAgICAgIGxldCBzdHIgPSBcIlwiICsgb2JqLnR5cGU7XG4gICAgICAgIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzICsgXCItXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuICAgICAgICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgICAgICAgaWYgKG9iai5uc3AgJiYgXCIvXCIgIT09IG9iai5uc3ApIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmoubnNwICsgXCIsXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgdGhlIGlkXG4gICAgICAgIGlmIChudWxsICE9IG9iai5pZCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5pZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBqc29uIGRhdGFcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgIHN0ciArPSBKU09OLnN0cmluZ2lmeShvYmouZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXG4gICAgICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICAgICAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICAgICAqL1xuICAgIGVuY29kZUFzQmluYXJ5KG9iaikge1xuICAgICAgICBjb25zdCBkZWNvbnN0cnVjdGlvbiA9IGRlY29uc3RydWN0UGFja2V0KG9iaik7XG4gICAgICAgIGNvbnN0IHBhY2sgPSB0aGlzLmVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuICAgICAgICBidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG4gICAgICAgIHJldHVybiBidWZmZXJzOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbiAgICB9XG59XG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqL1xuZXhwb3J0IGNsYXNzIERlY29kZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhbiBlbmNvZGVkIHBhY2tldCBzdHJpbmcgaW50byBwYWNrZXQgSlNPTi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxuICAgICAqL1xuICAgIGFkZChvYmopIHtcbiAgICAgICAgbGV0IHBhY2tldDtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHBhY2tldCA9IHRoaXMuZGVjb2RlU3RyaW5nKG9iaik7XG4gICAgICAgICAgICBpZiAocGFja2V0LnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICAgICAgcGFja2V0LnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0FDSykge1xuICAgICAgICAgICAgICAgIC8vIGJpbmFyeSBwYWNrZXQncyBqc29uXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbmV3IEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KTtcbiAgICAgICAgICAgICAgICAvLyBubyBhdHRhY2htZW50cywgbGFiZWxlZCBiaW5hcnkgYnV0IG5vIGJpbmFyeSBkYXRhIHRvIGZvbGxvd1xuICAgICAgICAgICAgICAgIGlmIChwYWNrZXQuYXR0YWNobWVudHMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZGVjb2RlZFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5vbi1iaW5hcnkgZnVsbCBwYWNrZXRcbiAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNCaW5hcnkob2JqKSB8fCBvYmouYmFzZTY0KSB7XG4gICAgICAgICAgICAvLyByYXcgYmluYXJ5IGRhdGFcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFja2V0ID0gdGhpcy5yZWNvbnN0cnVjdG9yLnRha2VCaW5hcnlEYXRhKG9iaik7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZWNlaXZlZCBmaW5hbCBidWZmZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZGVjb2RlZFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gdHlwZTogXCIgKyBvYmopO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlY29kZSBhIHBhY2tldCBTdHJpbmcgKEpTT04gZGF0YSlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICAgICAqL1xuICAgIGRlY29kZVN0cmluZyhzdHIpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAvLyBsb29rIHVwIHR5cGVcbiAgICAgICAgY29uc3QgcCA9IHtcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcihzdHIuY2hhckF0KDApKSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKFBhY2tldFR5cGVbcC50eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHBhY2tldCB0eXBlIFwiICsgcC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGF0dGFjaG1lbnRzIGlmIHR5cGUgYmluYXJ5XG4gICAgICAgIGlmIChwLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBwLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0FDSykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlIChzdHIuY2hhckF0KCsraSkgIT09IFwiLVwiICYmIGkgIT0gc3RyLmxlbmd0aCkgeyB9XG4gICAgICAgICAgICBjb25zdCBidWYgPSBzdHIuc3Vic3RyaW5nKHN0YXJ0LCBpKTtcbiAgICAgICAgICAgIGlmIChidWYgIT0gTnVtYmVyKGJ1ZikgfHwgc3RyLmNoYXJBdChpKSAhPT0gXCItXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbGxlZ2FsIGF0dGFjaG1lbnRzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5hdHRhY2htZW50cyA9IE51bWJlcihidWYpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgbmFtZXNwYWNlIChpZiBhbnkpXG4gICAgICAgIGlmIChcIi9cIiA9PT0gc3RyLmNoYXJBdChpICsgMSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKFwiLFwiID09PSBjKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLm5zcCA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcC5uc3AgPSBcIi9cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGlkXG4gICAgICAgIGNvbnN0IG5leHQgPSBzdHIuY2hhckF0KGkgKyAxKTtcbiAgICAgICAgaWYgKFwiXCIgIT09IG5leHQgJiYgTnVtYmVyKG5leHQpID09IG5leHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKG51bGwgPT0gYyB8fCBOdW1iZXIoYykgIT0gYykge1xuICAgICAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmlkID0gTnVtYmVyKHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBqc29uIGRhdGFcbiAgICAgICAgaWYgKHN0ci5jaGFyQXQoKytpKSkge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRyeVBhcnNlKHN0ci5zdWJzdHIoaSkpO1xuICAgICAgICAgICAgaWYgKERlY29kZXIuaXNQYXlsb2FkVmFsaWQocC50eXBlLCBwYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgIHAuZGF0YSA9IHBheWxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHBheWxvYWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHN0YXRpYyBpc1BheWxvYWRWYWxpZCh0eXBlLCBwYXlsb2FkKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUX0VSUk9SOlxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIjtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5FVkVOVDpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfRVZFTlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiYgcGF5bG9hZC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkFDSzpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfQUNLOlxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHRyeVBhcnNlKHN0cikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cik7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vKipcbiAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcbiAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXG4gKiBkZWNvZGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0JpbmFyeVJlY29uc3RydWN0b3J9IGluaXRpYWxpemVkIHJlY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgQmluYXJ5UmVjb25zdHJ1Y3RvciB7XG4gICAgY29uc3RydWN0b3IocGFja2V0KSB7XG4gICAgICAgIHRoaXMucGFja2V0ID0gcGFja2V0O1xuICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5yZWNvblBhY2sgPSBwYWNrZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiBiaW5hcnkgZGF0YSByZWNlaXZlZCBmcm9tIGNvbm5lY3Rpb25cbiAgICAgKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0J1ZmZlciB8IEFycmF5QnVmZmVyfSBiaW5EYXRhIC0gdGhlIHJhdyBiaW5hcnkgZGF0YSByZWNlaXZlZFxuICAgICAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXG4gICAgICogICBhIHJlY29uc3RydWN0ZWQgcGFja2V0IG9iamVjdCBpZiBhbGwgYnVmZmVycyBoYXZlIGJlZW4gcmVjZWl2ZWQuXG4gICAgICovXG4gICAgdGFrZUJpbmFyeURhdGEoYmluRGF0YSkge1xuICAgICAgICB0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVycy5sZW5ndGggPT09IHRoaXMucmVjb25QYWNrLmF0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgICAvLyBkb25lIHdpdGggYnVmZmVyIGxpc3RcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldCA9IHJlY29uc3RydWN0UGFja2V0KHRoaXMucmVjb25QYWNrLCB0aGlzLmJ1ZmZlcnMpO1xuICAgICAgICAgICAgdGhpcy5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gcGFja2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhbnMgdXAgYmluYXJ5IHBhY2tldCByZWNvbnN0cnVjdGlvbiB2YXJpYWJsZXMuXG4gICAgICovXG4gICAgZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZWNvblBhY2sgPSBudWxsO1xuICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gb24ob2JqLCBldiwgZm4pIHtcbiAgICBvYmoub24oZXYsIGZuKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgb2JqLm9mZihldiwgZm4pO1xuICAgIH07XG59XG4iLCJpbXBvcnQgeyBQYWNrZXRUeXBlIH0gZnJvbSBcInNvY2tldC5pby1wYXJzZXJcIjtcbmltcG9ydCB7IG9uIH0gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCB7IEVtaXR0ZXIsIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbi8qKlxuICogSW50ZXJuYWwgZXZlbnRzLlxuICogVGhlc2UgZXZlbnRzIGNhbid0IGJlIGVtaXR0ZWQgYnkgdGhlIHVzZXIuXG4gKi9cbmNvbnN0IFJFU0VSVkVEX0VWRU5UUyA9IE9iamVjdC5mcmVlemUoe1xuICAgIGNvbm5lY3Q6IDEsXG4gICAgY29ubmVjdF9lcnJvcjogMSxcbiAgICBkaXNjb25uZWN0OiAxLFxuICAgIGRpc2Nvbm5lY3Rpbmc6IDEsXG4gICAgLy8gRXZlbnRFbWl0dGVyIHJlc2VydmVkIGV2ZW50czogaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfZXZlbnRfbmV3bGlzdGVuZXJcbiAgICBuZXdMaXN0ZW5lcjogMSxcbiAgICByZW1vdmVMaXN0ZW5lcjogMSxcbn0pO1xuZXhwb3J0IGNsYXNzIFNvY2tldCBleHRlbmRzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIGBTb2NrZXRgIGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlvLCBuc3AsIG9wdHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuaWRzID0gMDtcbiAgICAgICAgdGhpcy5hY2tzID0ge307XG4gICAgICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5pbyA9IGlvO1xuICAgICAgICB0aGlzLm5zcCA9IG5zcDtcbiAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy5hdXRoKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGggPSBvcHRzLmF1dGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW8uX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSB0byBvcGVuLCBjbG9zZSBhbmQgcGFja2V0IGV2ZW50c1xuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzdWJFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IGlvID0gdGhpcy5pbztcbiAgICAgICAgdGhpcy5zdWJzID0gW1xuICAgICAgICAgICAgb24oaW8sIFwib3BlblwiLCB0aGlzLm9ub3Blbi5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIG9uKGlvLCBcInBhY2tldFwiLCB0aGlzLm9ucGFja2V0LmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb24oaW8sIFwiZXJyb3JcIiwgdGhpcy5vbmVycm9yLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb24oaW8sIFwiY2xvc2VcIiwgdGhpcy5vbmNsb3NlLmJpbmQodGhpcykpLFxuICAgICAgICBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBTb2NrZXQgd2lsbCB0cnkgdG8gcmVjb25uZWN0IHdoZW4gaXRzIE1hbmFnZXIgY29ubmVjdHMgb3IgcmVjb25uZWN0c1xuICAgICAqL1xuICAgIGdldCBhY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc3VicztcbiAgICB9XG4gICAgLyoqXG4gICAgICogXCJPcGVuc1wiIHRoZSBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMuc3ViRXZlbnRzKCk7XG4gICAgICAgIGlmICghdGhpcy5pb1tcIl9yZWNvbm5lY3RpbmdcIl0pXG4gICAgICAgICAgICB0aGlzLmlvLm9wZW4oKTsgLy8gZW5zdXJlIG9wZW5cbiAgICAgICAgaWYgKFwib3BlblwiID09PSB0aGlzLmlvLl9yZWFkeVN0YXRlKVxuICAgICAgICAgICAgdGhpcy5vbm9wZW4oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBjb25uZWN0KClcbiAgICAgKi9cbiAgICBvcGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgYG1lc3NhZ2VgIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNlbmQoLi4uYXJncykge1xuICAgICAgICBhcmdzLnVuc2hpZnQoXCJtZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBgZW1pdGAuXG4gICAgICogSWYgdGhlIGV2ZW50IGlzIGluIGBldmVudHNgLCBpdCdzIGVtaXR0ZWQgbm9ybWFsbHkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZW1pdChldiwgLi4uYXJncykge1xuICAgICAgICBpZiAoUkVTRVJWRURfRVZFTlRTLmhhc093blByb3BlcnR5KGV2KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBldiArICdcIiBpcyBhIHJlc2VydmVkIGV2ZW50IG5hbWUnKTtcbiAgICAgICAgfVxuICAgICAgICBhcmdzLnVuc2hpZnQoZXYpO1xuICAgICAgICBjb25zdCBwYWNrZXQgPSB7XG4gICAgICAgICAgICB0eXBlOiBQYWNrZXRUeXBlLkVWRU5ULFxuICAgICAgICAgICAgZGF0YTogYXJncyxcbiAgICAgICAgfTtcbiAgICAgICAgcGFja2V0Lm9wdGlvbnMgPSB7fTtcbiAgICAgICAgcGFja2V0Lm9wdGlvbnMuY29tcHJlc3MgPSB0aGlzLmZsYWdzLmNvbXByZXNzICE9PSBmYWxzZTtcbiAgICAgICAgLy8gZXZlbnQgYWNrIGNhbGxiYWNrXG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIHRoaXMuYWNrc1t0aGlzLmlkc10gPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgcGFja2V0LmlkID0gdGhpcy5pZHMrKztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1RyYW5zcG9ydFdyaXRhYmxlID0gdGhpcy5pby5lbmdpbmUgJiZcbiAgICAgICAgICAgIHRoaXMuaW8uZW5naW5lLnRyYW5zcG9ydCAmJlxuICAgICAgICAgICAgdGhpcy5pby5lbmdpbmUudHJhbnNwb3J0LndyaXRhYmxlO1xuICAgICAgICBjb25zdCBkaXNjYXJkUGFja2V0ID0gdGhpcy5mbGFncy52b2xhdGlsZSAmJiAoIWlzVHJhbnNwb3J0V3JpdGFibGUgfHwgIXRoaXMuY29ubmVjdGVkKTtcbiAgICAgICAgaWYgKGRpc2NhcmRQYWNrZXQpIHtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mbGFncyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwYWNrZXQocGFja2V0KSB7XG4gICAgICAgIHBhY2tldC5uc3AgPSB0aGlzLm5zcDtcbiAgICAgICAgdGhpcy5pby5fcGFja2V0KHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBgb3BlbmAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ub3BlbigpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmF1dGggPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGgoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IFBhY2tldFR5cGUuQ09OTkVDVCwgZGF0YSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiBQYWNrZXRUeXBlLkNPTk5FQ1QsIGRhdGE6IHRoaXMuYXV0aCB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgb3IgbWFuYWdlciBgZXJyb3JgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVyclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBjbG9zZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVhc29uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNsb3NlKHJlYXNvbikge1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmlkO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRpc2Nvbm5lY3RcIiwgcmVhc29uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggc29ja2V0IHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucGFja2V0KHBhY2tldCkge1xuICAgICAgICBjb25zdCBzYW1lTmFtZXNwYWNlID0gcGFja2V0Lm5zcCA9PT0gdGhpcy5uc3A7XG4gICAgICAgIGlmICghc2FtZU5hbWVzcGFjZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC5kYXRhICYmIHBhY2tldC5kYXRhLnNpZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZCA9IHBhY2tldC5kYXRhLnNpZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbmNvbm5lY3QoaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0X2Vycm9yXCIsIG5ldyBFcnJvcihcIkl0IHNlZW1zIHlvdSBhcmUgdHJ5aW5nIHRvIHJlYWNoIGEgU29ja2V0LklPIHNlcnZlciBpbiB2Mi54IHdpdGggYSB2My54IGNsaWVudCwgYnV0IHRoZXkgYXJlIG5vdCBjb21wYXRpYmxlIChtb3JlIGluZm9ybWF0aW9uIGhlcmU6IGh0dHBzOi8vc29ja2V0LmlvL2RvY3MvdjMvbWlncmF0aW5nLWZyb20tMi14LXRvLTMtMC8pXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRVZFTlQ6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0VWRU5UOlxuICAgICAgICAgICAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkFDSzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0FDSzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1RfRVJST1I6XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKHBhY2tldC5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBlcnIuZGF0YSA9IHBhY2tldC5kYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmV2ZW50KHBhY2tldCkge1xuICAgICAgICBjb25zdCBhcmdzID0gcGFja2V0LmRhdGEgfHwgW107XG4gICAgICAgIGlmIChudWxsICE9IHBhY2tldC5pZCkge1xuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMuYWNrKHBhY2tldC5pZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0RXZlbnQoYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIucHVzaChPYmplY3QuZnJlZXplKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbWl0RXZlbnQoYXJncykge1xuICAgICAgICBpZiAodGhpcy5fYW55TGlzdGVuZXJzICYmIHRoaXMuX2FueUxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycy5zbGljZSgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBlci5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9kdWNlcyBhbiBhY2sgY2FsbGJhY2sgdG8gZW1pdCB3aXRoIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhY2soaWQpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBzZW50ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgLy8gcHJldmVudCBkb3VibGUgY2FsbGJhY2tzXG4gICAgICAgICAgICBpZiAoc2VudClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYucGFja2V0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBQYWNrZXRUeXBlLkFDSyxcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgZGF0YTogYXJncyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBhY2tub3dsZWdlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uYWNrKHBhY2tldCkge1xuICAgICAgICBjb25zdCBhY2sgPSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGFjaykge1xuICAgICAgICAgICAgYWNrLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgY29ubmVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jb25uZWN0KGlkKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXRCdWZmZXJlZCgpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVtaXQgYnVmZmVyZWQgZXZlbnRzIChyZWNlaXZlZCBhbmQgZW1pdHRlZCkuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGVtaXRCdWZmZXJlZCgpIHtcbiAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyLmZvckVhY2goKGFyZ3MpID0+IHRoaXMuZW1pdEV2ZW50KGFyZ3MpKTtcbiAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5mb3JFYWNoKChwYWNrZXQpID0+IHRoaXMucGFja2V0KHBhY2tldCkpO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc2VydmVyIGRpc2Nvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMub25jbG9zZShcImlvIHNlcnZlciBkaXNjb25uZWN0XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBmb3JjZWQgY2xpZW50L3NlcnZlciBzaWRlIGRpc2Nvbm5lY3Rpb25zLFxuICAgICAqIHRoaXMgbWV0aG9kIGVuc3VyZXMgdGhlIG1hbmFnZXIgc3RvcHMgdHJhY2tpbmcgdXMgYW5kXG4gICAgICogdGhhdCByZWNvbm5lY3Rpb25zIGRvbid0IGdldCB0cmlnZ2VyZWQgZm9yIHRoaXMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnMpIHtcbiAgICAgICAgICAgIC8vIGNsZWFuIHN1YnNjcmlwdGlvbnMgdG8gYXZvaWQgcmVjb25uZWN0aW9uc1xuICAgICAgICAgICAgdGhpcy5zdWJzLmZvckVhY2goKHN1YkRlc3Ryb3kpID0+IHN1YkRlc3Ryb3koKSk7XG4gICAgICAgICAgICB0aGlzLnN1YnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pb1tcIl9kZXN0cm95XCJdKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0IG1hbnVhbGx5LlxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiBQYWNrZXRUeXBlLkRJU0NPTk5FQ1QgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIHNvY2tldCBmcm9tIHBvb2xcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgLy8gZmlyZSBldmVudHNcbiAgICAgICAgICAgIHRoaXMub25jbG9zZShcImlvIGNsaWVudCBkaXNjb25uZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgZGlzY29ubmVjdCgpXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY29tcHJlc3MgZmxhZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb21wcmVzcyAtIGlmIGB0cnVlYCwgY29tcHJlc3NlcyB0aGUgc2VuZGluZyBkYXRhXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNvbXByZXNzKGNvbXByZXNzKSB7XG4gICAgICAgIHRoaXMuZmxhZ3MuY29tcHJlc3MgPSBjb21wcmVzcztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYSBtb2RpZmllciBmb3IgYSBzdWJzZXF1ZW50IGV2ZW50IGVtaXNzaW9uIHRoYXQgdGhlIGV2ZW50IG1lc3NhZ2Ugd2lsbCBiZSBkcm9wcGVkIHdoZW4gdGhpcyBzb2NrZXQgaXMgbm90XG4gICAgICogcmVhZHkgdG8gc2VuZCBtZXNzYWdlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZ2V0IHZvbGF0aWxlKCkge1xuICAgICAgICB0aGlzLmZsYWdzLnZvbGF0aWxlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvbkFueShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay4gVGhlIGxpc3RlbmVyIGlzIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RlbmVycyBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwcmVwZW5kQW55KGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb2ZmQW55KGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW55TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyID09PSBsaXN0ZW5lcnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRoYXQgYXJlIGxpc3RlbmluZyBmb3IgYW55IGV2ZW50IHRoYXQgaXMgc3BlY2lmaWVkLiBUaGlzIGFycmF5IGNhbiBiZSBtYW5pcHVsYXRlZCxcbiAgICAgKiBlLmcuIHRvIHJlbW92ZSBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgbGlzdGVuZXJzQW55KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgIH1cbn1cbiIsIlxuLyoqXG4gKiBFeHBvc2UgYEJhY2tvZmZgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gQmFja29mZjtcblxuLyoqXG4gKiBJbml0aWFsaXplIGJhY2tvZmYgdGltZXIgd2l0aCBgb3B0c2AuXG4gKlxuICogLSBgbWluYCBpbml0aWFsIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIFsxMDBdXG4gKiAtIGBtYXhgIG1heCB0aW1lb3V0IFsxMDAwMF1cbiAqIC0gYGppdHRlcmAgWzBdXG4gKiAtIGBmYWN0b3JgIFsyXVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEJhY2tvZmYob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgdGhpcy5tcyA9IG9wdHMubWluIHx8IDEwMDtcbiAgdGhpcy5tYXggPSBvcHRzLm1heCB8fCAxMDAwMDtcbiAgdGhpcy5mYWN0b3IgPSBvcHRzLmZhY3RvciB8fCAyO1xuICB0aGlzLmppdHRlciA9IG9wdHMuaml0dGVyID4gMCAmJiBvcHRzLmppdHRlciA8PSAxID8gb3B0cy5qaXR0ZXIgOiAwO1xuICB0aGlzLmF0dGVtcHRzID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uKCl7XG4gIHZhciBtcyA9IHRoaXMubXMgKiBNYXRoLnBvdyh0aGlzLmZhY3RvciwgdGhpcy5hdHRlbXB0cysrKTtcbiAgaWYgKHRoaXMuaml0dGVyKSB7XG4gICAgdmFyIHJhbmQgPSAgTWF0aC5yYW5kb20oKTtcbiAgICB2YXIgZGV2aWF0aW9uID0gTWF0aC5mbG9vcihyYW5kICogdGhpcy5qaXR0ZXIgKiBtcyk7XG4gICAgbXMgPSAoTWF0aC5mbG9vcihyYW5kICogMTApICYgMSkgPT0gMCAgPyBtcyAtIGRldmlhdGlvbiA6IG1zICsgZGV2aWF0aW9uO1xuICB9XG4gIHJldHVybiBNYXRoLm1pbihtcywgdGhpcy5tYXgpIHwgMDtcbn07XG5cbi8qKlxuICogUmVzZXQgdGhlIG51bWJlciBvZiBhdHRlbXB0cy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5hdHRlbXB0cyA9IDA7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0TWluID0gZnVuY3Rpb24obWluKXtcbiAgdGhpcy5tcyA9IG1pbjtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXhpbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNYXggPSBmdW5jdGlvbihtYXgpe1xuICB0aGlzLm1heCA9IG1heDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBqaXR0ZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldEppdHRlciA9IGZ1bmN0aW9uKGppdHRlcil7XG4gIHRoaXMuaml0dGVyID0gaml0dGVyO1xufTtcblxuIiwiaW1wb3J0IHsgU29ja2V0IGFzIEVuZ2luZSwgaW5zdGFsbFRpbWVyRnVuY3Rpb25zLCB9IGZyb20gXCJlbmdpbmUuaW8tY2xpZW50XCI7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmltcG9ydCAqIGFzIHBhcnNlciBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IEJhY2tvZmYgZnJvbSBcImJhY2tvMlwiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuZXhwb3J0IGNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5zcHMgPSB7fTtcbiAgICAgICAgdGhpcy5zdWJzID0gW107XG4gICAgICAgIGlmICh1cmkgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHVyaSkge1xuICAgICAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgb3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICAgICAgICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKF9hID0gb3B0cy5yYW5kb21pemF0aW9uRmFjdG9yKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwLjUpO1xuICAgICAgICB0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7XG4gICAgICAgICAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICAgICAgICAgIG1heDogdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heCgpLFxuICAgICAgICAgICAgaml0dGVyOiB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGltZW91dChudWxsID09IG9wdHMudGltZW91dCA/IDIwMDAwIDogb3B0cy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgIHRoaXMudXJpID0gdXJpO1xuICAgICAgICBjb25zdCBfcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgcGFyc2VyO1xuICAgICAgICB0aGlzLmVuY29kZXIgPSBuZXcgX3BhcnNlci5FbmNvZGVyKCk7XG4gICAgICAgIHRoaXMuZGVjb2RlciA9IG5ldyBfcGFyc2VyLkRlY29kZXIoKTtcbiAgICAgICAgdGhpcy5fYXV0b0Nvbm5lY3QgPSBvcHRzLmF1dG9Db25uZWN0ICE9PSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbih2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb247XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbiA9ICEhdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbkF0dGVtcHRzKHYpIHtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXkodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWluKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmFuZG9taXphdGlvbkZhY3Rvcih2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICAgICAgICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0Sml0dGVyKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXlNYXgodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWF4KHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGltZW91dCh2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lb3V0O1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0cnlpbmcgdG8gcmVjb25uZWN0IGlmIHJlY29ubmVjdGlvbiBpcyBlbmFibGVkIGFuZCB3ZSBoYXZlIG5vdFxuICAgICAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBtYXliZVJlY29ubmVjdE9uT3BlbigpIHtcbiAgICAgICAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICAgICAgICBpZiAoIXRoaXMuX3JlY29ubmVjdGluZyAmJlxuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uICYmXG4gICAgICAgICAgICB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQgYHNvY2tldGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIG9wdGlvbmFsLCBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvcGVuKGZuKSB7XG4gICAgICAgIGlmICh+dGhpcy5fcmVhZHlTdGF0ZS5pbmRleE9mKFwib3BlblwiKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBFbmdpbmUodGhpcy51cmksIHRoaXMub3B0cyk7XG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTtcbiAgICAgICAgLy8gZW1pdCBgb3BlbmBcbiAgICAgICAgY29uc3Qgb3BlblN1YkRlc3Ryb3kgPSBvbihzb2NrZXQsIFwib3BlblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9ub3BlbigpO1xuICAgICAgICAgICAgZm4gJiYgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGVtaXQgYGVycm9yYFxuICAgICAgICBjb25zdCBlcnJvclN1YiA9IG9uKHNvY2tldCwgXCJlcnJvclwiLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmNsZWFudXAoKTtcbiAgICAgICAgICAgIHNlbGYuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgZG8gdGhpcyBpZiB0aGVyZSBpcyBubyBmbiB0byBoYW5kbGUgdGhlIGVycm9yXG4gICAgICAgICAgICAgICAgc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTsgLy8gcHJldmVudHMgYSByYWNlIGNvbmRpdGlvbiB3aXRoIHRoZSAnb3BlbicgZXZlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCB0aW1lclxuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoXCJlcnJvclwiLCBuZXcgRXJyb3IoXCJ0aW1lb3V0XCIpKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzLnB1c2gob3BlblN1YkRlc3Ryb3kpO1xuICAgICAgICB0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Igb3BlbigpXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29ubmVjdChmbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuKGZuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IG9wZW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ub3BlbigpIHtcbiAgICAgICAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIC8vIG1hcmsgYXMgb3BlblxuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwib3BlblwiKTtcbiAgICAgICAgLy8gYWRkIG5ldyBzdWJzXG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsIFwicGluZ1wiLCB0aGlzLm9ucGluZy5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImRhdGFcIiwgdGhpcy5vbmRhdGEuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksIG9uKHRoaXMuZGVjb2RlciwgXCJkZWNvZGVkXCIsIHRoaXMub25kZWNvZGVkLmJpbmQodGhpcykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnBpbmcoKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGluZ1wiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggZGF0YS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kYXRhKGRhdGEpIHtcbiAgICAgICAgdGhpcy5kZWNvZGVyLmFkZChkYXRhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZGVjb2RlZChwYWNrZXQpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwYWNrZXRcIiwgcGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc29ja2V0IGVycm9yLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgc29ja2V0IGZvciB0aGUgZ2l2ZW4gYG5zcGAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTb2NrZXR9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNvY2tldChuc3AsIG9wdHMpIHtcbiAgICAgICAgbGV0IHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICAgICAgICBpZiAoIXNvY2tldCkge1xuICAgICAgICAgICAgc29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLCBuc3AsIG9wdHMpO1xuICAgICAgICAgICAgdGhpcy5uc3BzW25zcF0gPSBzb2NrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzb2NrZXQgY2xvc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc29ja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZGVzdHJveShzb2NrZXQpIHtcbiAgICAgICAgY29uc3QgbnNwcyA9IE9iamVjdC5rZXlzKHRoaXMubnNwcyk7XG4gICAgICAgIGZvciAoY29uc3QgbnNwIG9mIG5zcHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICAgICAgICAgICAgaWYgKHNvY2tldC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3BhY2tldChwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgZW5jb2RlZFBhY2tldHMgPSB0aGlzLmVuY29kZXIuZW5jb2RlKHBhY2tldCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldLCBwYWNrZXQub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW4gdXAgdHJhbnNwb3J0IHN1YnNjcmlwdGlvbnMgYW5kIHBhY2tldCBidWZmZXIuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNsZWFudXAoKSB7XG4gICAgICAgIHRoaXMuc3Vicy5mb3JFYWNoKChzdWJEZXN0cm95KSA9PiBzdWJEZXN0cm95KCkpO1xuICAgICAgICB0aGlzLnN1YnMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kZWNvZGVyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2UgdGhlIGN1cnJlbnQgc29ja2V0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuc2tpcFJlY29ubmVjdCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMuX3JlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIC8vIGBvbmNsb3NlYCB3aWxsIG5vdCBmaXJlIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIGFuIG9wZW4gZXZlbnQgbmV2ZXIgaGFwcGVuZWRcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgaWYgKHRoaXMuZW5naW5lKVxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGNsb3NlKClcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBjbG9zZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jbG9zZShyZWFzb24pIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24pO1xuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3QpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdCBhIHJlY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcmVjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgICAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdF9mYWlsZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2F0dGVtcHRcIiwgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgc2VsZi5vcGVuKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZWNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucmVjb25uZWN0KCkge1xuICAgICAgICBjb25zdCBhdHRlbXB0ID0gdGhpcy5iYWNrb2ZmLmF0dGVtcHRzO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0XCIsIGF0dGVtcHQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHVybCB9IGZyb20gXCIuL3VybC5qc1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuL21hbmFnZXIuanNcIjtcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuLyoqXG4gKiBNYW5hZ2VycyBjYWNoZS5cbiAqL1xuY29uc3QgY2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGxvb2t1cCh1cmksIG9wdHMpIHtcbiAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBvcHRzID0gdXJpO1xuICAgICAgICB1cmkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGNvbnN0IHBhcnNlZCA9IHVybCh1cmksIG9wdHMucGF0aCB8fCBcIi9zb2NrZXQuaW9cIik7XG4gICAgY29uc3Qgc291cmNlID0gcGFyc2VkLnNvdXJjZTtcbiAgICBjb25zdCBpZCA9IHBhcnNlZC5pZDtcbiAgICBjb25zdCBwYXRoID0gcGFyc2VkLnBhdGg7XG4gICAgY29uc3Qgc2FtZU5hbWVzcGFjZSA9IGNhY2hlW2lkXSAmJiBwYXRoIGluIGNhY2hlW2lkXVtcIm5zcHNcIl07XG4gICAgY29uc3QgbmV3Q29ubmVjdGlvbiA9IG9wdHMuZm9yY2VOZXcgfHxcbiAgICAgICAgb3B0c1tcImZvcmNlIG5ldyBjb25uZWN0aW9uXCJdIHx8XG4gICAgICAgIGZhbHNlID09PSBvcHRzLm11bHRpcGxleCB8fFxuICAgICAgICBzYW1lTmFtZXNwYWNlO1xuICAgIGxldCBpbztcbiAgICBpZiAobmV3Q29ubmVjdGlvbikge1xuICAgICAgICBpbyA9IG5ldyBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoIWNhY2hlW2lkXSkge1xuICAgICAgICAgICAgY2FjaGVbaWRdID0gbmV3IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBpbyA9IGNhY2hlW2lkXTtcbiAgICB9XG4gICAgaWYgKHBhcnNlZC5xdWVyeSAmJiAhb3B0cy5xdWVyeSkge1xuICAgICAgICBvcHRzLnF1ZXJ5ID0gcGFyc2VkLnF1ZXJ5S2V5O1xuICAgIH1cbiAgICByZXR1cm4gaW8uc29ja2V0KHBhcnNlZC5wYXRoLCBvcHRzKTtcbn1cbi8vIHNvIHRoYXQgXCJsb29rdXBcIiBjYW4gYmUgdXNlZCBib3RoIGFzIGEgZnVuY3Rpb24gKGUuZy4gYGlvKC4uLilgKSBhbmQgYXMgYVxuLy8gbmFtZXNwYWNlIChlLmcuIGBpby5jb25uZWN0KC4uLilgKSwgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbk9iamVjdC5hc3NpZ24obG9va3VwLCB7XG4gICAgTWFuYWdlcixcbiAgICBTb2NrZXQsXG4gICAgaW86IGxvb2t1cCxcbiAgICBjb25uZWN0OiBsb29rdXAsXG59KTtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCB7IHByb3RvY29sIH0gZnJvbSBcInNvY2tldC5pby1wYXJzZXJcIjtcbi8qKlxuICogRXhwb3NlIGNvbnN0cnVjdG9ycyBmb3Igc3RhbmRhbG9uZSBidWlsZC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCB7IE1hbmFnZXIsIFNvY2tldCwgbG9va3VwIGFzIGlvLCBsb29rdXAgYXMgY29ubmVjdCwgbG9va3VwIGFzIGRlZmF1bHQsIH07XG4iLCJpbXBvcnQgeyBpbyB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5cbmNvbnN0IHNvY2tldCA9IGlvLmNvbm5lY3QoXCJodHRwOi8vMTc2LjM0LjYzLjE0ODozMDAwXCIpO1xuY29uc3Qgd2VsY29tZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VsY29tZVwiKTtcbmNvbnN0IGNhbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGxcIik7XG5jb25zdCBteUZhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RmFjZVwiKTtcbmNvbnN0IG11dGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm11dGVcIik7XG5jb25zdCBjYW1lcmFCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbWVyYVwiKTtcbmNvbnN0IGNhbWVyYXNTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbWVyYXNcIik7XG5cbmNhbGwuaGlkZGVuID0gdHJ1ZTtcblxubGV0IG15U3RyZWFtO1xubGV0IG11dGVkID0gZmFsc2U7XG5sZXQgY2FtZXJhT2ZmID0gZmFsc2U7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENhbWVyYXMoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGV2aWNlcyA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpO1xuICAgIGNvbnN0IGNhbWVyYXMgPSAoYXdhaXQgZGV2aWNlcykuZmlsdGVyKChkZXZpY2UpID0+IGRldmljZS5raW5kID09IFwidmlkZW9pbnB1dFwiKTtcbiAgICBjb25zdCBjdXJyZW50Q2FtZXJhID0gbXlTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXTtcbiAgICBjYW1lcmFzLmZvckVhY2goKGNhbWVyYSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IGNhbWVyYS5kZXZpY2VJZDtcbiAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBjYW1lcmEubGFiZWw7XG4gICAgICBpZiAoY3VycmVudENhbWVyYS5kZXZpY2VJZCA9PT0gY2FtZXJhLmRldmljZUlkKSB7XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBjYW1lcmFzU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZWRpYShkZXZpY2VJZCkge1xuICBjb25zdCBpbml0aWFsQ29uc3RyYWlucyA9IHtcbiAgICBhdWRpbzogdHJ1ZSxcbiAgICB2aWRlbzogeyBmYWNpbmdNb2RlOiBcInVzZXJcIiB9LFxuICB9O1xuICBjb25zdCBjYW1lcmFDb25zdHJhaW5zID0ge1xuICAgIGF1ZGlvOiB0cnVlLFxuICAgIHZpZGVvOiB7IGRldmljZUlkOiB7IGV4YWN0OiBkZXZpY2VJZCB9IH0sXG4gIH07XG4gIHRyeSB7XG4gICAgbXlTdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShkZXZpY2VJZCA/IGNhbWVyYUNvbnN0cmFpbnMgOiBpbml0aWFsQ29uc3RyYWlucyk7XG4gICAgbXlGYWNlLnNyY09iamVjdCA9IG15U3RyZWFtO1xuICAgIGlmICghZGV2aWNlSWQpIHtcbiAgICAgIGF3YWl0IGdldENhbWVyYXMoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICB9XG59XG5cbm11dGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgbXlTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xuICAgIHRyYWNrLmVuYWJsZWQgPSAhdHJhY2suZW5hYmxlZDtcbiAgfSk7XG4gIGlmICghbXV0ZWQpIHtcbiAgICBtdXRlQnRuLmlubmVyVGV4dCA9IFwiVW5tdXRlXCI7XG4gICAgbXV0ZWQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIG11dGVCdG4uaW5uZXJUZXh0ID0gXCJNdXRlXCI7XG4gICAgbXV0ZWQgPSBmYWxzZTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGhhbmRsZVZpZGVvT2ZmKCkge1xuICBteVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XG4gICAgdHJhY2suZW5hYmxlZCA9ICF0cmFjay5lbmFibGVkO1xuICB9KTtcbiAgaWYgKCFjYW1lcmFPZmYpIHtcbiAgICBjYW1lcmFCdG4uaW5uZXJUZXh0ID0gXCJUdXJuIENhbWVyYSBPblwiO1xuICAgIGNhbWVyYU9mZiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY2FtZXJhQnRuLmlubmVyVGV4dCA9IFwiVHVybiBDYW1lcmEgT2ZmXCI7XG4gICAgY2FtZXJhT2ZmID0gZmFsc2U7XG4gIH1cbn1cblxuY2FtZXJhQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVWaWRlb09mZik7XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNhbWVyYUNoYW5nZSgpIHtcbiAgYXdhaXQgZ2V0TWVkaWEoY2FtZXJhc1NlbGVjdC52YWx1ZSk7XG59XG5cbmNhbWVyYXNTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGhhbmRsZUNhbWVyYUNoYW5nZSk7XG5cbmNvbnN0IHdlbGNvbWVGb3JtID0gd2VsY29tZS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcblxuZnVuY3Rpb24gaGFuZGxlV2VsY29tZVN1Ym1pdChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBpbnB1dCA9IHdlbGNvbWVGb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgY29uc29sZS5sb2coaW5wdXQudmFsdWUpO1xufVxuXG53ZWxjb21lRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZVdlbGNvbWVTdWJtaXQpO1xuXG5zb2NrZXQub24oXCJjb25uZWN0aW9uXCIsICgpID0+IGNvbnNvbGUubG9nKFwiU29ja2V0IGlvIGNvbm5lY3RlZC5cIikpO1xuIl0sIm5hbWVzIjpbInJlIiwicGFydHMiLCJwYXJzZXVyaSIsInN0ciIsInNyYyIsImIiLCJpbmRleE9mIiwiZSIsInN1YnN0cmluZyIsInJlcGxhY2UiLCJsZW5ndGgiLCJtIiwiZXhlYyIsInVyaSIsImkiLCJzb3VyY2UiLCJob3N0IiwiYXV0aG9yaXR5IiwiaXB2NnVyaSIsInBhdGhOYW1lcyIsInF1ZXJ5S2V5Iiwib2JqIiwicGF0aCIsInJlZ3giLCJuYW1lcyIsInNwbGl0Iiwic3Vic3RyIiwic3BsaWNlIiwicXVlcnkiLCJkYXRhIiwiJDAiLCIkMSIsIiQyIiwidXJsIiwibG9jIiwibG9jYXRpb24iLCJwcm90b2NvbCIsImNoYXJBdCIsInRlc3QiLCJwb3J0IiwiaXB2NiIsImlkIiwiaHJlZiIsImhhc0NvcnNNb2R1bGUiLCJYTUxIdHRwUmVxdWVzdCIsImVyciIsInNlbGYiLCJ3aW5kb3ciLCJGdW5jdGlvbiIsIm9wdHMiLCJ4ZG9tYWluIiwiaGFzQ09SUyIsImdsb2JhbFRoaXMiLCJjb25jYXQiLCJqb2luIiwicGljayIsImF0dHIiLCJyZWR1Y2UiLCJhY2MiLCJrIiwiaGFzT3duUHJvcGVydHkiLCJOQVRJVkVfU0VUX1RJTUVPVVQiLCJzZXRUaW1lb3V0IiwiTkFUSVZFX0NMRUFSX1RJTUVPVVQiLCJjbGVhclRpbWVvdXQiLCJpbnN0YWxsVGltZXJGdW5jdGlvbnMiLCJ1c2VOYXRpdmVUaW1lcnMiLCJzZXRUaW1lb3V0Rm4iLCJiaW5kIiwiY2xlYXJUaW1lb3V0Rm4iLCJFbWl0dGVyIiwibWl4aW4iLCJrZXkiLCJwcm90b3R5cGUiLCJvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImZuIiwiX2NhbGxiYWNrcyIsInB1c2giLCJvbmNlIiwib2ZmIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjYWxsYmFja3MiLCJjYiIsImVtaXQiLCJhcmdzIiwiQXJyYXkiLCJzbGljZSIsImxlbiIsImVtaXRSZXNlcnZlZCIsImxpc3RlbmVycyIsImhhc0xpc3RlbmVycyIsIlBBQ0tFVF9UWVBFUyIsIk9iamVjdCIsImNyZWF0ZSIsIlBBQ0tFVF9UWVBFU19SRVZFUlNFIiwia2V5cyIsImZvckVhY2giLCJFUlJPUl9QQUNLRVQiLCJ0eXBlIiwid2l0aE5hdGl2ZUJsb2IiLCJCbG9iIiwidG9TdHJpbmciLCJjYWxsIiwid2l0aE5hdGl2ZUFycmF5QnVmZmVyIiwiQXJyYXlCdWZmZXIiLCJpc1ZpZXciLCJidWZmZXIiLCJlbmNvZGVQYWNrZXQiLCJzdXBwb3J0c0JpbmFyeSIsImNhbGxiYWNrIiwiZW5jb2RlQmxvYkFzQmFzZTY0IiwiZmlsZVJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJjb250ZW50IiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsImxvb2t1cCIsImRlY29kZSIsImRlY29kZVBhY2tldCIsImVuY29kZWRQYWNrZXQiLCJiaW5hcnlUeXBlIiwibWFwQmluYXJ5IiwiZGVjb2RlQmFzZTY0UGFja2V0IiwicGFja2V0VHlwZSIsImRlY29kZWQiLCJiYXNlNjQiLCJTRVBBUkFUT1IiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJlbmNvZGVQYXlsb2FkIiwicGFja2V0cyIsImVuY29kZWRQYWNrZXRzIiwiY291bnQiLCJwYWNrZXQiLCJkZWNvZGVQYXlsb2FkIiwiZW5jb2RlZFBheWxvYWQiLCJkZWNvZGVkUGFja2V0IiwiVHJhbnNwb3J0IiwiY29uc3RydWN0b3IiLCJ3cml0YWJsZSIsInJlYWR5U3RhdGUiLCJzb2NrZXQiLCJvbkVycm9yIiwibXNnIiwiZGVzYyIsIkVycm9yIiwiZGVzY3JpcHRpb24iLCJvcGVuIiwiZG9PcGVuIiwiY2xvc2UiLCJkb0Nsb3NlIiwib25DbG9zZSIsInNlbmQiLCJ3cml0ZSIsIm9uT3BlbiIsIm9uRGF0YSIsIm9uUGFja2V0IiwiYWxwaGFiZXQiLCJtYXAiLCJzZWVkIiwicHJldiIsImVuY29kZSIsIm51bSIsImVuY29kZWQiLCJNYXRoIiwiZmxvb3IiLCJ5ZWFzdCIsIm5vdyIsIkRhdGUiLCJ5ZWFzdF8xIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicXMiLCJxcnkiLCJwYWlycyIsImwiLCJwYWlyIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiUG9sbGluZyIsInBvbGxpbmciLCJuYW1lIiwicG9sbCIsInBhdXNlIiwib25QYXVzZSIsInRvdGFsIiwiZG9Qb2xsIiwiZG9Xcml0ZSIsInNjaGVtYSIsInNlY3VyZSIsInRpbWVzdGFtcFJlcXVlc3RzIiwidGltZXN0YW1wUGFyYW0iLCJzaWQiLCJiNjQiLCJOdW1iZXIiLCJlbmNvZGVkUXVlcnkiLCJwYXJzZXFzIiwiaG9zdG5hbWUiLCJlbXB0eSIsImhhc1hIUjIiLCJ4aHIiLCJyZXNwb25zZVR5cGUiLCJYSFIiLCJpc1NTTCIsInhkIiwieHMiLCJmb3JjZUJhc2U2NCIsInJlcXVlc3QiLCJhc3NpZ24iLCJSZXF1ZXN0IiwicmVxIiwibWV0aG9kIiwicG9sbFhociIsImFzeW5jIiwidW5kZWZpbmVkIiwieHNjaGVtZSIsImV4dHJhSGVhZGVycyIsInNldERpc2FibGVIZWFkZXJDaGVjayIsInNldFJlcXVlc3RIZWFkZXIiLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXF1ZXN0VGltZW91dCIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJzdGF0dXMiLCJvbkxvYWQiLCJkb2N1bWVudCIsImluZGV4IiwicmVxdWVzdHNDb3VudCIsInJlcXVlc3RzIiwib25TdWNjZXNzIiwiY2xlYW51cCIsImZyb21FcnJvciIsImFib3J0IiwicmVzcG9uc2VUZXh0IiwiYXR0YWNoRXZlbnQiLCJ1bmxvYWRIYW5kbGVyIiwidGVybWluYXRpb25FdmVudCIsIm5leHRUaWNrIiwiaXNQcm9taXNlQXZhaWxhYmxlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiV2ViU29ja2V0IiwiTW96V2ViU29ja2V0IiwidXNpbmdCcm93c2VyV2ViU29ja2V0IiwiZGVmYXVsdEJpbmFyeVR5cGUiLCJpc1JlYWN0TmF0aXZlIiwibmF2aWdhdG9yIiwicHJvZHVjdCIsInRvTG93ZXJDYXNlIiwiV1MiLCJjaGVjayIsInByb3RvY29scyIsImhlYWRlcnMiLCJ3cyIsImFkZEV2ZW50TGlzdGVuZXJzIiwib25vcGVuIiwiYXV0b1VucmVmIiwiX3NvY2tldCIsInVucmVmIiwib25jbG9zZSIsIm9ubWVzc2FnZSIsImV2Iiwib25lcnJvciIsImxhc3RQYWNrZXQiLCJ0cmFuc3BvcnRzIiwid2Vic29ja2V0IiwiU29ja2V0Iiwid3JpdGVCdWZmZXIiLCJwcmV2QnVmZmVyTGVuIiwiYWdlbnQiLCJ1cGdyYWRlIiwicmVtZW1iZXJVcGdyYWRlIiwicmVqZWN0VW5hdXRob3JpemVkIiwicGVyTWVzc2FnZURlZmxhdGUiLCJ0aHJlc2hvbGQiLCJ0cmFuc3BvcnRPcHRpb25zIiwiY2xvc2VPbkJlZm9yZXVubG9hZCIsInVwZ3JhZGVzIiwicGluZ0ludGVydmFsIiwicGluZ1RpbWVvdXQiLCJwaW5nVGltZW91dFRpbWVyIiwidHJhbnNwb3J0Iiwib2ZmbGluZUV2ZW50TGlzdGVuZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJjbG9uZSIsIkVJTyIsInByaW9yV2Vic29ja2V0U3VjY2VzcyIsInNoaWZ0Iiwic2V0VHJhbnNwb3J0Iiwib25EcmFpbiIsInByb2JlIiwiZmFpbGVkIiwib25UcmFuc3BvcnRPcGVuIiwidXBncmFkaW5nIiwiZmx1c2giLCJmcmVlemVUcmFuc3BvcnQiLCJlcnJvciIsIm9uVHJhbnNwb3J0Q2xvc2UiLCJvbnVwZ3JhZGUiLCJ0byIsIm9uSGFuZHNoYWtlIiwiSlNPTiIsInBhcnNlIiwicmVzZXRQaW5nVGltZW91dCIsInNlbmRQYWNrZXQiLCJjb2RlIiwiZmlsdGVyVXBncmFkZXMiLCJvcHRpb25zIiwiY29tcHJlc3MiLCJjbGVhbnVwQW5kQ2xvc2UiLCJ3YWl0Rm9yVXBncmFkZSIsInJlYXNvbiIsImZpbHRlcmVkVXBncmFkZXMiLCJqIiwibyIsIndpdGhOYXRpdmVGaWxlIiwiRmlsZSIsImlzQmluYXJ5IiwiaGFzQmluYXJ5IiwidG9KU09OIiwiaXNBcnJheSIsImRlY29uc3RydWN0UGFja2V0IiwiYnVmZmVycyIsInBhY2tldERhdGEiLCJwYWNrIiwiX2RlY29uc3RydWN0UGFja2V0IiwiYXR0YWNobWVudHMiLCJwbGFjZWhvbGRlciIsIl9wbGFjZWhvbGRlciIsIm5ld0RhdGEiLCJyZWNvbnN0cnVjdFBhY2tldCIsIl9yZWNvbnN0cnVjdFBhY2tldCIsIlBhY2tldFR5cGUiLCJFbmNvZGVyIiwiRVZFTlQiLCJBQ0siLCJCSU5BUllfRVZFTlQiLCJCSU5BUllfQUNLIiwiZW5jb2RlQXNCaW5hcnkiLCJlbmNvZGVBc1N0cmluZyIsIm5zcCIsInN0cmluZ2lmeSIsImRlY29uc3RydWN0aW9uIiwidW5zaGlmdCIsIkRlY29kZXIiLCJhZGQiLCJkZWNvZGVTdHJpbmciLCJyZWNvbnN0cnVjdG9yIiwiQmluYXJ5UmVjb25zdHJ1Y3RvciIsInRha2VCaW5hcnlEYXRhIiwicCIsInN0YXJ0IiwiYnVmIiwiYyIsIm5leHQiLCJwYXlsb2FkIiwidHJ5UGFyc2UiLCJpc1BheWxvYWRWYWxpZCIsIkNPTk5FQ1QiLCJESVNDT05ORUNUIiwiQ09OTkVDVF9FUlJPUiIsImRlc3Ryb3kiLCJmaW5pc2hlZFJlY29uc3RydWN0aW9uIiwicmVjb25QYWNrIiwiYmluRGF0YSIsInN1YkRlc3Ryb3kiLCJSRVNFUlZFRF9FVkVOVFMiLCJmcmVlemUiLCJjb25uZWN0IiwiY29ubmVjdF9lcnJvciIsImRpc2Nvbm5lY3QiLCJkaXNjb25uZWN0aW5nIiwibmV3TGlzdGVuZXIiLCJpbyIsImNvbm5lY3RlZCIsImRpc2Nvbm5lY3RlZCIsInJlY2VpdmVCdWZmZXIiLCJzZW5kQnVmZmVyIiwiaWRzIiwiYWNrcyIsImZsYWdzIiwiYXV0aCIsIl9hdXRvQ29ubmVjdCIsInN1YkV2ZW50cyIsInN1YnMiLCJvbnBhY2tldCIsImFjdGl2ZSIsIl9yZWFkeVN0YXRlIiwicG9wIiwiaXNUcmFuc3BvcnRXcml0YWJsZSIsImVuZ2luZSIsImRpc2NhcmRQYWNrZXQiLCJ2b2xhdGlsZSIsIl9wYWNrZXQiLCJzYW1lTmFtZXNwYWNlIiwib25jb25uZWN0Iiwib25ldmVudCIsIm9uYWNrIiwib25kaXNjb25uZWN0IiwibWVzc2FnZSIsImFjayIsImVtaXRFdmVudCIsIl9hbnlMaXN0ZW5lcnMiLCJsaXN0ZW5lciIsInNlbnQiLCJlbWl0QnVmZmVyZWQiLCJvbkFueSIsInByZXBlbmRBbnkiLCJvZmZBbnkiLCJsaXN0ZW5lcnNBbnkiLCJiYWNrbzIiLCJCYWNrb2ZmIiwibXMiLCJtaW4iLCJtYXgiLCJmYWN0b3IiLCJqaXR0ZXIiLCJhdHRlbXB0cyIsImR1cmF0aW9uIiwicG93IiwicmFuZCIsInJhbmRvbSIsImRldmlhdGlvbiIsInJlc2V0Iiwic2V0TWluIiwic2V0TWF4Iiwic2V0Sml0dGVyIiwiTWFuYWdlciIsIl9hIiwibnNwcyIsInJlY29ubmVjdGlvbiIsInJlY29ubmVjdGlvbkF0dGVtcHRzIiwiSW5maW5pdHkiLCJyZWNvbm5lY3Rpb25EZWxheSIsInJlY29ubmVjdGlvbkRlbGF5TWF4IiwicmFuZG9taXphdGlvbkZhY3RvciIsImJhY2tvZmYiLCJfcGFyc2VyIiwicGFyc2VyIiwiZW5jb2RlciIsImRlY29kZXIiLCJhdXRvQ29ubmVjdCIsInYiLCJfcmVjb25uZWN0aW9uIiwiX3JlY29ubmVjdGlvbkF0dGVtcHRzIiwiX3JlY29ubmVjdGlvbkRlbGF5IiwiX3JhbmRvbWl6YXRpb25GYWN0b3IiLCJfcmVjb25uZWN0aW9uRGVsYXlNYXgiLCJfdGltZW91dCIsIm1heWJlUmVjb25uZWN0T25PcGVuIiwiX3JlY29ubmVjdGluZyIsInJlY29ubmVjdCIsIkVuZ2luZSIsInNraXBSZWNvbm5lY3QiLCJvcGVuU3ViRGVzdHJveSIsImVycm9yU3ViIiwidGltZXIiLCJvbnBpbmciLCJvbmRhdGEiLCJvbmRlY29kZWQiLCJfZGVzdHJveSIsIl9jbG9zZSIsImRlbGF5Iiwib25yZWNvbm5lY3QiLCJhdHRlbXB0IiwiY2FjaGUiLCJwYXJzZWQiLCJuZXdDb25uZWN0aW9uIiwiZm9yY2VOZXciLCJtdWx0aXBsZXgiLCJ3ZWxjb21lIiwiZ2V0RWxlbWVudEJ5SWQiLCJteUZhY2UiLCJtdXRlQnRuIiwiY2FtZXJhQnRuIiwiY2FtZXJhc1NlbGVjdCIsImhpZGRlbiIsIm15U3RyZWFtIiwibXV0ZWQiLCJjYW1lcmFPZmYiLCJnZXRDYW1lcmFzIiwiZGV2aWNlcyIsIm1lZGlhRGV2aWNlcyIsImVudW1lcmF0ZURldmljZXMiLCJjYW1lcmFzIiwiZmlsdGVyIiwiZGV2aWNlIiwia2luZCIsImN1cnJlbnRDYW1lcmEiLCJnZXRWaWRlb1RyYWNrcyIsImNhbWVyYSIsIm9wdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsImRldmljZUlkIiwiaW5uZXJUZXh0IiwibGFiZWwiLCJzZWxlY3RlZCIsImFwcGVuZENoaWxkIiwiY29uc29sZSIsImxvZyIsImdldE1lZGlhIiwiaW5pdGlhbENvbnN0cmFpbnMiLCJhdWRpbyIsInZpZGVvIiwiZmFjaW5nTW9kZSIsImNhbWVyYUNvbnN0cmFpbnMiLCJleGFjdCIsImdldFVzZXJNZWRpYSIsInNyY09iamVjdCIsImdldEF1ZGlvVHJhY2tzIiwidHJhY2siLCJlbmFibGVkIiwiaGFuZGxlVmlkZW9PZmYiLCJoYW5kbGVDYW1lcmFDaGFuZ2UiLCJ3ZWxjb21lRm9ybSIsInF1ZXJ5U2VsZWN0b3IiLCJoYW5kbGVXZWxjb21lU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJpbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU9BLElBQUlBLEVBQUUsR0FBRyx5T0FBVDtJQUVBLElBQUlDLEtBQUssR0FBRyxDQUNSLFFBRFEsRUFDRSxVQURGLEVBQ2MsV0FEZCxFQUMyQixVQUQzQixFQUN1QyxNQUR2QyxFQUMrQyxVQUQvQyxFQUMyRCxNQUQz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
