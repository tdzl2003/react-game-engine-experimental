/**
 * Created by tdzl2003 on 2017/3/18.
 */


import Component from './Component';

// don't autobind these methods since they already have guaranteed context.
const AUTOBIND_BLACKLIST = {
  constructor: 1,
  render: 1,
  shouldComponentUpdate: 1,
  componentWillReceiveProps: 1,
  componentWillUpdate: 1,
  componentDidUpdate: 1,
  componentWillMount: 1,
  componentDidMount: 1,
  componentWillUnmount: 1,
  componentDidUnmount: 1
};

function extend(base, props, all) {
  for (let key in props) {
    if (all === true || props[key] == null) {
      base[key] = props[key];
    }
  }
  return base;
}

function bindAll(ctx) {
  for (let i in ctx) {
    const v = ctx[i];
    if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST[i]) {
      (ctx[i] = v.bind(ctx)).__bound = true;
    }
  }
}

function collateMixins(mixins, keyed) {
  for (let i = 0, len = mixins.length; i < len; i++) {
    const mixin = mixins[i];

    // Surprise: Mixins can have mixins
    if (mixin.mixins) {
      // Recursively collate sub-mixins
      collateMixins(mixin.mixins, keyed);
    }

    for (let key in mixin) {
      if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
        (keyed[key] || (keyed[key] = [])).push(mixin[key]);
      }
    }
  }
  return keyed;
}

function multihook(inst, hooks, mergeFn) {
  return function() {
    let ret;

    for (let i = 0, len = hooks.length; i < len; i ++) {
      const hook = hooks[i];
      let r = hook.apply(this, arguments);

      if (mergeFn) {
        ret = mergeFn(ret, r);
      } else if (!isUndefined(r)) {
        ret = r;
      }
    }

    return ret;
  };
}

function mergeNoDupes(previous, current) {
  if (!isUndefined(current)) {
    if (!isObject(current)) {
      throw new Error('Expected Mixin to return value to be an object or null.');
    }

    if (!previous) {
      previous = {};
    }

    for (let key in current) {
      if (current.hasOwnProperty(key)) {
        if (previous.hasOwnProperty(key)) {
          throw new Error(`Mixins return duplicate key ${key} in their return values`);
        }

        previous[key] = current[key];
      }
    }
  }
  return previous;
}

function applyMixin(key, inst, mixin) {
  const hooks = isUndefined(inst[key]) ? mixin : mixin.concat(inst[key]);

  if (key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext') {
    inst[key] = multihook(inst, hooks, mergeNoDupes);
  } else {
    inst[key] = multihook(inst, hooks);
  }
}

function applyMixins(Cl, mixins) {
  for (let key in mixins) {
    if (mixins.hasOwnProperty(key)) {
      const mixin = mixins[key];

      let inst;

      if (key === 'getDefaultProps') {
        inst = Cl;
      } else {
        inst = Cl.prototype;
      }

      if (isFunction(mixin[0])) {
        applyMixin(key, inst, mixin);
      } else {
        inst[key] = mixin;
      }
    }
  }
}

export default function createClass(obj) {
  class Cl extends Component {
    static defaultProps;
    static displayName = obj.displayName || 'Component';
    static propTypes = obj.propTypes;
    static mixins = obj.mixins && collateMixins(obj.mixins);
    static getDefaultProps = obj.getDefaultProps;

    constructor(props, context) {
      super(props, context);
      bindAll(this);
    }

    replaceState(nextState, callback) {
      this.setState(nextState, callback);
    }

    isMounted() {
      return !this._unmounted;
    };

  }

  extend(Cl.prototype, obj);

  if (obj.statics) {
    extend(Cl, obj.statics);
  }

  if (obj.mixins) {
    applyMixins(Cl, collateMixins(obj.mixins));
  }

  Cl.defaultProps = Cl.getDefaultProps ? undefined : Cl.getDefaultProps();

  return Cl;
}