import { log } from 'io/logger';

export default store => next => action => {
  //if (__DEV__ && __CLIENT__) log('Redux Action:', action);
  next(action);
};
