import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationsMixin,
    BelongsToSetAssociationMixin,
    BelongsToGetAssociationMixin,
    HasManyRemoveAssociationMixin,
    HasManySetAssociationsMixin
} from "sequelize";
import {SessionInstance} from "./session.model";
import {RoleInstance} from "./role.model";
import {UserPassInstance} from "./user_pass.model";
import {SpaceLogsInstance} from "./space_logs.model";

export interface UserProps {
    id: number;
    login: string;
    password: string;
    email: string;
    in_zoo: boolean;
}

export interface UserCreationProps extends Optional<UserProps, "id">{}

export interface UserInstance extends Model<UserProps, UserCreationProps>, UserProps {
    getSessions: HasManyGetAssociationsMixin<SessionInstance>;
    addSessions: HasManyAddAssociationsMixin<SessionInstance, "id">;
    
    getRole: BelongsToGetAssociationMixin<RoleInstance>;
    setRole: BelongsToSetAssociationMixin<RoleInstance, "id">

    getUserPass: HasManyGetAssociationsMixin<UserPassInstance>;
    addUserPass: HasManyAddAssociationsMixin<UserPassInstance, "id">;
    removeUserPass: HasManyRemoveAssociationMixin<UserPassInstance, "id">;
    updateUserPass: HasManySetAssociationsMixin<UserPassInstance, "id">;

    getSpaceLogs: HasManyGetAssociationsMixin<SpaceLogsInstance>;
    addSpaceLogs: HasManyAddAssociationsMixin<SpaceLogsInstance, "id">;
    removeSpaceLogs: HasManyRemoveAssociationMixin<SpaceLogsInstance, "id">;
    updateSpaceLogs: HasManySetAssociationsMixin<SpaceLogsInstance, "id">;
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
        },
        in_zoo: {
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}