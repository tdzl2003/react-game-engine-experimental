/**
 * Created by tdzl2003 on 2017/3/14.
 */

const webpack = require('webpack');
const ENV = process.env['WEBPACK_ENV'];
const __DEV__ = ENV === 'development';

const path = require('path');

module.exports = {
  entry: {
    index: './src/index',
  },
  output: {
    path: path.resolve(__dirname, `../build/${__DEV__ ? 'debug' : 'release'}/server`), // string
    filename: __DEV__ ? '[name].bundle.js' : '[name].[hash].js', // string
    publicPath: '/', // string
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
        options: {
          presets: [],
        },
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.server.js', '.js', '.json', '.jsx', '.css'],
    alias: {},
  },
  externals: {
    koa: 'commonjs koa',
    'koa-static': 'commonjs koa-static',
    'koa-router': 'commonjs koa-router',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(__DEV__),
      __CLIENT__: "false",
      __SERVER__: "true",
      __WEBWORKER__: "false",
    }),
  ],
  devtool: 'source-map', // enum
  context: path.resolve(__dirname, '..'),
  target: 'node',
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },
};
