import redis from 'redis';
import Promise from 'bluebird';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let handled = false;

const connection = redis.createClient({
  url: `redis://${__REDIS_HOST__}:${__REDIS_PORT__}`,
  prefix: 'api'
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
