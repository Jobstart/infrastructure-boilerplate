import React from 'react';
import { render } from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Client as SubClient } from 'subscriptions-transport-ws';
import { ApolloProvider } from 'react-apollo';
import routesFactory from 'routes';
import addGraphQLSubscriptions from 'lib/subscriptions';

const subClient = new SubClient(__WS_FQDN__);

const networkInterface = createNetworkInterface({
  uri: `${__API_FQDN__}/graphql`,
  opts: {
    credentials: 'same-origin'
  }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  subClient,
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: window.__INITIAL_STATE__
});

const { renderContext, routes } = routesFactory();

const root = document.getElementById('root');

render((
  <ApolloProvider client={client}>
    {routes}
  </ApolloProvider>
), document.getElementById('root'));
