import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Client as SubClient } from 'subscriptions-transport-ws';
import addGraphQLSubscriptions from 'lib/subscriptions';
import defaultState from 'defaultState';

import logMiddleware from 'middleware/log';
import graphqlErrorMiddleware from 'middleware/graphqlError';

const getRootReducer = ({ apolloClient }) => combineReducers({
  apollo: apolloClient.reducer()
});

const getMiddlewareStoreEnhancer = ({ apolloClient }) => applyMiddleware(
  logMiddleware,
  apolloClient.middleware(),
  graphqlErrorMiddleware
);

export default (req = {}, { GRAPHQL_FQDN, WS_FQDN, INITIAL_STATE }) => {

  const dataIdFromObject = (inst) => inst.id || inst._id;

  const networkInterface = __CLIENT__ ? addGraphQLSubscriptions(createNetworkInterface({
    uri: `${GRAPHQL_FQDN}/graphql`,
    opts: {
      credentials: 'same-origin'
    }
  }), new SubClient(WS_FQDN)) : createNetworkInterface({
    uri: `${GRAPHQL_FQDN}/graphql`,
    credentials: 'same-origin',
    headers: req.headers
  });

  const ssrMode = __CLIENT__ ? false : true;

  const apolloClient = new ApolloClient({
    networkInterface,
    dataIdFromObject,
    initialState,
    ssrMode
  });

  const middlewareStoreEnhancer = getMiddlewareStoreEnhancer({
    apolloClient
  });

  const storeEnhancer = __CLIENT__ ? compose(
    middlewareStoreEnhancer,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) : compose(
    middlewareStoreEnhancer
  );

  const rootReducer = getRootReducer({
    apolloClient
  });

  const initialState = INITIAL_STATE || defaultState;

  const store = createStore(
    rootReducer,
    initialState,
    storeEnhancer
  );

  return {
    apolloClient,
    store
  };
}
