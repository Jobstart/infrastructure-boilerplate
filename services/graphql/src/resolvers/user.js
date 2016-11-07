import pubsub from 'io/pubsub';

const getUsersByID = async (root, { query: { ids } }, { connectors: { User }} ) => {
  const user = await User.getManyByID(ids);
  return user;
};

const getUserByID = async (root, { query: { id } }, { connectors: { User } } ) => {
  const user = await User.getByID(id);
  return user;
}

const updateUser = async (root, { user: updatedUser }, { user: reqUser, connectors: { User } } ) => {
  if (updatedUser.id.toString() !== reqUser.id.toString()) throw new Error('Forbidden');
  const user = await User.updateByID(updatedUser.id, updatedUser).then((user) => {
    pubsub.publish('updateUser', user.toJSON());
    return user;
  });
  return user;
}

const signupUser = async (root, { user: { name, email, password } },  context) => {
  const { connectors: { User } } = context;
  const { user, token } = await User.signup({ name, email, password });
  context.user = user; // attach user to context for subsequent requests
  return {
    ...user.toJSON(),
    token
  };
};

const loginUser = async (root, { user: { email, password } }, context) => {
  const { connectors: { User } } = context;
  const { user, token } = await User.login({ email, password });
  context.user = user; //attach user to context for subsequent requests
  return {
    ...user.toJSON(),
    token
  };
};

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
    updateUser: function (user) {
      return user;
    }
  }
}
