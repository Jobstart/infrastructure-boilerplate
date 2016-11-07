import Dataloader from 'dataloader';
import Promise from 'bluebird'

import Cache from 'adapters/mongoose/cache';

export default class MongooseLoader extends Dataloader {
  constructor (model) {
    super(async (_ids) => {
      let instances = (await this._cache.getMany(_ids));

      const _idsToFetch = instances
        .map((instance, i) => instance ? null : _ids[i])
        .filter((_id) => _id);

      if (_idsToFetch.length < 1) {
        return instances;
      }

      const fetchedInstances = await model.find({
        _id: {
          $in: _idsToFetch
        },
        destroyed: false
      });

      await this._cache.setMany(fetchedInstances);

      const hash = instances
        .filter((instance) => !!instance)
        .concat(fetchedInstances)
        .reduce((hash, instance) => ({
          ...hash,
          [instance._id.toString()]: instance
        }), {});

      const _indicesByIds = _ids.reduce((map, _id, i) => ({
        ...map,
        [_id.toString()]: i
      }), {});

      return Object.keys(_indicesByIds)
        .reduce((arr, _id) => {
          arr.splice(_indicesByIds[_id], 1, hash[_id] || null);
          return arr;
        }, new Array(_ids.length));
    });

    this._cache = new Cache(model);
  }
  load (_id) {
    return super.load(_id.toString());
  }
  loadMany (_ids) {
    return super.loadMany(_ids.map((_id) => _id.toString()));
  }
  async replace (instance) {
    const key = instance._id ? instance._id.toString() : instance.toString();
    await this._cache.set(instance);
    super.clear(key);
    return super.prime(key, instance);
  }
  async clear (instance) {
    const key = instance._id ? instance._id.toString() : instance.toString();
    await this._cache.delete(instance);
    return super.clear(key);
  }
  async prime (instance) {
    const key = instance._id ? instance._id.toString() : instance.toString();
    await this._cache.set(instance);
    return super.prime(key);
  }
}
