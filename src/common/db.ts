import { Sequelize } from 'sequelize';
import sequelizeOptions from './sequelizeOptions';
import config from '../config';
import tenantInit from '../models/TenantModel';

const sequelize = new Sequelize(config.database.uri, sequelizeOptions);
export const initDB = () => {
    tenantInit(sequelize);
};

export default sequelize;
