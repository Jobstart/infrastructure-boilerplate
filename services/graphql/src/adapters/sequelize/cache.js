import Cache from 'adapters/base/cache';

export default class SequelizeCache extends Cache {
  constructor (model) {
    super(model, model.name, 'id');
    this._model = model;
  }
  serialize (instance) {
    return JSON.stringify(instance.toJSON());
  }
  deserialize (json) {
    return this._model.build(JSON.parse(json), {
      isNewRecord: false
    });
  }
}
