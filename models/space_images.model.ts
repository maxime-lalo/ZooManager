import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
} from "sequelize";
import {SpaceInstance} from "./space.model";

export interface SpaceImageProps {
    id: number;
    image: string;
}

export interface SpaceImageCreationProps extends Optional<SpaceImageProps, "id">{}

export interface SpaceImageInstance extends Model<SpaceImageProps, SpaceImageCreationProps>, SpaceImageProps {
    setSpace: BelongsToSetAssociationMixin<SpaceInstance, "id">;
    getSpace: BelongsToGetAssociationMixin<SpaceInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<SpaceImageInstance> {
    return sequelize.define<SpaceImageInstance>("Space_Image", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}