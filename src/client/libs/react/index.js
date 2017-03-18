/**
 * Created by tdzl2003 on 2017/3/16.
 */

import renderRoot from './render';
import createJSX from './createJSX';
import * as Children from './Children';
import Component from './Component';
import createClass from './createClass';

export const PropTypes = {
  func: {},
  object: {},
};
export const createElement = createJSX;
export {
  Children,
  Component,

  renderRoot,
  createJSX,
  createClass,
};

export default {
  Children,
  Component,
  PropTypes,

  renderRoot,
  createJSX,
  createElement: createJSX,
  createClass,
};
