/**
 * Created by tdzl2003 on 2017/3/16.
 */

import renderRoot from './render';
import createJSX from './createJSX';
import * as Children from './Children';
import Component from './Component';

export const createElement = createJSX;
export {
  Children,
  Component,

  renderRoot,
  createJSX,
};

export default {
  Children,
  Component,

  renderRoot,
  createJSX,
  createElement: createJSX,
};
