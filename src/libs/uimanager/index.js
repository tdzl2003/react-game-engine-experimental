/**
 * Created by tdzl2003 on 2017/3/15.
 */

import Module, { serverModule, method, asyncMethod } from '../bridge/Module';

@serverModule
export default class UIManager extends Module {
  name = "UIManager";

  viewRegistry = [];

  @method
  createView(id, container, tagName, before) {
    const el = document.createElement(tagName);
    this.mountView(container, before, el);
    this.viewRegistry[id] = el;

    if (__DEV__) {
      el.setAttribute('data-react-id', id);
    }
  }

  @method
  moveView(id, container, before) {
    const el = this.viewRegistry[id];
    if (el.parentNode) {
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
  createEmptyNode(id, container) {
    const el = __DEV__ ? document.createComment(`react-id=${id}`) : document.createComment();
    this.mountView(container, before, el);
    this.viewRegistry[id] = el;
  }

  @method
  setViewProps(id, props) {
    const view = this.viewRegistry[id];
    for (const key of Object.keys(props)) {
      if (key === 'style') {
        const value = props[key];
        for (const name of Object.keys(value)) {
          let styleValue = value[name];
          if (typeof(styleValue) === 'number') {
            styleValue = `${styleValue}px`;
          }
          view.style[name] = styleValue;
        }
      } else if (props[key] === null) {
        view.removeAttribute(key);
      } else {
        view.setAttribute(key, props[key]);
      }
    }
  }

  @method
  destroyView(id) {
    const view = this.viewRegistry[id];
    view.parentNode.removeChild(view);
    delete this.viewRegistry[id];
  }
}

