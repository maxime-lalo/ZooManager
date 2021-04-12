import {Dialect, ModelCtor, Sequelize} from "sequelize";
import userCreator, {UserInstance} from "./user.model";
import sessionCreator, {SessionInstance} from "./session.model";

export interface SequelizeManagerProps {
    sequelize: Sequelize;
    User: ModelCtor<UserInstance>;
    Session: ModelCtor<SessionInstance>;
}

export class SequelizeManager {

    private static instance?: SequelizeManager;

    sequelize: Sequelize;
    User: ModelCtor<UserInstance>;
    Session: ModelCtor<SessionInstance>;

    public static async getInstance(): Promise<SequelizeManager> {
        if (SequelizeManager.instance === undefined) {
            SequelizeManager.instance = await SequelizeManager.initialize();
        }
        return SequelizeManager.instance;
    }

    private static async initialize(): Promise<SequelizeManager> {
        const sequelize = new Sequelize({
            dialect: process.env.DB_DRIVER as Dialect,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number.parseInt(process.env.DB_PORT as string)
        });
        await sequelize.authenticate();
        const managerProps: SequelizeManagerProps = {
            sequelize,
            User: userCreator(sequelize),
            Session: sessionCreator(sequelize)
        }
        SequelizeManager.associate(managerProps);
        await sequelize.sync({
            //force: true // reinitialise la bdd COMPLETEMENT
        });
        return new SequelizeManager(managerProps);
    }

    private static associate(props: SequelizeManagerProps): void {
        props.User.hasMany(props.Session); // User N Session
        props.Session.belongsTo(props.User); // Session 1 User
    }

    private constructor(props: SequelizeManagerProps) {
        this.sequelize = props.sequelize;
        this.User = props.User;
        this.Session = props.Session;
    }

}