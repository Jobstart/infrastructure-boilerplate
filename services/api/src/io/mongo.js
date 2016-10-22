import Promise from 'bluebird';
import mongoose from 'mongoose';

mongoose.Promise = Promise;

const connStr = `mongodb://${__MONGO_HOST__}:${__MONGO_PORT__}/${__MONGO_DB__}`;

export const connectionPromise = mongoose.connect(connStr, {
  promiseLibrary: Promise
})
