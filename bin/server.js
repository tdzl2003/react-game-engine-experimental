
const env = process.env['SERVER_ENV'];
const __DEV__ = env === 'development';

if (__DEV__) {
  require('../build/debug/server/index.bundle');
} else {
  require('../build/release/server/index.bundle');
}
