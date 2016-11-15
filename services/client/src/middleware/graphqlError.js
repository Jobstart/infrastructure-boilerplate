import { trace } from 'io/logger';

export default store => next => action => {
  if (__CLIENT__) {
    if (action.type === 'APOLLO_QUERY_RESULT_CLIENT' || action.type === 'APOLLO_QUERY_RESULT') {
      const { result: { errors = [] } } = action;
      errors.forEach((error) => trace(error));
    }
  };
  next(action);
};
