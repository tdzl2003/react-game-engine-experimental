/**
 * Created by tdzl2003 on 2017/3/14.
 */

import Koa from 'koa';

const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello server';
});

app.listen(3000);

