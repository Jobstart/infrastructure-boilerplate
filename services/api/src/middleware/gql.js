import { graphqlExpress } from 'graphql-server-express';

import schema from 'schema';
import getConnectors from 'connectors';

const getContext = ({ user }) => ({
  user: user || null,
  connectors: getConnectors(user)
});

const middleware = graphqlExpress(req => ({
  schema,
  context: getContext(req)
}));

export default middleware;
