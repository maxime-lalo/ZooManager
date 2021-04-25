import {ModelCtor} from "sequelize";
import {UserCreationProps, UserInstance} from "../models/user.model";
import {SessionInstance} from "../models/session.model";
import {RoleInstance} from "../models/role.model";
import {SequelizeManager} from "../models";
import {compare, hash} from "bcrypt";

export class AuthController {

    User: ModelCtor<UserInstance>;
    Session: ModelCtor<SessionInstance>;
    Role: ModelCtor<RoleInstance>;

    private static instance: AuthController;

    public static async getInstance(): Promise<AuthController> {
        if (AuthController.instance === undefined) {
            const {User, Session, Role} = await SequelizeManager.getInstance();
            AuthController.instance = new AuthController(User, Session, Role);
        }
        return AuthController.instance;

    }
    private constructor(User: ModelCtor<UserInstance>, Session: ModelCtor<SessionInstance>, Role: ModelCtor<RoleInstance>) {
        this.User = User;
        this.Session = Session;
        this.Role = Role;
    }

    public async subscribe(props: UserCreationProps, name_role: string): Promise<UserInstance | null> {
        const role = await this.Role.findOne({
            where: {
                name_role
            }
        });

        if (role === null) {
            return null;
        }
        if (name_role !== role.name_role){
            return null;
        }

        const passwordHashed = await hash(props.password, 5);
        const user = await this.User.create({
            ...props,
            password: passwordHashed
        });
        await user.setRole(role);
        return user;
    }

    public async log(login: string, password: string): Promise<SessionInstance | null> {
        const user = await this.User.findOne({
            where: {
                login
            }
        });
        if (user === null) {
            return null;
        }
        const isSamePassword = await compare(password, user.password);
        if (!isSamePassword){
            return null;
        }
        const token = await hash(Date.now() + login, 5);

        const session = await this.Session.create({
            token
        });
        await session.setUser(user);
        return session;
    }

    public async getSession(token: string): Promise<SessionInstance | null> {
        return this.Session.findOne({
            where: {
                token
            }
        });
    }

    public async getRole(token: string): Promise<RoleInstance | null> {
        const session = await this.Session.findOne({
            where: {
                token
            }
        });
        if(session !== null){
            const user = await session.getUser();

            if (user !== null){
                return await user.getRole();
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

}