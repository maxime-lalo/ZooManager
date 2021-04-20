import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
} from "sequelize";
import {SpaceInstance} from "./space.model";

export interface OpeningTimeProps {
    id: number;
    opening_time: Date;
    closing_time: Date;
    day: Date;
}

export interface OpeningTimeCreationProps extends Optional<OpeningTimeProps, "id">{}

export interface OpeningTimeInstance extends Model<OpeningTimeProps, OpeningTimeCreationProps>, OpeningTimeProps {
    setSpace: BelongsToSetAssociationMixin<SpaceInstance, "id">;
    getSpace: BelongsToGetAssociationMixin<SpaceInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<OpeningTimeInstance> {
    return sequelize.define<OpeningTimeInstance>("Opening_Time", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
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