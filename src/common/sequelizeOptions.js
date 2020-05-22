import config from '../config';

const sequelizeOptions = {
  database: config.database.name,
  username: config.database.user,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  define: {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_unicode_ci',
    },
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
  operatorsAliases: 0,
};

export default sequelizeOptions;
