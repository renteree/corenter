import {
  Sequelize, Model, Optional, DataTypes,
} from 'sequelize';

// These are all the attributes in the User model
export interface UserAttributes {
  id: number;
  name: string;
  phone: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

    public name!: string;

    public phone!: string;

    // timestamps!
    public readonly createdAt!: Date;
}


export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      phone: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      timestamps: true, // auto adding of timestamps from Sequelize
      updatedAt: false,
      underscored: true, // interchanges name of columns with the underscore
      sequelize, // passing the `sequelize` instance is required
    },
  );
};
