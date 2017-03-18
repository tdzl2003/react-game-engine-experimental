/**
 * Created by tdzl2003 on 2017/3/16.
 */

import { observable } from 'mobx';
import { observer } from 'mobx-react/custom';
import { Component, renderRoot, createJSX } from 'react';

@observer
class Foo extends Component {
  @observable
  value = 0;

  onClick = () => {
    this.value ++;
  };

  render() {
    return (
      <div onClickCapture={this.onClick}>
        {this.value}
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
