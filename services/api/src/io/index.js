import Promise from 'bluebird';
import logger from 'io/logger';
import redisConnection, { connectionPromise as redisConnectionPromise } from 'io/redis';
import { mongoConnectionPromise } from 'io/mongo';
import { listen as httpListen, app, server } from 'io/http';

const ioConnectedPromise = Promise.all([
  redisConnectionPromise,
  mongoConnectionPromise
])
.then(() => Promise.all([
  httpListen
]));

export {
  ioConnectedPromise,
  redisConnection,
  logger,
  app,
  server
};
