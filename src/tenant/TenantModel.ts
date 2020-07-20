import Sequelize from "sequelize";

export default (sequelize: Sequelize.Sequelize) => {
  const Tenant = sequelize.define('tenant', {
    title: { type: Sequelize.STRING, allowNull: false },
  }, {
    tableName: 'tenants',
    updatedAt: false,
    timestamps: true,
    underscored: true,
  });
  return Tenant;
};