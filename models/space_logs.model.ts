import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface SpaceLogsProps {
    id: number;
    /*id_user: number;
    id_space: number;*/
    in_out: boolean;
    timestamp: Date;
}

export interface SpaceLogsCreationProps extends Optional<SpaceLogsProps, "id">{}

export interface SpaceLogsInstance extends Model<SpaceLogsProps, SpaceLogsCreationProps>, SpaceLogsProps {

}

export default function(sequelize: Sequelize): ModelCtor<SpaceLogsInstance> {
    return sequelize.define<SpaceLogsInstance>("Space_Logs", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        /*id_pass: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        id_space: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },*/
        in_out: {
            type: DataTypes.BOOLEAN,
        },
        timestamp: {
            type: DataTypes.DATE,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}