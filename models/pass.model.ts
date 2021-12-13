import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManySetAssociationsMixin
} from "sequelize";
import {PassSpaceInstance} from "./pass_space.model";
import {UserPassInstance} from "./user_pass.model";

export interface PassProps {
    id: number;
    name_pass: string;
}

export interface PassCreationProps extends Optional<PassProps, "id">{}

export interface PassInstance extends Model<PassProps, PassCreationProps>, PassProps {
    getPassSpaces: HasManyGetAssociationsMixin<PassSpaceInstance>;
    addPassSpace: HasManyAddAssociationsMixin<PassSpaceInstance, "id">;
    removePassSpace: HasManyRemoveAssociationMixin<PassSpaceInstance, "id">;
    updatePassSpace: HasManySetAssociationsMixin<PassSpaceInstance, "id">;

    getUserPass: HasManyGetAssociationsMixin<UserPassInstance>;
    addUserPass: HasManyAddAssociationsMixin<UserPassInstance, "id">;
    removeUserPass: HasManyRemoveAssociationMixin<UserPassInstance, "id">;
    updateUserPass: HasManySetAssociationsMixin<UserPassInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<PassInstance> {
    return sequelize.define<PassInstance>("Pass", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name_pass: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}