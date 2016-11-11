import { createError } from 'apollo-errors';

export const UnknownError = createError('UnknownError', {
  message: 'An error occurred.  Please try again'
});
