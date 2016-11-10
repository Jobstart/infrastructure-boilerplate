import Promise from 'bluebird';

import {
  logger,
  ioConnectedPromise,
  app,
  server as httpServer
} from 'io';

import {
  HOSTNAME,
  PORT
} from '../config/environment';

import router from 'router';
import connectSubscriptions from 'io/subscription';

let r = router;

process.on('uncaughtException', (err) => logger.trace('UncaughtException', err));
process.on('uncaughtRejection', (err) => logger.trace('UncaughtRejection', err));

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
    app.use((req, res, next) => r(req, res, next));

    await ioConnectedPromise;

    connectSubscriptions(httpServer);

    logger.log(`GraphQL listening on ${HOSTNAME}:${PORT}`);


  } catch (e) {
    logger.trace(e);
    process.exit(1);
  }
}

main();
