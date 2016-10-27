import webpack from 'webpack';
import postCssPlugins from '../postcss/plugins';

import * as envr from '../environment';

const globals = {
  ...Object.keys(envr).reduce((globals, key) => ({
    ...globals,
    [`__${key.toUpperCase()}__`]: JSON.stringify(envr[key])
  }), {}),
  __CLIENT__: true,
  __SERVER__: false,
  __PRODUCTION__: true,
  __DEV__: false
};

const config = {
  target: 'web',
  cache: false,
  context: __dirname,
  debug: false,
  devtool: false,
  entry: [
    'babel-polyfill',
    '../../src/client'
  ],
  output: {
    path: `${process.cwd()}/dist`,
    filename: 'client.js',
    chunkFilename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin(globals),
    new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpg|gif|ico)?$/,
      loader: 'url?limit=30000'
    }, {
      test: /\.(mp3|wav)?$/,
      loader: 'url?limit=30000'
    }, {
      test: /\.(woff|woff2)$/,
      loader: 'url?prefix=font/&limit=5000'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'raw'
    }, {
      test: /\.css$/,
      loaders: [
        'isomorph-style',
        'css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss?sourceMap'
      ]
    }, {
      test: /\.(graphql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    }],
    postLoaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }],
    noParse: /\.min\.js/
  },
  resolve: {
    modulesDirectories: [
      'src',
      'dist',
      'node_modules',
      '../../common'
    ],
    extensions: ['', '.json', '.js']
  },
  postcss: postCssPlugins
};

export default config;
module.exports = config; //needed for webpack (uses commonjs require)
