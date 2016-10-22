import { apolloExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import { logger } from 'io';

import resolvers from 'resolvers/index';
import typeDefs from 'schemas/index';

import { userResolver } from 'resolvers';
import getConnectors from 'connectors';

const allowUndefinedInResolve = false;

const resolverValidationOptions = {
  requireResolversForArgs: true,
  requireResolversForNonScalar: true
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  allowUndefinedInResolve,
  logger,
  resolverValidationOptions
});

const getContext = ({ user }) => ({
  user: user || null,
  connectors: getConnectors(user)
});

const middleware = apolloExpress(req => ({
  schema,
  context: getContext(req)
}));

export default middleware;
