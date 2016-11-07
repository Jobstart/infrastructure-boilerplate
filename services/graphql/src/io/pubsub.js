import { RedisPubSub } from 'graphql-redis-subscriptions';

import {
  REDIS_HOST,
  REDIS_PORT
} from '../../config/environment';

const connection = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  prefix: 'graphql-pubsub',
  enable_offline_queue: false
};

const pubsub = new RedisPubSub({
  connection
});

export default pubsub;
