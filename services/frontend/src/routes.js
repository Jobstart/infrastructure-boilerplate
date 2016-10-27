import React from 'react';
import RenderContext from 'lib/isomorphic/renderContext';
import { Router, Route, Redirect } from 'react-router';

import { browserHistory } from 'react-router';
import { createMemoryHistory } from 'history';

import getApp from 'components/common/app';

import UsersTable from 'components/usersTable';

export default function routesFactory () {
  const renderContext = new RenderContext();

  const App = getApp(renderContext);

  const history = __SERVER__ ? createMemoryHistory() : browserHistory;

  const routes = (
    <Router history={history}>
      <Route component={App}>
        <Route path="/" component={UsersTable}/>
        <Redirect from="*" to="/"/>
      </Route>
    </Router>
  );

  return {
    renderContext,
    routes
  };
}
