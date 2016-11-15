import { redisConnection as redis } from 'io';
import { trace } from 'io/logger';

let hasInitialCleared = false;

let errorState = false;
let purgeQueue = [];

redis.on('error', () => {
  errorState = true;
});

redis.on('ready', async () => {
  if (errorState) {
    while (this._purgeQueue.length) {
      const key = purgeQueue.pop();
      try {
        await redis.delAsync(key);
      } catch (e) {
        purgeQueue.push(key);
      }
    }
  }
});

export default class Cache {
  constructor (model, modelName, key = '_id', ttl = 3600) {
    this._name = modelName.toLowerCase();
    this._key = key;
    this._ttl = __DEV__ ? ttl : 30;
    this._purgeQueue = [];
    this._errorState = false;
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
    let instance = null;
    try {
      instance = await redis.getAsync(this._name, this._keyStr(key))
    } catch (err) {
      trace('redis error', err);
      this._purgeQueue.push(key);
    }
    return instance;
  }
  async getMany (keys) {
    let instances = keys.map(() => null);
    try {
      instances = (await redis.mgetAsync(keys.map((key) => this._keyStr(key))))
      .map((instance) => instance ? this.deserialize(instance) : null);
    } catch (err) {
      trace('redis error', err);
      purgeQueue = purgeQueue.concat(keys.map((key) => this._keyStr(key)));
    }
    return instances;
  }
  async set (instance) {
    try {
      await redis.multi()
        .set(this._keyStr(instance[this._key]), this.serialize(instance))
        .expire(this._keyStr(instance[this._key]), this._ttl)
        .execAsync();
    } catch (e) {
      trace('redis error', err);
      purgeQueue.push(this._keyStr(instance[this._key]));
      return false;
    }
  }
  async setMany (instances) {
    try {
      await redis.multi(instances.map((instance) => [
        'SETEX',
        this._keyStr(instance[this._key]),
        this._ttl,
        this.serialize(instance)
      ]))
      .execAsync();
      return true;
    } catch (e) {
      trace('redis error', err);
      purgeQueue = purgeQueue.concat(instances.map((instance) => this._keyStr(instance[this._key])));
      return false;
    }
  }
  async delete (instance) {
    try {
      await redis.delAsync(
        this._keyStr(instance[this._key] ? instance[this._key] : instance)
      );
      return true;
    } catch (e) {
      trace('redis error', err);
      purgeQueue.push(this._keyStr(instance[this._key]));
      return false;
    }
    return ;
  }
  async deleteMany (instances) {
    try {
      await redis.multi(instances.map((instance) => [
        'DEL',
        this._keyStr(instance[this._key])
      ]))
      .execAsync();
      return true;
    } catch (e) {
      trace('redis error', err);
      purgeQueue = purgeQueue.concat(instances.map((instance) => this._keyStr(instance[this._key])));
      return false
    }
  }
}
