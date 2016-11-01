import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SubscriptionManager } from 'graphql-subscriptions';

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

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    commentAdded: (options, args) => ({
      commentAdded: comment => comment.repository_name === args.repoFullName,
    }),
  },
});

export { subscriptionManager, pubsub };
