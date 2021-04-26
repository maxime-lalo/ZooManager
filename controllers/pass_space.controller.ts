import {ModelCtor} from "sequelize";
import {PassSpaceCreationProps, PassSpaceInstance} from "../models/pass_space.model";
import {SequelizeManager} from "../models";
import {SpaceInstance} from "../models/space.model";
import {PassInstance} from "../models/pass.model";

export class PassSpaceController {

    PassSpace: ModelCtor<PassSpaceInstance>;
    Space: ModelCtor<SpaceInstance>;
    Pass: ModelCtor<PassInstance>;

    private static instance: PassSpaceController;

    public static async getInstance(): Promise<PassSpaceController> {
        if (PassSpaceController.instance === undefined) {
            const {Pass_Space, Space, Pass} = await SequelizeManager.getInstance();
            PassSpaceController.instance = new PassSpaceController(Pass_Space, Space, Pass);
        }
        return PassSpaceController.instance;

    }
    private constructor(PassSpace: ModelCtor<PassSpaceInstance>, Space: ModelCtor<SpaceInstance>, Pass: ModelCtor<PassInstance>) {
        this.PassSpace = PassSpace;
        this.Space = Space;
        this.Pass = Pass;
    }

    public async add(props: PassSpaceCreationProps, name_space: string, name_pass: string): Promise<PassSpaceInstance | null> {
        const space = await this.Space.findOne({
            where: {
                name_space
            }
        });
        const pass = await this.Pass.findOne({
            where: {
                name_pass
            }
        });

        if (space === null || pass === null) {
            return null;
        }
        if (name_space !== space.name_space || name_pass !== pass.name_pass){
            return null;
        }

        const pSpace = await this.PassSpace.create({
            ...props
        });
        await pSpace.setSpace(space);
        await pSpace.setPass(pass);
        return pSpace;
    }

    public async modify(id: number, order: number): Promise<PassSpaceInstance | null> {
        const passSpace = await this.PassSpace.findOne({
            where: {
                id
            }
        });
        if (passSpace === null) {
            return null;
        }
        if (id !== passSpace.id){
            return null;
        }

        passSpace.order = order;
        return await passSpace.save();
    }

    public async delete(id: number): Promise<void | null> {
        const passSpace = await this.PassSpace.findOne({
            where: {
                id
            }
        });
        if (passSpace === null) {
            return null;
        }
        if (id !== passSpace.id){
            return null;
        }
        return await passSpace.destroy();
    }

}