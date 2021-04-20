import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
} from "sequelize";
import {SpaceInstance} from "./space.model";
import {PassInstance} from "./pass.model";

export interface PassSpaceProps {
    id: number;
    order: number;
}

export interface PassSpaceCreationProps extends Optional<PassSpaceProps, "id">{}

export interface PassSpaceInstance extends Model<PassSpaceProps, PassSpaceCreationProps>, PassSpaceProps {
    setSpace: BelongsToSetAssociationMixin<SpaceInstance, "id">;
    getSpace: BelongsToGetAssociationMixin<SpaceInstance>;

    setPass: BelongsToSetAssociationMixin<PassInstance, "id">;
    getPass: BelongsToGetAssociationMixin<PassInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<PassSpaceInstance> {
    return sequelize.define<PassSpaceInstance>("Pass_Space", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        order: {
            type: DataTypes.DOUBLE,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}