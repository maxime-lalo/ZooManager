import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface AnimalHealthBookProps {
    id: number;
    timestamp: Date;
    // id_animal: number;
    commentary: string;
}

export interface AnimalHealthBookCreationProps extends Optional<AnimalHealthBookProps, "id">{}

export interface AnimalHealthBookInstance extends Model<AnimalHealthBookProps, AnimalHealthBookCreationProps>, AnimalHealthBookProps {

}

export default function(sequelize: Sequelize): ModelCtor<AnimalHealthBookInstance> {
    return sequelize.define<AnimalHealthBookInstance>("Animal_HealthBook", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        timestamp: {
            type: DataTypes.DATE,
        },
        /*id_animal: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },*/
        commentary: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}