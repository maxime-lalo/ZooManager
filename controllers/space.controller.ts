import {ModelCtor} from "sequelize";
import {SpaceCreationProps, SpaceInstance} from "../models/space.model";
import {SequelizeManager} from "../models";
import {RoleCreationProps, RoleInstance} from "../models/role.model";
import {hash} from "bcrypt";
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

    public async add(props: SpaceCreationProps): Promise<SpaceInstance | null> {
        return this.Space.create({
            ...props
        });
    }

    public async modify(id: number,name: string, description: string, type: string, capacity: number, duration: Date, opening_time: Date, handicap_access: boolean, is_active: boolean): Promise<SpaceInstance | null> {
        const space = await this.Space.findOne({
            where: {
                id
            }
        });
        if (space === null) {
            return null;
        }
        if (id !== space.id){
            return null;
        }
        name !== undefined || null ? space.name = name : space.name;
        description !== undefined || null ? space.description = description : space.description;
        type !== undefined || null ? space.type = type : space.type;
        capacity !== undefined || null ? space.capacity = capacity : space.capacity;
        duration !== undefined || null ? space.duration = duration : space.duration;
        opening_time !== undefined || null ? space.opening_time = opening_time : space.opening_time;
        handicap_access !== undefined || null ? space.handicap_access = handicap_access : space.handicap_access;
        is_active !== undefined || null ? space.is_active = is_active : space.is_active;
        return await space.save();
    }

    public async delete(id: number): Promise<void | null> {
        const role = await this.Space.findOne({
            where: {
                id
            }
        });
        if (role === null) {
            return null;
        }
        if (id !== role.id){
            return null;
        }
        return await role.destroy();
    }

}