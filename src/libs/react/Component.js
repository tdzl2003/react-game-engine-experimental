/**
 * Created by tdzl2003 on 2017/3/17.
 */

// No state!

const scheduleUpdateComponents = [];

let scheduleUpdateTimer = null;

function scheduleUpdate(component) {
  if (!scheduleUpdateTimer) {
    scheduleUpdateTimer = setTimeout(() => {
      scheduleUpdateTimer = null;
      const components = scheduleUpdateComponents.splice(0);
      for (const comp of components) {
        if (comp.mount) {
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

  constructor(props, children) {
    this.props = props;
  }

  // methods:
  forceUpdate() {
    if (this.mount) {
      this.componentWillUpdate(this.props);
      this.mount.update(this.render());
      this.componentDidUpdate(this.props);
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

