import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { Z_BEST_COMPRESSION } from 'zlib';

import renderer from './renderer';

let r = renderer;

const app = express();

if (__PRODUCTION__) {
  app.use('/*', compression({
    level: Z_BEST_COMPRESSION
  }));
}

app.use(cookieParser());

app.get('/*', (req, res, next) => {
  r(req, res, next);
});

app.listen(__PORT__, __HOSTNAME__);

if (__DEV__) {
  if (module.hot) {
    console.log('[HMR] Waiting for server-side updates');

    module.hot.accept('renderer.js', () => {
      r = require('renderer.js').default;
    });

    module.hot.addStatusHandler((status) => {
      if (status === 'abort') {
        process.nextTick(() => process.exit(0));
      }
    });
  }
}