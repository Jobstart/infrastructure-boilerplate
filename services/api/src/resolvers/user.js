const getUsersByID = (root, { query: { _ids } }, { connectors: { User }} ) => (
  User.getManyByID(_ids)
);

const getUserByID = async (root, { query: { _id } }, { connectors: { User } } ) => (
  User.getByID(_id)
);

const updateUser = (root, { user }, { connectors: { User } } ) => (
  User.updateByID(user._id, user)
);

export default {
  Query: {
    getUsersByID,
    getUserByID
  },
  Mutation: {
    updateUser
  }
}
