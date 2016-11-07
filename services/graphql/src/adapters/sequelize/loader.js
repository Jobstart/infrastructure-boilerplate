import Dataloader from 'dataloader';
import Promise from 'bluebird'

import Cache from 'adapters/sequelize/cache';

export default class SequelizeLoader extends Dataloader {
  constructor (model) {
    super(async (ids) => {
      let instances = (await this._cache.getMany(ids));

      const idsToFetch = instances
        .map((instance, i) => instance ? null : ids[i])
        .filter((id) => id);

      if (idsToFetch.length < 1) {
        return instances;
      }

      const fetchedInstances = await model.findAll({
        where: {
          id: {
            $in: idsToFetch
          },
          destroyed: {
            $ne: true
          }
        },
        benchmark: __NODE_ENV__ === 'development'
      });

      await this._cache.setMany(fetchedInstances);

      const hash = instances
        .filter((instance) => !!instance)
        .concat(fetchedInstances)
        .reduce((hash, instance) => ({
          ...hash,
          [instance.id]: instance
        }), {});

      const _indicesByIds = ids.reduce((map, id, i) => ({
        ...map,
        [id]: i
      }), {});

      return Object.keys(_indicesByIds)
        .reduce((arr, id) => {
          arr.splice(_indicesByIds[id], 1, hash[id] || null);
          return arr;
        }, new Array(ids.length));
    });

    this._cache = new Cache(model);
  }
  load (id) {
    return super.load(id);
  }
  loadMany (ids) {
    return super.loadMany(ids.map((id) => id));
  }
  async replace (instance) {
    const key = instance.id ? instance.id : instance;
    await this._cache.set(instance);
    super.clear(key);
    return super.prime(key, instance);
  }
  async clear (instance) {
    const key = instance.id ? instance.id : instance;
    await this._cache.delete(instance);
    return super.clear(key);
  }
  async prime (instance) {
    const key = instance.id ? instance.id : instance;
    await this._cache.set(instance);
    return super.prime(key);
  }
}
