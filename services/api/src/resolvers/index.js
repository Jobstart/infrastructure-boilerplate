import combineResolvers from 'lib/combineResolvers';

import scalarResolver from 'resolvers/scalar';
import userResolver from 'resolvers/user';

const resolvers = combineResolvers([
  scalarResolver,
  userResolver
]);

export default resolvers;

export {
  scalarResolver,
  userResolver
};
