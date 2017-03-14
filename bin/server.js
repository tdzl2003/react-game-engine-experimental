
const env = process.env['SERVER_ENV'];
const __DEV__ = env === 'development';

if (__DEV__) {
  setTimeout(()=>{
    require('../build/debug/server/index.bundle');
  }, 1000);
} else {
  require('../build/release/server/index.bundle');
}
