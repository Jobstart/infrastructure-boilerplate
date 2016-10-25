import Cache from 'adapters/base/cache';

export default class MongooseCache extends Cache {
  constructor (model) {
    super(model, '_id');
    this._model = model;
  }
  serialize (instance) {
    return JSON.stringify(instance.toObject());
  }
  deserialize (json) {
    return this._model.hydrate(JSON.parse(json));
  }
}
