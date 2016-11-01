import pubsub from 'io/pubsub';

const getUsersByID = async (root, { query: { _ids } }, { connectors: { User }} ) => {
  const user = await User.getManyByID(_ids);
  return user;
}

const getUserByID = async (root, { query: { _id } }, { connectors: { User } } ) => {
  const user = await User.getByID(_id);
  return user;
}

const updateUser = async (root, { user: updatedUser }, { user: reqUser, connectors: { User } } ) => {
  if (updatedUser._id.toString() !== reqUser._id.toString()) throw new Error('Forbidden');
  const user = await User.updateByID(updatedUser._id, updatedUser).then((user) => {
    pubsub.publish('updateUser', user.toObject());
    return user;
  });
  return user;
}

const signupUser = async (root, { user: { name, email, password } },  context) => {
  const { connectors: { User } } = context;
  const { user, token } = await User.signup({ name, email, password });
  context.user = user; // attach user to context for subsequent requests
  return {
    ...user.toObject(),
    token
  };
};

const loginUser = async (root, { user: { email, password } }, context) => {
  const { connectors: { User } } = context;
  const { user, token } = await User.login({ email, password });
  context.user = user; //attach user to context for subsequent requests
  return {
    ...user.toObject(),
    token
  };
};

export const subscriptionMappings = {
  updateUser: (options, { query: { _id } }) => ({ //for the updateUser subscription
    // For the updateUser channel
    // Push to the subscription if the incoming channel User matches the subscription args provided
    updateUser: user => user._id.toString() === args.query._id
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
    updateUser: (user) => user
  }
}
