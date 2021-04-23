import {ModelCtor} from "sequelize";
import {SpaceCreationProps, SpaceInstance} from "../models/space.model";
import {SequelizeManager} from "../models";
export class SpaceController {

    Space: ModelCtor<SpaceInstance>;

    private static instance: SpaceController;

    public static async getInstance(): Promise<SpaceController> {
        if (SpaceController.instance === undefined) {
            const {Space} = await SequelizeManager.getInstance();
            SpaceController.instance = new SpaceController(Space);
        }
        return SpaceController.instance;

    }
    private constructor(Space: ModelCtor<SpaceInstance>) {
        this.Space = Space;
    }

    public async getSpace(id: number): Promise<SpaceInstance | null> {
        return await this.Space.findOne({
            where: {
                id
            }
        });
    }

}