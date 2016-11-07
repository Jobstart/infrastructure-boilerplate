import Promise from 'bluebird';
import mongoose from 'mongoose';

import {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB
} from '../../config/environment';

mongoose.Promise = Promise;

const connStr = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

export const connectionPromise = mongoose.connect(connStr, {
  promiseLibrary: Promise
});
