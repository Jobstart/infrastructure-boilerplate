import { makeExecutableSchema } from 'graphql-tools';
import resolvers from 'resolvers/index';
import typeDefs from 'schemas/index';

import { logger } from 'io';

import { userResolver } from 'resolvers';

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

export default schema;
