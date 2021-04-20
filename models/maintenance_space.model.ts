import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
} from "sequelize";
import {SpaceInstance} from "./space.model";

export interface MaintenanceSpaceProps {
    id: number;
    timestamp: Date;
    state: boolean;
}

export interface MaintenanceSpaceCreationProps extends Optional<MaintenanceSpaceProps, "id">{}

export interface MaintenanceSpaceInstance extends Model<MaintenanceSpaceProps, MaintenanceSpaceCreationProps>, MaintenanceSpaceProps {
    setSpace: BelongsToSetAssociationMixin<SpaceInstance, "id">;
    getSpace: BelongsToGetAssociationMixin<SpaceInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<MaintenanceSpaceInstance> {
    return sequelize.define<MaintenanceSpaceInstance>("Maintenance_Space", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        timestamp: {
            type: DataTypes.DATE,
        },
        state: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}