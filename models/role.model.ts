import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationsMixin
} from "sequelize";
import {UserInstance} from "./user.model";

export interface RoleProps {
    id: number;
    name_role: string;
}

export interface RoleCreationProps extends Optional<RoleProps, "id">{}

export interface RoleInstance extends Model<RoleProps, RoleCreationProps>, RoleProps {
    getUsers: HasManyGetAssociationsMixin<UserInstance>;
    addUsers: HasManyAddAssociationsMixin<UserInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<RoleInstance> {
    return sequelize.define<RoleInstance>("Role", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name_role: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}