/**
 * Created by tdzl2003 on 2017/3/16.
 */
import { UIManager } from 'bridge/NativeModules';

import { map } from './Children';
import Component from './Component';
import Module, {clientModule, method} from "../bridge/Module";

const {
  createView,
  moveView,
  setViewProps,
  destroyView,    // for element & text & empty node.

  createTextNode,
  updateTextNode,

  createEmptyNode,
} = UIManager;

let viewIdCounter = 0;

const viewIdRecycler = [];
const viewRegistry = [];

@clientModule
class UIEventEmitter extends Module {

  @method
  emit(id, name, ...args) {
    const mount = viewRegistry[id];
    if (!mount/* || !mount.jsx*/) {
      return;
    }
    const backName = name.replace(/^[a-z]/, v=>`on${v.toUpperCase()}`);
    const {props} = mount.jsx;
    const callback = props && props[backName];
    if (callback && callback.call) {
      callback.apply(null, args);
    }
  }
}

function allocViewId() {
  if (viewIdCounter.length > 0) {
    return viewIdCounter.pop();
  }
  return ++viewIdCounter;
}

const TextNode = {};
const EmptyNode = {};

function getType(jsx) {
  if (typeof jsx === 'string' || typeof jsx === 'number') {
    return TextNode;
  }
  if (jsx === null) {
    return EmptyNode;
  }
  return jsx.type;
}

const isEventReg = /^on([A-Z])/;

function wrapEventName(key) {
  return key.replace(isEventReg, (m, v) => v.toLowerCase());
}

function compareProps(newProps, oldProps, blacklist = EmptyNode) {
  const diff = { };
  let haveDiff = false;

  const events = {};
  let haveEvents = false;

  if (newProps) {
    for (const key of Object.keys(newProps)) {
      if (isEventReg.test(key)) {
        if (!oldProps || oldProps[key] == null) {
          // added event listener.
          events[wrapEventName(key)] = true;
          haveEvents = true;
        }
      } else if (newProps[key] !== (oldProps && oldProps[key]) && !blacklist[key]) {
        diff[key] = newProps[key];
        haveDiff = true;
      }
    }
  }
  if (oldProps) {
    for (const key of Object.keys(oldProps)) {
      if (isEventReg.test(key)) {
        if (!newProps || newProps[key] == null) {
          // removed event listener.
          events[wrapEventName(key)] = false;
          haveEvents = true;
        }
      } else if ((!newProps || newProps[key] == null) && !blacklist[key]) {
        diff[key] = null;
        haveDiff = true;
      }
    }
  }
  if (haveEvents) {
    haveDiff = true;
    diff.events = events;
  }
  return haveDiff ? diff : null;
}

function blacklistProps(props, blacklist) {
  const ret = {};
  let haveProp = false;
  const events = {};
  let haveEvents = false;

  if (props) {
    for (const key of Object.keys(props)) {
      if (!blacklist[key]) {
        if (isEventReg.test(key)) {
          events[wrapEventName(key)] = true;
          haveEvents = true;
        } else {
          ret[key] = props[key];
          haveProp = true;
        }
      }
    }
  }
  if (haveEvents) {
    haveProp = true;
    ret.events = events;
  }
  return haveProp ? ret : null;
}

function unmountAllChildren(container, children) {
  for (const child of children) {
    child.unmount();
  }
  children.splice(0); // .clear();
}

function lis_algorithm(arr) {
  const p = arr.slice(0);
  const result = [0];
  let i;
  let j;
  let u;
  let v;
  let c;
  const len = arr.length;

  for (i = 0; i < len; i++) {
    let arrI = arr[i];

    if (arrI === -1) {
      continue;
    }

    j = result[result.length - 1];
    if (arr[j] < arrI) {
      p[i] = j;
      result.push(i);
      continue;
    }

    u = 0;
    v = result.length - 1;

    while (u < v) {
      c = ((u + v) / 2) | 0;
      if (arr[result[c]] < arrI) {
        u = c + 1;
      } else {
        v = c;
      }
    }

    if (arrI < arr[result[u]]) {
      if (u > 0) {
        p[i] = result[u - 1];
      }
      result[u] = i;
    }
  }

  u = result.length;
  v = result[u - 1];

  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }

  return result;
}

function getChildrenMap(children, newChildren) {
  const targets = [];
  {
    // 计算每个组件对应的原下标。
    const keys = {};
    const noKeys = [];

    for (let i = 0; i < newChildren.length; i++) {
      const child = newChildren[i];
      const key = child.key;
      if (key) {
        keys[key] = i;
      } else {
        noKeys.push(i);
      }
    }

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const key = child.key;
      if (key) {
        targets.push(keys[key] === undefined ? -1 : keys[key]);
      } else {
        const v = noKeys.shift();
        targets.push(v === undefined ? -1 : v);
      }
    }
  }
  return targets;
}

function updateChildrenArray(container, children, newChildrenJSX) {
  const oldChildren = [...children];
  const targets = getChildrenMap(children, newChildrenJSX);
  const sources = getChildrenMap(newChildrenJSX, children);

  // lis同时就是保留且不移动的下标
  const lis = lis_algorithm(sources);

  // 先移除所有要移除的节点
  for (let i = children.length - 1; i >= 0; i--) {
    if (targets[i] === -1) {
      children[i].unmount();
    }
  }

  children.splice(-1);

  // 从右侧开始整理所有的节点
  let lastMountId = null;

  for (let i = newChildrenJSX.length - 1; i >= 0; i--) {
    // 是否是直接更新的组件
    const jsx = newChildrenJSX[i];
    let mount = null;
    if (lis[lis.length - 1] === i) {
      // 不移动
      mount = oldChildren[sources[i]];
      lis.pop();
      mount.update(jsx);
    } else if (sources[i] >= 0) {
      mount = oldChildren[sources[i]];
      mount.moveTo(container, lastMountId);
      mount.update(jsx);
    } else {
      mount = new ReactMount();
      mount.mount(jsx, container, lastMountId);
    }

    lastMountId = mount.nativeId;
    children[i] = mount;
  }
}

function updateChildren(container, children, _newChildrenJSX) {

  // 目标是个数组。
  let newChildrenJSX = _newChildrenJSX;

  if (Array.isArray(newChildrenJSX)) {
    newChildrenJSX = newChildrenJSX.filter(v => (v!== false && v != null));
    if (newChildrenJSX.length <= 1) {
      newChildrenJSX = newChildrenJSX[0];
    }
  }

  if (newChildrenJSX === false || newChildrenJSX == null) {
    // no children after update.
    if (children.length) {
      unmountAllChildren(container, children);
    }
  } else if (!children.length) {
    // no children before update.
    if (!Array.isArray(newChildrenJSX)) {
      const ret = new ReactMount();
      ret.mount(newChildrenJSX, container);
      children.push(ret);
    } else {
      let lastMounted = null;
      for (const child of newChildrenJSX) {
        const ret = new ReactMount();
        ret.mount(child, container);
        if (lastMounted) {
          lastMounted.setBefore(ret.nativeId);
        }
        lastMounted = ret;
        children.push(ret);
      }
    }
  } else if (!Array.isArray(newChildrenJSX)){
    let mount = null;
    if (newChildrenJSX.key) {
      // 有key，直接找到对应的节点来update。找不到就重新创建。
      mount = children.find(v => v.key === newChildrenJSX.key) || new ReactMount();
    } else {
      const type = getType(newChildrenJSX);
      if (type === TextNode) {
        // 文本，优先寻找完全一样的，减少更新。
        mount = children.find(v => v.jsx === newChildrenJSX);
      }
      // 随便找一个可用于更新的节点。
      mount = mount || children.find(v => !v.key);
    }

    mount = mount || new ReactMount();

    for (const child of children) {
      if (child !== mount) {
        child.unmount();
      }
    }
    children.splice(0); // .clear();
    children.push(mount);
    mount.update(newChildrenJSX);
  } else {
    // 目标是个数组了。
    updateChildrenArray(container, children, newChildrenJSX);
  }
}

export class ReactMount {
  // null if mount to document.body, or number if mount to other dom.
  // or string which presents a query selector.
  container = null;

  before = null;

  nativeId = null;

  // will be object if component, or number if dom
  instance = null;

  // last updated jsx.
  jsx = null;

  children = null;

  constructor(nativeId) {
    if (nativeId !== undefined) {
      this.nativeId = nativeId;
    } else {
      this.nativeId = allocViewId();
    }
  }

  get key() {
    if (!this.jsx) {
      return undefined;
    }
    return this.jsx.key;
  }

  mount(jsx, container = null, before = null) {
    this.container = container;
    this.before = before;

    let type = getType(jsx);

    while (typeof type === 'function' && !(type.prototype instanceof Component)) {
      // stateless functional component
      jsx = type(jsx.props);
      type = getType(jsx);
    }

    if (type === TextNode) {
      createTextNode(this.nativeId, container, jsx, before);
    } else if (type === EmptyNode) {
      createEmptyNode(this.nativeId, container, before);
    } else if (typeof(type) === 'string') {
      viewRegistry[this.nativeId] = this;
      // dom
      const setProps = blacklistProps(jsx.props, {
        children: true,
        ref: true,
        key: true,
      });
      createView(this.nativeId, container, setProps, jsx.type, before);
      // if (setProps) {
      //   setViewProps(this.nativeId, setProps);
      // }
      let last = null;
      this.children = map(jsx.props.children, jsx => {
        const ret = new ReactMount();
        ret.mount(jsx, this.nativeId);
        if (last) {
          last.setBefore(ret.nativeId);
        }
        last = ret;
        return ret;
      });
    } else {
      // composite component
      this.instance = new jsx.type(jsx.props);
      this.instance.componentWillMount();
      // rendered composite component use same native Id with parent component.
      this.instance.mount = new ReactMount(this.nativeId);
      this.instance.mount.mount(this.instance.render(), container, before);
      this.instance.componentDidMount();
    }

    this.jsx = jsx;
  }

  unmount(recycle = true) {
    const type = getType(this.jsx);
    if (typeof type === 'string') {
      delete viewRegistry[this.nativeId];
      unmountAllChildren(this.nativeId, this.children);
    }
    if (typeof type !== 'function') {
      const p = destroyView(this.nativeId, this.container);
      if (recycle) {
        p.then(() => {
          // 得到主线程回复才认为真正销毁成功，回收对应视图Id。
          viewIdRecycler.push(this.nativeId);
        })
      }
    } else {
      // composite components
      this.instance.componentWillUnmount();
      this.instance.mount.unmount();
      this.instance = null;
    }
    this.jsx = null;
  }

  update(newJsx) {
    let type = getType(newJsx);
    if (type !== getType(this.jsx) || newJsx.key !== this.jsx.key) {
      this.unmount(false);
      this.mount(newJsx, this.container, this.before);
      return false;
    }
    while (typeof type === 'function' && !(type.prototype instanceof Component)) {
      // stateless functional component
      newJsx = type(newJsx.props);
      type = getType(newJsx);
    }

    if (type === TextNode) {
      updateTextNode(this.nativeId, newJsx);
    } else if (type === EmptyNode) {
      // Do nothing for empty node.
    } else if (typeof type === 'string') {
      const diffStyle = compareProps(newJsx.props && newJsx.props.style, this.jsx.props && this.jsx.props.style);
      let diffProps = compareProps(newJsx.props, this.jsx.props, {
        children: true,
        ref: true,
        key: true,
        style: true,
      });

      if (diffStyle) {
        diffProps = diffProps || {};
        diffProps.style = diffStyle;
      }
      if (diffProps) {
        setViewProps(this.nativeId, diffProps);
      }
      updateChildren(this.nativeId, this.children, newJsx.props.children);
    } else {
      // composite component
      this.instance.componentWillReceiveProps(newJsx.props);
      if (this.instance.shouldComponentUpdate(newJsx.props)) {
        this.instance.componentWillUpdate(newJsx.props);
        this.instance.props = newJsx.props;
      } else {
        this.instance.props = newJsx.props;
      }
    }
    this.jsx = newJsx;
    return true;
  }

  moveTo(container, before) {
    if (this.instance) {
      this.instance.mount.moveTo(container, before);
    } else {
      moveView(this.nativeId, container, before);
    }

    this.container = container;
    this.before = before;
  }

  // 仅在尾部节点后面又插入节点的额情况下用
  setBefore(before) {
    if (this.instance) {
      this.instance.mount.setBefore(before);
    }
    this.before = before;
  }
}

export default function renderRoot(jsx, container = null) {
  const { type, props } = jsx;

  const ret = new ReactMount();
  ret.mount(jsx, container);
  return ret;
}
