import React from 'react';
import Promise from 'bluebird';
import { ApolloProvider } from 'react-apollo';
import { renderToStringWithData } from 'react-apollo/server';
import { match, RouterContext, createMemoryHistory} from 'react-router';
import ReactDOMServer from 'react-dom/server';

import getStore from 'store';
import { trace } from 'io/logger';
import routesFactory from 'routes';
import Html from 'components/common/html';

import { GRAPHQL_FQDN } from '../config/environment';

function matchAsync (props) {
  return new Promise((resolve, reject) => match(props, (err, redirectLocation, renderProps) => {
    if (err) return reject(err);
    return resolve({
      redirectLocation: redirectLocation,
      renderProps: renderProps
    });
  }));
}


export default async function render (req, res, next) {
  try {
    const { renderContext, routes } = routesFactory();

    const location = req.originalUrl;

    const history = createMemoryHistory();

    const { redirectLocation, renderProps } = await matchAsync({ history, routes, location });

    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search);
    }

    const { store, apolloClient: client } = getStore(req, {
      GRAPHQL_FQDN
    });

    const root = (
      <ApolloProvider store={store} client={client}>
        <RouterContext {...renderProps} />
      </ApolloProvider>
    );

    const { markup: content, initialState } = await renderToStringWithData(root);

    const html = <Html content={content} state={initialState} style={__PRODUCTION__ ? renderContext.getCssString() : ''} {...initialState.pageInformation}/>

    const markup = `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`;

    res.status(200).send(markup);
  } catch (e) {
    trace(e);
    next(e);
  }
}
