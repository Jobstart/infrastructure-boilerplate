import BaseError from '../base';

export default class UnknownError extends BaseError {
  static code = 'UNKNOWN_ERROR';
  static deserialize (pojo) {
    return new UnknownError(null, pojo.timestamp);
  }
  constructor (base, timestamp) {
    const message = 'An error occurred.  Please try again';
    super(message, base, timestamp);
    this.code = UnknownError.code;
  }
}
