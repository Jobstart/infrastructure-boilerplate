import Sequelize from 'sequelize';

import { log } from 'io/logger';

import {
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB
} from '../../config/environment';

const sequelizePostgres = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  dialect: 'postgres',
  logging: log,
  benchmark: __NODE_ENV__ === 'development',
  pool: {
    min: 1
  }
});

export default sequelizePostgres;
