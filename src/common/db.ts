import { Sequelize } from 'sequelize';
import sequelizeOptions from './sequelizeOptions';
import config from '../config';
import tenantInit, { Tenant } from '../models/TenantModel';
import userInit, { User } from '../models/UserModel';
import locationInit, { Location } from '../models/LocationModel';

const sequelize = new Sequelize(config.database.uri, sequelizeOptions);
export const initDB = () => {
  userInit(sequelize);
  locationInit(sequelize);
  tenantInit(sequelize);

  // Set table associations
  Tenant.belongsTo(User, { targetKey: 'id', as: 'user' });
  Tenant.belongsTo(Location, { targetKey: 'id', as: 'location' });
};

export default sequelize;
