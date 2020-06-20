// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"p5.dbox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DBox = /*#__PURE__*/function () {
  function DBox(_ref) {
    var _this = this;

    var _x = _ref.x,
        _y = _ref.y,
        _s = _ref.s,
        drawInside = _ref.drawInside,
        _ref$mousePressedInsi = _ref.mousePressedInside,
        mousePressedInside = _ref$mousePressedInsi === void 0 ? function () {} : _ref$mousePressedInsi,
        _ref$mousePressedOuts = _ref.mousePressedOutside,
        mousePressedOutside = _ref$mousePressedOuts === void 0 ? function () {} : _ref$mousePressedOuts,
        _fill = _ref.fill;

    _classCallCheck(this, DBox);

    _defineProperty(this, "clearEventListeners", function () {
      _renderer.elt.removeEventListener("mousedown", _this.mousePressed);

      _renderer.elt.removeEventListener("mouseup", _this.mouseReleased);
    });

    _defineProperty(this, "keyPressed", function (e) {
      if (e.key === "Delete") {
        DBox.setIsAnyBeingDragged(false);
      }
    });

    _defineProperty(this, "mousePressed", function () {
      if (_this.isMouseInsideBox()) {
        _this.mousePressedInside();

        if (!DBox.canBeDragged()) {
          return;
        }

        _this.isBeingDragged = true;
      } else {
        _this.mousePressedOutside();
      }
    });

    _defineProperty(this, "mouseReleased", function () {
      _this.isBeingDragged = false;
      DBox.setIsAnyBeingDragged(false);
    });

    _defineProperty(this, "display", function () {
      rectMode(CENTER);
      stroke(255);
      push();
      translate(_this.x, _this.y);

      _this.drawContentInside();

      _this.drawBox();

      pop();
    });

    _defineProperty(this, "drawBox", function () {
      if (_this.isVisible) {
        if (_this.fill) {
          fill(_this.fill);
        } else {
          noFill();
        }

        strokeWeight(2);
        square(0, 0, _this.s);
      }
    });

    _defineProperty(this, "drag", function () {
      if (_this.isBeingDragged) {
        _this.x += mouseX - pmouseX;

        if (_this.isConstrained) {
          _this.y += mouseX - pmouseX;
        } else {
          _this.y += mouseY - pmouseY;
        }
      }
    });

    _defineProperty(this, "isMouseInsideBox", function () {
      return _this.isPtInside(mouseX, mouseY);
    });

    _defineProperty(this, "isPtInside", function (x, y) {
      return x < _this.x + _this.s / 2 && x > _this.x - _this.s / 2 && y < _this.y + _this.s / 2 && y > _this.y - _this.s / 2;
    });

    _defineProperty(this, "setConstraint", function (isConstrained) {
      _this.isConstrained = isConstrained;
    });

    _defineProperty(this, "setPos", function (_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      _this.x = x;
      _this.y = y;
    });

    _defineProperty(this, "setSideLength", function (_ref3) {
      var s = _ref3.s;
      _this.s = s;
    });

    _defineProperty(this, "setVisible", function (isVisible) {
      _this.isVisible = isVisible;
    });

    this.x = _x;
    this.y = _y;
    this.s = _s;
    this.isBeingDragged = false;

    _renderer.elt.addEventListener("mousedown", this.mousePressed);

    _renderer.elt.addEventListener("mouseup", this.mouseReleased);

    DBox.isAnyBeingDragged = false;
    this.fill = _fill; // Special properties //

    this.drawInside = drawInside;
    this.isConstrained = false;
    this.isActive = false;
    this.isVisible = false; // Mouse press events

    this.mousePressedInside = mousePressedInside;
    this.mousePressedOutside = mousePressedOutside;
  }

  _createClass(DBox, [{
    key: "drawContentInside",
    value: function drawContentInside() {
      if (this.drawInside) {
        this.drawInside({
          s: this.s
        });
      }
    }
  }]);

  return DBox;
}();

exports.default = DBox;

_defineProperty(DBox, "canBeDragged", function () {
  if (DBox.isAnyBeingDragged) {
    return false;
  } else {
    DBox.setIsAnyBeingDragged(true);
    return true;
  }
});

_defineProperty(DBox, "setIsAnyBeingDragged", function (isAnyDragging) {
  DBox.isAnyBeingDragged = isAnyDragging;
});
},{}],"p5.rnd.js":[function(require,module,exports) {
"use strict";

var _p = _interopRequireDefault(require("./p5.dbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RndBox = /*#__PURE__*/function () {
  function RndBox(_ref) {
    var _this = this;

    var x = _ref.x,
        y = _ref.y,
        s = _ref.s,
        drawInside = _ref.drawInside,
        mousePressed = _ref.mousePressed;

    _classCallCheck(this, RndBox);

    _defineProperty(this, "dBoxMousePressedInside", function () {
      if (_this.mousePressed) {
        _this.mousePressed();
      }

      _this.dBox.setVisible(true);

      _this.rBox.setVisible(true);
    });

    _defineProperty(this, "dBoxMousePressedOutside", function () {
      if (!_this.rBox.isMouseInsideBox()) {
        _this.dBox.setVisible(false);

        _this.rBox.setVisible(false);
      }
    });

    _defineProperty(this, "isSelected", function () {
      return _this.dBox.isVisible;
    });

    this.rBox = new _p.default({
      x: x + s / 2,
      y: y + s / 2,
      s: 12,
      fill: 255
    });
    this.dBox = new _p.default({
      x: x,
      y: y,
      s: s,
      drawInside: drawInside,
      mousePressedInside: this.dBoxMousePressedInside,
      mousePressedOutside: this.dBoxMousePressedOutside
    });
    this.rBox.setConstraint(true);
    this.dragCalled = false;
    this.resizeCalled = false;
    this.mousePressed = mousePressed;
  }

  _createClass(RndBox, [{
    key: "display",
    value: function display() {
      this.dBox.display();

      if (this.resizeCalled) {
        this.rBox.display();
      }
    }
  }, {
    key: "drag",
    value: function drag() {
      this.dragCalled = true;
      this.dragDBox();
    }
  }, {
    key: "resize",
    value: function resize() {
      this.resizeCalled = true;
      this.dragRBox();
    }
  }, {
    key: "dragDBox",
    value: function dragDBox() {
      if (this.dragCalled) {
        this.dBox.drag();

        if (this.dBox.isBeingDragged) {
          this.rBox.setPos({
            x: this.dBox.x + this.dBox.s / 2,
            y: this.dBox.y + this.dBox.s / 2
          });
        }
      }
    }
  }, {
    key: "dragRBox",
    value: function dragRBox() {
      if (this.resizeCalled) {
        this.rBox.drag();

        if (this.rBox.isBeingDragged) {
          this.dBox.setSideLength({
            s: 2 * (this.rBox.x - this.dBox.x)
          });
        }
      }
    }
  }, {
    key: "clearEvents",
    value: function clearEvents() {
      this.rBox.clearEventListeners();
      this.dBox.clearEventListeners();
    }
  }, {
    key: "getPos",
    value: function getPos() {
      return [this.dBox.x, this.dBox.y];
    }
  }, {
    key: "setPos",
    value: function setPos(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      this.dBox.setPos({
        x: x,
        y: y
      });
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return this.dBox.s;
    }
  }, {
    key: "isDragged",
    value: function isDragged() {
      return this.dBox.isBeingDragged;
    }
  }]);

  return RndBox;
}();

window.RndBox = RndBox;
},{"./p5.dbox":"p5.dbox.js"}],"../../../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37041" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v12.16.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","p5.rnd.js"], null)
//# sourceMappingURL=/p5.rnd.js.map