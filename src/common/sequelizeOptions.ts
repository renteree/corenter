import { Options } from 'sequelize';
import config from '../config';

const sequelizeOptions: Options = {
  database: config.database.name,
  username: config.database.user,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  define: {
    charset: 'utf8mb4',
    timestamps: false,
  },
  dialect: 'postgres',
  // eslint-disable-next-line no-console
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

export default sequelizeOptions;
