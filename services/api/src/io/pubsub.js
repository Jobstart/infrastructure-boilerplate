import { RedisPubSub } from 'graphql-redis-subscriptions';

const triggerTransform = (trigger, {path}) => [trigger, ...path].join('.');

const connection = {
  url: `redis://${__REDIS_HOST__}:${__REDIS_PORT__}`,
  prefix: 'api',
  enable_offline_queue: false
};

const pubsub = new RedisPubSub({
  connection,
  triggerTransform
});

export default pubsub;
