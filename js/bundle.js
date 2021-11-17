
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

    const socket = lookup.connect("http://176.34.63.148:3000", {
      secure: false
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvcGFyc2V1cmkvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vdXJsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy1jb3JzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2dsb2JhbFRoaXMuYnJvd3Nlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3htbGh0dHByZXF1ZXN0LmJyb3dzZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ac29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2NvbW1vbnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vZW5jb2RlUGFja2V0LmJyb3dzZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFzZTY0LWFycmF5YnVmZmVyL2Rpc3QvYmFzZTY0LWFycmF5YnVmZmVyLmVzNS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9kZWNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMveWVhc3QvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvcGFyc2Vxcy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3BvbGxpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5icm93c2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtL2lzLWJpbmFyeS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2J1aWxkL2VzbS9iaW5hcnkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhY2tvMi9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9tYW5hZ2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL2luZGV4LmpzIiwiLi4vLi4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBhcnNlcyBhbiBVUklcbiAqXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcblxudmFyIHBhcnRzID0gW1xuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpIHtcbiAgICB2YXIgc3JjID0gc3RyLFxuICAgICAgICBiID0gc3RyLmluZGV4T2YoJ1snKSxcbiAgICAgICAgZSA9IHN0ci5pbmRleE9mKCddJyk7XG5cbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJyksXG4gICAgICAgIHVyaSA9IHt9LFxuICAgICAgICBpID0gMTQ7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cblxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcbiAgICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdC5zdWJzdHJpbmcoMSwgdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXJpLnBhdGhOYW1lcyA9IHBhdGhOYW1lcyh1cmksIHVyaVsncGF0aCddKTtcbiAgICB1cmkucXVlcnlLZXkgPSBxdWVyeUtleSh1cmksIHVyaVsncXVlcnknXSk7XG5cbiAgICByZXR1cm4gdXJpO1xufTtcblxuZnVuY3Rpb24gcGF0aE5hbWVzKG9iaiwgcGF0aCkge1xuICAgIHZhciByZWd4ID0gL1xcL3syLDl9L2csXG4gICAgICAgIG5hbWVzID0gcGF0aC5yZXBsYWNlKHJlZ3gsIFwiL1wiKS5zcGxpdChcIi9cIik7XG5cbiAgICBpZiAocGF0aC5zdWJzdHIoMCwgMSkgPT0gJy8nIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZSgwLCAxKTtcbiAgICB9XG4gICAgaWYgKHBhdGguc3Vic3RyKHBhdGgubGVuZ3RoIC0gMSwgMSkgPT0gJy8nKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZShuYW1lcy5sZW5ndGggLSAxLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZXM7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5S2V5KHVyaSwgcXVlcnkpIHtcbiAgICB2YXIgZGF0YSA9IHt9O1xuXG4gICAgcXVlcnkucmVwbGFjZSgvKD86XnwmKShbXiY9XSopPT8oW14mXSopL2csIGZ1bmN0aW9uICgkMCwgJDEsICQyKSB7XG4gICAgICAgIGlmICgkMSkge1xuICAgICAgICAgICAgZGF0YVskMV0gPSAkMjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJpbXBvcnQgcGFyc2V1cmkgZnJvbSBcInBhcnNldXJpXCI7XG4vKipcbiAqIFVSTCBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHVyaSAtIHVybFxuICogQHBhcmFtIHBhdGggLSB0aGUgcmVxdWVzdCBwYXRoIG9mIHRoZSBjb25uZWN0aW9uXG4gKiBAcGFyYW0gbG9jIC0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cbiAqICAgICAgICBEZWZhdWx0cyB0byB3aW5kb3cubG9jYXRpb24uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cmwodXJpLCBwYXRoID0gXCJcIiwgbG9jKSB7XG4gICAgbGV0IG9iaiA9IHVyaTtcbiAgICAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxuICAgIGxvYyA9IGxvYyB8fCAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIGxvY2F0aW9uKTtcbiAgICBpZiAobnVsbCA9PSB1cmkpXG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIFwiLy9cIiArIGxvYy5ob3N0O1xuICAgIC8vIHJlbGF0aXZlIHBhdGggc3VwcG9ydFxuICAgIGlmICh0eXBlb2YgdXJpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChcIi9cIiA9PT0gdXJpLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgaWYgKFwiL1wiID09PSB1cmkuY2hhckF0KDEpKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLmhvc3QgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvXihodHRwcz98d3NzPyk6XFwvXFwvLy50ZXN0KHVyaSkpIHtcbiAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgbG9jKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgXCIvL1wiICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJpID0gXCJodHRwczovL1wiICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHBhcnNlXG4gICAgICAgIG9iaiA9IHBhcnNldXJpKHVyaSk7XG4gICAgfVxuICAgIC8vIG1ha2Ugc3VyZSB3ZSB0cmVhdCBgbG9jYWxob3N0OjgwYCBhbmQgYGxvY2FsaG9zdGAgZXF1YWxseVxuICAgIGlmICghb2JqLnBvcnQpIHtcbiAgICAgICAgaWYgKC9eKGh0dHB8d3MpJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICAgICAgICBvYmoucG9ydCA9IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgvXihodHRwfHdzKXMkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgICAgICAgIG9iai5wb3J0ID0gXCI0NDNcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvYmoucGF0aCA9IG9iai5wYXRoIHx8IFwiL1wiO1xuICAgIGNvbnN0IGlwdjYgPSBvYmouaG9zdC5pbmRleE9mKFwiOlwiKSAhPT0gLTE7XG4gICAgY29uc3QgaG9zdCA9IGlwdjYgPyBcIltcIiArIG9iai5ob3N0ICsgXCJdXCIgOiBvYmouaG9zdDtcbiAgICAvLyBkZWZpbmUgdW5pcXVlIGlkXG4gICAgb2JqLmlkID0gb2JqLnByb3RvY29sICsgXCI6Ly9cIiArIGhvc3QgKyBcIjpcIiArIG9iai5wb3J0ICsgcGF0aDtcbiAgICAvLyBkZWZpbmUgaHJlZlxuICAgIG9iai5ocmVmID1cbiAgICAgICAgb2JqLnByb3RvY29sICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgaG9zdCArXG4gICAgICAgICAgICAobG9jICYmIGxvYy5wb3J0ID09PSBvYmoucG9ydCA/IFwiXCIgOiBcIjpcIiArIG9iai5wb3J0KTtcbiAgICByZXR1cm4gb2JqO1xufVxuIiwiXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICpcbiAqIExvZ2ljIGJvcnJvd2VkIGZyb20gTW9kZXJuaXpyOlxuICpcbiAqICAgLSBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvY29ycy5qc1xuICovXG5cbnRyeSB7XG4gIG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufSBjYXRjaCAoZXJyKSB7XG4gIC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbiAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG4gIG1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG59XG4iLCJleHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgICB9XG59KSgpO1xuIiwiLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcbmltcG9ydCBoYXNDT1JTIGZyb20gXCJoYXMtY29yc1wiO1xuaW1wb3J0IGdsb2JhbFRoaXMgZnJvbSBcIi4uL2dsb2JhbFRoaXMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgY29uc3QgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcbiAgICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgICB0cnkge1xuICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7IH1cbiAgICBpZiAoIXhkb21haW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgZ2xvYmFsVGhpc1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXShcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICB9XG59XG4iLCJpbXBvcnQgZ2xvYmFsVGhpcyBmcm9tIFwiLi9nbG9iYWxUaGlzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gcGljayhvYmosIC4uLmF0dHIpIHtcbiAgICByZXR1cm4gYXR0ci5yZWR1Y2UoKGFjYywgaykgPT4ge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBhY2Nba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4vLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSByZWFsIHRpbWVvdXQgZnVuY3Rpb25zIHNvIHRoZXkgY2FuIGJlIHVzZWQgd2hlbiBvdmVycmlkZGVuXG5jb25zdCBOQVRJVkVfU0VUX1RJTUVPVVQgPSBzZXRUaW1lb3V0O1xuY29uc3QgTkFUSVZFX0NMRUFSX1RJTUVPVVQgPSBjbGVhclRpbWVvdXQ7XG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbFRpbWVyRnVuY3Rpb25zKG9iaiwgb3B0cykge1xuICAgIGlmIChvcHRzLnVzZU5hdGl2ZVRpbWVycykge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gTkFUSVZFX1NFVF9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgICAgIG9iai5jbGVhclRpbWVvdXRGbiA9IE5BVElWRV9DTEVBUl9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gc2V0VGltZW91dC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgICAgICBvYmouY2xlYXJUaW1lb3V0Rm4gPSBjbGVhclRpbWVvdXQuYmluZChnbG9iYWxUaGlzKTtcbiAgICB9XG59XG4iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5leHBvcnRzLkVtaXR0ZXIgPSBFbWl0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGV2ZW50IHNwZWNpZmljIGFycmF5cyBmb3IgZXZlbnQgdHlwZXMgdGhhdCBub1xuICAvLyBvbmUgaXMgc3Vic2NyaWJlZCBmb3IgdG8gYXZvaWQgbWVtb3J5IGxlYWsuXG4gIGlmIChjYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICB9XG5cbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBhbGlhcyB1c2VkIGZvciByZXNlcnZlZCBldmVudHMgKHByb3RlY3RlZCBtZXRob2QpXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0UmVzZXJ2ZWQgPSBFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4vKipcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xufTtcbiIsImNvbnN0IFBBQ0tFVF9UWVBFUyA9IE9iamVjdC5jcmVhdGUobnVsbCk7IC8vIG5vIE1hcCA9IG5vIHBvbHlmaWxsXG5QQUNLRVRfVFlQRVNbXCJvcGVuXCJdID0gXCIwXCI7XG5QQUNLRVRfVFlQRVNbXCJjbG9zZVwiXSA9IFwiMVwiO1xuUEFDS0VUX1RZUEVTW1wicGluZ1wiXSA9IFwiMlwiO1xuUEFDS0VUX1RZUEVTW1wicG9uZ1wiXSA9IFwiM1wiO1xuUEFDS0VUX1RZUEVTW1wibWVzc2FnZVwiXSA9IFwiNFwiO1xuUEFDS0VUX1RZUEVTW1widXBncmFkZVwiXSA9IFwiNVwiO1xuUEFDS0VUX1RZUEVTW1wibm9vcFwiXSA9IFwiNlwiO1xuY29uc3QgUEFDS0VUX1RZUEVTX1JFVkVSU0UgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuT2JqZWN0LmtleXMoUEFDS0VUX1RZUEVTKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgUEFDS0VUX1RZUEVTX1JFVkVSU0VbUEFDS0VUX1RZUEVTW2tleV1dID0ga2V5O1xufSk7XG5jb25zdCBFUlJPUl9QQUNLRVQgPSB7IHR5cGU6IFwiZXJyb3JcIiwgZGF0YTogXCJwYXJzZXIgZXJyb3JcIiB9O1xuZXhwb3J0IHsgUEFDS0VUX1RZUEVTLCBQQUNLRVRfVFlQRVNfUkVWRVJTRSwgRVJST1JfUEFDS0VUIH07XG4iLCJpbXBvcnQgeyBQQUNLRVRfVFlQRVMgfSBmcm9tIFwiLi9jb21tb25zLmpzXCI7XG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKEJsb2IpID09PSBcIltvYmplY3QgQmxvYkNvbnN0cnVjdG9yXVwiKTtcbmNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuLy8gQXJyYXlCdWZmZXIuaXNWaWV3IG1ldGhvZCBpcyBub3QgZGVmaW5lZCBpbiBJRTEwXG5jb25zdCBpc1ZpZXcgPSBvYmogPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iaiAmJiBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59O1xuY29uc3QgZW5jb2RlUGFja2V0ID0gKHsgdHlwZSwgZGF0YSB9LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spID0+IHtcbiAgICBpZiAod2l0aE5hdGl2ZUJsb2IgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYkFzQmFzZTY0KGRhdGEsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiZcbiAgICAgICAgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcoZGF0YSkpKSB7XG4gICAgICAgIGlmIChzdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZUJsb2JBc0Jhc2U2NChuZXcgQmxvYihbZGF0YV0pLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcGxhaW4gc3RyaW5nXG4gICAgcmV0dXJuIGNhbGxiYWNrKFBBQ0tFVF9UWVBFU1t0eXBlXSArIChkYXRhIHx8IFwiXCIpKTtcbn07XG5jb25zdCBlbmNvZGVCbG9iQXNCYXNlNjQgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGZpbGVSZWFkZXIucmVzdWx0LnNwbGl0KFwiLFwiKVsxXTtcbiAgICAgICAgY2FsbGJhY2soXCJiXCIgKyBjb250ZW50KTtcbiAgICB9O1xuICAgIHJldHVybiBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZGF0YSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZW5jb2RlUGFja2V0O1xuIiwiLypcbiAqIGJhc2U2NC1hcnJheWJ1ZmZlciAxLjAuMSA8aHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlcj5cbiAqIENvcHlyaWdodCAoYykgMjAyMSBOaWtsYXMgdm9uIEhlcnR6ZW4gPGh0dHBzOi8vaGVydHplbi5jb20+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgTGljZW5zZVxuICovXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG4vLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguXG52YXIgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG59XG52YXIgZW5jb2RlID0gZnVuY3Rpb24gKGFycmF5YnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykge1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107XG4gICAgfVxuICAgIGlmIChsZW4gJSAzID09PSAyKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nO1xuICAgIH1cbiAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JztcbiAgICB9XG4gICAgcmV0dXJuIGJhc2U2NDtcbn07XG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKGJhc2U2NCkge1xuICAgIHZhciBidWZmZXJMZW5ndGggPSBiYXNlNjQubGVuZ3RoICogMC43NSwgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSAnPScpIHtcbiAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSAnPScpIHtcbiAgICAgICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICAgICAgZW5jb2RlZDEgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSldO1xuICAgICAgICBlbmNvZGVkMiA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMSldO1xuICAgICAgICBlbmNvZGVkMyA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMildO1xuICAgICAgICBlbmNvZGVkNCA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMyldO1xuICAgICAgICBieXRlc1twKytdID0gKGVuY29kZWQxIDw8IDIpIHwgKGVuY29kZWQyID4+IDQpO1xuICAgICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMiAmIDE1KSA8PCA0KSB8IChlbmNvZGVkMyA+PiAyKTtcbiAgICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDMgJiAzKSA8PCA2KSB8IChlbmNvZGVkNCAmIDYzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5YnVmZmVyO1xufTtcblxuZXhwb3J0IHsgZGVjb2RlLCBlbmNvZGUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2U2NC1hcnJheWJ1ZmZlci5lczUuanMubWFwXG4iLCJpbXBvcnQgeyBFUlJPUl9QQUNLRVQsIFBBQ0tFVF9UWVBFU19SRVZFUlNFIH0gZnJvbSBcIi4vY29tbW9ucy5qc1wiO1xuaW1wb3J0IHsgZGVjb2RlIH0gZnJvbSBcImJhc2U2NC1hcnJheWJ1ZmZlclwiO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBkZWNvZGVQYWNrZXQgPSAoZW5jb2RlZFBhY2tldCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZW5jb2RlZFBhY2tldCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICBkYXRhOiBtYXBCaW5hcnkoZW5jb2RlZFBhY2tldCwgYmluYXJ5VHlwZSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGVuY29kZWRQYWNrZXQuY2hhckF0KDApO1xuICAgIGlmICh0eXBlID09PSBcImJcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICBkYXRhOiBkZWNvZGVCYXNlNjRQYWNrZXQoZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSksIGJpbmFyeVR5cGUpXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHBhY2tldFR5cGUgPSBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXTtcbiAgICBpZiAoIXBhY2tldFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIEVSUk9SX1BBQ0tFVDtcbiAgICB9XG4gICAgcmV0dXJuIGVuY29kZWRQYWNrZXQubGVuZ3RoID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdLFxuICAgICAgICAgICAgZGF0YTogZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSlcbiAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdXG4gICAgICAgIH07XG59O1xuY29uc3QgZGVjb2RlQmFzZTY0UGFja2V0ID0gKGRhdGEsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBpZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyKSB7XG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSBkZWNvZGUoZGF0YSk7XG4gICAgICAgIHJldHVybiBtYXBCaW5hcnkoZGVjb2RlZCwgYmluYXJ5VHlwZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4geyBiYXNlNjQ6IHRydWUsIGRhdGEgfTsgLy8gZmFsbGJhY2sgZm9yIG9sZCBicm93c2Vyc1xuICAgIH1cbn07XG5jb25zdCBtYXBCaW5hcnkgPSAoZGF0YSwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIHN3aXRjaCAoYmluYXJ5VHlwZSkge1xuICAgICAgICBjYXNlIFwiYmxvYlwiOlxuICAgICAgICAgICAgcmV0dXJuIGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciA/IG5ldyBCbG9iKFtkYXRhXSkgOiBkYXRhO1xuICAgICAgICBjYXNlIFwiYXJyYXlidWZmZXJcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBkYXRhOyAvLyBhc3N1bWluZyB0aGUgZGF0YSBpcyBhbHJlYWR5IGFuIEFycmF5QnVmZmVyXG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGRlY29kZVBhY2tldDtcbiIsImltcG9ydCBlbmNvZGVQYWNrZXQgZnJvbSBcIi4vZW5jb2RlUGFja2V0LmpzXCI7XG5pbXBvcnQgZGVjb2RlUGFja2V0IGZyb20gXCIuL2RlY29kZVBhY2tldC5qc1wiO1xuY29uc3QgU0VQQVJBVE9SID0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMCk7IC8vIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZWxpbWl0ZXIjQVNDSUlfZGVsaW1pdGVkX3RleHRcbmNvbnN0IGVuY29kZVBheWxvYWQgPSAocGFja2V0cywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzb21lIHBhY2tldHMgbWF5IGJlIGFkZGVkIHRvIHRoZSBhcnJheSB3aGlsZSBlbmNvZGluZywgc28gdGhlIGluaXRpYWwgbGVuZ3RoIG11c3QgYmUgc2F2ZWRcbiAgICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcGFja2V0cy5mb3JFYWNoKChwYWNrZXQsIGkpID0+IHtcbiAgICAgICAgLy8gZm9yY2UgYmFzZTY0IGVuY29kaW5nIGZvciBiaW5hcnkgcGFja2V0c1xuICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgZW5jb2RlZFBhY2tldCA9PiB7XG4gICAgICAgICAgICBlbmNvZGVkUGFja2V0c1tpXSA9IGVuY29kZWRQYWNrZXQ7XG4gICAgICAgICAgICBpZiAoKytjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZW5jb2RlZFBhY2tldHMuam9pbihTRVBBUkFUT1IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgZGVjb2RlUGF5bG9hZCA9IChlbmNvZGVkUGF5bG9hZCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gZW5jb2RlZFBheWxvYWQuc3BsaXQoU0VQQVJBVE9SKTtcbiAgICBjb25zdCBwYWNrZXRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZWNvZGVkUGFja2V0ID0gZGVjb2RlUGFja2V0KGVuY29kZWRQYWNrZXRzW2ldLCBiaW5hcnlUeXBlKTtcbiAgICAgICAgcGFja2V0cy5wdXNoKGRlY29kZWRQYWNrZXQpO1xuICAgICAgICBpZiAoZGVjb2RlZFBhY2tldC50eXBlID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYWNrZXRzO1xufTtcbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDQ7XG5leHBvcnQgeyBlbmNvZGVQYWNrZXQsIGVuY29kZVBheWxvYWQsIGRlY29kZVBhY2tldCwgZGVjb2RlUGF5bG9hZCB9O1xuIiwiaW1wb3J0IHsgZGVjb2RlUGFja2V0IH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuaW1wb3J0IHsgaW5zdGFsbFRpbWVyRnVuY3Rpb25zIH0gZnJvbSBcIi4vdXRpbC5qc1wiO1xuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydCBleHRlbmRzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLnNvY2tldCA9IG9wdHMuc29ja2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xuICAgICAqIEBhcGkgcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25FcnJvcihtc2csIGRlc2MpIHtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZXJyLnR5cGUgPSBcIlRyYW5zcG9ydEVycm9yXCI7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZXJyLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICAgICAgc3VwZXIuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBvcGVuKCkge1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwiXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuaW5nXCI7XG4gICAgICAgICAgICB0aGlzLmRvT3BlbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIHRyYW5zcG9ydC5cbiAgICAgKlxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZG9DbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBzZW5kKHBhY2tldHMpIHtcbiAgICAgICAgaWYgKFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGUocGFja2V0cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIG1pZ2h0IGhhcHBlbiBpZiB0aGUgdHJhbnNwb3J0IHdhcyBzaWxlbnRseSBjbG9zZWQgaW4gdGhlIGJlZm9yZXVubG9hZCBldmVudCBoYW5kbGVyXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gb3BlblxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlblwiO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgc3VwZXIuZW1pdChcIm9wZW5cIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICAgICAqIEBhcGkgcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25EYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcGFja2V0ID0gZGVjb2RlUGFja2V0KGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO1xuICAgICAgICB0aGlzLm9uUGFja2V0KHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIGEgZGVjb2RlZCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uUGFja2V0KHBhY2tldCkge1xuICAgICAgICBzdXBlci5lbWl0KFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICBzdXBlci5lbWl0KFwiY2xvc2VcIik7XG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpXG4gICwgbGVuZ3RoID0gNjRcbiAgLCBtYXAgPSB7fVxuICAsIHNlZWQgPSAwXG4gICwgaSA9IDBcbiAgLCBwcmV2O1xuXG4vKipcbiAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBlbmNvZGUobnVtKSB7XG4gIHZhciBlbmNvZGVkID0gJyc7XG5cbiAgZG8ge1xuICAgIGVuY29kZWQgPSBhbHBoYWJldFtudW0gJSBsZW5ndGhdICsgZW5jb2RlZDtcbiAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gIH0gd2hpbGUgKG51bSA+IDApO1xuXG4gIHJldHVybiBlbmNvZGVkO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gIHZhciBkZWNvZGVkID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVjb2RlZCA9IGRlY29kZWQgKiBsZW5ndGggKyBtYXBbc3RyLmNoYXJBdChpKV07XG4gIH1cblxuICByZXR1cm4gZGVjb2RlZDtcbn1cblxuLyoqXG4gKiBZZWFzdDogQSB0aW55IGdyb3dpbmcgaWQgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24geWVhc3QoKSB7XG4gIHZhciBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuXG4gIGlmIChub3cgIT09IHByZXYpIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgcmV0dXJuIG5vdyArJy4nKyBlbmNvZGUoc2VlZCsrKTtcbn1cblxuLy9cbi8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4vL1xuZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgbWFwW2FscGhhYmV0W2ldXSA9IGk7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4vL1xueWVhc3QuZW5jb2RlID0gZW5jb2RlO1xueWVhc3QuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMgPSB5ZWFzdDtcbiIsIi8qKlxuICogQ29tcGlsZXMgYSBxdWVyeXN0cmluZ1xuICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBzdHIgPSAnJztcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIGlmIChzdHIubGVuZ3RoKSBzdHIgKz0gJyYnO1xuICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG4vKipcbiAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihxcyl7XG4gIHZhciBxcnkgPSB7fTtcbiAgdmFyIHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYWlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgcXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gIH1cbiAgcmV0dXJuIHFyeTtcbn07XG4iLCJpbXBvcnQgeyBUcmFuc3BvcnQgfSBmcm9tIFwiLi4vdHJhbnNwb3J0LmpzXCI7XG5pbXBvcnQgeWVhc3QgZnJvbSBcInllYXN0XCI7XG5pbXBvcnQgcGFyc2VxcyBmcm9tIFwicGFyc2Vxc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGF5bG9hZCwgZGVjb2RlUGF5bG9hZCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5leHBvcnQgY2xhc3MgUG9sbGluZyBleHRlbmRzIFRyYW5zcG9ydCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMucG9sbGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwicG9sbGluZ1wiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gICAgICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIHRoaXMucG9sbCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgcG9sbGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhdXNlKG9uUGF1c2UpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzaW5nXCI7XG4gICAgICAgIGNvbnN0IHBhdXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzZWRcIjtcbiAgICAgICAgICAgIG9uUGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcInBvbGxDb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBwb2xsKCkge1xuICAgICAgICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvUG9sbCgpO1xuICAgICAgICB0aGlzLmVtaXQoXCJwb2xsXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gcGFja2V0ID0+IHtcbiAgICAgICAgICAgIC8vIGlmIGl0cyB0aGUgZmlyc3QgbWVzc2FnZSB3ZSBjb25zaWRlciB0aGUgdHJhbnNwb3J0IG9wZW5cbiAgICAgICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmIHBhY2tldC50eXBlID09PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBpdHMgYSBjbG9zZSBwYWNrZXQsIHdlIGNsb3NlIHRoZSBvbmdvaW5nIHJlcXVlc3RzXG4gICAgICAgICAgICBpZiAoXCJjbG9zZVwiID09PSBwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBieXBhc3Mgb25EYXRhIGFuZCBoYW5kbGUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIHRoaXMub25QYWNrZXQocGFja2V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZGVjb2RlIHBheWxvYWRcbiAgICAgICAgZGVjb2RlUGF5bG9hZChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKS5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICAgICAgLy8gaWYgYW4gZXZlbnQgZGlkIG5vdCB0cmlnZ2VyIGNsb3NpbmdcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgIT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgLy8gaWYgd2UgZ290IGRhdGEgd2UncmUgbm90IHBvbGxpbmdcbiAgICAgICAgICAgIHRoaXMucG9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicG9sbENvbXBsZXRlXCIpO1xuICAgICAgICAgICAgaWYgKFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvciBwb2xsaW5nLCBzZW5kIGEgY2xvc2UgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZG9DbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndyaXRlKFt7IHR5cGU6IFwiY2xvc2VcIiB9XSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbiAgICAgICAgICAgIC8vIGhhbmRzaGFraW5nIGlzIGluIHByb2dyZXNzIChHSC0xNjQpXG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJvcGVuXCIsIGNsb3NlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYSBwYWNrZXRzIHBheWxvYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIHBhY2tldHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBkcmFpbiBjYWxsYmFja1xuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICBlbmNvZGVQYXlsb2FkKHBhY2tldHMsIGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb1dyaXRlKGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHVyaSgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5vcHRzLnNlY3VyZSA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgICAgICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICAgICAgICBpZiAodGhpcy5vcHRzLnBvcnQgJiZcbiAgICAgICAgICAgICgoXCJodHRwc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcImh0dHBcIiA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCkgIT09IDgwKSkpIHtcbiAgICAgICAgICAgIHBvcnQgPSBcIjpcIiArIHRoaXMub3B0cy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgaXB2NiA9IHRoaXMub3B0cy5ob3N0bmFtZS5pbmRleE9mKFwiOlwiKSAhPT0gLTE7XG4gICAgICAgIHJldHVybiAoc2NoZW1hICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgKGlwdjYgPyBcIltcIiArIHRoaXMub3B0cy5ob3N0bmFtZSArIFwiXVwiIDogdGhpcy5vcHRzLmhvc3RuYW1lKSArXG4gICAgICAgICAgICBwb3J0ICtcbiAgICAgICAgICAgIHRoaXMub3B0cy5wYXRoICtcbiAgICAgICAgICAgIChlbmNvZGVkUXVlcnkubGVuZ3RoID8gXCI/XCIgKyBlbmNvZGVkUXVlcnkgOiBcIlwiKSk7XG4gICAgfVxufVxuIiwiLyogZ2xvYmFsIGF0dGFjaEV2ZW50ICovXG5pbXBvcnQgWE1MSHR0cFJlcXVlc3QgZnJvbSBcIi4veG1saHR0cHJlcXVlc3QuanNcIjtcbmltcG9ydCBnbG9iYWxUaGlzIGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBQb2xsaW5nIH0gZnJvbSBcIi4vcG9sbGluZy5qc1wiO1xuLyoqXG4gKiBFbXB0eSBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBlbXB0eSgpIHsgfVxuY29uc3QgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHtcbiAgICAgICAgeGRvbWFpbjogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO1xufSkoKTtcbmV4cG9ydCBjbGFzcyBYSFIgZXh0ZW5kcyBQb2xsaW5nIHtcbiAgICAvKipcbiAgICAgKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjb25zdCBpc1NTTCA9IFwiaHR0cHM6XCIgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICAgICAgbGV0IHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuICAgICAgICAgICAgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuICAgICAgICAgICAgaWYgKCFwb3J0KSB7XG4gICAgICAgICAgICAgICAgcG9ydCA9IGlzU1NMID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueGQgPVxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICAgICAgICAgIHRoaXMueHMgPSBvcHRzLnNlY3VyZSAhPT0gaXNTU0w7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFhIUiBzdXBwb3J0cyBiaW5hcnlcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGZvcmNlQmFzZTY0ID0gb3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0O1xuICAgICAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gaGFzWEhSMiAmJiAhZm9yY2VCYXNlNjQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlcXVlc3Qob3B0cyA9IHt9KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3B0cywgeyB4ZDogdGhpcy54ZCwgeHM6IHRoaXMueHMgfSwgdGhpcy5vcHRzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMudXJpKCksIG9wdHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb1dyaXRlKGRhdGEsIGZuKSB7XG4gICAgICAgIGNvbnN0IHJlcSA9IHRoaXMucmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgcmVxLm9uKFwic3VjY2Vzc1wiLCBmbik7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9zdCBlcnJvclwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvUG9sbCgpIHtcbiAgICAgICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5vbihcImRhdGFcIiwgdGhpcy5vbkRhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9sbCBlcnJvclwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wb2xsWGhyID0gcmVxO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVyaSwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgXCJHRVRcIjtcbiAgICAgICAgdGhpcy51cmkgPSB1cmk7XG4gICAgICAgIHRoaXMuYXN5bmMgPSBmYWxzZSAhPT0gb3B0cy5hc3luYztcbiAgICAgICAgdGhpcy5kYXRhID0gdW5kZWZpbmVkICE9PSBvcHRzLmRhdGEgPyBvcHRzLmRhdGEgOiBudWxsO1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHBpY2sodGhpcy5vcHRzLCBcImFnZW50XCIsIFwicGZ4XCIsIFwia2V5XCIsIFwicGFzc3BocmFzZVwiLCBcImNlcnRcIiwgXCJjYVwiLCBcImNpcGhlcnNcIiwgXCJyZWplY3RVbmF1dGhvcml6ZWRcIiwgXCJhdXRvVW5yZWZcIik7XG4gICAgICAgIG9wdHMueGRvbWFpbiA9ICEhdGhpcy5vcHRzLnhkO1xuICAgICAgICBvcHRzLnhzY2hlbWUgPSAhIXRoaXMub3B0cy54cztcbiAgICAgICAgY29uc3QgeGhyID0gKHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVyaSwgdGhpcy5hc3luYyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sgJiYgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGksIHRoaXMub3B0cy5leHRyYUhlYWRlcnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgaWYgKFwiUE9TVFwiID09PSB0aGlzLm1ldGhvZCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiKi8qXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgLy8gaWU2IGNoZWNrXG4gICAgICAgICAgICBpZiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdGhpcy5vcHRzLndpdGhDcmVkZW50aWFscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucmVxdWVzdFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB4aHIudGltZW91dCA9IHRoaXMub3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKDQgIT09IHhoci5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKDIwMCA9PT0geGhyLnN0YXR1cyB8fCAxMjIzID09PSB4aHIuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGBlcnJvcmAgZXZlbnQgaGFuZGxlciB0aGF0J3MgdXNlci1zZXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9lcyBub3QgdGhyb3cgaW4gdGhlIHNhbWUgdGljayBhbmQgZ2V0cyBjYXVnaHQgaGVyZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IodHlwZW9mIHhoci5zdGF0dXMgPT09IFwibnVtYmVyXCIgPyB4aHIuc3RhdHVzIDogMCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBOZWVkIHRvIGRlZmVyIHNpbmNlIC5jcmVhdGUoKSBpcyBjYWxsZWQgZGlyZWN0bHkgZnJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgICAgIC8vIGFuZCB0aHVzIHRoZSAnZXJyb3InIGV2ZW50IGNhbiBvbmx5IGJlIG9ubHkgYm91bmQgKmFmdGVyKiB0aGlzIGV4Y2VwdGlvblxuICAgICAgICAgICAgLy8gb2NjdXJzLiAgVGhlcmVmb3JlLCBhbHNvLCB3ZSBjYW5ub3QgdGhyb3cgaGVyZSBhdCBhbGwuXG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKGUpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IFJlcXVlc3QucmVxdWVzdHNDb3VudCsrO1xuICAgICAgICAgICAgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uU3VjY2VzcygpIHtcbiAgICAgICAgdGhpcy5lbWl0KFwic3VjY2Vzc1wiKTtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCBpZiB3ZSBoYXZlIGRhdGEuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkRhdGEoZGF0YSkge1xuICAgICAgICB0aGlzLmVtaXQoXCJkYXRhXCIsIGRhdGEpO1xuICAgICAgICB0aGlzLm9uU3VjY2VzcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHRoaXMuY2xlYW51cCh0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGhvdXNlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgY2xlYW51cChmcm9tRXJyb3IpIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICAgICAgICBpZiAoZnJvbUVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBsb2FkLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGEoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBhYm9ydCgpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxufVxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodHlwZW9mIGF0dGFjaEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhdHRhY2hFdmVudChcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IHRlcm1pbmF0aW9uRXZlbnQgPSBcIm9ucGFnZWhpZGVcIiBpbiBnbG9iYWxUaGlzID8gXCJwYWdlaGlkZVwiIDogXCJ1bmxvYWRcIjtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0ZXJtaW5hdGlvbkV2ZW50LCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgICBmb3IgKGxldCBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICAgICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBnbG9iYWxUaGlzIGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5leHBvcnQgY29uc3QgbmV4dFRpY2sgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGlzUHJvbWlzZUF2YWlsYWJsZSA9IHR5cGVvZiBQcm9taXNlID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFByb21pc2UucmVzb2x2ZSA9PT0gXCJmdW5jdGlvblwiO1xuICAgIGlmIChpc1Byb21pc2VBdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIGNiID0+IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oY2IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChjYiwgc2V0VGltZW91dEZuKSA9PiBzZXRUaW1lb3V0Rm4oY2IsIDApO1xuICAgIH1cbn0pKCk7XG5leHBvcnQgY29uc3QgV2ViU29ja2V0ID0gZ2xvYmFsVGhpcy5XZWJTb2NrZXQgfHwgZ2xvYmFsVGhpcy5Nb3pXZWJTb2NrZXQ7XG5leHBvcnQgY29uc3QgdXNpbmdCcm93c2VyV2ViU29ja2V0ID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0QmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiIsImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCBwYXJzZXFzIGZyb20gXCJwYXJzZXFzXCI7XG5pbXBvcnQgeWVhc3QgZnJvbSBcInllYXN0XCI7XG5pbXBvcnQgeyBwaWNrIH0gZnJvbSBcIi4uL3V0aWwuanNcIjtcbmltcG9ydCB7IGRlZmF1bHRCaW5hcnlUeXBlLCBuZXh0VGljaywgdXNpbmdCcm93c2VyV2ViU29ja2V0LCBXZWJTb2NrZXQgfSBmcm9tIFwiLi93ZWJzb2NrZXQtY29uc3RydWN0b3IuanNcIjtcbmltcG9ydCB7IGVuY29kZVBhY2tldCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG4vLyBkZXRlY3QgUmVhY3ROYXRpdmUgZW52aXJvbm1lbnRcbmNvbnN0IGlzUmVhY3ROYXRpdmUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgdHlwZW9mIG5hdmlnYXRvci5wcm9kdWN0ID09PSBcInN0cmluZ1wiICYmXG4gICAgbmF2aWdhdG9yLnByb2R1Y3QudG9Mb3dlckNhc2UoKSA9PT0gXCJyZWFjdG5hdGl2ZVwiO1xuZXhwb3J0IGNsYXNzIFdTIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICAvKipcbiAgICAgKiBXZWJTb2NrZXQgdHJhbnNwb3J0IGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQGFwaSB7T2JqZWN0fSBjb25uZWN0aW9uIG9wdGlvbnNcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cyk7XG4gICAgICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSAhb3B0cy5mb3JjZUJhc2U2NDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNwb3J0IG5hbWUuXG4gICAgICpcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJ3ZWJzb2NrZXRcIjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlbnMgc29ja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZG9PcGVuKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2soKSkge1xuICAgICAgICAgICAgLy8gbGV0IHByb2JlIHRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmkgPSB0aGlzLnVyaSgpO1xuICAgICAgICBjb25zdCBwcm90b2NvbHMgPSB0aGlzLm9wdHMucHJvdG9jb2xzO1xuICAgICAgICAvLyBSZWFjdCBOYXRpdmUgb25seSBzdXBwb3J0cyB0aGUgJ2hlYWRlcnMnIG9wdGlvbiwgYW5kIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIGFueXRoaW5nIGVsc2UgaXMgcGFzc2VkXG4gICAgICAgIGNvbnN0IG9wdHMgPSBpc1JlYWN0TmF0aXZlXG4gICAgICAgICAgICA/IHt9XG4gICAgICAgICAgICA6IHBpY2sodGhpcy5vcHRzLCBcImFnZW50XCIsIFwicGVyTWVzc2FnZURlZmxhdGVcIiwgXCJwZnhcIiwgXCJrZXlcIiwgXCJwYXNzcGhyYXNlXCIsIFwiY2VydFwiLCBcImNhXCIsIFwiY2lwaGVyc1wiLCBcInJlamVjdFVuYXV0aG9yaXplZFwiLCBcImxvY2FsQWRkcmVzc1wiLCBcInByb3RvY29sVmVyc2lvblwiLCBcIm9yaWdpblwiLCBcIm1heFBheWxvYWRcIiwgXCJmYW1pbHlcIiwgXCJjaGVja1NlcnZlcklkZW50aXR5XCIpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgb3B0cy5oZWFkZXJzID0gdGhpcy5vcHRzLmV4dHJhSGVhZGVycztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy53cyA9XG4gICAgICAgICAgICAgICAgdXNpbmdCcm93c2VyV2ViU29ja2V0ICYmICFpc1JlYWN0TmF0aXZlXG4gICAgICAgICAgICAgICAgICAgID8gcHJvdG9jb2xzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBXZWJTb2NrZXQodXJpKVxuICAgICAgICAgICAgICAgICAgICA6IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3MuYmluYXJ5VHlwZSA9IHRoaXMuc29ja2V0LmJpbmFyeVR5cGUgfHwgZGVmYXVsdEJpbmFyeVR5cGU7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHNvY2tldFxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndzLl9zb2NrZXQudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IGV2ID0+IHRoaXMub25EYXRhKGV2LmRhdGEpO1xuICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSBlID0+IHRoaXMub25FcnJvcihcIndlYnNvY2tldCBlcnJvclwiLCBlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgb2YgcGFja2V0cy5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB3cml0ZShwYWNrZXRzKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLy8gZW5jb2RlUGFja2V0IGVmZmljaWVudCBhcyBpdCB1c2VzIFdTIGZyYW1pbmdcbiAgICAgICAgLy8gbm8gbmVlZCBmb3IgZW5jb2RlUGF5bG9hZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldCA9IHBhY2tldHNbaV07XG4gICAgICAgICAgICBjb25zdCBsYXN0UGFja2V0ID0gaSA9PT0gcGFja2V0cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgZW5jb2RlUGFja2V0KHBhY2tldCwgdGhpcy5zdXBwb3J0c0JpbmFyeSwgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gYWx3YXlzIGNyZWF0ZSBhIG5ldyBvYmplY3QgKEdILTQzNylcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRzID0ge307XG4gICAgICAgICAgICAgICAgaWYgKCF1c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhY2tldC5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuID0gXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGRhdGEgPyBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKSA6IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA8IHRoaXMub3B0cy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU29tZXRpbWVzIHRoZSB3ZWJzb2NrZXQgaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQgYnV0IHRoZSBicm93c2VyIGRpZG4ndFxuICAgICAgICAgICAgICAgIC8vIGhhdmUgYSBjaGFuY2Ugb2YgaW5mb3JtaW5nIHVzIGFib3V0IGl0IHlldCwgaW4gdGhhdCBjYXNlIHNlbmQgd2lsbFxuICAgICAgICAgICAgICAgIC8vIHRocm93IGFuIGVycm9yXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZUVycm9yIGlzIHRocm93biB3aGVuIHBhc3NpbmcgdGhlIHNlY29uZCBhcmd1bWVudCBvbiBTYWZhcmlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZChkYXRhLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGFzdFBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmYWtlIGRyYWluXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXRUaW1lb3V0Rm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb0Nsb3NlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMud3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMud3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcIndzc1wiIDogXCJ3c1wiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gICAgICAgIGlmICh0aGlzLm9wdHMucG9ydCAmJlxuICAgICAgICAgICAgKChcIndzc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcIndzXCIgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgICAgICAgICBwb3J0ID0gXCI6XCIgKyB0aGlzLm9wdHMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgaXB2NiA9IHRoaXMub3B0cy5ob3N0bmFtZS5pbmRleE9mKFwiOlwiKSAhPT0gLTE7XG4gICAgICAgIHJldHVybiAoc2NoZW1hICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgKGlwdjYgPyBcIltcIiArIHRoaXMub3B0cy5ob3N0bmFtZSArIFwiXVwiIDogdGhpcy5vcHRzLmhvc3RuYW1lKSArXG4gICAgICAgICAgICBwb3J0ICtcbiAgICAgICAgICAgIHRoaXMub3B0cy5wYXRoICtcbiAgICAgICAgICAgIChlbmNvZGVkUXVlcnkubGVuZ3RoID8gXCI/XCIgKyBlbmNvZGVkUXVlcnkgOiBcIlwiKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZlYXR1cmUgZGV0ZWN0aW9uIGZvciBXZWJTb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIHRoaXMgdHJhbnNwb3J0IGlzIGF2YWlsYWJsZS5cbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIGNoZWNrKCkge1xuICAgICAgICByZXR1cm4gKCEhV2ViU29ja2V0ICYmXG4gICAgICAgICAgICAhKFwiX19pbml0aWFsaXplXCIgaW4gV2ViU29ja2V0ICYmIHRoaXMubmFtZSA9PT0gV1MucHJvdG90eXBlLm5hbWUpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBYSFIgfSBmcm9tIFwiLi9wb2xsaW5nLXhoci5qc1wiO1xuaW1wb3J0IHsgV1MgfSBmcm9tIFwiLi93ZWJzb2NrZXQuanNcIjtcbmV4cG9ydCBjb25zdCB0cmFuc3BvcnRzID0ge1xuICAgIHdlYnNvY2tldDogV1MsXG4gICAgcG9sbGluZzogWEhSXG59O1xuIiwiaW1wb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucyB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCBwYXJzZXFzIGZyb20gXCJwYXJzZXFzXCI7XG5pbXBvcnQgcGFyc2V1cmkgZnJvbSBcInBhcnNldXJpXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IHByb3RvY29sIH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmkpIHtcbiAgICAgICAgICAgIHVyaSA9IHBhcnNldXJpKHVyaSk7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gdXJpLmhvc3Q7XG4gICAgICAgICAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gXCJodHRwc1wiIHx8IHVyaS5wcm90b2NvbCA9PT0gXCJ3c3NcIjtcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgICAgICAgICAgaWYgKHVyaS5xdWVyeSlcbiAgICAgICAgICAgICAgICBvcHRzLnF1ZXJ5ID0gdXJpLnF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdHMuaG9zdCkge1xuICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNldXJpKG9wdHMuaG9zdCkuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMuc2VjdXJlID1cbiAgICAgICAgICAgIG51bGwgIT0gb3B0cy5zZWN1cmVcbiAgICAgICAgICAgICAgICA/IG9wdHMuc2VjdXJlXG4gICAgICAgICAgICAgICAgOiB0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3RuYW1lID1cbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiID8gbG9jYXRpb24uaG9zdG5hbWUgOiBcImxvY2FsaG9zdFwiKTtcbiAgICAgICAgdGhpcy5wb3J0ID1cbiAgICAgICAgICAgIG9wdHMucG9ydCB8fFxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24ucG9ydFxuICAgICAgICAgICAgICAgICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNlY3VyZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIjQ0M1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiODBcIik7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbXCJwb2xsaW5nXCIsIFwid2Vic29ja2V0XCJdO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcGF0aDogXCIvZW5naW5lLmlvXCIsXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgdXBncmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcFBhcmFtOiBcInRcIixcbiAgICAgICAgICAgIHJlbWVtYmVyVXBncmFkZTogZmFsc2UsXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZToge1xuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMTAyNFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zcG9ydE9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgY2xvc2VPbkJlZm9yZXVubG9hZDogdHJ1ZVxuICAgICAgICB9LCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzLnBhdGggPSB0aGlzLm9wdHMucGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgKyBcIi9cIjtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMucXVlcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0cy5xdWVyeSA9IHBhcnNlcXMuZGVjb2RlKHRoaXMub3B0cy5xdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IG9uIGhhbmRzaGFrZVxuICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgdGhpcy51cGdyYWRlcyA9IG51bGw7XG4gICAgICAgIHRoaXMucGluZ0ludGVydmFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IG51bGw7XG4gICAgICAgIC8vIHNldCBvbiBoZWFydGJlYXRcbiAgICAgICAgdGhpcy5waW5nVGltZW91dFRpbWVyID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuY2xvc2VPbkJlZm9yZXVubG9hZCkge1xuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggY2xvc2VzIHRoZSBjb25uZWN0aW9uIHdoZW4gdGhlIFwiYmVmb3JldW5sb2FkXCIgZXZlbnQgaXMgZW1pdHRlZCBidXQgbm90IENocm9tZS4gVGhpcyBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIC8vIGVuc3VyZXMgZXZlcnkgYnJvd3NlciBiZWhhdmVzIHRoZSBzYW1lIChubyBcImRpc2Nvbm5lY3RcIiBldmVudCBhdCB0aGUgU29ja2V0LklPIGxldmVsIHdoZW4gdGhlIHBhZ2UgaXNcbiAgICAgICAgICAgICAgICAvLyBjbG9zZWQvcmVsb2FkZWQpXG4gICAgICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2lsZW50bHkgY2xvc2UgdGhlIHRyYW5zcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaG9zdG5hbWUgIT09IFwibG9jYWxob3N0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJ0cmFuc3BvcnQgY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQHJldHVybiB7VHJhbnNwb3J0fVxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZVRyYW5zcG9ydChuYW1lKSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gY2xvbmUodGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gICAgICAgIHF1ZXJ5LkVJTyA9IHByb3RvY29sO1xuICAgICAgICAvLyB0cmFuc3BvcnQgbmFtZVxuICAgICAgICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuICAgICAgICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgICAgICAgaWYgKHRoaXMuaWQpXG4gICAgICAgICAgICBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuICAgICAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnRyYW5zcG9ydE9wdGlvbnNbbmFtZV0sIHRoaXMub3B0cywge1xuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICBzb2NrZXQ6IHRoaXMsXG4gICAgICAgICAgICBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSxcbiAgICAgICAgICAgIHNlY3VyZTogdGhpcy5zZWN1cmUsXG4gICAgICAgICAgICBwb3J0OiB0aGlzLnBvcnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgdHJhbnNwb3J0c1tuYW1lXShvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgbGV0IHRyYW5zcG9ydDtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5yZW1lbWJlclVwZ3JhZGUgJiZcbiAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKFwid2Vic29ja2V0XCIpICE9PSAtMSkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gXCJ3ZWJzb2NrZXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIFwiTm8gdHJhbnNwb3J0cyBhdmFpbGFibGVcIik7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICAgICAgICB0cmFuc3BvcnRcbiAgICAgICAgICAgIC5vbihcImRyYWluXCIsIHRoaXMub25EcmFpbi5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwicGFja2V0XCIsIHRoaXMub25QYWNrZXQuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcImVycm9yXCIsIHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKFwidHJhbnNwb3J0IGNsb3NlXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvYmUobmFtZSkge1xuICAgICAgICBsZXQgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSk7XG4gICAgICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvblRyYW5zcG9ydE9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6IFwicGluZ1wiLCBkYXRhOiBcInByb2JlXCIgfV0pO1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJwYWNrZXRcIiwgbXNnID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKFwicG9uZ1wiID09PSBtc2cudHlwZSAmJiBcInByb2JlXCIgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRpbmdcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInVwZ3JhZGVcIiB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0KCkge1xuICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICAgICAgICBjb25zdCBvbmVycm9yID0gZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwicHJvYmUgZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVFcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UoKSB7XG4gICAgICAgICAgICBvbmVycm9yKFwidHJhbnNwb3J0IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgICAgICAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoXCJzb2NrZXQgY2xvc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gdGhlIHNvY2tldCBpcyB1cGdyYWRlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gICAgICAgIGZ1bmN0aW9uIG9udXBncmFkZSh0bykge1xuICAgICAgICAgICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9PSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbiAgICAgICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcIm9wZW5cIiwgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsIG9uZXJyb3IpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJvcGVuXCIsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiZXJyb3JcIiwgb25lcnJvcik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgIHRoaXMub25jZShcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gY29ubmVjdGlvbiBpcyBkZWVtZWQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgLy8gd2UgY2hlY2sgZm9yIGByZWFkeVN0YXRlYCBpbiBjYXNlIGFuIGBvcGVuYFxuICAgICAgICAvLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmXG4gICAgICAgICAgICB0aGlzLm9wdHMudXBncmFkZSAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UpIHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnVwZ3JhZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25QYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoZWFydGJlYXRcIik7XG4gICAgICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRQaW5nVGltZW91dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJwb25nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInNlcnZlciBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBlcnIuY29kZSA9IHBhY2tldC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1lc3NhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJtZXNzYWdlXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGhhbmRzaGFrZSBvYmpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkhhbmRzaGFrZShkYXRhKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiaGFuZHNoYWtlXCIsIGRhdGEpO1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICAgICAgICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5yZXNldFBpbmdUaW1lb3V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYW5kIHJlc2V0cyBwaW5nIHRpbWVvdXQgdGltZXIgYmFzZWQgb24gc2VydmVyIHBpbmdzLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcmVzZXRQaW5nVGltZW91dCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuICAgICAgICB0aGlzLnBpbmdUaW1lb3V0VGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJwaW5nIHRpbWVvdXRcIik7XG4gICAgICAgIH0sIHRoaXMucGluZ0ludGVydmFsICsgdGhpcy5waW5nVGltZW91dCk7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBpbmdUaW1lb3V0VGltZXIudW5yZWYoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25EcmFpbigpIHtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCwgdGhpcy5wcmV2QnVmZmVyTGVuKTtcbiAgICAgICAgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuICAgICAgICAvLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3ZlcixcbiAgICAgICAgLy8gYW5kIGEgbm9uemVybyBwcmV2QnVmZmVyTGVuIGNvdWxkIGNhdXNlIHByb2JsZW1zIG9uIGBkcmFpbmBcbiAgICAgICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcbiAgICAgICAgaWYgKDAgPT09IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRyYWluXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmbHVzaCgpIHtcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgIT09IHRoaXMucmVhZHlTdGF0ZSAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQud3JpdGFibGUgJiZcbiAgICAgICAgICAgICF0aGlzLnVwZ3JhZGluZyAmJlxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnNlbmQodGhpcy53cml0ZUJ1ZmZlcik7XG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJmbHVzaFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIHdyaXRlKG1zZywgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgdGhpcy5zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNlbmQobXNnLCBvcHRpb25zLCBmbikge1xuICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJtZXNzYWdlXCIsIG1zZywgb3B0aW9ucywgZm4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFja2V0IHR5cGUuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgc2VuZFBhY2tldCh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZGF0YSkge1xuICAgICAgICAgICAgZm4gPSBkYXRhO1xuICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgZm4gPSBvcHRpb25zO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiY2xvc2luZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgY29uc3QgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGFja2V0Q3JlYXRlXCIsIHBhY2tldCk7XG4gICAgICAgIHRoaXMud3JpdGVCdWZmZXIucHVzaChwYWNrZXQpO1xuICAgICAgICBpZiAoZm4pXG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJmbHVzaFwiLCBmbik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJmb3JjZWQgY2xvc2VcIik7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjbGVhbnVwQW5kQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGVcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub2ZmKFwidXBncmFkZUVycm9yXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3YWl0Rm9yVXBncmFkZSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIHdhaXQgZm9yIHVwZ3JhZGUgdG8gZmluaXNoIHNpbmNlIHdlIGNhbid0IHNlbmQgcGFja2V0cyB3aGlsZSBwYXVzaW5nIGEgdHJhbnNwb3J0XG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRlXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRlRXJyb3JcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zaW5nXCI7XG4gICAgICAgICAgICBpZiAodGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2UoXCJkcmFpblwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgICAgICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBlcnJvclxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25FcnJvcihlcnIpIHtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHRoaXMub25DbG9zZShcInRyYW5zcG9ydCBlcnJvclwiLCBlcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgY2xvc2UuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNsb3NlKHJlYXNvbiwgZGVzYykge1xuICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgICAgICAgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgICAgICAgXCJjbG9zaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgLy8gY2xlYXIgdGltZXJzXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZW91dEZuKHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG4gICAgICAgICAgICAvLyBzdG9wIGV2ZW50IGZyb20gZmlyaW5nIGFnYWluIGZvciB0cmFuc3BvcnRcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycyhcImNsb3NlXCIpO1xuICAgICAgICAgICAgLy8gZW5zdXJlIHRyYW5zcG9ydCB3b24ndCBzdGF5IG9wZW5cbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgICAgICAvLyBpZ25vcmUgZnVydGhlciB0cmFuc3BvcnQgY29tbXVuaWNhdGlvblxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlbW92ZUV2ZW50TGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsIHRoaXMub2ZmbGluZUV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCByZWFkeSBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgICAgIC8vIGNsZWFyIHNlc3Npb24gaWRcbiAgICAgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICAgICAgLy8gZW1pdCBjbG9zZSBldmVudFxuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24sIGRlc2MpO1xuICAgICAgICAgICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgICAgICAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzZXJ2ZXIgdXBncmFkZXNcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGZpbHRlclVwZ3JhZGVzKHVwZ3JhZGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVXBncmFkZXMgPSBbXTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCBqID0gdXBncmFkZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgaWYgKH50aGlzLnRyYW5zcG9ydHMuaW5kZXhPZih1cGdyYWRlc1tpXSkpXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbiAgICB9XG59XG5Tb2NrZXQucHJvdG9jb2wgPSBwcm90b2NvbDtcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xuICAgIGNvbnN0IG8gPSB7fTtcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBvW2ldID0gb2JqW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvO1xufVxuIiwiaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG5leHBvcnQgeyBTb2NrZXQgfTtcbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IFNvY2tldC5wcm90b2NvbDtcbmV4cG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuL3RyYW5zcG9ydC5qc1wiO1xuZXhwb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmV4cG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucyB9IGZyb20gXCIuL3V0aWwuanNcIjtcbiIsImNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNWaWV3ID0gKG9iaikgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn07XG5jb25zdCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChCbG9iKSA9PT0gXCJbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl1cIik7XG5jb25zdCB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBGaWxlID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEZpbGUgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChGaWxlKSA9PT0gXCJbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl1cIik7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBCdWZmZXIsIGFuIEFycmF5QnVmZmVyLCBhIEJsb2Igb3IgYSBGaWxlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0JpbmFyeShvYmopIHtcbiAgICByZXR1cm4gKCh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhvYmopKSkgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVCbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFzQmluYXJ5KG9iaiwgdG9KU09OKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpc0JpbmFyeShvYmopKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAob2JqLnRvSlNPTiAmJlxuICAgICAgICB0eXBlb2Ygb2JqLnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGhhc0JpbmFyeShvYmoudG9KU09OKCksIHRydWUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHsgaXNCaW5hcnkgfSBmcm9tIFwiLi9pcy1iaW5hcnkuanNcIjtcbi8qKlxuICogUmVwbGFjZXMgZXZlcnkgQnVmZmVyIHwgQXJyYXlCdWZmZXIgfCBCbG9iIHwgRmlsZSBpbiBwYWNrZXQgd2l0aCBhIG51bWJlcmVkIHBsYWNlaG9sZGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBzb2NrZXQuaW8gZXZlbnQgcGFja2V0XG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggZGVjb25zdHJ1Y3RlZCBwYWNrZXQgYW5kIGxpc3Qgb2YgYnVmZmVyc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0KSB7XG4gICAgY29uc3QgYnVmZmVycyA9IFtdO1xuICAgIGNvbnN0IHBhY2tldERhdGEgPSBwYWNrZXQuZGF0YTtcbiAgICBjb25zdCBwYWNrID0gcGFja2V0O1xuICAgIHBhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhLCBidWZmZXJzKTtcbiAgICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICAgIHJldHVybiB7IHBhY2tldDogcGFjaywgYnVmZmVyczogYnVmZmVycyB9O1xufVxuZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIGlmIChpc0JpbmFyeShkYXRhKSkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHsgX3BsYWNlaG9sZGVyOiB0cnVlLCBudW06IGJ1ZmZlcnMubGVuZ3RoIH07XG4gICAgICAgIGJ1ZmZlcnMucHVzaChkYXRhKTtcbiAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGEgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5ld0RhdGFbaV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGEgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbn1cbi8qKlxuICogUmVjb25zdHJ1Y3RzIGEgYmluYXJ5IHBhY2tldCBmcm9tIGl0cyBwbGFjZWhvbGRlciBwYWNrZXQgYW5kIGJ1ZmZlcnNcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gZXZlbnQgcGFja2V0IHdpdGggcGxhY2Vob2xkZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBidWZmZXJzIC0gYmluYXJ5IGJ1ZmZlcnMgdG8gcHV0IGluIHBsYWNlaG9sZGVyIHBvc2l0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSByZWNvbnN0cnVjdGVkIHBhY2tldFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LCBidWZmZXJzKSB7XG4gICAgcGFja2V0LmRhdGEgPSBfcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LmRhdGEsIGJ1ZmZlcnMpO1xuICAgIHBhY2tldC5hdHRhY2htZW50cyA9IHVuZGVmaW5lZDsgLy8gbm8gbG9uZ2VyIHVzZWZ1bFxuICAgIHJldHVybiBwYWNrZXQ7XG59XG5mdW5jdGlvbiBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICAgIGlmICghZGF0YSlcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5fcGxhY2Vob2xkZXIpIHtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xufVxuIiwiaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBkZWNvbnN0cnVjdFBhY2tldCwgcmVjb25zdHJ1Y3RQYWNrZXQgfSBmcm9tIFwiLi9iaW5hcnkuanNcIjtcbmltcG9ydCB7IGlzQmluYXJ5LCBoYXNCaW5hcnkgfSBmcm9tIFwiLi9pcy1iaW5hcnkuanNcIjtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDU7XG5leHBvcnQgdmFyIFBhY2tldFR5cGU7XG4oZnVuY3Rpb24gKFBhY2tldFR5cGUpIHtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUXCJdID0gMF0gPSBcIkNPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJESVNDT05ORUNUXCJdID0gMV0gPSBcIkRJU0NPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJFVkVOVFwiXSA9IDJdID0gXCJFVkVOVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkFDS1wiXSA9IDNdID0gXCJBQ0tcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUX0VSUk9SXCJdID0gNF0gPSBcIkNPTk5FQ1RfRVJST1JcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJCSU5BUllfRVZFTlRcIl0gPSA1XSA9IFwiQklOQVJZX0VWRU5UXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQklOQVJZX0FDS1wiXSA9IDZdID0gXCJCSU5BUllfQUNLXCI7XG59KShQYWNrZXRUeXBlIHx8IChQYWNrZXRUeXBlID0ge30pKTtcbi8qKlxuICogQSBzb2NrZXQuaW8gRW5jb2RlciBpbnN0YW5jZVxuICovXG5leHBvcnQgY2xhc3MgRW5jb2RlciB7XG4gICAgLyoqXG4gICAgICogRW5jb2RlIGEgcGFja2V0IGFzIGEgc2luZ2xlIHN0cmluZyBpZiBub24tYmluYXJ5LCBvciBhcyBhXG4gICAgICogYnVmZmVyIHNlcXVlbmNlLCBkZXBlbmRpbmcgb24gcGFja2V0IHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gcGFja2V0IG9iamVjdFxuICAgICAqL1xuICAgIGVuY29kZShvYmopIHtcbiAgICAgICAgaWYgKG9iai50eXBlID09PSBQYWNrZXRUeXBlLkVWRU5UIHx8IG9iai50eXBlID09PSBQYWNrZXRUeXBlLkFDSykge1xuICAgICAgICAgICAgaWYgKGhhc0JpbmFyeShvYmopKSB7XG4gICAgICAgICAgICAgICAgb2JqLnR5cGUgPVxuICAgICAgICAgICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5FVkVOVFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlQXNCaW5hcnkob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3RoaXMuZW5jb2RlQXNTdHJpbmcob2JqKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuY29kZSBwYWNrZXQgYXMgc3RyaW5nLlxuICAgICAqL1xuICAgIGVuY29kZUFzU3RyaW5nKG9iaikge1xuICAgICAgICAvLyBmaXJzdCBpcyB0eXBlXG4gICAgICAgIGxldCBzdHIgPSBcIlwiICsgb2JqLnR5cGU7XG4gICAgICAgIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzICsgXCItXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuICAgICAgICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgICAgICAgaWYgKG9iai5uc3AgJiYgXCIvXCIgIT09IG9iai5uc3ApIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmoubnNwICsgXCIsXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgdGhlIGlkXG4gICAgICAgIGlmIChudWxsICE9IG9iai5pZCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5pZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBqc29uIGRhdGFcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgIHN0ciArPSBKU09OLnN0cmluZ2lmeShvYmouZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXG4gICAgICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICAgICAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICAgICAqL1xuICAgIGVuY29kZUFzQmluYXJ5KG9iaikge1xuICAgICAgICBjb25zdCBkZWNvbnN0cnVjdGlvbiA9IGRlY29uc3RydWN0UGFja2V0KG9iaik7XG4gICAgICAgIGNvbnN0IHBhY2sgPSB0aGlzLmVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuICAgICAgICBidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG4gICAgICAgIHJldHVybiBidWZmZXJzOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbiAgICB9XG59XG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqL1xuZXhwb3J0IGNsYXNzIERlY29kZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhbiBlbmNvZGVkIHBhY2tldCBzdHJpbmcgaW50byBwYWNrZXQgSlNPTi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxuICAgICAqL1xuICAgIGFkZChvYmopIHtcbiAgICAgICAgbGV0IHBhY2tldDtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHBhY2tldCA9IHRoaXMuZGVjb2RlU3RyaW5nKG9iaik7XG4gICAgICAgICAgICBpZiAocGFja2V0LnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICAgICAgcGFja2V0LnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0FDSykge1xuICAgICAgICAgICAgICAgIC8vIGJpbmFyeSBwYWNrZXQncyBqc29uXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbmV3IEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KTtcbiAgICAgICAgICAgICAgICAvLyBubyBhdHRhY2htZW50cywgbGFiZWxlZCBiaW5hcnkgYnV0IG5vIGJpbmFyeSBkYXRhIHRvIGZvbGxvd1xuICAgICAgICAgICAgICAgIGlmIChwYWNrZXQuYXR0YWNobWVudHMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZGVjb2RlZFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5vbi1iaW5hcnkgZnVsbCBwYWNrZXRcbiAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNCaW5hcnkob2JqKSB8fCBvYmouYmFzZTY0KSB7XG4gICAgICAgICAgICAvLyByYXcgYmluYXJ5IGRhdGFcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFja2V0ID0gdGhpcy5yZWNvbnN0cnVjdG9yLnRha2VCaW5hcnlEYXRhKG9iaik7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZWNlaXZlZCBmaW5hbCBidWZmZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZGVjb2RlZFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gdHlwZTogXCIgKyBvYmopO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlY29kZSBhIHBhY2tldCBTdHJpbmcgKEpTT04gZGF0YSlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICAgICAqL1xuICAgIGRlY29kZVN0cmluZyhzdHIpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAvLyBsb29rIHVwIHR5cGVcbiAgICAgICAgY29uc3QgcCA9IHtcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcihzdHIuY2hhckF0KDApKSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKFBhY2tldFR5cGVbcC50eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHBhY2tldCB0eXBlIFwiICsgcC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGF0dGFjaG1lbnRzIGlmIHR5cGUgYmluYXJ5XG4gICAgICAgIGlmIChwLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBwLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0FDSykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlIChzdHIuY2hhckF0KCsraSkgIT09IFwiLVwiICYmIGkgIT0gc3RyLmxlbmd0aCkgeyB9XG4gICAgICAgICAgICBjb25zdCBidWYgPSBzdHIuc3Vic3RyaW5nKHN0YXJ0LCBpKTtcbiAgICAgICAgICAgIGlmIChidWYgIT0gTnVtYmVyKGJ1ZikgfHwgc3RyLmNoYXJBdChpKSAhPT0gXCItXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbGxlZ2FsIGF0dGFjaG1lbnRzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5hdHRhY2htZW50cyA9IE51bWJlcihidWYpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgbmFtZXNwYWNlIChpZiBhbnkpXG4gICAgICAgIGlmIChcIi9cIiA9PT0gc3RyLmNoYXJBdChpICsgMSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKFwiLFwiID09PSBjKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLm5zcCA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcC5uc3AgPSBcIi9cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGlkXG4gICAgICAgIGNvbnN0IG5leHQgPSBzdHIuY2hhckF0KGkgKyAxKTtcbiAgICAgICAgaWYgKFwiXCIgIT09IG5leHQgJiYgTnVtYmVyKG5leHQpID09IG5leHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKG51bGwgPT0gYyB8fCBOdW1iZXIoYykgIT0gYykge1xuICAgICAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmlkID0gTnVtYmVyKHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBqc29uIGRhdGFcbiAgICAgICAgaWYgKHN0ci5jaGFyQXQoKytpKSkge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRyeVBhcnNlKHN0ci5zdWJzdHIoaSkpO1xuICAgICAgICAgICAgaWYgKERlY29kZXIuaXNQYXlsb2FkVmFsaWQocC50eXBlLCBwYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgIHAuZGF0YSA9IHBheWxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHBheWxvYWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHN0YXRpYyBpc1BheWxvYWRWYWxpZCh0eXBlLCBwYXlsb2FkKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUX0VSUk9SOlxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIjtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5FVkVOVDpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfRVZFTlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiYgcGF5bG9hZC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkFDSzpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfQUNLOlxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHRyeVBhcnNlKHN0cikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cik7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vKipcbiAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcbiAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXG4gKiBkZWNvZGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0JpbmFyeVJlY29uc3RydWN0b3J9IGluaXRpYWxpemVkIHJlY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgQmluYXJ5UmVjb25zdHJ1Y3RvciB7XG4gICAgY29uc3RydWN0b3IocGFja2V0KSB7XG4gICAgICAgIHRoaXMucGFja2V0ID0gcGFja2V0O1xuICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5yZWNvblBhY2sgPSBwYWNrZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiBiaW5hcnkgZGF0YSByZWNlaXZlZCBmcm9tIGNvbm5lY3Rpb25cbiAgICAgKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0J1ZmZlciB8IEFycmF5QnVmZmVyfSBiaW5EYXRhIC0gdGhlIHJhdyBiaW5hcnkgZGF0YSByZWNlaXZlZFxuICAgICAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXG4gICAgICogICBhIHJlY29uc3RydWN0ZWQgcGFja2V0IG9iamVjdCBpZiBhbGwgYnVmZmVycyBoYXZlIGJlZW4gcmVjZWl2ZWQuXG4gICAgICovXG4gICAgdGFrZUJpbmFyeURhdGEoYmluRGF0YSkge1xuICAgICAgICB0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVycy5sZW5ndGggPT09IHRoaXMucmVjb25QYWNrLmF0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgICAvLyBkb25lIHdpdGggYnVmZmVyIGxpc3RcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldCA9IHJlY29uc3RydWN0UGFja2V0KHRoaXMucmVjb25QYWNrLCB0aGlzLmJ1ZmZlcnMpO1xuICAgICAgICAgICAgdGhpcy5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gcGFja2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhbnMgdXAgYmluYXJ5IHBhY2tldCByZWNvbnN0cnVjdGlvbiB2YXJpYWJsZXMuXG4gICAgICovXG4gICAgZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZWNvblBhY2sgPSBudWxsO1xuICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gb24ob2JqLCBldiwgZm4pIHtcbiAgICBvYmoub24oZXYsIGZuKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgb2JqLm9mZihldiwgZm4pO1xuICAgIH07XG59XG4iLCJpbXBvcnQgeyBQYWNrZXRUeXBlIH0gZnJvbSBcInNvY2tldC5pby1wYXJzZXJcIjtcbmltcG9ydCB7IG9uIH0gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCB7IEVtaXR0ZXIsIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbi8qKlxuICogSW50ZXJuYWwgZXZlbnRzLlxuICogVGhlc2UgZXZlbnRzIGNhbid0IGJlIGVtaXR0ZWQgYnkgdGhlIHVzZXIuXG4gKi9cbmNvbnN0IFJFU0VSVkVEX0VWRU5UUyA9IE9iamVjdC5mcmVlemUoe1xuICAgIGNvbm5lY3Q6IDEsXG4gICAgY29ubmVjdF9lcnJvcjogMSxcbiAgICBkaXNjb25uZWN0OiAxLFxuICAgIGRpc2Nvbm5lY3Rpbmc6IDEsXG4gICAgLy8gRXZlbnRFbWl0dGVyIHJlc2VydmVkIGV2ZW50czogaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfZXZlbnRfbmV3bGlzdGVuZXJcbiAgICBuZXdMaXN0ZW5lcjogMSxcbiAgICByZW1vdmVMaXN0ZW5lcjogMSxcbn0pO1xuZXhwb3J0IGNsYXNzIFNvY2tldCBleHRlbmRzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIGBTb2NrZXRgIGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlvLCBuc3AsIG9wdHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuaWRzID0gMDtcbiAgICAgICAgdGhpcy5hY2tzID0ge307XG4gICAgICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5pbyA9IGlvO1xuICAgICAgICB0aGlzLm5zcCA9IG5zcDtcbiAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy5hdXRoKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGggPSBvcHRzLmF1dGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW8uX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSB0byBvcGVuLCBjbG9zZSBhbmQgcGFja2V0IGV2ZW50c1xuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzdWJFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IGlvID0gdGhpcy5pbztcbiAgICAgICAgdGhpcy5zdWJzID0gW1xuICAgICAgICAgICAgb24oaW8sIFwib3BlblwiLCB0aGlzLm9ub3Blbi5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIG9uKGlvLCBcInBhY2tldFwiLCB0aGlzLm9ucGFja2V0LmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb24oaW8sIFwiZXJyb3JcIiwgdGhpcy5vbmVycm9yLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb24oaW8sIFwiY2xvc2VcIiwgdGhpcy5vbmNsb3NlLmJpbmQodGhpcykpLFxuICAgICAgICBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBTb2NrZXQgd2lsbCB0cnkgdG8gcmVjb25uZWN0IHdoZW4gaXRzIE1hbmFnZXIgY29ubmVjdHMgb3IgcmVjb25uZWN0c1xuICAgICAqL1xuICAgIGdldCBhY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc3VicztcbiAgICB9XG4gICAgLyoqXG4gICAgICogXCJPcGVuc1wiIHRoZSBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMuc3ViRXZlbnRzKCk7XG4gICAgICAgIGlmICghdGhpcy5pb1tcIl9yZWNvbm5lY3RpbmdcIl0pXG4gICAgICAgICAgICB0aGlzLmlvLm9wZW4oKTsgLy8gZW5zdXJlIG9wZW5cbiAgICAgICAgaWYgKFwib3BlblwiID09PSB0aGlzLmlvLl9yZWFkeVN0YXRlKVxuICAgICAgICAgICAgdGhpcy5vbm9wZW4oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBjb25uZWN0KClcbiAgICAgKi9cbiAgICBvcGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgYG1lc3NhZ2VgIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNlbmQoLi4uYXJncykge1xuICAgICAgICBhcmdzLnVuc2hpZnQoXCJtZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBgZW1pdGAuXG4gICAgICogSWYgdGhlIGV2ZW50IGlzIGluIGBldmVudHNgLCBpdCdzIGVtaXR0ZWQgbm9ybWFsbHkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZW1pdChldiwgLi4uYXJncykge1xuICAgICAgICBpZiAoUkVTRVJWRURfRVZFTlRTLmhhc093blByb3BlcnR5KGV2KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBldiArICdcIiBpcyBhIHJlc2VydmVkIGV2ZW50IG5hbWUnKTtcbiAgICAgICAgfVxuICAgICAgICBhcmdzLnVuc2hpZnQoZXYpO1xuICAgICAgICBjb25zdCBwYWNrZXQgPSB7XG4gICAgICAgICAgICB0eXBlOiBQYWNrZXRUeXBlLkVWRU5ULFxuICAgICAgICAgICAgZGF0YTogYXJncyxcbiAgICAgICAgfTtcbiAgICAgICAgcGFja2V0Lm9wdGlvbnMgPSB7fTtcbiAgICAgICAgcGFja2V0Lm9wdGlvbnMuY29tcHJlc3MgPSB0aGlzLmZsYWdzLmNvbXByZXNzICE9PSBmYWxzZTtcbiAgICAgICAgLy8gZXZlbnQgYWNrIGNhbGxiYWNrXG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIHRoaXMuYWNrc1t0aGlzLmlkc10gPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgcGFja2V0LmlkID0gdGhpcy5pZHMrKztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1RyYW5zcG9ydFdyaXRhYmxlID0gdGhpcy5pby5lbmdpbmUgJiZcbiAgICAgICAgICAgIHRoaXMuaW8uZW5naW5lLnRyYW5zcG9ydCAmJlxuICAgICAgICAgICAgdGhpcy5pby5lbmdpbmUudHJhbnNwb3J0LndyaXRhYmxlO1xuICAgICAgICBjb25zdCBkaXNjYXJkUGFja2V0ID0gdGhpcy5mbGFncy52b2xhdGlsZSAmJiAoIWlzVHJhbnNwb3J0V3JpdGFibGUgfHwgIXRoaXMuY29ubmVjdGVkKTtcbiAgICAgICAgaWYgKGRpc2NhcmRQYWNrZXQpIHtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mbGFncyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwYWNrZXQocGFja2V0KSB7XG4gICAgICAgIHBhY2tldC5uc3AgPSB0aGlzLm5zcDtcbiAgICAgICAgdGhpcy5pby5fcGFja2V0KHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBgb3BlbmAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ub3BlbigpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmF1dGggPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGgoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IFBhY2tldFR5cGUuQ09OTkVDVCwgZGF0YSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiBQYWNrZXRUeXBlLkNPTk5FQ1QsIGRhdGE6IHRoaXMuYXV0aCB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgb3IgbWFuYWdlciBgZXJyb3JgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVyclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBjbG9zZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVhc29uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNsb3NlKHJlYXNvbikge1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmlkO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRpc2Nvbm5lY3RcIiwgcmVhc29uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggc29ja2V0IHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucGFja2V0KHBhY2tldCkge1xuICAgICAgICBjb25zdCBzYW1lTmFtZXNwYWNlID0gcGFja2V0Lm5zcCA9PT0gdGhpcy5uc3A7XG4gICAgICAgIGlmICghc2FtZU5hbWVzcGFjZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC5kYXRhICYmIHBhY2tldC5kYXRhLnNpZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZCA9IHBhY2tldC5kYXRhLnNpZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbmNvbm5lY3QoaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0X2Vycm9yXCIsIG5ldyBFcnJvcihcIkl0IHNlZW1zIHlvdSBhcmUgdHJ5aW5nIHRvIHJlYWNoIGEgU29ja2V0LklPIHNlcnZlciBpbiB2Mi54IHdpdGggYSB2My54IGNsaWVudCwgYnV0IHRoZXkgYXJlIG5vdCBjb21wYXRpYmxlIChtb3JlIGluZm9ybWF0aW9uIGhlcmU6IGh0dHBzOi8vc29ja2V0LmlvL2RvY3MvdjMvbWlncmF0aW5nLWZyb20tMi14LXRvLTMtMC8pXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRVZFTlQ6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0VWRU5UOlxuICAgICAgICAgICAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkFDSzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0FDSzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1RfRVJST1I6XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKHBhY2tldC5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBlcnIuZGF0YSA9IHBhY2tldC5kYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmV2ZW50KHBhY2tldCkge1xuICAgICAgICBjb25zdCBhcmdzID0gcGFja2V0LmRhdGEgfHwgW107XG4gICAgICAgIGlmIChudWxsICE9IHBhY2tldC5pZCkge1xuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMuYWNrKHBhY2tldC5pZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0RXZlbnQoYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIucHVzaChPYmplY3QuZnJlZXplKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbWl0RXZlbnQoYXJncykge1xuICAgICAgICBpZiAodGhpcy5fYW55TGlzdGVuZXJzICYmIHRoaXMuX2FueUxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycy5zbGljZSgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBlci5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9kdWNlcyBhbiBhY2sgY2FsbGJhY2sgdG8gZW1pdCB3aXRoIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhY2soaWQpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBzZW50ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgLy8gcHJldmVudCBkb3VibGUgY2FsbGJhY2tzXG4gICAgICAgICAgICBpZiAoc2VudClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYucGFja2V0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBQYWNrZXRUeXBlLkFDSyxcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgZGF0YTogYXJncyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBhY2tub3dsZWdlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uYWNrKHBhY2tldCkge1xuICAgICAgICBjb25zdCBhY2sgPSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGFjaykge1xuICAgICAgICAgICAgYWNrLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgY29ubmVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jb25uZWN0KGlkKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXRCdWZmZXJlZCgpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVtaXQgYnVmZmVyZWQgZXZlbnRzIChyZWNlaXZlZCBhbmQgZW1pdHRlZCkuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGVtaXRCdWZmZXJlZCgpIHtcbiAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyLmZvckVhY2goKGFyZ3MpID0+IHRoaXMuZW1pdEV2ZW50KGFyZ3MpKTtcbiAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5mb3JFYWNoKChwYWNrZXQpID0+IHRoaXMucGFja2V0KHBhY2tldCkpO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc2VydmVyIGRpc2Nvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMub25jbG9zZShcImlvIHNlcnZlciBkaXNjb25uZWN0XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBmb3JjZWQgY2xpZW50L3NlcnZlciBzaWRlIGRpc2Nvbm5lY3Rpb25zLFxuICAgICAqIHRoaXMgbWV0aG9kIGVuc3VyZXMgdGhlIG1hbmFnZXIgc3RvcHMgdHJhY2tpbmcgdXMgYW5kXG4gICAgICogdGhhdCByZWNvbm5lY3Rpb25zIGRvbid0IGdldCB0cmlnZ2VyZWQgZm9yIHRoaXMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnMpIHtcbiAgICAgICAgICAgIC8vIGNsZWFuIHN1YnNjcmlwdGlvbnMgdG8gYXZvaWQgcmVjb25uZWN0aW9uc1xuICAgICAgICAgICAgdGhpcy5zdWJzLmZvckVhY2goKHN1YkRlc3Ryb3kpID0+IHN1YkRlc3Ryb3koKSk7XG4gICAgICAgICAgICB0aGlzLnN1YnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pb1tcIl9kZXN0cm95XCJdKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0IG1hbnVhbGx5LlxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiBQYWNrZXRUeXBlLkRJU0NPTk5FQ1QgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIHNvY2tldCBmcm9tIHBvb2xcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgLy8gZmlyZSBldmVudHNcbiAgICAgICAgICAgIHRoaXMub25jbG9zZShcImlvIGNsaWVudCBkaXNjb25uZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgZGlzY29ubmVjdCgpXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY29tcHJlc3MgZmxhZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb21wcmVzcyAtIGlmIGB0cnVlYCwgY29tcHJlc3NlcyB0aGUgc2VuZGluZyBkYXRhXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNvbXByZXNzKGNvbXByZXNzKSB7XG4gICAgICAgIHRoaXMuZmxhZ3MuY29tcHJlc3MgPSBjb21wcmVzcztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYSBtb2RpZmllciBmb3IgYSBzdWJzZXF1ZW50IGV2ZW50IGVtaXNzaW9uIHRoYXQgdGhlIGV2ZW50IG1lc3NhZ2Ugd2lsbCBiZSBkcm9wcGVkIHdoZW4gdGhpcyBzb2NrZXQgaXMgbm90XG4gICAgICogcmVhZHkgdG8gc2VuZCBtZXNzYWdlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZ2V0IHZvbGF0aWxlKCkge1xuICAgICAgICB0aGlzLmZsYWdzLnZvbGF0aWxlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvbkFueShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay4gVGhlIGxpc3RlbmVyIGlzIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RlbmVycyBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwcmVwZW5kQW55KGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb2ZmQW55KGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW55TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyID09PSBsaXN0ZW5lcnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRoYXQgYXJlIGxpc3RlbmluZyBmb3IgYW55IGV2ZW50IHRoYXQgaXMgc3BlY2lmaWVkLiBUaGlzIGFycmF5IGNhbiBiZSBtYW5pcHVsYXRlZCxcbiAgICAgKiBlLmcuIHRvIHJlbW92ZSBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgbGlzdGVuZXJzQW55KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgIH1cbn1cbiIsIlxuLyoqXG4gKiBFeHBvc2UgYEJhY2tvZmZgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gQmFja29mZjtcblxuLyoqXG4gKiBJbml0aWFsaXplIGJhY2tvZmYgdGltZXIgd2l0aCBgb3B0c2AuXG4gKlxuICogLSBgbWluYCBpbml0aWFsIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIFsxMDBdXG4gKiAtIGBtYXhgIG1heCB0aW1lb3V0IFsxMDAwMF1cbiAqIC0gYGppdHRlcmAgWzBdXG4gKiAtIGBmYWN0b3JgIFsyXVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEJhY2tvZmYob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgdGhpcy5tcyA9IG9wdHMubWluIHx8IDEwMDtcbiAgdGhpcy5tYXggPSBvcHRzLm1heCB8fCAxMDAwMDtcbiAgdGhpcy5mYWN0b3IgPSBvcHRzLmZhY3RvciB8fCAyO1xuICB0aGlzLmppdHRlciA9IG9wdHMuaml0dGVyID4gMCAmJiBvcHRzLmppdHRlciA8PSAxID8gb3B0cy5qaXR0ZXIgOiAwO1xuICB0aGlzLmF0dGVtcHRzID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uKCl7XG4gIHZhciBtcyA9IHRoaXMubXMgKiBNYXRoLnBvdyh0aGlzLmZhY3RvciwgdGhpcy5hdHRlbXB0cysrKTtcbiAgaWYgKHRoaXMuaml0dGVyKSB7XG4gICAgdmFyIHJhbmQgPSAgTWF0aC5yYW5kb20oKTtcbiAgICB2YXIgZGV2aWF0aW9uID0gTWF0aC5mbG9vcihyYW5kICogdGhpcy5qaXR0ZXIgKiBtcyk7XG4gICAgbXMgPSAoTWF0aC5mbG9vcihyYW5kICogMTApICYgMSkgPT0gMCAgPyBtcyAtIGRldmlhdGlvbiA6IG1zICsgZGV2aWF0aW9uO1xuICB9XG4gIHJldHVybiBNYXRoLm1pbihtcywgdGhpcy5tYXgpIHwgMDtcbn07XG5cbi8qKlxuICogUmVzZXQgdGhlIG51bWJlciBvZiBhdHRlbXB0cy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5hdHRlbXB0cyA9IDA7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0TWluID0gZnVuY3Rpb24obWluKXtcbiAgdGhpcy5tcyA9IG1pbjtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXhpbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNYXggPSBmdW5jdGlvbihtYXgpe1xuICB0aGlzLm1heCA9IG1heDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBqaXR0ZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldEppdHRlciA9IGZ1bmN0aW9uKGppdHRlcil7XG4gIHRoaXMuaml0dGVyID0gaml0dGVyO1xufTtcblxuIiwiaW1wb3J0IHsgU29ja2V0IGFzIEVuZ2luZSwgaW5zdGFsbFRpbWVyRnVuY3Rpb25zLCB9IGZyb20gXCJlbmdpbmUuaW8tY2xpZW50XCI7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmltcG9ydCAqIGFzIHBhcnNlciBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IEJhY2tvZmYgZnJvbSBcImJhY2tvMlwiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuZXhwb3J0IGNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5zcHMgPSB7fTtcbiAgICAgICAgdGhpcy5zdWJzID0gW107XG4gICAgICAgIGlmICh1cmkgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHVyaSkge1xuICAgICAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgb3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICAgICAgICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKF9hID0gb3B0cy5yYW5kb21pemF0aW9uRmFjdG9yKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwLjUpO1xuICAgICAgICB0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7XG4gICAgICAgICAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICAgICAgICAgIG1heDogdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heCgpLFxuICAgICAgICAgICAgaml0dGVyOiB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGltZW91dChudWxsID09IG9wdHMudGltZW91dCA/IDIwMDAwIDogb3B0cy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgIHRoaXMudXJpID0gdXJpO1xuICAgICAgICBjb25zdCBfcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgcGFyc2VyO1xuICAgICAgICB0aGlzLmVuY29kZXIgPSBuZXcgX3BhcnNlci5FbmNvZGVyKCk7XG4gICAgICAgIHRoaXMuZGVjb2RlciA9IG5ldyBfcGFyc2VyLkRlY29kZXIoKTtcbiAgICAgICAgdGhpcy5fYXV0b0Nvbm5lY3QgPSBvcHRzLmF1dG9Db25uZWN0ICE9PSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbih2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb247XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbiA9ICEhdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbkF0dGVtcHRzKHYpIHtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXkodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWluKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmFuZG9taXphdGlvbkZhY3Rvcih2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICAgICAgICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0Sml0dGVyKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXlNYXgodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWF4KHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGltZW91dCh2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lb3V0O1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0cnlpbmcgdG8gcmVjb25uZWN0IGlmIHJlY29ubmVjdGlvbiBpcyBlbmFibGVkIGFuZCB3ZSBoYXZlIG5vdFxuICAgICAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBtYXliZVJlY29ubmVjdE9uT3BlbigpIHtcbiAgICAgICAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICAgICAgICBpZiAoIXRoaXMuX3JlY29ubmVjdGluZyAmJlxuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uICYmXG4gICAgICAgICAgICB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQgYHNvY2tldGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIG9wdGlvbmFsLCBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvcGVuKGZuKSB7XG4gICAgICAgIGlmICh+dGhpcy5fcmVhZHlTdGF0ZS5pbmRleE9mKFwib3BlblwiKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBFbmdpbmUodGhpcy51cmksIHRoaXMub3B0cyk7XG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTtcbiAgICAgICAgLy8gZW1pdCBgb3BlbmBcbiAgICAgICAgY29uc3Qgb3BlblN1YkRlc3Ryb3kgPSBvbihzb2NrZXQsIFwib3BlblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9ub3BlbigpO1xuICAgICAgICAgICAgZm4gJiYgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGVtaXQgYGVycm9yYFxuICAgICAgICBjb25zdCBlcnJvclN1YiA9IG9uKHNvY2tldCwgXCJlcnJvclwiLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmNsZWFudXAoKTtcbiAgICAgICAgICAgIHNlbGYuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgZG8gdGhpcyBpZiB0aGVyZSBpcyBubyBmbiB0byBoYW5kbGUgdGhlIGVycm9yXG4gICAgICAgICAgICAgICAgc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTsgLy8gcHJldmVudHMgYSByYWNlIGNvbmRpdGlvbiB3aXRoIHRoZSAnb3BlbicgZXZlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCB0aW1lclxuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoXCJlcnJvclwiLCBuZXcgRXJyb3IoXCJ0aW1lb3V0XCIpKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzLnB1c2gob3BlblN1YkRlc3Ryb3kpO1xuICAgICAgICB0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Igb3BlbigpXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29ubmVjdChmbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuKGZuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IG9wZW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ub3BlbigpIHtcbiAgICAgICAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIC8vIG1hcmsgYXMgb3BlblxuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwib3BlblwiKTtcbiAgICAgICAgLy8gYWRkIG5ldyBzdWJzXG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsIFwicGluZ1wiLCB0aGlzLm9ucGluZy5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImRhdGFcIiwgdGhpcy5vbmRhdGEuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksIG9uKHRoaXMuZGVjb2RlciwgXCJkZWNvZGVkXCIsIHRoaXMub25kZWNvZGVkLmJpbmQodGhpcykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnBpbmcoKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGluZ1wiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggZGF0YS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kYXRhKGRhdGEpIHtcbiAgICAgICAgdGhpcy5kZWNvZGVyLmFkZChkYXRhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZGVjb2RlZChwYWNrZXQpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwYWNrZXRcIiwgcGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc29ja2V0IGVycm9yLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgc29ja2V0IGZvciB0aGUgZ2l2ZW4gYG5zcGAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTb2NrZXR9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNvY2tldChuc3AsIG9wdHMpIHtcbiAgICAgICAgbGV0IHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICAgICAgICBpZiAoIXNvY2tldCkge1xuICAgICAgICAgICAgc29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLCBuc3AsIG9wdHMpO1xuICAgICAgICAgICAgdGhpcy5uc3BzW25zcF0gPSBzb2NrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzb2NrZXQgY2xvc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc29ja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZGVzdHJveShzb2NrZXQpIHtcbiAgICAgICAgY29uc3QgbnNwcyA9IE9iamVjdC5rZXlzKHRoaXMubnNwcyk7XG4gICAgICAgIGZvciAoY29uc3QgbnNwIG9mIG5zcHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICAgICAgICAgICAgaWYgKHNvY2tldC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3BhY2tldChwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgZW5jb2RlZFBhY2tldHMgPSB0aGlzLmVuY29kZXIuZW5jb2RlKHBhY2tldCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldLCBwYWNrZXQub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW4gdXAgdHJhbnNwb3J0IHN1YnNjcmlwdGlvbnMgYW5kIHBhY2tldCBidWZmZXIuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNsZWFudXAoKSB7XG4gICAgICAgIHRoaXMuc3Vicy5mb3JFYWNoKChzdWJEZXN0cm95KSA9PiBzdWJEZXN0cm95KCkpO1xuICAgICAgICB0aGlzLnN1YnMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kZWNvZGVyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2UgdGhlIGN1cnJlbnQgc29ja2V0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuc2tpcFJlY29ubmVjdCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMuX3JlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIC8vIGBvbmNsb3NlYCB3aWxsIG5vdCBmaXJlIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIGFuIG9wZW4gZXZlbnQgbmV2ZXIgaGFwcGVuZWRcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgaWYgKHRoaXMuZW5naW5lKVxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGNsb3NlKClcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBjbG9zZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jbG9zZShyZWFzb24pIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24pO1xuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3QpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdCBhIHJlY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcmVjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgICAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdF9mYWlsZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2F0dGVtcHRcIiwgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgc2VsZi5vcGVuKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZWNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucmVjb25uZWN0KCkge1xuICAgICAgICBjb25zdCBhdHRlbXB0ID0gdGhpcy5iYWNrb2ZmLmF0dGVtcHRzO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0XCIsIGF0dGVtcHQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHVybCB9IGZyb20gXCIuL3VybC5qc1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuL21hbmFnZXIuanNcIjtcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuLyoqXG4gKiBNYW5hZ2VycyBjYWNoZS5cbiAqL1xuY29uc3QgY2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGxvb2t1cCh1cmksIG9wdHMpIHtcbiAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBvcHRzID0gdXJpO1xuICAgICAgICB1cmkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGNvbnN0IHBhcnNlZCA9IHVybCh1cmksIG9wdHMucGF0aCB8fCBcIi9zb2NrZXQuaW9cIik7XG4gICAgY29uc3Qgc291cmNlID0gcGFyc2VkLnNvdXJjZTtcbiAgICBjb25zdCBpZCA9IHBhcnNlZC5pZDtcbiAgICBjb25zdCBwYXRoID0gcGFyc2VkLnBhdGg7XG4gICAgY29uc3Qgc2FtZU5hbWVzcGFjZSA9IGNhY2hlW2lkXSAmJiBwYXRoIGluIGNhY2hlW2lkXVtcIm5zcHNcIl07XG4gICAgY29uc3QgbmV3Q29ubmVjdGlvbiA9IG9wdHMuZm9yY2VOZXcgfHxcbiAgICAgICAgb3B0c1tcImZvcmNlIG5ldyBjb25uZWN0aW9uXCJdIHx8XG4gICAgICAgIGZhbHNlID09PSBvcHRzLm11bHRpcGxleCB8fFxuICAgICAgICBzYW1lTmFtZXNwYWNlO1xuICAgIGxldCBpbztcbiAgICBpZiAobmV3Q29ubmVjdGlvbikge1xuICAgICAgICBpbyA9IG5ldyBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoIWNhY2hlW2lkXSkge1xuICAgICAgICAgICAgY2FjaGVbaWRdID0gbmV3IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBpbyA9IGNhY2hlW2lkXTtcbiAgICB9XG4gICAgaWYgKHBhcnNlZC5xdWVyeSAmJiAhb3B0cy5xdWVyeSkge1xuICAgICAgICBvcHRzLnF1ZXJ5ID0gcGFyc2VkLnF1ZXJ5S2V5O1xuICAgIH1cbiAgICByZXR1cm4gaW8uc29ja2V0KHBhcnNlZC5wYXRoLCBvcHRzKTtcbn1cbi8vIHNvIHRoYXQgXCJsb29rdXBcIiBjYW4gYmUgdXNlZCBib3RoIGFzIGEgZnVuY3Rpb24gKGUuZy4gYGlvKC4uLilgKSBhbmQgYXMgYVxuLy8gbmFtZXNwYWNlIChlLmcuIGBpby5jb25uZWN0KC4uLilgKSwgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbk9iamVjdC5hc3NpZ24obG9va3VwLCB7XG4gICAgTWFuYWdlcixcbiAgICBTb2NrZXQsXG4gICAgaW86IGxvb2t1cCxcbiAgICBjb25uZWN0OiBsb29rdXAsXG59KTtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCB7IHByb3RvY29sIH0gZnJvbSBcInNvY2tldC5pby1wYXJzZXJcIjtcbi8qKlxuICogRXhwb3NlIGNvbnN0cnVjdG9ycyBmb3Igc3RhbmRhbG9uZSBidWlsZC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCB7IE1hbmFnZXIsIFNvY2tldCwgbG9va3VwIGFzIGlvLCBsb29rdXAgYXMgY29ubmVjdCwgbG9va3VwIGFzIGRlZmF1bHQsIH07XG4iLCJpbXBvcnQgeyBpbyB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5cbmNvbnN0IHNvY2tldCA9IGlvLmNvbm5lY3QoXCJodHRwOi8vMTc2LjM0LjYzLjE0ODozMDAwXCIsIHsgc2VjdXJlOiBmYWxzZSB9KTtcbmNvbnN0IHdlbGNvbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlbGNvbWVcIik7XG5jb25zdCBjYWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYWxsXCIpO1xuY29uc3QgbXlGYWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZhY2VcIik7XG5jb25zdCBtdXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtdXRlXCIpO1xuY29uc3QgY2FtZXJhQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW1lcmFcIik7XG5jb25zdCBjYW1lcmFzU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW1lcmFzXCIpO1xuXG5jYWxsLmhpZGRlbiA9IHRydWU7XG5cbmxldCBteVN0cmVhbTtcbmxldCBtdXRlZCA9IGZhbHNlO1xubGV0IGNhbWVyYU9mZiA9IGZhbHNlO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRDYW1lcmFzKCkge1xuICB0cnkge1xuICAgIGNvbnN0IGRldmljZXMgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKTtcbiAgICBjb25zdCBjYW1lcmFzID0gKGF3YWl0IGRldmljZXMpLmZpbHRlcigoZGV2aWNlKSA9PiBkZXZpY2Uua2luZCA9PSBcInZpZGVvaW5wdXRcIik7XG4gICAgY29uc3QgY3VycmVudENhbWVyYSA9IG15U3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XG4gICAgY2FtZXJhcy5mb3JFYWNoKChjYW1lcmEpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICBvcHRpb24udmFsdWUgPSBjYW1lcmEuZGV2aWNlSWQ7XG4gICAgICBvcHRpb24uaW5uZXJUZXh0ID0gY2FtZXJhLmxhYmVsO1xuICAgICAgaWYgKGN1cnJlbnRDYW1lcmEuZGV2aWNlSWQgPT09IGNhbWVyYS5kZXZpY2VJZCkge1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgY2FtZXJhc1NlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0TWVkaWEoZGV2aWNlSWQpIHtcbiAgY29uc3QgaW5pdGlhbENvbnN0cmFpbnMgPSB7XG4gICAgYXVkaW86IHRydWUsXG4gICAgdmlkZW86IHsgZmFjaW5nTW9kZTogXCJ1c2VyXCIgfSxcbiAgfTtcbiAgY29uc3QgY2FtZXJhQ29uc3RyYWlucyA9IHtcbiAgICBhdWRpbzogdHJ1ZSxcbiAgICB2aWRlbzogeyBkZXZpY2VJZDogeyBleGFjdDogZGV2aWNlSWQgfSB9LFxuICB9O1xuICB0cnkge1xuICAgIG15U3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoZGV2aWNlSWQgPyBjYW1lcmFDb25zdHJhaW5zIDogaW5pdGlhbENvbnN0cmFpbnMpO1xuICAgIG15RmFjZS5zcmNPYmplY3QgPSBteVN0cmVhbTtcbiAgICBpZiAoIWRldmljZUlkKSB7XG4gICAgICBhd2FpdCBnZXRDYW1lcmFzKCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcbiAgfVxufVxuXG5tdXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIG15U3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkuZm9yRWFjaCgodHJhY2spID0+IHtcbiAgICB0cmFjay5lbmFibGVkID0gIXRyYWNrLmVuYWJsZWQ7XG4gIH0pO1xuICBpZiAoIW11dGVkKSB7XG4gICAgbXV0ZUJ0bi5pbm5lclRleHQgPSBcIlVubXV0ZVwiO1xuICAgIG11dGVkID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBtdXRlQnRuLmlubmVyVGV4dCA9IFwiTXV0ZVwiO1xuICAgIG11dGVkID0gZmFsc2U7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBoYW5kbGVWaWRlb09mZigpIHtcbiAgbXlTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xuICAgIHRyYWNrLmVuYWJsZWQgPSAhdHJhY2suZW5hYmxlZDtcbiAgfSk7XG4gIGlmICghY2FtZXJhT2ZmKSB7XG4gICAgY2FtZXJhQnRuLmlubmVyVGV4dCA9IFwiVHVybiBDYW1lcmEgT25cIjtcbiAgICBjYW1lcmFPZmYgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGNhbWVyYUJ0bi5pbm5lclRleHQgPSBcIlR1cm4gQ2FtZXJhIE9mZlwiO1xuICAgIGNhbWVyYU9mZiA9IGZhbHNlO1xuICB9XG59XG5cbmNhbWVyYUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVmlkZW9PZmYpO1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDYW1lcmFDaGFuZ2UoKSB7XG4gIGF3YWl0IGdldE1lZGlhKGNhbWVyYXNTZWxlY3QudmFsdWUpO1xufVxuXG5jYW1lcmFzU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBoYW5kbGVDYW1lcmFDaGFuZ2UpO1xuXG5jb25zdCB3ZWxjb21lRm9ybSA9IHdlbGNvbWUucXVlcnlTZWxlY3RvcihcImZvcm1cIik7XG5cbmZ1bmN0aW9uIGhhbmRsZVdlbGNvbWVTdWJtaXQoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgaW5wdXQgPSB3ZWxjb21lRm9ybS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gIGNvbnNvbGUubG9nKGlucHV0LnZhbHVlKTtcbn1cblxud2VsY29tZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVXZWxjb21lU3VibWl0KTtcblxuc29ja2V0Lm9uKFwiY29ubmVjdGlvblwiLCAoKSA9PiBjb25zb2xlLmxvZyhcIlNvY2tldCBpbyBjb25uZWN0ZWQuXCIpKTtcbiJdLCJuYW1lcyI6WyJyZSIsInBhcnRzIiwicGFyc2V1cmkiLCJzdHIiLCJzcmMiLCJiIiwiaW5kZXhPZiIsImUiLCJzdWJzdHJpbmciLCJyZXBsYWNlIiwibGVuZ3RoIiwibSIsImV4ZWMiLCJ1cmkiLCJpIiwic291cmNlIiwiaG9zdCIsImF1dGhvcml0eSIsImlwdjZ1cmkiLCJwYXRoTmFtZXMiLCJxdWVyeUtleSIsIm9iaiIsInBhdGgiLCJyZWd4IiwibmFtZXMiLCJzcGxpdCIsInN1YnN0ciIsInNwbGljZSIsInF1ZXJ5IiwiZGF0YSIsIiQwIiwiJDEiLCIkMiIsInVybCIsImxvYyIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJjaGFyQXQiLCJ0ZXN0IiwicG9ydCIsImlwdjYiLCJpZCIsImhyZWYiLCJoYXNDb3JzTW9kdWxlIiwiWE1MSHR0cFJlcXVlc3QiLCJlcnIiLCJzZWxmIiwid2luZG93IiwiRnVuY3Rpb24iLCJvcHRzIiwieGRvbWFpbiIsImhhc0NPUlMiLCJnbG9iYWxUaGlzIiwiY29uY2F0Iiwiam9pbiIsInBpY2siLCJhdHRyIiwicmVkdWNlIiwiYWNjIiwiayIsImhhc093blByb3BlcnR5IiwiTkFUSVZFX1NFVF9USU1FT1VUIiwic2V0VGltZW91dCIsIk5BVElWRV9DTEVBUl9USU1FT1VUIiwiY2xlYXJUaW1lb3V0IiwiaW5zdGFsbFRpbWVyRnVuY3Rpb25zIiwidXNlTmF0aXZlVGltZXJzIiwic2V0VGltZW91dEZuIiwiYmluZCIsImNsZWFyVGltZW91dEZuIiwiRW1pdHRlciIsIm1peGluIiwia2V5IiwicHJvdG90eXBlIiwib24iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJmbiIsIl9jYWxsYmFja3MiLCJwdXNoIiwib25jZSIsIm9mZiIsImFwcGx5IiwiYXJndW1lbnRzIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2FsbGJhY2tzIiwiY2IiLCJlbWl0IiwiYXJncyIsIkFycmF5Iiwic2xpY2UiLCJsZW4iLCJlbWl0UmVzZXJ2ZWQiLCJsaXN0ZW5lcnMiLCJoYXNMaXN0ZW5lcnMiLCJQQUNLRVRfVFlQRVMiLCJPYmplY3QiLCJjcmVhdGUiLCJQQUNLRVRfVFlQRVNfUkVWRVJTRSIsImtleXMiLCJmb3JFYWNoIiwiRVJST1JfUEFDS0VUIiwidHlwZSIsIndpdGhOYXRpdmVCbG9iIiwiQmxvYiIsInRvU3RyaW5nIiwiY2FsbCIsIndpdGhOYXRpdmVBcnJheUJ1ZmZlciIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiYnVmZmVyIiwiZW5jb2RlUGFja2V0Iiwic3VwcG9ydHNCaW5hcnkiLCJjYWxsYmFjayIsImVuY29kZUJsb2JBc0Jhc2U2NCIsImZpbGVSZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiY29udGVudCIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJsb29rdXAiLCJkZWNvZGUiLCJkZWNvZGVQYWNrZXQiLCJlbmNvZGVkUGFja2V0IiwiYmluYXJ5VHlwZSIsIm1hcEJpbmFyeSIsImRlY29kZUJhc2U2NFBhY2tldCIsInBhY2tldFR5cGUiLCJkZWNvZGVkIiwiYmFzZTY0IiwiU0VQQVJBVE9SIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZW5jb2RlUGF5bG9hZCIsInBhY2tldHMiLCJlbmNvZGVkUGFja2V0cyIsImNvdW50IiwicGFja2V0IiwiZGVjb2RlUGF5bG9hZCIsImVuY29kZWRQYXlsb2FkIiwiZGVjb2RlZFBhY2tldCIsIlRyYW5zcG9ydCIsImNvbnN0cnVjdG9yIiwid3JpdGFibGUiLCJyZWFkeVN0YXRlIiwic29ja2V0Iiwib25FcnJvciIsIm1zZyIsImRlc2MiLCJFcnJvciIsImRlc2NyaXB0aW9uIiwib3BlbiIsImRvT3BlbiIsImNsb3NlIiwiZG9DbG9zZSIsIm9uQ2xvc2UiLCJzZW5kIiwid3JpdGUiLCJvbk9wZW4iLCJvbkRhdGEiLCJvblBhY2tldCIsImFscGhhYmV0IiwibWFwIiwic2VlZCIsInByZXYiLCJlbmNvZGUiLCJudW0iLCJlbmNvZGVkIiwiTWF0aCIsImZsb29yIiwieWVhc3QiLCJub3ciLCJEYXRlIiwieWVhc3RfMSIsImVuY29kZVVSSUNvbXBvbmVudCIsInFzIiwicXJ5IiwicGFpcnMiLCJsIiwicGFpciIsImRlY29kZVVSSUNvbXBvbmVudCIsIlBvbGxpbmciLCJwb2xsaW5nIiwibmFtZSIsInBvbGwiLCJwYXVzZSIsIm9uUGF1c2UiLCJ0b3RhbCIsImRvUG9sbCIsImRvV3JpdGUiLCJzY2hlbWEiLCJzZWN1cmUiLCJ0aW1lc3RhbXBSZXF1ZXN0cyIsInRpbWVzdGFtcFBhcmFtIiwic2lkIiwiYjY0IiwiTnVtYmVyIiwiZW5jb2RlZFF1ZXJ5IiwicGFyc2VxcyIsImhvc3RuYW1lIiwiZW1wdHkiLCJoYXNYSFIyIiwieGhyIiwicmVzcG9uc2VUeXBlIiwiWEhSIiwiaXNTU0wiLCJ4ZCIsInhzIiwiZm9yY2VCYXNlNjQiLCJyZXF1ZXN0IiwiYXNzaWduIiwiUmVxdWVzdCIsInJlcSIsIm1ldGhvZCIsInBvbGxYaHIiLCJhc3luYyIsInVuZGVmaW5lZCIsInhzY2hlbWUiLCJleHRyYUhlYWRlcnMiLCJzZXREaXNhYmxlSGVhZGVyQ2hlY2siLCJzZXRSZXF1ZXN0SGVhZGVyIiwid2l0aENyZWRlbnRpYWxzIiwicmVxdWVzdFRpbWVvdXQiLCJ0aW1lb3V0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwic3RhdHVzIiwib25Mb2FkIiwiZG9jdW1lbnQiLCJpbmRleCIsInJlcXVlc3RzQ291bnQiLCJyZXF1ZXN0cyIsIm9uU3VjY2VzcyIsImNsZWFudXAiLCJmcm9tRXJyb3IiLCJhYm9ydCIsInJlc3BvbnNlVGV4dCIsImF0dGFjaEV2ZW50IiwidW5sb2FkSGFuZGxlciIsInRlcm1pbmF0aW9uRXZlbnQiLCJuZXh0VGljayIsImlzUHJvbWlzZUF2YWlsYWJsZSIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIldlYlNvY2tldCIsIk1veldlYlNvY2tldCIsInVzaW5nQnJvd3NlcldlYlNvY2tldCIsImRlZmF1bHRCaW5hcnlUeXBlIiwiaXNSZWFjdE5hdGl2ZSIsIm5hdmlnYXRvciIsInByb2R1Y3QiLCJ0b0xvd2VyQ2FzZSIsIldTIiwiY2hlY2siLCJwcm90b2NvbHMiLCJoZWFkZXJzIiwid3MiLCJhZGRFdmVudExpc3RlbmVycyIsIm9ub3BlbiIsImF1dG9VbnJlZiIsIl9zb2NrZXQiLCJ1bnJlZiIsIm9uY2xvc2UiLCJvbm1lc3NhZ2UiLCJldiIsIm9uZXJyb3IiLCJsYXN0UGFja2V0IiwidHJhbnNwb3J0cyIsIndlYnNvY2tldCIsIlNvY2tldCIsIndyaXRlQnVmZmVyIiwicHJldkJ1ZmZlckxlbiIsImFnZW50IiwidXBncmFkZSIsInJlbWVtYmVyVXBncmFkZSIsInJlamVjdFVuYXV0aG9yaXplZCIsInBlck1lc3NhZ2VEZWZsYXRlIiwidGhyZXNob2xkIiwidHJhbnNwb3J0T3B0aW9ucyIsImNsb3NlT25CZWZvcmV1bmxvYWQiLCJ1cGdyYWRlcyIsInBpbmdJbnRlcnZhbCIsInBpbmdUaW1lb3V0IiwicGluZ1RpbWVvdXRUaW1lciIsInRyYW5zcG9ydCIsIm9mZmxpbmVFdmVudExpc3RlbmVyIiwiY3JlYXRlVHJhbnNwb3J0IiwiY2xvbmUiLCJFSU8iLCJwcmlvcldlYnNvY2tldFN1Y2Nlc3MiLCJzaGlmdCIsInNldFRyYW5zcG9ydCIsIm9uRHJhaW4iLCJwcm9iZSIsImZhaWxlZCIsIm9uVHJhbnNwb3J0T3BlbiIsInVwZ3JhZGluZyIsImZsdXNoIiwiZnJlZXplVHJhbnNwb3J0IiwiZXJyb3IiLCJvblRyYW5zcG9ydENsb3NlIiwib251cGdyYWRlIiwidG8iLCJvbkhhbmRzaGFrZSIsIkpTT04iLCJwYXJzZSIsInJlc2V0UGluZ1RpbWVvdXQiLCJzZW5kUGFja2V0IiwiY29kZSIsImZpbHRlclVwZ3JhZGVzIiwib3B0aW9ucyIsImNvbXByZXNzIiwiY2xlYW51cEFuZENsb3NlIiwid2FpdEZvclVwZ3JhZGUiLCJyZWFzb24iLCJmaWx0ZXJlZFVwZ3JhZGVzIiwiaiIsIm8iLCJ3aXRoTmF0aXZlRmlsZSIsIkZpbGUiLCJpc0JpbmFyeSIsImhhc0JpbmFyeSIsInRvSlNPTiIsImlzQXJyYXkiLCJkZWNvbnN0cnVjdFBhY2tldCIsImJ1ZmZlcnMiLCJwYWNrZXREYXRhIiwicGFjayIsIl9kZWNvbnN0cnVjdFBhY2tldCIsImF0dGFjaG1lbnRzIiwicGxhY2Vob2xkZXIiLCJfcGxhY2Vob2xkZXIiLCJuZXdEYXRhIiwicmVjb25zdHJ1Y3RQYWNrZXQiLCJfcmVjb25zdHJ1Y3RQYWNrZXQiLCJQYWNrZXRUeXBlIiwiRW5jb2RlciIsIkVWRU5UIiwiQUNLIiwiQklOQVJZX0VWRU5UIiwiQklOQVJZX0FDSyIsImVuY29kZUFzQmluYXJ5IiwiZW5jb2RlQXNTdHJpbmciLCJuc3AiLCJzdHJpbmdpZnkiLCJkZWNvbnN0cnVjdGlvbiIsInVuc2hpZnQiLCJEZWNvZGVyIiwiYWRkIiwiZGVjb2RlU3RyaW5nIiwicmVjb25zdHJ1Y3RvciIsIkJpbmFyeVJlY29uc3RydWN0b3IiLCJ0YWtlQmluYXJ5RGF0YSIsInAiLCJzdGFydCIsImJ1ZiIsImMiLCJuZXh0IiwicGF5bG9hZCIsInRyeVBhcnNlIiwiaXNQYXlsb2FkVmFsaWQiLCJDT05ORUNUIiwiRElTQ09OTkVDVCIsIkNPTk5FQ1RfRVJST1IiLCJkZXN0cm95IiwiZmluaXNoZWRSZWNvbnN0cnVjdGlvbiIsInJlY29uUGFjayIsImJpbkRhdGEiLCJzdWJEZXN0cm95IiwiUkVTRVJWRURfRVZFTlRTIiwiZnJlZXplIiwiY29ubmVjdCIsImNvbm5lY3RfZXJyb3IiLCJkaXNjb25uZWN0IiwiZGlzY29ubmVjdGluZyIsIm5ld0xpc3RlbmVyIiwiaW8iLCJjb25uZWN0ZWQiLCJkaXNjb25uZWN0ZWQiLCJyZWNlaXZlQnVmZmVyIiwic2VuZEJ1ZmZlciIsImlkcyIsImFja3MiLCJmbGFncyIsImF1dGgiLCJfYXV0b0Nvbm5lY3QiLCJzdWJFdmVudHMiLCJzdWJzIiwib25wYWNrZXQiLCJhY3RpdmUiLCJfcmVhZHlTdGF0ZSIsInBvcCIsImlzVHJhbnNwb3J0V3JpdGFibGUiLCJlbmdpbmUiLCJkaXNjYXJkUGFja2V0Iiwidm9sYXRpbGUiLCJfcGFja2V0Iiwic2FtZU5hbWVzcGFjZSIsIm9uY29ubmVjdCIsIm9uZXZlbnQiLCJvbmFjayIsIm9uZGlzY29ubmVjdCIsIm1lc3NhZ2UiLCJhY2siLCJlbWl0RXZlbnQiLCJfYW55TGlzdGVuZXJzIiwibGlzdGVuZXIiLCJzZW50IiwiZW1pdEJ1ZmZlcmVkIiwib25BbnkiLCJwcmVwZW5kQW55Iiwib2ZmQW55IiwibGlzdGVuZXJzQW55IiwiYmFja28yIiwiQmFja29mZiIsIm1zIiwibWluIiwibWF4IiwiZmFjdG9yIiwiaml0dGVyIiwiYXR0ZW1wdHMiLCJkdXJhdGlvbiIsInBvdyIsInJhbmQiLCJyYW5kb20iLCJkZXZpYXRpb24iLCJyZXNldCIsInNldE1pbiIsInNldE1heCIsInNldEppdHRlciIsIk1hbmFnZXIiLCJfYSIsIm5zcHMiLCJyZWNvbm5lY3Rpb24iLCJyZWNvbm5lY3Rpb25BdHRlbXB0cyIsIkluZmluaXR5IiwicmVjb25uZWN0aW9uRGVsYXkiLCJyZWNvbm5lY3Rpb25EZWxheU1heCIsInJhbmRvbWl6YXRpb25GYWN0b3IiLCJiYWNrb2ZmIiwiX3BhcnNlciIsInBhcnNlciIsImVuY29kZXIiLCJkZWNvZGVyIiwiYXV0b0Nvbm5lY3QiLCJ2IiwiX3JlY29ubmVjdGlvbiIsIl9yZWNvbm5lY3Rpb25BdHRlbXB0cyIsIl9yZWNvbm5lY3Rpb25EZWxheSIsIl9yYW5kb21pemF0aW9uRmFjdG9yIiwiX3JlY29ubmVjdGlvbkRlbGF5TWF4IiwiX3RpbWVvdXQiLCJtYXliZVJlY29ubmVjdE9uT3BlbiIsIl9yZWNvbm5lY3RpbmciLCJyZWNvbm5lY3QiLCJFbmdpbmUiLCJza2lwUmVjb25uZWN0Iiwib3BlblN1YkRlc3Ryb3kiLCJlcnJvclN1YiIsInRpbWVyIiwib25waW5nIiwib25kYXRhIiwib25kZWNvZGVkIiwiX2Rlc3Ryb3kiLCJfY2xvc2UiLCJkZWxheSIsIm9ucmVjb25uZWN0IiwiYXR0ZW1wdCIsImNhY2hlIiwicGFyc2VkIiwibmV3Q29ubmVjdGlvbiIsImZvcmNlTmV3IiwibXVsdGlwbGV4Iiwid2VsY29tZSIsImdldEVsZW1lbnRCeUlkIiwibXlGYWNlIiwibXV0ZUJ0biIsImNhbWVyYUJ0biIsImNhbWVyYXNTZWxlY3QiLCJoaWRkZW4iLCJteVN0cmVhbSIsIm11dGVkIiwiY2FtZXJhT2ZmIiwiZ2V0Q2FtZXJhcyIsImRldmljZXMiLCJtZWRpYURldmljZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwiY2FtZXJhcyIsImZpbHRlciIsImRldmljZSIsImtpbmQiLCJjdXJyZW50Q2FtZXJhIiwiZ2V0VmlkZW9UcmFja3MiLCJjYW1lcmEiLCJvcHRpb24iLCJjcmVhdGVFbGVtZW50IiwidmFsdWUiLCJkZXZpY2VJZCIsImlubmVyVGV4dCIsImxhYmVsIiwic2VsZWN0ZWQiLCJhcHBlbmRDaGlsZCIsImNvbnNvbGUiLCJsb2ciLCJnZXRNZWRpYSIsImluaXRpYWxDb25zdHJhaW5zIiwiYXVkaW8iLCJ2aWRlbyIsImZhY2luZ01vZGUiLCJjYW1lcmFDb25zdHJhaW5zIiwiZXhhY3QiLCJnZXRVc2VyTWVkaWEiLCJzcmNPYmplY3QiLCJnZXRBdWRpb1RyYWNrcyIsInRyYWNrIiwiZW5hYmxlZCIsImhhbmRsZVZpZGVvT2ZmIiwiaGFuZGxlQ2FtZXJhQ2hhbmdlIiwid2VsY29tZUZvcm0iLCJxdWVyeVNlbGVjdG9yIiwiaGFuZGxlV2VsY29tZVN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiaW5wdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQSxJQUFJQSxFQUFFLEdBQUcseU9BQVQ7SUFFQSxJQUFJQyxLQUFLLEdBQUcsQ0FDUixRQURRLEVBQ0UsVUFERixFQUNjLFdBRGQsRUFDMkIsVUFEM0IsRUFDdUMsTUFEdkMsRUFD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
