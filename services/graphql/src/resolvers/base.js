import createResolver from 'lib/createResolver';
import logger from 'io/logger';

import * as SequelizeErrors from 'errors/adapters/sequelize';
import UnknownError from 'errors/custom';

export const sequelizeBaseResolver = createResolver(
  null,
  (r,a,c, error) => {

    const {
      DatabaseError,
      TimeoutError,
      ConnectionError,
      ConnectionRefusedError,
      AccessDeniedError,
      HostNotFoundError,
      HostNotReachableError,
      InvalidConnectionError,
      ConnectionTimedOutError
    } = SequelizeErrors;

    switch(error.constructor) {
      case DatabaseError: return UnknownError(DatabaseError);
      case TimeoutError: return UnknownError(TimeoutError);
      case ConnectionError: return UnknownError(ConnectionError);
      case ConnectionRefusedError: return UnknownError(ConnectionRefusedError);
      case AccessDeniedError: return UnknownError(AccessDeniedError);
      case HostNotFoundError: return UnknownError(HostNotFoundError);
      case HostNotReachableError: return UnknownError(HostNotReachableError);
      case InvalidConnectionError: return UnknownError(InvalidConnectionError);
      case ConnectionTimedOutError: return UnknownError(ConnectionTimedOutError);
      default: return null;
    }
  }
);

// TODO: Add example mongoose error parsing
export const mongooseBaseResolver = createResolver(
  null,
  (r,a,c, error) => {
    switch(error.constructor) {
      default: return null;
    }
  }
);
