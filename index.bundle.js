/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length)
/******/ 			resolves.shift()();
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return Promise.resolve();
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunks[chunkId]) {
/******/ 			return installedChunks[chunkId][2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunks[chunkId][2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/react-game-engine-experimental/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bridge_Module__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NativeComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NativeElementComponent; });
/* harmony export (immutable) */ __webpack_exports__["a"] = nativeComponent;
/* harmony export (immutable) */ __webpack_exports__["b"] = prop;
/* unused harmony export default */
var _class3, _desc, _value, _class4;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * Created by tdzl2003 on 2017/3/15.
 */



let postEvent = function (eventId, name, ...args) {
  // Should have remote event here.
  const { remoteModules: {
      UIEventEmitter
    } } = global.__bridgeServer;

  postEvent = function (eventId, name, ...args) {
    UIEventEmitter.emit(eventId, name, ...args);
  };
  return postEvent.call(null, eventId, name, ...args);
};

let NativeComponent = class NativeComponent {

  constructor(id, eventId) {
    this.reactId = null;
    this.eventId = null;
    this.events = {};

    this.reactId = id;
    this.eventId = eventId;
  }

  sendEvent(eventName, ...args) {
    const v = this.events[eventName];
    if (v) {
      postEvent(this.eventId, eventName, ...args);
    }
  }

  setViewProps(props) {
    const { propFields, defaultProps } = this.constructor;
    if (propFields) {
      for (const k in props) {
        if (propFields[k]) {
          if (props[k] === null) {
            this[k] = defaultProps[k];
          } else {
            this[k] = props[k];
          }
        }
      }
    }
  }

  mount(parentNode, before) {}

  unmount() {}

  setAttribute(key, value) {}
};

let NativeElementComponent = class NativeElementComponent extends NativeComponent {

  constructor(id, eventId, tagName) {
    super(id, eventId, tagName);

    this.el = null;
    this.el = document.createElement(tagName);
    if (true) {
      this.el.setAttribute('data-react-id', id);
      this.el.setAttribute('data-react-event-id', eventId);
    }
  }

  insertBefore(el, ref) {
    this.el.insertBefore(el, ref);
  }

  appendChild(el) {
    this.el.appendChild(el);
  }

  setViewProps(props) {
    for (const key of Object.keys(props)) {
      const value = props[key];

      switch (key) {
        case 'style':
          {
            this.updateStyle(value);
            break;
          }
        case 'events':
          {
            for (const name of Object.keys(value)) {
              if (value[name]) {
                const f = this.events[name] = ev => {
                  postEvent(this.eventId, name);
                };
                this.el.addEventListener(name.toLowerCase(), f);
              } else {
                this.el.removeEventListener(name.toLowerCase(), this.events[name]);
                delete this.events[name];
              }
            }
            break;
          }
        default:
          {
            if (value === null) {
              this.removeAttribute(key);
            } else {
              this.setAttribute(key, value);
            }
            break;
          }
      }
    }
  }

  updateStyle(style) {
    for (const name of Object.keys(style)) {
      let styleValue = style[name];
      if (typeof styleValue === 'number') {
        styleValue = `${styleValue}px`;
      }
      this.el.style[name] = styleValue;
    }
  }

  setAttribute(key, value) {
    this.el.setAttribute(key, value);
  }

  removeAttribute(key) {
    this.el.removeAttribute(key);
  }

  mount(parentNode, before) {
    if (before) {
      parentNode.insertBefore(this.el, before);
    } else {
      parentNode.appendChild(this.el);
    }
  }

  unmount() {
    this.el.parentNode.removeChild(this.el);
  }

  removeChild(el) {
    this.el.removeChild(el);
  }
};

function nativeComponent(name) {
  return target => {
    UIManager.instance.nativeComponents[name] = target;
  };
}

function prop(target, name, args) {
  const defaultValue = args.value || args.initializer && args.initializer();
  const clazz = target.constructor;

  if (clazz.hasOwnProperty('propFields')) {
    clazz.propFields[name] = true;
  } else {
    Object.defineProperty(clazz, 'propFields', {
      configurable: true,
      enumerable: false,
      value: _extends({}, clazz.__proto__.propFields, {
        [name]: true
      })
    });
  }

  if (clazz.hasOwnProperty('defaultProps')) {
    clazz.defaultProps[name] = defaultValue;
  } else {
    Object.defineProperty(clazz, 'defaultProps', {
      configurable: true,
      enumerable: false,
      value: _extends({}, clazz.__proto__.defaultProps, {
        [name]: defaultValue
      })
    });
  }
}

let UIManager = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__bridge_Module__["e" /* serverModule */])(_class3 = (_class4 = class UIManager extends __WEBPACK_IMPORTED_MODULE_0__bridge_Module__["b" /* default */] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.nativeComponents = {}, this.viewRegistry = [], _temp;
  }

  createView(id, eventId, container, initialProps, tagName, before) {
    const Clazz = this.nativeComponents[tagName];
    const el = Clazz ? new Clazz(id, eventId) : new NativeElementComponent(id, eventId, tagName);
    this.viewRegistry[id] = el;
    if (initialProps) {
      el.setViewProps(initialProps);
    }
    this.mountView(container, before, el);
  }

  moveView(id, container, before) {
    const el = this.viewRegistry[id];
    if (el instanceof NativeComponent) {
      el.unmount();
    } else {
      el.parentNode.removeChild(el);
    }
    this.mountView(container, before, el);
  }

  mountView(container, before, el) {
    let parent = null;
    switch (typeof container) {
      case 'number':
        parent = this.viewRegistry[container];
        break;
      case 'object':
        // include null
        parent = document.body;
        break;
      case 'string':
        parent = document.querySelector(container);
        break;
    }
    if (el instanceof NativeComponent) {
      el.mount(parent, before && this.viewRegistry[before]);
      return;
    }
    if (before) {
      parent.insertBefore(el, this.viewRegistry[before]);
    } else {
      parent.appendChild(el);
    }
  }

  createTextNode(id, container, value, before) {
    const el = document.createTextNode(value);
    this.mountView(container, before, el);
    this.viewRegistry[id] = el;
  }

  updateTextNode(id, value) {
    const el = this.viewRegistry[id];
    el.data = value;
  }

  createEmptyNode(id, container, before) {
    const el =  true ? document.createComment(`react-id=${id}`) : document.createComment();
    this.mountView(container, before, el);
    this.viewRegistry[id] = el;
  }

  setViewProps(id, eventId, props) {
    const view = this.viewRegistry[id];
    if (view instanceof NativeComponent) {
      view.setViewProps(props);
      return;
    }
    updateProps(view, id, eventId, props);
  }

  destroyView(id, parent) {
    const view = this.viewRegistry[id];
    const parentNode = typeof parent === 'number' ? this.viewRegistry[id] : view.parentNode;
    if (view instanceof NativeComponent) {
      view.unmount();
    } else {
      parentNode.removeChild(view);
    }
    delete this.viewRegistry[id];
  }
}, (_applyDecoratedDescriptor(_class4.prototype, 'createView', [__WEBPACK_IMPORTED_MODULE_0__bridge_Module__["c" /* method */]], Object.getOwnPropertyDescriptor(_class4.prototype, 'createView'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'moveView', [__WEBPACK_IMPORTED_MODULE_0__bridge_Module__["c" /* method */]], Object.getOwnPropertyDescriptor(_class4.prototype, 'moveView'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'createTextNode', [__WEBPACK_IMPORTED_MODULE_0__bridge_Module__["c" /* method */]], Object.getOwnPropertyDescriptor(_class4.prototype, 'createTextNode'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'updateTextNode', [__WEBPACK_IMPORTED_MODULE_0__bridge_Module__["c" /* method */]], Object.getOwnPropertyDescriptor(_class4.prototype, 'updateTextNode'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'createEmptyNode', [__WEBPACK_IMPORTED_MODULE_0__bridge_Module__["c" /* method */]], Object.getOwnPropertyDescriptor(_class4.prototype, 'createEmptyNode'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'setViewProps', [__WEBPACK_IMPORTED_MODULE_0__bridge_Module__["c" /* method */]], Object.getOwnPropertyDescriptor(_class4.prototype, 'setViewProps'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'destroyView', [__WEBPACK_IMPORTED_MODULE_0__bridge_Module__["d" /* asyncMethod */]], Object.getOwnPropertyDescriptor(_class4.prototype, 'destroyView'), _class4.prototype)), _class4)) || _class3;


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AssetType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssetManager; });
/**
 * Created by tdzl2003 on 2017/3/19.
 */

let AssetType = class AssetType {
  constructor() {
    this.ref = 0;
  }

  // return a promise if assets needs a async loading.
  load() {}

  unload() {}

  addRef() {
    ++this.ref;
  }

  release() {
    --this.ref;
  }

  destroy() {}
};

let AssetManager = class AssetManager {

  constructor(clazz) {
    this.clazz = null;
    this.assets = {};

    this.clazz = clazz;
  }

  obtain(gl, key) {
    let ref = this.assets[key];
    if (!ref) {
      this.assets[key] = ref = new this.clazz(gl, key);
      ref.load(gl);
    }

    ref.addRef();
    return ref;
  }
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Module; });
/* harmony export (immutable) */ __webpack_exports__["c"] = method;
/* harmony export (immutable) */ __webpack_exports__["d"] = asyncMethod;
/* harmony export (immutable) */ __webpack_exports__["e"] = serverModule;
/* harmony export (immutable) */ __webpack_exports__["a"] = clientModule;
/**
 * Created by tdzl2003 on 2017/3/15.
 */

let Module = class Module {
  constructor(bridge) {
    this.bridge = bridge;
    this.name = this.constructor.name;
  }
};



function method(target, name, args) {
  if (target.hasOwnProperty('__methods')) {
    target.__methods.push([name, false]);
  } else {
    Object.defineProperty(target, '__methods', {
      configurable: true,
      enumerable: false,
      value: [[name, false]]
    });
  }
}

function asyncMethod(target, name, args) {
  if (target.hasOwnProperty('__methods')) {
    target.__methods.push([name, true]);
  } else {
    Object.defineProperty(target, '__methods', {
      configurable: true,
      enumerable: false,
      value: [[name, true]]
    });
  }
}

function serverModule(target) {
  const bridge = global.__bridgeServer;
  if (!bridge) {
    throw new Error('Export server module without __bridgeServer');
  }
  target.instance = new target(bridge);
  bridge.addModule(target.instance);
}

function clientModule(target) {
  const bridge = global.__bridgeClient;
  if (!bridge) {
    throw new Error('Export server module without __bridgeClient');
  }
  target.instance = new target(bridge);
  bridge.addModule(target.instance);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Module__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bridge; });
var _desc, _value, _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * Created by tdzl2003 on 2017/3/15.
 */


let Bridge = (_class = class Bridge {
  constructor() {
    this.name = 'Bridge';
    this.modules = [this];
    this.remoteModules = {};
    this.callbacks = [];
    this.callbackId = 0;
    this.remote = null;

    this.processMessage = e => {
      e.data.forEach(v => {
        if (true) {
          if (!this.modules[v[0]]) {
            console.error(`Cannot find module ${v[0]}`);
          } else if (!this.modules[v[0]].__methods[v[1]]) {
            console.error(`Cannot find method ${this.modules[v[0]].__methods[v[1]]} in module ${this.modules[v[0]].name}`);
          }
        }
        const module = this.modules[v[0]];
        const [name] = module.__methods[v[1]];

        if (!v[3]) {
          // void call
          module[name](...v[2]);
        } else {
          const [resolve, reject] = v[3];
          // promise call
          Promise.resolve(module[name](...v[2])).then(arg => {
            this.invokeRemoteCallback(resolve, arg);
          }, arg => {
            this.invokeRemoteCallback(reject, arg);
          });
        }
      });
    };
  }

  // local modules


  // remote modules, name as key, methods/constants as value


  // saved callback for promise call


  install(worker = global) {
    if (this.remote) {
      throw new Error('Bridge cannot install multi times!');
    }
    worker.onmessage = this.processMessage;
    this.remote = worker;

    this.modules.forEach((module, moduleId) => {
      this.callRemoteVoid(0, 1, moduleId, module.name, module.constants, module.__methods);
    });

    return this.callRemotePromise(0, 2);
  }

  callRemoteVoid(moduleId, methodId, ...args) {
    this.remote.postMessage([[moduleId, methodId, args]]);
  }

  callRemotePromise(moduleId, methodId, ...args) {
    return new Promise((resolve, reject) => {
      const id = this.callbackId;
      this.callbacks[this.callbackId++] = resolve;
      this.callbacks[this.callbackId++] = reject;
      this.remote.postMessage([[moduleId, methodId, args, [id, id + 1]]]);
    });
  }

  invokeRemoteCallback(callbackId, arg) {
    this.callRemoteVoid(0, 0, callbackId, arg);
  }

  invokeCallback(callbackId, arg) {
    const callback = this.callbacks[callbackId];
    if (true) {
      if (!callback) {
        console.error('Internal error: callback maybe called multi times.');
        return;
      }
    }
    delete this.callbacks[callbackId];
    delete this.callbacks[callbackId ^ 1];
    callback(arg);
  }

  addRemoteModule(moduleId, name, constants, methods) {
    const mod = this.remoteModules[name] = {};
    if (constants) {
      Object.assign(mod, constants);
    }
    if (methods) {
      methods.forEach(([name, async], methodId) => {
        mod[name] = (...args) => {
          if (async) {
            return this.callRemotePromise(moduleId, methodId, ...args);
          } else {
            this.callRemoteVoid(moduleId, methodId, ...args);
          }
        };
      });
    }
  }

  // Wait remote initial ready.

  ping() {}

  addModule(module) {
    const moduleId = this.modules.length;
    this.modules.push(module);
    if (this.remote) {
      this.callRemoteVoid(0, 1, moduleId, module.name, module.constants, module.__methods);
    }
  }
}, (_applyDecoratedDescriptor(_class.prototype, 'invokeCallback', [__WEBPACK_IMPORTED_MODULE_0__Module__["c" /* method */]], Object.getOwnPropertyDescriptor(_class.prototype, 'invokeCallback'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addRemoteModule', [__WEBPACK_IMPORTED_MODULE_0__Module__["c" /* method */]], Object.getOwnPropertyDescriptor(_class.prototype, 'addRemoteModule'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'ping', [__WEBPACK_IMPORTED_MODULE_0__Module__["d" /* asyncMethod */]], Object.getOwnPropertyDescriptor(_class.prototype, 'ping'), _class.prototype)), _class);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ortho2D */
/* harmony export (immutable) */ __webpack_exports__["d"] = translate2D;
/* harmony export (immutable) */ __webpack_exports__["b"] = scale2D;
/* unused harmony export rotate2DCalced */
/* harmony export (immutable) */ __webpack_exports__["c"] = rotate2D;
/* unused harmony export transpose2D */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatrixStack; });
/**
 * Created by tdzl2003 on 3/24/17.
 */

const identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
/* unused harmony export identity */


function ortho2D(width, height, x, y) {
  return [2 / width, 0, 0, 0, 0, -2 / height, 0, 0, 0, 0, 1, 0, -x / width * 2, y / height * 2, 0, 1];
}

//(x,y,z,w)*M*A == (x+dx,y+dy,z+dz, w)*A
//M =
//  1  0  0  0
//  0  1  0  0
//  0  0  1  0
// dx dy dz  1

function translate2D(m, dx, dy) {
  for (let i = 0; i < 4; i++) {
    m[12 + i] += m[i] * dx + m[4 + i] * dy;
  }
}

//(x,y,z,w)*M*A == (x*sx,y*sy,z*dz, w)*A
//M =
// sx  0  0  0
//  0 sy  0  0
//  0  0 sz  0
//  0  0  0  1
//let A = M*A

function scale2D(m, sx, sy) {
  for (let i = 0; i < 4; i++) {
    m[i] *= sx;
    m[4 + i] *= sy;
  }
}

//(x,y,z,w)*M*A == (x*cos-y*sin, y*cos+x*sin, z, w)*A
//M =
// cos -sin  0 0
// sin  cos  0 0
//   0    0  1 0
//   0    0  0 1

function rotate2DCalced(m, cos, sin) {
  for (let i = 0; i < 4; i++) {
    let v1 = cos * m[i] - sin * m[4 + i];
    let v2 = sin * m[i] + cos * m[4 + i];
    m[i] = v1;
    m[4 + i] = v2;
  }
}

function rotate2D(m, rad) {
  rotate2DCalced(m, Math.cos(rad), Math.sin(rad));
}

function transpose2D(m, x, y) {
  const x1 = x * m[0] + y * m[4] + m[12];
  const y1 = x * m[1] + y * m[5] + m[13];
  const w = x * m[3] + y * m[7] + m[15];
  return [x1 / w, y1 / w];
}

let MatrixStack = class MatrixStack {
  constructor() {
    this.values = [];
  }

  reset() {
    this.values.splice(0, this.values.length);
  }
  get top() {
    if (this.values.length === 0) {
      return identity;
    }
    return this.values[this.values.length - 1];
  }
  pushOrtho2D(width, height, x, y) {
    this.values.push(ortho2D(width, height, x, y));
  }
  push() {
    this.values.push(this.top);
  }
  pop() {
    return this.values.pop();
  }
  transpose2D(x, y) {
    return transpose2D(this.top, x, y);
  }
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uimanager_index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BatchDraw2D__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AssetsManager__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Effect__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_matrix__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Texture__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GLNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GLContainer; });
/* unused harmony export GLSurface */
var _dec, _class3;

/**
 * Created by tdzl2003 on 2017/3/19.
 */







let GLNode = class GLNode extends __WEBPACK_IMPORTED_MODULE_0__uimanager_index__["c" /* NativeComponent */] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.prevSibling = null, this.nextSibling = null, this.parentNode = null, _temp;
  }

  mount(parentNode, before) {
    if (true) {
      if (this.parentNode) {
        console.error('Mount before unmounted.');
      }
    }
    this.parentNode = parentNode;
    parentNode.insertBefore(this, before);
  }

  unmount() {
    this.parentNode.removeChild(this);
  }

  renderGL(gl) {
    // Override me.
  }
};

let GLContainer = class GLContainer extends GLNode {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), this.firstChild = null, this.lastChild = null, _temp2;
  }

  appendChild(child) {
    this.insertBefore(child, null);
  }

  insertBefore(child, before) {
    if (true) {
      if (before && before.parentNode !== this) {
        console.error('Before is not child of this.');
      }
    }
    const after = before ? before.prevSibling : this.lastChild;
    if (after) {
      after.nextSibling = child;
      child.prevSibling = after;
    } else {
      this.firstChild = child;
    }
    if (before) {
      before.prevSibling = child;
      child.nextSibling = before;
    } else {
      this.lastChild = child;
    }

    child.parentNode = this;
  }

  removeChild(child) {
    if (true) {
      if (child.parentNode !== this) {
        console.error('removeChild target is not child of this.');
      }
    }

    const { nextSibling, prevSibling } = child;
    if (nextSibling) {
      nextSibling.prevSibling = child.prevSibling;
      child.nextSibling = null;
    } else {
      this.lastChild = prevSibling;
    }

    if (prevSibling) {
      prevSibling.nextSibling = child.nextSibling;
      child.prevSibling = null;
    } else {
      this.firstChild = nextSibling;
    }

    child.parentNode = null;
  }

  renderGL(gl) {
    for (let l = this.firstChild; l; l = l.nextSibling) {
      l.renderGL(gl);
    }
  }
};

let GLSurface = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__uimanager_index__["a" /* nativeComponent */])('gl-surface'), _dec(_class3 = class GLSurface extends __WEBPACK_IMPORTED_MODULE_0__uimanager_index__["d" /* NativeElementComponent */] {

  constructor(id, eventId) {
    super(id, eventId, 'canvas');
    this.renderTimer = null;
    this.container = new GLContainer();

    this.performRender = () => {
      if (this.reactId !== null) {
        this.renderTimer = requestAnimationFrame(this.performRender);
        this.renderGL(this.gl);
      }
    };
  }

  mount(parentNode, before) {
    super.mount(parentNode, before);

    if (!this.gl) {
      this.initGL();
      this.performRender();
    }
  }

  unmount() {
    super.unmount();
    this.gl.destroyed = true;
    this.gl = null;
  }

  initGL() {
    const canvas = this.el;
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const ratio = window.devicePixelRatio || 1;

    const { offsetWidth, offsetHeight } = this.el;

    const width = this.el.width = offsetWidth * ratio | 0;
    const height = this.el.height = offsetHeight * ratio | 0;

    this.sendEvent('surfaceCreated', {
      width: offsetWidth,
      height: offsetHeight,
      ratio
    });

    if (true) {
      global.gl = gl;
    }

    // If we don't have a GL context, give up now
    if (!gl) {
      console.error('Unable to initialize WebGL. Your browser may not support it.');
    }

    this.gl = gl;

    gl.effectManager = new __WEBPACK_IMPORTED_MODULE_2__AssetsManager__["a" /* default */](__WEBPACK_IMPORTED_MODULE_3__Effect__["a" /* default */]);
    gl.imageTextureManager = new __WEBPACK_IMPORTED_MODULE_2__AssetsManager__["a" /* default */](__WEBPACK_IMPORTED_MODULE_5__Texture__["a" /* ImageTexture */]);

    gl.matrixStack = new __WEBPACK_IMPORTED_MODULE_4__common_matrix__["a" /* default */]();
    gl.painter2d = new __WEBPACK_IMPORTED_MODULE_1__BatchDraw2D__["a" /* default */](gl);
  }

  renderGL(gl) {
    const { offsetWidth, offsetHeight } = this.el;
    const ratio = window.devicePixelRatio || 1;
    const width = offsetWidth * ratio | 0;
    const height = offsetHeight * ratio | 0;
    if (width !== this.el.width || height !== this.el.height) {
      this.el.width = width;
      this.el.height = height;
      this.sendEvent('sizeChanged', {
        width: offsetWidth,
        height: offsetHeight,
        ratio
      });
    }
    if (true) {
      gl.viewport(0, 0, width, height);
      gl.clearColor(0.0, 0.0, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    this.container.renderGL(gl);

    gl.painter2d.flush(gl);
  }

  appendChild(child) {
    this.container.appendChild(child);
  }

  insertBefore(el, before) {
    this.container.insertBefore(el, before);
  }

  removeChild(child) {
    this.container.removeChild(child);
  }
}) || _class3);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GLSurface__ = __webpack_require__(6);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__GLSurface__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__GLSurface__["a"]; });
/**
 * Created by tdzl2003 on 2017/3/18.
 */



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uimanager__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_glsurface_native__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_stage2d__ = __webpack_require__(17);
/**
 * Created by tdzl2003 on 2017/3/16.
 */





/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  streams: [{
    name: 'vertex',
    size: 2
  }, null, {
    name: 'diffuse',
    size: 4
  }],
  passes: [{
    vs: __webpack_require__(20),
    fs: __webpack_require__(19)
  }]
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  streams: [{
    name: 'vertex',
    size: 2
  }, {
    name: 'texcoord',
    size: 2
  }, {
    name: 'diffuse',
    size: 4
  }],
  passes: [{
    vs: __webpack_require__(22),
    fs: __webpack_require__(21)
  }]
};

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BatchDraw2D; });
/**
 * Created by tdzl2003 on 2017/3/19.
 */

const CAPACITY_NAMES = {
  maxElementsIndecies: 'MAX_ELEMENTS_INDICES',
  maxElementsVerticies: 'MAX_ELEMENTS_VERTICES'
};

const DEFAULT_CAPACITY = {
  maxElementsIndecies: 8192,
  maxElementsVerticies: 4096
};

const VERTEX_ATTRIBUTE_LOCATION = {
  VERTEX: 0,
  TEXCOORD: 1,
  DIFFUSE: 2
};

const VERTEX_FORMAT_SIZE = [2, // VERTEX,
2, // TEXCOORD,
4];

const MAX_VERTEX_ELEMENT_SIZE = VERTEX_FORMAT_SIZE.reduce((a, b) => a + b);

const VERTEX_FORMAT_BIT = [0, // VERTEX, always true.
1 << 0, // TEXCOORD
1 << 1];

// vertex buffer
// diffuse buffer
// texcoord buffer

let BatchDraw2D = class BatchDraw2D {

  // dependencies


  // buffers:
  constructor(gl) {
    this.caps = {};
    this.mode = 0;
    this.format = 0;
    this.effect = null;
    this.texture = null;
    this.maxVertexBufferSize = 0;
    this.maxIndeciesBufferSize = 0;
    this.vertexBuffer = null;
    this.vertexBufferData = null;
    this.vertexBufferCount = 0;
    this.indeciesBuffer = null;
    this.indeciesBufferData = null;
    this.indeciesBufferCount = 0;
    this.baseEffect = null;
    this.baseEffectWithTexture = null;

    for (const key of Object.keys(CAPACITY_NAMES)) {
      this.caps[key] = gl.getParameter(gl[CAPACITY_NAMES[key]]) || DEFAULT_CAPACITY[key];
    }

    if (true) {
      console.log('CAPS: ', JSON.stringify(this.caps));
    }

    this.maxVertexBufferSize = Math.min(4096, this.caps.maxElementsVerticies);
    this.vertexBufferData = new Float32Array(this.maxVertexBufferSize * MAX_VERTEX_ELEMENT_SIZE);
    this.maxIndeciesBufferSize = Math.min(8192, this.caps.maxElementsIndecies);
    this.indeciesBufferData = new Uint16Array(this.maxIndeciesBufferSize);

    this.vertexBuffer = gl.createBuffer();
    this.indeciesBuffer = gl.createBuffer();

    this.baseEffect = gl.effectManager.obtain(gl, 'base');
    this.baseEffectWithTexture = gl.effectManager.obtain(gl, 'baseWithTexture');
  }

  drawRect(gl, x, y, w, h, r = 0, g = 0, b = 0, a = 1) {
    this.prepare(gl, 4, 6, gl.TRIANGLES, 2, this.baseEffect);
    const baseId = this.vertexBufferCount;
    let base = baseId * 6;
    let idxBase = this.indeciesBufferCount;
    this.vertexBufferCount += 4;
    this.indeciesBufferCount += 6;

    const xs = [x, x + w, x, x + w];
    const ys = [y, y, y + h, y + h];

    for (let i = 0; i < 4; i++) {
      const [rx, ry] = gl.matrixStack.transpose2D(xs[i], ys[i]);
      this.vertexBufferData[base++] = rx;
      this.vertexBufferData[base++] = ry;
      this.vertexBufferData[base++] = r;
      this.vertexBufferData[base++] = g;
      this.vertexBufferData[base++] = b;
      this.vertexBufferData[base++] = a;
    }

    this.indeciesBufferData[idxBase++] = baseId;
    this.indeciesBufferData[idxBase++] = baseId + 1;
    this.indeciesBufferData[idxBase++] = baseId + 2;
    this.indeciesBufferData[idxBase++] = baseId + 2;
    this.indeciesBufferData[idxBase++] = baseId + 1;
    this.indeciesBufferData[idxBase++] = baseId + 3;
  }

  drawTexture(gl, texture, x, y, w, h, tx, ty, tw, th, r = 0, g = 0, b = 0, a = 1) {
    this.prepare(gl, 4, 6, gl.TRIANGLES, 3, this.baseEffectWithTexture, texture);
    const baseId = this.vertexBufferCount;
    let base = baseId * 8;
    let idxBase = this.indeciesBufferCount;
    this.vertexBufferCount += 4;
    this.indeciesBufferCount += 6;

    const xs = [x, x + w, x, x + w];
    const ys = [y, y, y + h, y + h];

    const txs = [tx, tx + tw, tx, tx + tw];
    const tys = [ty, ty, ty + th, ty + th];

    for (let i = 0; i < 4; i++) {
      const [rx, ry] = gl.matrixStack.transpose2D(xs[i], ys[i]);
      this.vertexBufferData[base++] = rx;
      this.vertexBufferData[base++] = ry;
      this.vertexBufferData[base++] = txs[i];
      this.vertexBufferData[base++] = tys[i];
      this.vertexBufferData[base++] = r;
      this.vertexBufferData[base++] = g;
      this.vertexBufferData[base++] = b;
      this.vertexBufferData[base++] = a;
    }

    this.indeciesBufferData[idxBase++] = baseId;
    this.indeciesBufferData[idxBase++] = baseId + 1;
    this.indeciesBufferData[idxBase++] = baseId + 2;
    this.indeciesBufferData[idxBase++] = baseId + 2;
    this.indeciesBufferData[idxBase++] = baseId + 1;
    this.indeciesBufferData[idxBase++] = baseId + 3;
  }

  prepare(gl, eleCnt, idxCount, mode, format, effect, texture = null) {
    if (mode !== this.mode || format !== this.format || effect !== this.effect || texture !== this.texture) {
      this.flush(gl);
      this.mode = mode;
      this.format = format;
      this.effect = effect;
      this.texture = texture;
    } else if (eleCnt + this.vertexBufferCount > this.maxVertexBufferSize || idxCount + this.indeciesBufferCount > this.maxIndeciesBufferSize) {
      this.flush(gl);
    }
  }

  flush(gl) {
    if (this.indeciesBufferCount === 0) {
      return;
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    // commit buffer data
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertexBufferData, gl.DYNAMIC_DRAW);

    if (this.texture !== null) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      this.effect.setParameter1i(gl, 'sampler', 0);
    } else {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }

    let totalSize = 0;

    for (let i = 0; i < 3; i++) {
      if ((this.format & VERTEX_FORMAT_BIT[i]) === VERTEX_FORMAT_BIT[i]) {
        totalSize += VERTEX_FORMAT_SIZE[i];
      }
    }

    let offset = 0;

    for (let i = 0; i < 3; i++) {
      if ((this.format & VERTEX_FORMAT_BIT[i]) === VERTEX_FORMAT_BIT[i]) {
        gl.enableVertexAttribArray(i);
        gl.vertexAttribPointer(i, VERTEX_FORMAT_SIZE[i], gl.FLOAT, false, totalSize * 4, offset * 4);
        offset += VERTEX_FORMAT_SIZE[i];
      } else {
        gl.disableVertexAttribArray(i);
      }
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indeciesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indeciesBufferData, gl.DYNAMIC_DRAW);
    // this.effect.drawArrays(this.mode, 0, 3);
    this.effect.drawElements(this.mode, this.indeciesBufferCount, gl.UNSIGNED_SHORT, 0);

    this.vertexBufferCount = 0;
    this.indeciesBufferCount = 0;

    this.texture = null;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AssetsManager__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Effect; });
/**
 * Created by tdzl2003 on 2017/3/19.
 */


let Effect = class Effect extends __WEBPACK_IMPORTED_MODULE_0__AssetsManager__["b" /* AssetType */] {

  constructor(gl, key) {
    super(gl);

    this.params = {};
    if (typeof key === 'string') {
      key = __webpack_require__(23)("./" + key + '.effect.js');
    }
    this.streams = key.streams;
    this.passes = key.passes.map((v, i) => this.loadPass(v, i));
  }

  loadPass(pass, passId) {
    const vs = this.loadShader(gl.VERTEX_SHADER, pass.vs);
    const fs = this.loadShader(gl.FRAGMENT_SHADER, pass.fs);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.deleteShader(vs);
    gl.attachShader(program, fs);
    gl.deleteShader(fs);
    for (let i = 0; i < this.streams.length; i++) {
      const stream = this.streams[i];
      if (stream) {
        gl.bindAttribLocation(program, i, stream.name);
      }
    }

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return;
    }

    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < uniformCount; i++) {
      const info = gl.getActiveUniform(program, i);
      const loc = gl.getUniformLocation(program, info.name);
      this.params[info.name] = this.params[info.name] || [];
      this.params[info.name][passId] = loc;
    }

    // bind streams.
    // gl.useProgram(program);
    return program;
  }

  loadShader(type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  drawArrays(mode, first, count) {
    if (gl.lastUsedEffect) {
      for (let i = this.streams.length; i < gl.lastUsedEffect.stream.length; i++) {
        gl.disableVertexAttribArray(i);
      }
    }
    for (const pass of this.passes) {
      gl.useProgram(pass);
      gl.drawArrays(mode, first, count);
    }
  }

  drawElements(mode, count, type, offset) {
    if (gl.lastUsedEffect && gl.lastUsedEffect !== this) {
      for (let i = this.streams.length; i < gl.lastUsedEffect.streams.length; i++) {
        gl.disableVertexAttribArray(i);
      }
    }
    for (const pass of this.passes) {
      gl.useProgram(pass);
      gl.drawElements(mode, count, type, offset);
    }
    gl.lastUsedEffect = this;
  }

  setParameter1i(gl, name, value) {
    const positions = this.params[name];
    if (positions) {
      for (let i = 0; i < this.passes.length; i++) {
        if (positions[i] !== undefined) {
          const pass = this.passes[i];
          gl.useProgram(pass);
          gl.uniform1i(positions[i], value);
        }
      }
    }
  }
};

;

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AssetsManager__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageTexture; });
/**
 * Created by tdzl2003 on 2017/3/19.
 */


function powerOfTwo(num) {
  if (num > 0) {
    num--;
    num |= num >> 1; //Or first 2 bits
    num |= num >> 2; //Or next 2 bits
    num |= num >> 4; //Or next 4 bits
    num |= num >> 8; //Or next 8 bits
    num |= num >> 16; //Or next 16 bits
    num++;
  }

  return num;
}

let ImageTexture = class ImageTexture extends __WEBPACK_IMPORTED_MODULE_0__AssetsManager__["b" /* AssetType */] {

  constructor(gl, uri) {
    super(gl);
    this.info = null;
    this.uri = uri;
  }

  load(gl) {
    this.texture = gl.createTexture();

    const image = new Image();
    image.src = this.uri;
    image.onload = () => {
      if (this.texture) {
        const { width, height } = image;
        const texWidth = powerOfTwo(width);
        const texHeight = powerOfTwo(height);

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        if (texWidth === width && texHeight === height) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        } else {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texWidth, texHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
          gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        const err = gl.getError();
        if (err) {
          console.warn(`Load texture error: ${err}`);
        }

        if (true) {
          console.log(`Texture loaded: ${this.uri} ${width}x${height} (${texWidth}x${texHeight})`);
        }
        this.info = {
          width,
          height,
          texWidth,
          texHeight
        };
      }
    };
  }

  get loaded() {
    return !!this.info;
  }

  unload(gl) {
    gl.deleteTexture(this.texture);
    this.texture = null;
    this.info = null;
  }
};;

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_glsurface_native_GLSurface__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uimanager__ = __webpack_require__(1);
/* unused harmony export BasicAnimation */
var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

/**
 * Created by tdzl2003 on 3/26/17.
 */




function setAnimationInterval(onFrame) {
  let timer;
  function nextFrame() {
    if (timer !== null) {
      setNextFrame();
      onFrame();
    }
  }
  function setNextFrame() {
    timer = requestAnimationFrame(nextFrame);
  }
  setNextFrame();
  return () => {
    cancelAnimationFrame(timer);
    timer = null;
  };
}

let BasicAnimation = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_uimanager__["a" /* nativeComponent */])('gl-2d-basic-animation'), _dec(_class = (_class2 = class BasicAnimation extends __WEBPACK_IMPORTED_MODULE_0_glsurface_native_GLSurface__["a" /* GLNode */] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.texture = null, this.uri = null, this.currentFrame = 0, this.disposeTimer = null, this._interval = 0, this._animationData = null, _initDefineProp(this, 'r', _descriptor, this), _initDefineProp(this, 'g', _descriptor2, this), _initDefineProp(this, 'b', _descriptor3, this), _initDefineProp(this, 'a', _descriptor4, this), _initDefineProp(this, 'tileW', _descriptor5, this), _initDefineProp(this, 'tileH', _descriptor6, this), _initDefineProp(this, 'columns', _descriptor7, this), this.onFrame = () => {
      if (++this.currentFrame >= this._animationData.length) {
        this.currentFrame = 0;
      }
    }, _temp;
  }

  // 有多少列

  set interval(value) {
    this._interval = value;
    this.resetTimer();
  }

  set animationData(value) {
    this._animationData = value;
    this.resetTimer();
  }

  resetTimer() {
    if (this.disposeTimer !== null) {
      this.disposeTimer();
    }
    this.currentFrame = 0;
    if (this._interval > 0) {
      const timer = setInterval(this.onFrame, this._interval);
      this.disposeTimer = () => {
        clearInterval(timer);
      };
    } else {
      this.disposeTimer = setAnimationInterval(this.onFrame);
    }
  }

  set src(value) {
    this.releaseTexture();
    this.uri = value;
  }

  unmount() {
    this.releaseTexture();
    if (this.disposeTimer) {
      this.disposeTimer();
      this.disposeTimer = null;
    }
  }

  releaseTexture() {
    if (this.texture) {
      this.texture.release();
      this.texture = null;
    }
  }

  renderGL(gl) {
    if (!this.texture && this.uri) {
      this.texture = gl.imageTextureManager.obtain(gl, this.uri);
    }
    if (!this.texture.loaded || !this._animationData || this.currentFrame >= this._animationData.length) {
      return;
    }
    const frameId = this._animationData[this.currentFrame];
    const tx = this.tileW * (frameId % this.columns);
    const ty = this.tileH * (frameId / this.columns | 0);

    gl.painter2d.drawTexture(gl, this.texture.texture, -0.5, -0.5, 1, 1, tx, ty, this.tileW, this.tileH, this.r, this.g, this.b, this.a);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'r', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'g', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'b', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'a', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'tileW', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'tileH', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'columns', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, 'interval', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], Object.getOwnPropertyDescriptor(_class2.prototype, 'interval'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'animationData', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], Object.getOwnPropertyDescriptor(_class2.prototype, 'animationData'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'src', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], Object.getOwnPropertyDescriptor(_class2.prototype, 'src'), _class2.prototype)), _class2)) || _class);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_glsurface_native__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uimanager__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_glsurface_common_matrix__ = __webpack_require__(5);
/* unused harmony export GLLayer */
/* unused harmony export GLNode2D */
/* unused harmony export GLRect */
/* unused harmony export GLImage */
var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _dec2, _class4, _desc2, _value2, _class5, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _dec3, _class7, _desc3, _value3, _class8, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _dec4, _class10, _desc4, _value4, _class11, _descriptor18, _descriptor19, _descriptor20, _descriptor21;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

/**
 * Created by tdzl2003 on 3/26/17.
 */





let GLLayer = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_uimanager__["a" /* nativeComponent */])('gl-2d-layer'), _dec(_class = (_class2 = class GLLayer extends __WEBPACK_IMPORTED_MODULE_0_glsurface_native__["a" /* GLContainer */] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), _initDefineProp(this, 'x', _descriptor, this), _initDefineProp(this, 'y', _descriptor2, this), _initDefineProp(this, 'width', _descriptor3, this), _initDefineProp(this, 'height', _descriptor4, this), _temp;
  }

  renderGL(gl) {
    gl.matrixStack.pushOrtho2D(this.width, this.height, this.x, this.y);
    super.renderGL(gl);
    gl.matrixStack.pop();
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'x', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'y', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'width', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 2;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'height', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 2;
  }
})), _class2)) || _class);

let GLNode2D = (_dec2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_uimanager__["a" /* nativeComponent */])('gl-2d-node'), _dec2(_class4 = (_class5 = class GLNode2D extends __WEBPACK_IMPORTED_MODULE_0_glsurface_native__["a" /* GLContainer */] {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), _initDefineProp(this, 'x', _descriptor5, this), _initDefineProp(this, 'y', _descriptor6, this), _initDefineProp(this, 'rotate', _descriptor7, this), _initDefineProp(this, 'scaleX', _descriptor8, this), _initDefineProp(this, 'scaleY', _descriptor9, this), _temp2;
  }

  renderGL(gl) {
    const { matrixStack } = gl;
    matrixStack.push();
    const { top } = matrixStack;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_glsurface_common_matrix__["b" /* scale2D */])(top, this.scaleX, this.scaleY);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_glsurface_common_matrix__["c" /* rotate2D */])(top, this.rotate);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_glsurface_common_matrix__["d" /* translate2D */])(top, this.x, this.y);

    super.renderGL(gl);
    matrixStack.pop();
  }
}, (_descriptor5 = _applyDecoratedDescriptor(_class5.prototype, 'x', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, 'y', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, 'rotate', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, 'scaleX', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, 'scaleY', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
})), _class5)) || _class4);

let GLRect = (_dec3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_uimanager__["a" /* nativeComponent */])('gl-2d-rect'), _dec3(_class7 = (_class8 = class GLRect extends __WEBPACK_IMPORTED_MODULE_0_glsurface_native__["b" /* GLNode */] {
  constructor(...args) {
    var _temp3;

    return _temp3 = super(...args), _initDefineProp(this, 'x', _descriptor10, this), _initDefineProp(this, 'y', _descriptor11, this), _initDefineProp(this, 'w', _descriptor12, this), _initDefineProp(this, 'h', _descriptor13, this), _initDefineProp(this, 'r', _descriptor14, this), _initDefineProp(this, 'g', _descriptor15, this), _initDefineProp(this, 'b', _descriptor16, this), _initDefineProp(this, 'a', _descriptor17, this), _temp3;
  }

  renderGL(gl) {
    gl.painter2d.drawRect(gl, this.x, this.y, this.w, this.h, this.r, this.g, this.b, this.a);
  }
}, (_descriptor10 = _applyDecoratedDescriptor(_class8.prototype, 'x', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class8.prototype, 'y', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class8.prototype, 'w', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class8.prototype, 'h', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class8.prototype, 'r', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class8.prototype, 'g', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class8.prototype, 'b', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class8.prototype, 'a', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
})), _class8)) || _class7);

let GLImage = (_dec4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_uimanager__["a" /* nativeComponent */])('gl-2d-image'), _dec4(_class10 = (_class11 = class GLImage extends GLRect {
  constructor(...args) {
    var _temp4;

    return _temp4 = super(...args), this.texture = null, this.uri = null, _initDefineProp(this, 'tx', _descriptor18, this), _initDefineProp(this, 'ty', _descriptor19, this), _initDefineProp(this, 'tw', _descriptor20, this), _initDefineProp(this, 'th', _descriptor21, this), _temp4;
  }

  set src(value) {
    this.releaseTexture();
    this.uri = value;
  }

  unmount() {
    this.releaseTexture();
  }

  releaseTexture() {
    if (this.texture) {
      this.texture.release();
      this.texture = null;
    }
  }

  renderGL(gl) {
    if (!this.texture && this.uri) {
      this.texture = gl.imageTextureManager.obtain(gl, this.uri);
    }
    if (this.texture.loaded) {
      gl.painter2d.drawTexture(gl, this.texture.texture, this.x, this.y, this.w, this.h, this.tx, this.ty, this.tw, this.th, this.r, this.g, this.b, this.a);
    }
  }
}, (_descriptor18 = _applyDecoratedDescriptor(_class11.prototype, 'tx', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class11.prototype, 'ty', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class11.prototype, 'tw', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class11.prototype, 'th', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _applyDecoratedDescriptor(_class11.prototype, 'src', [__WEBPACK_IMPORTED_MODULE_1_uimanager__["b" /* prop */]], Object.getOwnPropertyDescriptor(_class11.prototype, 'src'), _class11.prototype)), _class11)) || _class10);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geometry__ = __webpack_require__(16);
/* unused harmony reexport namespace */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BasicAnimation__ = __webpack_require__(15);
/* unused harmony reexport BasicAnimation */
/**
 * Created by tdzl2003 on 3/26/17.
 */






/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bridge_Bridge__ = __webpack_require__(4);
/**
 * Created by tdzl2003 on 2017/3/14.
 */


const bridge = global.__bridgeServer = new __WEBPACK_IMPORTED_MODULE_0_bridge_Bridge__["default"]();

__webpack_require__(8);

if (global.Worker) {
  const w = new Worker('/react-game-engine-experimental/ww.bundle.js');
  bridge.install(w);
  console.log('Server installed.');
} else {
  __webpack_require__.e/* require.ensure */(0).then((() => {
    __webpack_require__(11);
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "varying lowp vec4 vDiffuse;\n\nvoid main(void) {\n    gl_FragColor = vDiffuse;\n}\n"

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 vertex;\nattribute vec4 diffuse;\n\nvarying lowp vec4 vDiffuse;\n\nvoid main(void) {\n    vDiffuse = diffuse;\n    gl_Position = vec4(vertex, 0.0, 1.0);\n}"

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "varying mediump vec2 vTexcoord;\nvarying lowp vec4 vDiffuse;\n\nuniform sampler2D sampler;\n\nvoid main(void) {\n    gl_FragColor = texture2D(sampler, vTexcoord) * vDiffuse;\n}\n"

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 vertex;\nattribute vec2 texcoord;\nattribute vec4 diffuse;\n\nvarying mediump vec2 vTexcoord;\nvarying lowp vec4 vDiffuse;\n\nvoid main(void) {\n    vTexcoord = texcoord;\n    vDiffuse = diffuse;\n    gl_Position = vec4(vertex, 0.0, 1.0);\n}"

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./base.effect.js": 9,
	"./baseWithTexture.effect.js": 10
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 23;

/***/ })
/******/ ]);
//# sourceMappingURL=index.bundle.js.map