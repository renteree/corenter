import path from 'path';
import { Sequelize } from 'sequelize';
import modelsConfig from './modelsConfig';
import sequelizeOptions from './sequelizeOptions';
import config from '../config';

const db: {[index: string]:any} = {};
const sequelize = new Sequelize(config.database.uri, sequelizeOptions);

modelsConfig.forEach((file) => {
  const model = sequelize.import(path.resolve(__dirname, '../../', file));
  if (model) db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
