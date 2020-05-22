import path from 'path';
import Sequelize from 'sequelize';
import modelsConfig from './modelsConfig';
import sequelizeOptions from './sequelizeOptions';

const db = {};
const sequelize = new Sequelize(sequelizeOptions);

modelsConfig.forEach((file) => {
  const model = sequelize.import(path.resolve(__dirname, '../../', file));
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
