import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, HasManyGetAssociationsMixin, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
} from "sequelize";
import {SpaceInstance} from "./space.model";
import {SessionInstance} from "./session.model";

export interface AnimalProps {
    id: number;
    species: string;
}

export interface AnimalCreationProps extends Optional<AnimalProps, "id">{}

export interface AnimalInstance extends Model<AnimalProps, AnimalCreationProps>, AnimalProps {
    getSpace: BelongsToGetAssociationMixin<SpaceInstance>;
    setSpace: BelongsToSetAssociationMixin<SpaceInstance, "id">
}

export default function(sequelize: Sequelize): ModelCtor<AnimalInstance> {
    return sequelize.define<AnimalInstance>("Animal", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        species: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}