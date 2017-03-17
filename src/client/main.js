/**
 * Created by tdzl2003 on 2017/3/16.
 */

import { Component, renderRoot, createJSX } from 'react';

class Foo extends Component {
  id = 0;

  componentWillMount() {
    this.timer = setInterval(() => {
      this.id ++;
      this.forceUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return this.id;
  }
}

function App() {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        border: 'solid 1px',
      }}
    >
      <span key="world">
        Hello, world
      </span>
        <span key="fuck">
        Hello, fuck
        <Foo />
      </span>
    </div>
  );
}

const mount = renderRoot(
  <App />
);
