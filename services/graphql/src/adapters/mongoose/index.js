import MongooseConnector from 'adapters/mongoose/connector';
import mongooseModel from 'adapters/mongoose/model';
import mongoose from 'mongoose';

const DataTypes = Object.keys(mongoose.Schema.Types).reduce((hash, i) => ({
  ...hash,
  [i.toUpperCase()]: mongoose.Schema.Types[i]
}), {});

export {
  DataTypes,
  MongooseConnector,
  mongooseModel
};
