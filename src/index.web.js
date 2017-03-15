/**
 * Created by tdzl2003 on 2017/3/14.
 */

if (global.Worker) {
  const w = new Worker('/ww.bundle.js');
  require('bridge/server').install(w);
} else {
  require.ensure([], () => {
    require('./client/main');
  });
}
