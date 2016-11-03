import React from 'react';
import RenderContext from 'lib/isomorphic/renderContext';
import { Router, Route, Redirect } from 'react-router';

import getApp from 'components/common/app';

function getUsersTable (nextState, cb) {
  require.ensure([], function (require) {
    cb(null, require('components/usersTable').default);
  });
}

export default function routesFactory () {
  const renderContext = new RenderContext();

  const App = getApp(renderContext);

  const routes = (
    <Route component={App}>
      <Route path="/" getComponent={getUsersTable}/>
      <Redirect from="*" to="/"/>
    </Route>
  );

  return {
    renderContext,
    routes
  };
}
