import logger from 'io/logger';

export default store => next => action => {
  if (__DEV__ && __CLIENT__) logger.log('Redux Action:', action);
  next(action);
};
