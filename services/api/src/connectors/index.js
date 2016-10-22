import UserConnector from 'connectors/user';

const getConnectors = user => ({
  User: new UserConnector(user)
});

export default getConnectors;

export {
  UserConnector
};
