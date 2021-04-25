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

    public async modify(id: number, opening_time: Date, closing_time: Date, day: number): Promise<OpeningTimeInstance | null> {
        const openingTime = await this.OpeningTime.findOne({
            where: {
                id
            }
        });
        if (openingTime === null) {
            return null;
        }
        if (id !== openingTime.id){
            return null;
        }
        opening_time !== undefined || null ? openingTime.opening_time = opening_time : openingTime.opening_time;
        closing_time !== undefined || null ? openingTime.closing_time = closing_time : openingTime.closing_time;
        day !== undefined || null ? openingTime.day = day : openingTime.day;

        return await openingTime.save();
    }

    public async delete(id: number): Promise<void | null> {
        const openingTime = await this.OpeningTime.findOne({
            where: {
                id
            }
        });
        if (openingTime === null) {
            return null;
        }
        if (id !== openingTime.id){
            return null;
        }
        return await openingTime.destroy();
    }

}