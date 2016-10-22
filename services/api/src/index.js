import express from 'express';
import Promise from 'bluebird';

import { logger, ioConnectedPromise, http } from 'io';

import router from 'router';

let r = router;

if (__DEV__) {
  if (module.hot) {
    logger.log('[HMR] Waiting for server-side updates');

    module.hot.accept('router', () => {
      r = require('router').default;
    });

    module.hot.addStatusHandler((status) => {
      if (status === 'abort') {
        process.nextTick(() => process.exit(0));
      }
    });
  }
}

async function main () {
  try {

    http.use((req, res, next) => r(req, res, next));

    await ioConnectedPromise;

    logger.log(`API listening on ${__HOSTNAME__}:${__PORT__}`);


  } catch (e) {
    logger.trace(e);
    process.exit(1);
  }
}

main();
