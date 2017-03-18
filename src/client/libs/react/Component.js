/**
 * Created by tdzl2003 on 2017/3/17.
 */

// No state!

const scheduleUpdateComponents = [];

let scheduleUpdateTimer = null;

function scheduleUpdate(component) {
  scheduleUpdateComponents.push(component);
  if (!scheduleUpdateTimer) {
    scheduleUpdateTimer = setTimeout(() => {
      scheduleUpdateTimer = null;
      const components = scheduleUpdateComponents.splice(0);
      for (const comp of components) {
        if (comp.mount) {
          comp._willUpdate = false;
          comp.componentWillUpdate(comp.props);
          comp.mount.update(comp.render());
          comp.componentDidUpdate(comp.props);
        }
      }
    });
  }
}

export default class Component {
  mount = null;
  props = null;

  _willUpdate = false;

  constructor(props, children) {
    this.props = props;
  }

  // methods:
  forceUpdate() {
    console.log('Here');
    if (!this._willUpdate) {
      this._willUpdate = true;
      scheduleUpdate(this);
    }
  }

  //life-cycle methods.
  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(newProps) {

  }

  shouldComponentUpdate(newProps) {
    return true;
  }

  componentWillUpdate(newProps) {

  }

  componentDidUpdate() {

  }

  //render() {}  should be implemented.
}

