import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface SpaceImageProps {
    id: number;
    // id_space: number;
    image: string;
}

export interface SpaceImageCreationProps extends Optional<SpaceImageProps, "id">{}

export interface SpaceImageInstance extends Model<SpaceImageProps, SpaceImageCreationProps>, SpaceImageProps {

}

export default function(sequelize: Sequelize): ModelCtor<SpaceImageInstance> {
    return sequelize.define<SpaceImageInstance>("Space_Image", {
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