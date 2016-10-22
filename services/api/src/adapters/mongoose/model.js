import mongoose, { Schema } from 'mongoose';

export default class MongooseModel extends Schema {
  constructor (name, props = {}) {
    super({
      ...props,
      time_created: {
        type: Date,
        required: true,
        default: Date.now
      },
      time_updated: {
        type: Date,
        required: true,
        default: Date.now
      },
      time_destroyed: {
        type: Date,
        default: null
      },
      destroyed: {
        type: Boolean,
        default: false,
        required: true
      }
    });

    this.statics = {};
    this.methods = {};
    this._name = name;
    this._model = null;
  }

  registerStaticMethod (name, fn) {
    if (this._model) {
      throw new Error(`Cannot register static method for model ${this._name} after it has been constructed`);
    }
    this.statics[name] = fn;
    return this;
  }

  registerMethod (name, fn) {
    if (this._model) {
      throw new Error(`Cannot register static method for model ${this._name} after it has been constructed`);
    }
    this.methods[name] = fn;
    return this;
  }

  construct () {
    if (this._model) {
      return this._model;
    }

    this._model = mongoose.model(this._name, this);

    return this._model;
  }
}
