import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface PassSpaceProps {
    id: number;
    /*id_pass: number;
    id_space: number;*/
    order: number;
}

export interface PassSpaceCreationProps extends Optional<PassSpaceProps, "id">{}

export interface PassSpaceInstance extends Model<PassSpaceProps, PassSpaceCreationProps>, PassSpaceProps {

}

export default function(sequelize: Sequelize): ModelCtor<PassSpaceInstance> {
    return sequelize.define<PassSpaceInstance>("Pass_Space", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        /*id_pass: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        id_space: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },*/
        order: {
            type: DataTypes.NUMBER,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}