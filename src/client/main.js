/**
 * Created by tdzl2003 on 2017/3/16.
 */

import { observable } from 'mobx';
import { observer } from 'mobx-react/custom';
import { Component, renderRoot, createJSX } from 'react';

@observer
class App extends Component {
  @observable
  surfaceInfo = {};

  onSizeChanged = info => {
    console.log(`GLSurface Size: ${info.width}x${info.height} Ratio: ${info.ratio}`)
    this.surfaceInfo = info;
  };

  render() {
    const { width, height } = this.surfaceInfo;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <gl-surface
          style={{
            width: '100%',
            height: '100%',
          }}
          onSurfaceCreated={this.onSizeChanged}
          onSizeChanged={this.onSizeChanged}
        >
          <gl-2d-layer width={2} height={2/width*height}>
            {/*<gl-2d-node rotate={Math.PI/4}>*/}
              <gl-2d-image x={-0.5} y={-0.5} w={1} h={1} src={require('./assets/images/chicken.png')}/>
              {/*<gl-2d-rect x={-0.25} y={-0.75} w={0.5} h={1.5} g={1} a={0.3}/>*/}
              {/*<gl-2d-rect x={-0.75} y={-0.25} w={1.5} h={0.5} r={1} b={1} a={0.6}/>*/}
            {/*</gl-2d-node>*/}
          </gl-2d-layer>
        </gl-surface>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>

        </div>
      </div>
    );
  }
}

const mount = renderRoot(
  <App />
);
