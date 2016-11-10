import { graphqlExpress } from 'graphql-server-express';
import _ from 'underscore';
import logger from 'io/logger';

import schema from 'schema';
import getConnectors from 'connectors';

const middleware = graphqlExpress(async (req) => ({
  schema,
  context: {
    user: req.user || null,
    connectors: await getConnectors(req.user)
  },
  formatError: (err) => {
    if (!_.isFunction(err.serialize)) return err;
    return err.serialize();
  }
}));

export default middleware;
