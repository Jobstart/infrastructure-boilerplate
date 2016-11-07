import { graphqlExpress } from 'graphql-server-express';
import logger from 'io/logger';

import schema from 'schema';
import getConnectors from 'connectors';

const middleware = graphqlExpress(async (req) => ({
  schema,
  context: {
    user: req.user || null,
    connectors: await getConnectors(req.user),
  },
  formatError: (err) => {
    logger.trace(err);
    return err;
  }
}));

export default middleware;
