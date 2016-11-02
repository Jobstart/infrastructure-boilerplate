import combineResolvers from 'lib/combineResolvers';

import scalarResolver from 'resolvers/scalar';
import userResolver, { subscriptionMappings as userSubscriptionMappings } from 'resolvers/user';

const resolvers = combineResolvers([
  scalarResolver,
  userResolver
]);

export const setupFunctions = {
  ...userSubscriptionMappings
};

export default resolvers;
