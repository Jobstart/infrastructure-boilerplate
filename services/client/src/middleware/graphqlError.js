import logger from 'io/logger';

export default store => next => action => {
  console.log(action);
  next(action);
};
