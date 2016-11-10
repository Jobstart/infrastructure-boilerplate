import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import routesFactory from 'routes';
import { Router, match, browserHistory as history } from 'react-router';
import getStore from 'store';

const { GRAPHQL_FQDN, WS_FQDN, ASSETS_FQDN, INITIAL_STATE, ROOT_ID } = window.cfg;

__webpack_public_path__ = __PRODUCTION__ ? `${ASSETS_FQDN}/${__BUILD_STAMP__}/` : `${ASSETS_FQDN}/`;

const { store, apolloClient: client } = getStore(null, {
  GRAPHQL_FQDN,
  WS_FQDN,
  INITIAL_STATE
});

const { routes } = routesFactory();

match({ history, routes}, (err, redirectLocation, renderProps) => {
  render((
    <ApolloProvider store={store} client={client}>
      <Router {...renderProps}/>
    </ApolloProvider>
  ), document.getElementById(ROOT_ID));
});
