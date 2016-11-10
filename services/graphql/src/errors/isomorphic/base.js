import ExtendableError from 'es6-error';

export default class BaseError extends ExtendableError {
  constructor (message, base, timestamp) {
    super(message);
    this.base = base || null;
    this.timestamp = timestamp || Date.now();
  }
  serialize () {
    const code = this.code || this.constructor.code || null;
    const message = this.message;
    const timestamp = this.timestamp;
    return {
      message,
      code,
      timestamp
    };
  }
}
