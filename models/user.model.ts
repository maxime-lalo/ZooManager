import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationsMixin,
    BelongsToSetAssociationMixin,
    BelongsToGetAssociationMixin
} from "sequelize";
import {SessionInstance} from "./session.model";
import {RoleInstance} from "./role.model";

export interface UserProps {
    id: number;
    login: string;
    password: string;
    email: string;
}

export interface UserCreationProps extends Optional<UserProps, "id">{}

export interface UserInstance extends Model<UserProps, UserCreationProps>, UserProps {
    getSessions: HasManyGetAssociationsMixin<SessionInstance>;
    addSessions: HasManyAddAssociationsMixin<SessionInstance, "id">;
    
    getRole: BelongsToGetAssociationMixin<RoleInstance>;
    setRole: BelongsToSetAssociationMixin<RoleInstance, "id">
}

export default function(sequelize: Sequelize): ModelCtor<UserInstance> {
    return sequelize.define<UserInstance>("User", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}