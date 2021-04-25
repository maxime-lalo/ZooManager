import {ModelCtor} from "sequelize";
import {OpeningTimeCreationProps, OpeningTimeInstance} from "../models/opening_time.model";
import {SequelizeManager} from "../models";
import {SpaceInstance} from "../models/space.model";

export class OpeningTimeController {

    OpeningTime: ModelCtor<OpeningTimeInstance>;
    Space: ModelCtor<SpaceInstance>;

    private static instance: OpeningTimeController;

    public static async getInstance(): Promise<OpeningTimeController> {
        if (OpeningTimeController.instance === undefined) {
            const {Opening_Time, Space} = await SequelizeManager.getInstance();
            OpeningTimeController.instance = new OpeningTimeController(Opening_Time, Space);
        }
        return OpeningTimeController.instance;

    }
    private constructor(OpeningTime: ModelCtor<OpeningTimeInstance>, Space: ModelCtor<SpaceInstance>) {
        this.OpeningTime = OpeningTime;
        this.Space = Space;
    }

    public async add(props: OpeningTimeCreationProps, name_space: string): Promise<OpeningTimeInstance | null> {
        const space = await this.Space.findOne({
            where: {
                name_space
            }
        });

        if (space === null) {
            return null;
        }
        if (name_space !== space.name_space){
            return null;
        }

        const opT = await this.OpeningTime.create({
            ...props
        });
        await opT.setSpace(space);
        return opT;
    }

    public async modify(id: number, opening_time: Date): Promise<OpeningTimeInstance | null> {
        const OpeningTime = await this.OpeningTime.findOne({
            where: {
                id
            }
        });
        if (OpeningTime === null) {
            return null;
        }
        if (id !== OpeningTime.id){
            return null;
        }
        OpeningTime.opening_time = opening_time;
        return await OpeningTime.save();
    }

    public async delete(id: number): Promise<void | null> {
        const OpeningTime = await this.OpeningTime.findOne({
            where: {
                id
            }
        });
        if (OpeningTime === null) {
            return null;
        }
        if (id !== OpeningTime.id){
            return null;
        }
        return await OpeningTime.destroy();
    }

}