// NOTE: Willful paranoia.  Keeping errors scoped to connection object rather than the connection constructor
import sequelize from 'io/postgres';

const {
  Error: BaseError,
  ValidationError,
  TimeoutError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ExclusionConstraintError,
  ValidationErrorItem,
  ConnectionError,
  ConnectionRefusedError,
  AccessDeniedError,
  HostNotFoundError,
  HostNotReachableError,
  InvalidConnectionError,
  ConnectionTimedOutError,
  InstanceError,
  EmptyResultError
} = sequelize;

export {
  BaseError,
  ValidationError,
  TimeoutError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ExclusionConstraintError,
  ValidationErrorItem,
  ConnectionError,
  ConnectionRefusedError,
  AccessDeniedError,
  HostNotFoundError,
  HostNotReachableError,
  InvalidConnectionError,
  ConnectionTimedOutError,
  InstanceError,
  EmptyResultError
};
