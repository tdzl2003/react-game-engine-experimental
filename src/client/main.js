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
