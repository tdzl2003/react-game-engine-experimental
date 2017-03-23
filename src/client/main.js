/**
 * Created by tdzl2003 on 2017/3/16.
 */

import { observable } from 'mobx';
import { observer } from 'mobx-react/custom';
import { Component, renderRoot, createJSX } from 'react';

function App() {
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
        onSurfaceCreated={(ev) => {console.log('onSurfaceCreated', ev)}}
        onSizeChanged={(ev) => {console.log('onSizeChanged', ev)}}
      >
        <gl-2d-rect x={-0.5} y={-0.5} w={1} h={1} r={1}/>
        <gl-2d-rect x={-0.25} y={-0.75} w={0.5} h={1.5} g={1}/>
        <gl-2d-rect x={-0.75} y={-0.25} w={1.5} h={0.5} r={1} b={1}/>
        {/*<gl-2dnode x={100} y={100} rotation={0.4}>*/}
          {/*<gl-2dimage source={require('./sprite.img')} />*/}
          {/*<gl-2dnode x={100} y={100} rotation={0.4}>*/}
            {/*<gl-2dtext>*/}
              {/*角色名*/}
            {/*</gl-2dtext>*/}
          {/*</gl-2dnode>*/}
        {/*</gl-2dnode>*/}
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

const mount = renderRoot(
  <App />
);
