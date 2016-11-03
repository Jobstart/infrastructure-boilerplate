export const HOSTNAME = process.env.HOSTNAME || 'localhost';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const WEBPACK_PORT = process.env.API_WEBPACK_PORT;
export const PORT = process.env.PORT || process.env.API_SERVER_PORT;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;

export const MONGO_HOST = process.env.MONGO_HOST;
export const MONGO_PORT = process.env.MONGO_PORT;
export const MONGO_DB = process.env.MONGO_DB || process.env.API_MONGO_DB;

export const JWT_SECRET = process.env.JWT_SECRET;
