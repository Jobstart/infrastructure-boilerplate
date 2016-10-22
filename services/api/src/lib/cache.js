import { redisConnection as redis } from 'io';

let hasInitialCleared = false;

export default class Cache {
  constructor (model, key = '_id', ttl = 3600) {
    this._name = model.modelName.toLowerCase();
    this._key = key;
    this._ttl = __DEV__ ? ttl : 30;
  }
  _keyStr (key) {
    return `${this._name}:${key.toString()}`;
  }
  // NOTE: Overriden by adapter-specific subclass
  serialize (instance) {
    return instance;
  }
  // NOTE: Overriden by adapter-specific subclass
  deserialize (object) {
    return object;
  }
  async get (key) {
    const instance = await redis.getAsync(this._name, this._keyStr(key));
    return instance ? this.deserialize(instance) : null;
  }
  async getMany (keys) {
    return (await redis.mgetAsync(keys.map((key) => this._keyStr(key))))
    .map((instance) => instance ? this.deserialize(instance) : null);
  }
  set (instance) {
    return redis.multi()
      .set(this._keyStr(instance[this._key]), this.serialize(instance))
      .expire(this._keyStr(instance[this._key]), this._ttl)
      .execAsync()
      .catch((e) => {
        console.trace(e);
        throw e;
      });
  }
  setMany (instances) {
    return redis.multi(instances.map((instance) => [
      'SETEX',
      this._keyStr(instance[this._key]),
      this._ttl,
      this.serialize(instance)
    ]))
    .execAsync();
  }
  delete (instance) {
    return redis.delAsync(
      this._keyStr(instance[this._key] ? instance[this._key] : instance)
    );
  }
  deleteMany (instances) {
    return redis.multi(instances.map((instance) => [
      'DEL',
      this._keyStr(instance[this._key])
    ]))
    .execAsync();
  }
}
