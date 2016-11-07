import { graphqlExpress } from 'graphql-server-express';
import logger from 'io/logger';

import schema from 'schema';
import getConnectors from 'connectors';

const getContext = ({ user }) => ({
  user: user || null,
  connectors: getConnectors(user)
});

const middleware = graphqlExpress(req => ({
  schema,
  context: getContext(req),
  formatError: (err) => {
    logger.trace(err);
    return err;
  }
}));

export default middleware;
