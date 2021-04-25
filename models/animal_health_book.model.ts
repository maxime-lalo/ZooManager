import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToGetAssociationMixin, BelongsToSetAssociationMixin
} from "sequelize";
import {AnimalInstance} from "./animal.model";

export interface AnimalHealthBookProps {
    id: number;
    timestamp: Date;
    commentary: string;
}

export interface AnimalHealthBookCreationProps extends Optional<AnimalHealthBookProps, "id">{}

export interface AnimalHealthBookInstance extends Model<AnimalHealthBookProps, AnimalHealthBookCreationProps>, AnimalHealthBookProps {
    getAnimal: BelongsToGetAssociationMixin<AnimalInstance>;
    setAnimal: BelongsToSetAssociationMixin<AnimalInstance, "id">
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