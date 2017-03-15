/**
 * Created by tdzl2003 on 2017/3/15.
 */

export default class Module {
  constructor(bridge) {
    this.bridge = bridge;
  }
}

export function method(target, name, args) {
  if (target.hasOwnProperty('__methods')){
    target.__methods.push([name, false]);
  } else {
    Object.defineProperty(target, '__methods', {
      configurable: true,
      enumerable: false,
      value: [[name, false]],
    })
  }
}

export function asyncMethod(target, name, args) {
  if (target.hasOwnProperty('__methods')){
    target.__methods.push([name, true]);
  } else {
    Object.defineProperty(target, '__methods', {
      configurable: true,
      enumerable: false,
      value: [[name, true]],
    })
  }
}
