import sourceMapSupport from 'source-map-support';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import banner from './banner';

import * as envr from '../environment';

sourceMapSupport.install({
  environment: 'node',
  hookRequire: true
});


const globals = {
  ...Object.keys(envr).reduce((globals, key) => ({
    ...globals,
    [`__${key.toUpperCase()}__`]: envr[key]
  })),
  __CLIENT__: false,
  __SERVER__: true,
  __PRODUCTION__: true,
  __DEV__: false,
  'process.env': {
    NODE_ENV: 'production'
  }
};


const config = {
  target: 'node',
  cache: false,
  context: __dirname,
  debug: false,
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    '../../src/server'
  ],
  output: {
    path: `${__dirname}/../../dist`,
    filename: 'server.js'
  },
  plugins: [
    new webpack.DefinePlugin(globals),
    new webpack.BannerPlugin(banner, { raw: true, entryOnly: false })
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpg|gif|ico)?$/,
      loader: 'url?limit=30000'
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
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
        'isomorphic-style',
        'css?modules&sourceMap',
        'postcss'
      ]
    }],
    postLoaders: [],
    noParse: /\.min\.js/
  },
  externals: [
    nodeExternals({
      whitelist: [
        'webpack/hot/poll?1000'
      ]
    })
  ],
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      'dist'
    ],
    extensions: ['', '.json', '.js']
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
};

export default config;
module.exports = config; //needed for webpack (uses commonjs require)
