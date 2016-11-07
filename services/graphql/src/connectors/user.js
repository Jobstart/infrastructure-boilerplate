import { MongooseConnector, mongooseModel } from 'adapters/mongoose';
import { makeSaltedHash, compareSaltedHash, objectToToken } from 'lib/crypto';

const { model: User } = mongooseModel('User', {
  name: String,
  email: String,
  hashed_password: String
});

class UserConnector extends MongooseConnector {
  constructor () {
    super(User, null);
  }
  async getByEmail (email) {
    const user = await this.model.findOne({
      email
    });
    if (user) {
      await this.loader.prime(user);
    }
    return user;
  }
  async signup ({ name, email, password }) {
    const hashed_password = await makeSaltedHash(password);
    const user = await super.create({
      name,
      email,
      hashed_password
    });

    const token = await objectToToken({
      _id: user._id.toString()
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
      _id: user._id.toString()
    });

    return {
      user,
      token
    };
  }
}

export default UserConnector;
