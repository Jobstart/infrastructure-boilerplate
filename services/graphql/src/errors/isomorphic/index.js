import _ from 'underscore';
import { codesToErrors } from './mappings';

export const serialize = error => {
  if (!_.isFunction(error.serialize)) return null;
  return error.serialize();
};

export const deserialize = pojo => {
  const errorClass = getErrorClass(pojo.key || null);
  if (!errorClass || !_.isFunction(errorClass.deserialize)) return null;
  return errorClass.deserialize(pojo);
};

export const getErrorClass = key => key ? (codesToErrors[key] || null) : null;
