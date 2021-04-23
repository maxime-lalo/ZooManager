import {ModelCtor} from "sequelize";
import {RoleCreationProps, RoleInstance} from "../models/role.model";
import {SequelizeManager} from "../models";

export class RoleController {

    Role: ModelCtor<RoleInstance>;

    private static instance: RoleController;

    public static async getInstance(): Promise<RoleController> {
        if (RoleController.instance === undefined) {
            const {Role} = await SequelizeManager.getInstance();
            RoleController.instance = new RoleController(Role);
        }
        return RoleController.instance;

    }
    private constructor(Role: ModelCtor<RoleInstance>) {
        this.Role = Role;
    }

    public async add(props: RoleCreationProps): Promise<RoleInstance | null> {
        return this.Role.create({
            ...props
        });
    }

    public async modify(id: number, name_role: string): Promise<RoleInstance | null> {
        const role = await this.Role.findOne({
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
        role.name_role = name_role;
        return await role.save();
    }

    public async delete(id: number): Promise<void | null> {
        const role = await this.Role.findOne({
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