/**
 * Created by tdzl2003 on 2017/3/14.
 */

import Bridge from 'bridge/Bridge';
const bridge = global.__bridgeServer = new Bridge();

require('./libs/nativeModules');

if (global.Worker) {
  const w = new Worker('/ww.bundle.js');
  bridge.install(w);
  console.log('Server installed.');
} else {
  require.ensure([], () => {
    require('./client/entry');
  });
}
