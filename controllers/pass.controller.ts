import {ModelCtor} from "sequelize";
import {PassCreationProps, PassInstance} from "../models/pass.model";
import {SequelizeManager} from "../models";

export class PassController {

    Pass: ModelCtor<PassInstance>;

    private static instance: PassController;

    public static async getInstance(): Promise<PassController> {
        if (PassController.instance === undefined) {
            const {Pass} = await SequelizeManager.getInstance();
            PassController.instance = new PassController(Pass);
        }
        return PassController.instance;

    }
    private constructor(Pass: ModelCtor<PassInstance>) {
        this.Pass = Pass;
    }

    public async add(props: PassCreationProps): Promise<PassInstance | null> {
        return this.Pass.create({
            ...props
        });
    }

    public async modify(id: number, name: string): Promise<PassInstance | null> {
        const pass = await this.Pass.findOne({
            where: {
                id
            }
        });
        if (pass === null) {
            return null;
        }
        if (id !== pass.id){
            return null;
        }
        pass.name = name;
        return await pass.save();
    }

    public async delete(id: number): Promise<void | null> {
        const pass = await this.Pass.findOne({
            where: {
                id
            }
        });
        if (pass === null) {
            return null;
        }
        if (id !== pass.id){
            return null;
        }
        return await pass.destroy();
    }

}