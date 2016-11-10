import pubsub from 'io/pubsub';
import * as SequelizeErrors from 'errors/adapters/sequelize';
import { sequelizeBaseResolver } from 'resolvers/base';

const getUsersByID = sequelizeBaseResolver.createResolver(
  async (root, { query: { ids } }, { connectors: { User }} ) => {
    const users = await User.getManyByID(ids);
    return users.filter(user => !!user);
  }
);

const getUserByID = sequelizeBaseResolver.createResolver(
  async (root, { query: { id } }, { connectors: { User } } ) => {
    const user = await User.getByID(id);
    return user;
  }
);

const updateUser = sequelizeBaseResolver.createResolver(
  async (root, { user: updatedUser }, { user: reqUser, connectors: { User } } ) => {
    if (updatedUser.id.toString() !== reqUser.id.toString()) throw new Error('Forbidden');
    const user = await User.updateByID(updatedUser.id, updatedUser).then((user) => {
      pubsub.publish('updateUser', user.toJSON());
      return user;
    });
    return user;
  }
);

const signupUser = sequelizeBaseResolver.createResolver(
  async (root, { user: { name, email, password } },  context) => {
    const { connectors: { User } } = context;
    const { user, token } = await User.signup({ name, email, password });
    context.user = user; // attach user to context for subsequent requests
    return {
      ...user.toJSON(),
      token
    };
  }
);

const loginUser = sequelizeBaseResolver.createResolver(
  async (root, { user: { email, password } }, context) => {
    const { connectors: { User } } = context;
    const { user, token } = await User.login({ email, password });
    context.user = user; //attach user to context for subsequent requests
    return {
      ...user.toJSON(),
      token
    };
  }
);

export const subscriptionMappings = {
  updateUser: (options, { query: { _id } }) => ({ //for the updateUser subscription
    // For the updateUser channel
    // Push to the subscription if the incoming channel User matches the subscription args provided
    updateUser: {
      filter: user => user.id.toString() === _id
    }
  })
};

export default {
  Query: {
    getUsersByID,
    getUserByID
  },
  Mutation: {
    updateUser,
    signupUser,
    loginUser
  },
  Subscription: {
    updateUser: sequelizeBaseResolver.createResolver((root, args, context) => root)
  }
}
