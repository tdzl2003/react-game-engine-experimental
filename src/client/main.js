/**
 * Created by tdzl2003 on 2017/3/16.
 */

import { Component, renderRoot, createJSX } from 'react';

class Foo extends Component {
  state = 0;

  onClick = () => {
    this.state ++;
    this.forceUpdate();
  }

  render() {
    return (
      <div onClick={this.onClick}>
        {this.state}
      </div>
    );
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
        Hello, fuck
      </span>
    </div>
  );
}

const mount = renderRoot(
  <App />
);
