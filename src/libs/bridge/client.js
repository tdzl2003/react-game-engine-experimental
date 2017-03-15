/**
 * Created by tdzl2003 on 2017/3/15.
 */

import Bridge from './Bridge';

export function install(worker) {
  if (global.__reactBridgeClient) {
    throw new Error('Only one react bridge should be created!');
  }
  global.__reactBridgeClient = new Bridge();
  global.__reactBridgeClient.install();
  console.log('Client installed.');
}