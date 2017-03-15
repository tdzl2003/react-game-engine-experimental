/**
 * Created by tdzl2003 on 2017/3/15.
 */

import Bridge from './Bridge';

export function install(worker) {
  if (global.__reactBridgeServer) {
    throw new Error('Only one react bridge should be created!');
  }
  global.__reactBridgeServer = new Bridge();
  global.__reactBridgeServer.install(worker);
  console.log('Server installed.');
}
