import {ModelCtor} from "sequelize";
import {UserPassCreationProps, UserPassInstance} from "../models/user_pass.model";
import {SequelizeManager} from "../models";
import {UserInstance} from "../models/user.model";
import {PassInstance} from "../models/pass.model";

export class UserPassController {

    UserPass: ModelCtor<UserPassInstance>;
    User: ModelCtor<UserInstance>;
    Pass: ModelCtor<PassInstance>;

    private static instance: UserPassController;

    public static async getInstance(): Promise<UserPassController> {
        if (UserPassController.instance === undefined) {
            const {User_Pass, User, Pass} = await SequelizeManager.getInstance();
            UserPassController.instance = new UserPassController(User_Pass, User, Pass);
        }
        return UserPassController.instance;

    }
    private constructor(UserPass: ModelCtor<UserPassInstance>, User: ModelCtor<UserInstance>, Pass: ModelCtor<PassInstance>) {
        this.UserPass = UserPass;
        this.User = User;
        this.Pass = Pass;
    }

    public async add(props: UserPassCreationProps, name_pass: string, user_id: number): Promise<UserPassInstance | null> {
        const pass = await this.Pass.findOne({
            where: {
                name_pass
            }
        });
        const user = await this.User.findOne({
            where: {
                id: user_id
            }
        });


        if (pass === null || user === null) {
            return null;
        }
        if (name_pass !== pass.name_pass || user_id !== user.id){
            return null;
        }

        const uPass = await this.UserPass.create({
            ...props
        });
        await uPass.setPass(pass);
        await uPass.setUser(user);
        return uPass;
    }

    public async modify(id: number, is_active: boolean, name_pass: string): Promise<UserPassInstance | null> {
        const userPass = await this.UserPass.findOne({
            where: {
                id
            }
        });
        const pass = await this.Pass.findOne({
            where: {
                name_pass
            }
        });
        if (userPass === null || pass === null) {
            return null;
        }
        if (id !== userPass.id || name_pass !== pass.name_pass){
            return null;
        }

        userPass.is_active = is_active;
        const uPass = await userPass.save();
        await uPass.setPass(pass);
        return uPass;
    }

    public async delete(id: number): Promise<void | null> {
        const userPass = await this.UserPass.findOne({
            where: {
                id
            }
        });
        if (userPass === null) {
            return null;
        }
        if (id !== userPass.id){
            return null;
        }
        return await userPass.destroy();
    }

}