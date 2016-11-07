//import { MongooseConnector, mongooseModel } from 'adapters/mongoose';
import { SequelizeConnector, sequelizeModel, DataTypes } from 'adapters/sequelize';
import { makeSaltedHash, compareSaltedHash, objectToToken } from 'lib/crypto';

const { model: User, connected } = sequelizeModel('User', {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  hashed_password: DataTypes.STRING
});

export {
  connected
};

export default class UserConnector extends SequelizeConnector {
  constructor (reqUser) {
    super(User, reqUser);
  }
  async getByEmail (email) {
    const user = await this.model.findOne({
      where: {
        email
      }
    });
    if (user) {
      await this.loader.prime(user);
    }
    return user;
  }
  async signup ({ name, email, password }, transaction) {
    const hashed_password = await makeSaltedHash(password);
    const user = await super.create({
      name,
      email,
      hashed_password
    }, transaction);

    const token = await objectToToken({
      id: user.id.toString()
    });

    return {
      user,
      token
    };
  }
  async login ({ email, password }) {
    const user = await this.getByEmail(email);

    if (!user) {
      return null;
    }

    const authenticated = await compareSaltedHash(password, user.hashed_password);

    if (!authenticated) {
      return null;
    }

    const token = await objectToToken({
      id: user.id.toString()
    });

    return {
      user,
      token
    };
  }
}
