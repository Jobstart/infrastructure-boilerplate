import React from 'react';
import Promise from 'bluebird';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { getDataFromTree, renderToStringWithData } from 'react-apollo/server';
import { match, RouterContext } from 'react-router';
import ReactDOMServer from 'react-dom/server';

import routesFactory from 'routes';
import Html from 'components/common/html';

import { API_FQDN } from '../config/environment';

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

    const { redirectLocation, renderProps } = await matchAsync({ routes: routes, location: req.originalUrl });

    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search);
    }

    const client = new ApolloClient({
      ssrMode: true,
      networkInterface: createNetworkInterface({
        uri: `${API_FQDN}/graphql`,
        credentials: 'same-origin',
        headers: req.headers
      })
    });

    const root = (
      <ApolloProvider client={client}>
        <RouterContext {...renderProps} />
      </ApolloProvider>
    );

    const initialState = (await getDataFromTree(root)).store.getState();

    const content = ReactDOMServer.renderToString(root);

    //const { markup: content, initialState } = await renderToStringWithData(root);

    console.log(content);

    console.log(initialState);

    const html = <Html content={content} state={initialState} style={__PRODUCTION__ ? renderContext.getCssString() : ''} {...initialState.pageInformation}/>

    const markup = `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`;

    setTimeout(() => res.status(200).send(markup), 2500);
  } catch (e) {
    console.trace(e);
    next(e);
  }
}
