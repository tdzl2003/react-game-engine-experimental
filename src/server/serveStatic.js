/**
 * Created by tdzl2003 on 2017/3/15.
 */

import KoaStatic from 'koa-static';

export function install(app) {
  app.use(KoaStatic(`./build/${__DEV__ ? 'debug' : 'release'}/web`, {
    defer: true,
  }));
}