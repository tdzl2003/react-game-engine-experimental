/**
 * Created by tdzl2003 on 2017/3/15.
 */

import Module, { serverModule, method, asyncMethod } from '../bridge/Module';

let postEvent = function (id, name, ev) {
  // Should have remote event here.
  const { remoteModules: {
    UIEventEmitter,
  }  } = global.__bridgeServer;

  postEvent = function(id, name, ev) {
    UIEventEmitter.emit(id, name);
  };
  return postEvent.call(this, id, name, ev);
}

function updateProps(view, props) {
  for (const key of Object.keys(props)) {
    const value = props[key];

    switch (key) {
      case 'style': {
        for (const name of Object.keys(value)) {
          let styleValue = value[name];
          if (typeof(styleValue) === 'number') {
            styleValue = `${styleValue}px`;
          }
          view.style[name] = styleValue;
        }
        break;
      }
      case 'events': {
        for (const name of Object.keys(value)) {
          const eventKey = `${id}.name`;
          let eventName = name;
          let useCapture = false;
          if (eventName.substr(-7) === 'Capture') {
            eventName = eventName.substr(0, eventName.length - 7);
            useCapture = true;
          }

          if (value[name]) {
            // add listener.
            const f = ev => postEvent.call(view, id, name, ev);
            this.eventRegistry[eventKey] = f;
            view.addEventListener(eventName.toLowerCase(), f, useCapture);
          } else {
            // remove listener
            const f = this.eventRegistry[eventKey];
            delete this.eventRegistry[eventKey];
            view.removeEventListener(eventName.toLowerCase(), f);
          }
        }
        break;
      }
      default:{
        if (value === null) {
          view.removeAttribute(key);
        } else {
          view.setAttribute(key, value);
        }
        break;
      }
    }
  }
}

export class NativeComponent {
  reactId = null;
  events = {};

  constructor(id) {
    this.reactId = id;
  }

  sendEvent(eventName, ...args) {
    const { remoteModules: {
      UIEventEmitter,
    }  } = global.__bridgeServer;
    const v = this.events[eventName];
    if (v) {
      UIEventEmitter.emit(this.reactId, eventName, ...args);
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

  mount(parentNode, before) {
  }

  unmount() {

  }

  setAttribute(key, value) {
  }
}

export class NativeElementComponent extends NativeComponent {
  el = null;

  constructor(id) {
    super(id);

    this.el = this.createElement();
    if (__DEV__) {
      this.el.setAttribute('data-react-id', this.reactId);
    }
  }

  createElement() {
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
        case 'style': {
          this.updateStyle(value);
          break;
        }
        case 'events': {
          for (const name of Object.keys(value)) {
            if (value[name]) {
              this.events[name] = true;
            } else {
              delete this.events[name];
            }
          }
          break;
        }
        default:{
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
      if (typeof(styleValue) === 'number') {
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
}

export function nativeComponent(name) {
  return target => {
    UIManager.instance.nativeComponents[name] = target;
  };
}

export function prop(target, name, args) {
  const defaultValue = args.value || (args.initializer && args.initializer());
  const clazz = target.constructor;

  if (clazz.hasOwnProperty('propFields')){
    clazz.propFields[name] = true;
  } else {
    Object.defineProperty(clazz, 'propFields', {
      configurable: true,
      enumerable: false,
      value: {
        ...clazz.__proto__.propFields,
        [name]: true
      },
    })
  }

  if (clazz.hasOwnProperty('defaultProps')){
    clazz.defaultProps[name] = defaultValue;
  } else {
    Object.defineProperty(clazz, 'defaultProps', {
      configurable: true,
      enumerable: false,
      value: {
        ...clazz.__proto__.defaultProps,
        [name]: defaultValue
      },
    })
  }
}

@serverModule
export default class UIManager extends Module {
  nativeComponents = {};

  viewRegistry = [];

  eventRegistry = {};

  @method
  createView(id, container, initialProps, tagName, before) {
    const Clazz = this.nativeComponents[tagName];
    if (Clazz) {
      const el = new Clazz(id);
      this.viewRegistry[id] = el;
      el.setViewProps(initialProps);
      this.mountView(container, before, el);
      return;
    }
    const el = document.createElement(tagName);
    updateProps(el, initialProps);
    this.mountView(container, before, el);
    this.viewRegistry[id] = el;

    if (__DEV__) {
      el.setAttribute('data-react-id', id);
    }
  }

  @method
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
    switch (typeof(container)) {
      case 'number':
        parent = this.viewRegistry[container];
        break;
      case 'object': // include null
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

  @method
  createTextNode(id, container, value, before) {
    const el = document.createTextNode(value);
    this.mountView(container, before, el);
    this.viewRegistry[id] = el;
  }

  @method
  updateTextNode(id, value) {
    const el = this.viewRegistry[id];
    el.data = value;
  }

  @method
  createEmptyNode(id, container, before) {
    const el = __DEV__ ? document.createComment(`react-id=${id}`) : document.createComment();
    this.mountView(container, before, el);
    this.viewRegistry[id] = el;
  }

  @method
  setViewProps(id, props) {
    const view = this.viewRegistry[id];
    if (view instanceof NativeComponent) {
      view.setViewProps(props);
      return;
    }
    updateProps(view, props);
  }

  @asyncMethod
  destroyView(id, parent) {
    const view = this.viewRegistry[id];
    const parentNode = typeof(parent) === 'number' ? this.viewRegistry[id] : view.parentNode;
    if (view instanceof NativeComponent) {
      view.unmount();
    } else {
      parentNode.removeChild(view);
    }
    delete this.viewRegistry[id];
  }
}

