import { MongooseConnector, MongooseModel } from 'adapters/mongoose';
import { makeSaltedHash, compareSaltedHash, objectToToken } from 'lib/crypto';

const User = new MongooseModel('User', {
  name: String,
  email: String,
  hashed_password: String
})
.construct();

class UserConnector extends MongooseConnector {
  constructor (reqUser) {
    super(User, reqUser);
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
    }

  }
}

export default UserConnector;
