import { UserConnector } from 'connectors';
import { tokenToObject } from 'lib/crypto'

export default async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return next();
    }
    const { _id } = await tokenToObject(req.cookies.token);
    req.user = await UserConnector.getByID(_id);
    next();
  } catch (e) {
    next(e);
  }
};
