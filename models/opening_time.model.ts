import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface OpeningTimeProps {
    id: number;
    // id_space: number;
    opening_time: Date;
    closing_time: Date;
    day: Date;
}

export interface OpeningTimeCreationProps extends Optional<OpeningTimeProps, "id">{}

export interface OpeningTimeInstance extends Model<OpeningTimeProps, OpeningTimeCreationProps>, OpeningTimeProps {

}

export default function(sequelize: Sequelize): ModelCtor<OpeningTimeInstance> {
    return sequelize.define<OpeningTimeInstance>("Opening_Time", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        /*id_space: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },*/
        opening_time: {
            type: DataTypes.DATE,
        },
        closing_time: {
            type: DataTypes.DATE,
        },
        day: {
            type: DataTypes.DATE,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}