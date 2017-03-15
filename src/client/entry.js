/**
 * Created by tdzl2003 on 2017/3/15.
 */

const Bridge = require('bridge/Bridge').default;
const bridge = global.__bridgeClient = new Bridge();

if (__WEBWORKER__) {
  bridge.install(global).then(postInstall);
  console.log('Client installed on worker.');
} else {
  global.__bridgeServer.install({
    postMessage: data => bridge.processMessage({data}),
  })

  bridge.install({
    postMessage: data => global.__bridgeServer.processMessage({data}),
  }).then(postInstall);

  console.log('Server & Client installed on main');
}

function postInstall() {
  require('./main');
}
