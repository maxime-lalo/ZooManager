import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface RoleProps {
    id: number;
    role: string;
}

export interface RoleCreationProps extends Optional<RoleProps, "id">{}

export interface RoleInstance extends Model<RoleProps, RoleCreationProps>, RoleProps {

}

export default function(sequelize: Sequelize): ModelCtor<RoleInstance> {
    return sequelize.define<RoleInstance>("Role", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}