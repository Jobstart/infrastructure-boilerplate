import mongoose, { Schema } from 'mongoose';

let models = {};

export default (name, props = {}, statics = {}, methods = {}) => {
  if (!models[name]) {
    const schema = new Schema({
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
    schema.statics = statics;
    schema.methods = methods;
    models[name] = mongoose.model(name, schema);
  }

  return {
    model: models[name],
    connected: true
  };
};
