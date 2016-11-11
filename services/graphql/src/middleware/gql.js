import { graphqlExpress } from 'graphql-server-express';
import _ from 'underscore';
import logger from 'io/logger';
import { formatError } from 'apollo-errors';

import schema from 'schema';
import getConnectors from 'connectors';

const middleware = graphqlExpress(async (req) => ({
  schema,
  formatError,
  context: {
    user: req.user || null,
    connectors: await getConnectors(req.user)
  }
}));

export default middleware;
