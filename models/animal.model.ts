import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface AnimalProps {
    id: number;
    species: string;
    // id_space: number;
}

export interface AnimalCreationProps extends Optional<AnimalProps, "id">{}

export interface AnimalInstance extends Model<AnimalProps, AnimalCreationProps>, AnimalProps {

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