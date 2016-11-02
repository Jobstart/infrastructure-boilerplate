import { RedisPubSub } from 'graphql-redis-subscriptions';

const connection = {
  host: __REDIS_HOST__,
  port: __REDIS_PORT__,
  prefix: 'api-pubsub',
  enable_offline_queue: false
};

const pubsub = new RedisPubSub({
  connection
});

export default pubsub;
