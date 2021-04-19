import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface SpaceProps {
    id: number;
    name: string;
    description: string;
    type: string;
    capacity: number;
    duration: Date;
    opening_time: Date;
    handicap_access: boolean;
    is_active: boolean;
}

export interface SpaceCreationProps extends Optional<SpaceProps, "id">{}

export interface SpaceInstance extends Model<SpaceProps, SpaceCreationProps>, SpaceProps {

}

export default function(sequelize: Sequelize): ModelCtor<SpaceInstance> {
    return sequelize.define<SpaceInstance>("Space", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        capacity: {
            type: DataTypes.DOUBLE,
        },
        duration: {
            type: DataTypes.DATE,
        },
        opening_time: {
            type: DataTypes.DATE,
        },
        handicap_access: {
            type: DataTypes.BOOLEAN,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}