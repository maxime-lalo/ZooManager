import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
} from "sequelize";
import {SpaceInstance} from "./space.model";
import {UserInstance} from "./user.model";

export interface SpaceLogsProps {
    id: number;
    in_out: boolean;
    timestamp: Date;
}

export interface SpaceLogsCreationProps extends Optional<SpaceLogsProps, "id">{}

export interface SpaceLogsInstance extends Model<SpaceLogsProps, SpaceLogsCreationProps>, SpaceLogsProps {
    setSpace: BelongsToSetAssociationMixin<SpaceInstance, "id">;
    getSpace: BelongsToGetAssociationMixin<SpaceInstance>;

    setUser: BelongsToSetAssociationMixin<UserInstance, "id">;
    getUser: BelongsToGetAssociationMixin<UserInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<SpaceLogsInstance> {
    return sequelize.define<SpaceLogsInstance>("Space_Logs", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
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