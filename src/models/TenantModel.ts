import { Sequelize, Model, Optional, DataTypes } from 'sequelize';

// These are all the attributes in the Tenant model
export interface TenantAttributes {
    id: number;
    title: string;
    description: string | null;
}

// Some attributes are optional in `Tenant.build` and `Tenant.create` calls
export interface TenantCreationAttributes extends Optional<TenantAttributes, "id"> {}

export class Tenant extends Model<TenantAttributes, TenantCreationAttributes>
    implements TenantAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public title!: string;
    public description!: string | null; // for nullable fields

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}



export default (sequelize: Sequelize) => {
    Tenant.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            description: {
                type: new DataTypes.STRING(128),
                allowNull: true,
            },
        },
        {
            tableName: "tenants",
            timestamps: true, // auto adding of timestamps from Sequelize
            underscored: true, // interchanges name of columns with the underscore
            sequelize, // passing the `sequelize` instance is required
        }
    );
};
