import { SubscriptionManager } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import url from 'url';
import schema from 'schema';
import { UserConnector } from 'connectors';
import { tokenToObject } from 'lib/crypto';
import getConnectors from 'connectors';
import pubsub from 'io/pubsub';

import { setupFunctions } from 'resolvers';

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions
});

let server = null;

const onSubscribe = async (msg, params, req) => {
  let user = null;
  try {
    const { query: { token = null } } = url.parse(req.url, true);
    if (token) {
      const { _id } = await tokenToObject(token);
      user = await UserConnector.getByID(_id);
    }
  } catch (e) {}

  return {
    ...params,
    context: {
      user,
      connectors: getConnectors(user)
    }
  };
};

export default (httpServer) => {
  if (!server) {
    server = new SubscriptionServer({
      subscriptionManager,
      onSubscribe
    }, httpServer);
  }
};
