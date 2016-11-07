import mongoose, { Schema } from 'mongoose';

let schemas = {}
  , models = {};

export default (name, props = {}, statics = {}, methods = {}) => {
  if (!schemas[name]) {
    schemas[name] = new Schema({
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
    schemas[name].statics = statics;
    schemas[name].methods = methods;
  }
  if (!models[name]) {
    models[name] = mongoose.model(name, schemas[name]);
  }

  return {
    schema: schemas[name],
    model: models[name]
  };
};
