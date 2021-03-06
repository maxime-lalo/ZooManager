import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
} from "sequelize";
import {PassInstance} from "./pass.model";
import {UserInstance} from "./user.model";

export interface UserPassProps {
    id: number;
    is_active: boolean;
    acquisition_date: Date;
}

export interface UserPassCreationProps extends Optional<UserPassProps, "id">{}

export interface UserPassInstance extends Model<UserPassProps, UserPassCreationProps>, UserPassProps {
    setPass: BelongsToSetAssociationMixin<PassInstance, "id">;
    getPass: BelongsToGetAssociationMixin<PassInstance>;

    setUser: BelongsToSetAssociationMixin<UserInstance, "id">;
    getUser: BelongsToGetAssociationMixin<UserInstance>
}

export default function(sequelize: Sequelize): ModelCtor<UserPassInstance> {
    return sequelize.define<UserPassInstance>("User_Pass", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
        },
        acquisition_date: {
            type: DataTypes.DATE,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}