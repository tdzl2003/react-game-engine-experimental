/**
 * Created by tdzl2003 on 2017/3/14.
 */

import Koa from 'koa';

const app = new Koa();

if (__DEV__) {
  require('./server/serveStatic').install(app);
}

app.listen(3000, () => {
  console.log('Ready.');
});
