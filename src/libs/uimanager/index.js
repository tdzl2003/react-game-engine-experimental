/**
 * Created by tdzl2003 on 2017/3/15.
 */

import Module, { serverModule, method, asyncMethod } from '../bridge/Module';

@serverModule
class UIManager extends Module {
  name = "UIManager";

  viewRegistry = [];

  @method
  createView(id, container, tagName) {
    const el = document.createElement(tagName);
    const parent = container === null ? document.body : this.viewRegistry[container];
    parent.appendChild(el);
    this.viewRegistry[id] = el;

    if (__DEV__) {
      el.setAttribute('data-react-id', id);
    }
  }

  @method
  setViewProps(id, props) {
    const view = this.viewRegistry[id];
    for (const key of Object.keys(props)) {
      if (key === 'style') {
        const value = props[key];
        for (const name of Object.keys(value)) {
          view.style[name] = value[name];
        }
      } else {
        view.setAttribute(key, props[key]);
      }
    }
  }
}

