import Promise from 'bluebird';

import {
  ioConnectedPromise,
  app,
  server as httpServer
} from 'io';

import { trace, log } from 'io/logger';

import {
  HOSTNAME,
  PORT
} from '../config/environment';

import router from 'router';
import connectSubscriptions from 'io/subscription';

let r = router;

process.on('uncaughtException', (err) => trace('UncaughtException', err));
process.on('uncaughtRejection', (err) => trace('UncaughtRejection', err));

if (__DEV__) {
  if (module.hot) {
    log('[HMR] Waiting for server-side updates');

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

    log(`GraphQL listening on ${HOSTNAME}:${PORT}`);


  } catch (e) {
    trace(e);
    process.exit(1);
  }
}

main();
