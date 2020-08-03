import {
  Sequelize, Model, Optional, DataTypes, Association,
} from 'sequelize';
import { User } from './UserModel';
import { Location } from './LocationModel';

// These are all the attributes in the Tenant model
export interface TenantAttributes {
  id: number;
  userId: number;
  locationId: number;
  title: string;
  description: string | null;
  tenantsDescription: string | null;
  minBudget: number;
  maxBudget: number;
  willPayFee: boolean;
  housingType: string;
  currency: string;
}

// Some attributes are optional in `Tenant.build` and `Tenant.create` calls
export interface TenantCreationAttributes extends Optional<TenantAttributes, 'id'> {}

export class Tenant extends Model<TenantAttributes, TenantCreationAttributes>
  implements TenantAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public userId!: number;

    public locationId!: number;

    public title!: string;

    public description!: string | null; // for nullable fields

    public tenantsDescription!: string | null;

    public minBudget!: number;

    public maxBudget!: number;

    public willPayFee!: boolean;

    public housingType!: string;

    public currency!: string;

    // timestamps!
    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;

    public readonly user?: User;

    public readonly location?: Location;

    public static associations: {
      user: Association<User, Tenant>;
      location: Association<Location, Tenant>;
    };
}

export default (sequelize: Sequelize) => {
  Tenant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      locationId: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      tenantsDescription: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      minBudget: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxBudget: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      willPayFee: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      housingType: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      currency: {
        type: new DataTypes.STRING(8),
        allowNull: false,
      },
    },
    {
      tableName: 'tenants',
      timestamps: true, // auto adding of timestamps from Sequelize
      underscored: true, // interchanges name of columns with the underscore
      sequelize, // passing the `sequelize` instance is required
    },
  );
};
