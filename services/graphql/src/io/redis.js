import redis from 'redis';
import Promise from 'bluebird';

import {
  REDIS_HOST,
  REDIS_PORT
} from '../../config/environment';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let handled = false;

const connection = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  prefix: 'graphql',
  enable_offline_queue: false
});

export default connection;

export const connectionPromise = new Promise((resolve, reject) => {
  connection.on('ready', () => {
    if (!handled) {
      handled = true;
      return resolve(connection);
    }
  });
  connection.on('error', (e) => {
    if (!handled) {
      handled = true;
      return reject(e);
    }
  });
});
