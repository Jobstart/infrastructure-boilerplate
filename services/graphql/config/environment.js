export const HOSTNAME = process.env.HOSTNAME || 'localhost';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const WEBPACK_PORT = process.env.GRAPHQL_WEBPACK_PORT;
export const PORT = process.env.PORT || process.env.GRAPHQL_SERVER_PORT;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;

export const MONGO_HOST = process.env.MONGO_HOST;
export const MONGO_PORT = process.env.MONGO_PORT;
export const MONGO_DB = process.env.MONGO_DB || process.env.GRAPHQL_MONGO_DB;

export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;
export const POSTGRES_DB = process.env.POSTGRES_DB;

export const JWT_SECRET = process.env.JWT_SECRET;
