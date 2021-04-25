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
import {AnimalInstance} from "./animal.model";
import {SpaceImageInstance} from "./space_images.model";
import {OpeningTimeInstance} from "./opening_time.model";
import {MaintenanceSpaceInstance} from "./maintenance_space.model";
import {PassSpaceInstance} from "./pass_space.model";
import {SpaceLogsInstance} from "./space_logs.model";

export interface SpaceProps {
    id: number;
    name: string;
    description: string;
    type: string;
    capacity: number;
    duration: Date;
    handicap_access: boolean;
}

export interface SpaceCreationProps extends Optional<SpaceProps, "id">{}

export interface SpaceInstance extends Model<SpaceProps, SpaceCreationProps>, SpaceProps {
    getAnimals: HasManyGetAssociationsMixin<AnimalInstance>;
    addAnimal: HasManyAddAssociationsMixin<AnimalInstance, "id">;
    removeAnimal: HasManyRemoveAssociationMixin<AnimalInstance, "id">;
    updateAnimal: HasManySetAssociationsMixin<AnimalInstance, "id">;

    getImages: HasManyGetAssociationsMixin<SpaceImageInstance>;
    addImage: HasManyAddAssociationsMixin<SpaceImageInstance, "id">;
    removeImage: HasManyRemoveAssociationMixin<SpaceImageInstance, "id">;
    updateImage: HasManySetAssociationsMixin<SpaceImageInstance, "id">;

    getOpeningTime: HasManyGetAssociationsMixin<OpeningTimeInstance>;
    addOpeningTime: HasManyAddAssociationsMixin<OpeningTimeInstance, "id">;
    removeOpeningTime: HasManyRemoveAssociationMixin<OpeningTimeInstance, "id">;
    updateOpeningTime: HasManySetAssociationsMixin<OpeningTimeInstance, "id">;

    getMaintenance: HasManyGetAssociationsMixin<MaintenanceSpaceInstance>;
    addMaintenance: HasManyAddAssociationsMixin<MaintenanceSpaceInstance, "id">;
    removeMaintenance: HasManyRemoveAssociationMixin<MaintenanceSpaceInstance, "id">;
    updateMaintenance: HasManySetAssociationsMixin<MaintenanceSpaceInstance, "id">;

    getPassSpace: HasManyGetAssociationsMixin<PassSpaceInstance>;
    addPassSpace: HasManyAddAssociationsMixin<PassSpaceInstance, "id">;
    removePassSpace: HasManyRemoveAssociationMixin<PassSpaceInstance, "id">;

    getSpaceLogs: HasManyGetAssociationsMixin<SpaceLogsInstance>;
    addSpaceLogs: HasManyAddAssociationsMixin<SpaceLogsInstance, "id">;
    removeSpaceLogs: HasManyRemoveAssociationMixin<SpaceLogsInstance, "id">;
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
            type: DataTypes.TIME,
        },
        handicap_access: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}