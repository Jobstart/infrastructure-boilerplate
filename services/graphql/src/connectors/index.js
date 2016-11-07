import Promise from 'bluebird';
import UserConnector, { connected as userModelConnected} from 'connectors/user';

const getConnectors = async (user) => {
  await Promise.all([
    userModelConnected
  ]);

  const User = new UserConnector(user);

  return {
    User
  };
};

export default getConnectors;

export {
  UserConnector
};
