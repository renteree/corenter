import {
  Sequelize, Model, Optional, DataTypes,
} from 'sequelize';

// These are all the attributes in the User model
export interface LocationAttributes {
  id: number;
  country: string;
  city: string;
  cityId: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface LocationCreationAttributes extends Optional<LocationAttributes, 'id'> {}

export class Location extends Model<LocationAttributes, LocationCreationAttributes>
  implements LocationAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public country!: string;

    public city!: string;

    public cityId!: string;
}


export default (sequelize: Sequelize) => {
  Location.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      country: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      city: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      cityId: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'locations',
      underscored: true, // interchanges name of columns with the underscore
      sequelize, // passing the `sequelize` instance is required
    },
  );
};
