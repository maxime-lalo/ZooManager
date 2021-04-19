import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface MaintenanceSpaceProps {
    id: number;
    timestamp: Date;
    state: boolean;
    // id_space: number;
}

export interface MaintenanceSpaceCreationProps extends Optional<MaintenanceSpaceProps, "id">{}

export interface MaintenanceSpaceInstance extends Model<MaintenanceSpaceProps, MaintenanceSpaceCreationProps>, MaintenanceSpaceProps {

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
        /*id_space: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },*/
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}