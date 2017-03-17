/**
 * Created by tdzl2003 on 2017/3/17.
 */

export function map(children, func) {
  if (!children) {
    return [];
  }
  if (Array.isArray(children)) {
    return children.map(func);
  }
  return [func(children, 0)];
}

export function count(children) {
  if (!children) {
    return 0;
  }
  if (Array.isArray(children)) {
    return children.length;
  }
  return 1;
}
