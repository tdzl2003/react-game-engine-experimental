/**
 * Created by tdzl2003 on 2017/3/16.
 */

export default function createJSX(type, props) {
  props = props || {};
  if (arguments.length === 2) {
    // props.children = undefined;
  } else if (arguments.length === 3) {
    props.children = arguments[2];
  } else {
    props.children = Array.prototype.slice.call(arguments, 2);
  }
  let key = props ? props.key : undefined;
  if (key !== undefined && typeof(key) !== 'string') {
    key = `${key}`;
  }
  return {
    type,
    key,
    ref: props.ref,
    props,
  };
}
