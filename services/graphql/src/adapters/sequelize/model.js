import sequelizePostgres from 'io/postgres';
import { DataTypes } from 'sequelize';

let models = {};

export default (name, attributes = {}, options = {}) => {
  if (!models[name]) {
    models[name] = sequelizePostgres.define(name, {
      ...attributes,
      time_updated: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
         allowNull: false
      },
      time_created: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
         allowNull: false
      },
      time_destroyed: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
      },
      destroyed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    }, options);
  }

  const connected = models[name].sync();

  return {
    model: models[name],
    connected
  };
};
