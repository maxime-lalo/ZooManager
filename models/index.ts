import {Dialect, ModelCtor, Sequelize} from "sequelize";
import userCreator, {UserInstance} from "./user.model";
import sessionCreator, {SessionInstance} from "./session.model";
import roleCreator, {RoleInstance} from "./role.model";
import userPassCreator, {UserPassInstance} from "./user_pass.model";
import passCreator, {PassInstance} from "./pass.model";
import passSpaceCreator, {PassSpaceInstance} from "./pass_space.model";
import spaceLogsCreator, {SpaceLogsInstance} from "./space_logs.model";
import animalHealthBookCreator, {AnimalHealthBookInstance} from "./animal_health_book.model";
import animalCreator, {AnimalInstance} from "./animal.model";
import spaceCreator, {SpaceInstance} from "./space.model";
import maintenanceSpaceCreator, {MaintenanceSpaceInstance} from "./maintenance_space.model";
import openingTimeCreator, {OpeningTimeInstance} from "./opening_time.model";
import spaceImageCreator, {SpaceImageInstance} from "./space_images.model";

export interface SequelizeManagerProps {
    sequelize: Sequelize;
    User: ModelCtor<UserInstance>;
    Session: ModelCtor<SessionInstance>;
    Role: ModelCtor<RoleInstance>;
    User_Pass: ModelCtor<UserPassInstance>;
    Pass: ModelCtor<PassInstance>;
    Pass_Space: ModelCtor<PassSpaceInstance>;
    Space_Logs: ModelCtor<SpaceLogsInstance>;
    Animal_HealthBook: ModelCtor<AnimalHealthBookInstance>;
    Animal: ModelCtor<AnimalInstance>;
    Space: ModelCtor<SpaceInstance>;
    Maintenance_Space: ModelCtor<MaintenanceSpaceInstance>;
    Opening_Time: ModelCtor<OpeningTimeInstance>;
    Space_Image: ModelCtor<SpaceImageInstance>;
}

export class SequelizeManager {

    private static instance?: SequelizeManager;

    sequelize: Sequelize;
    User: ModelCtor<UserInstance>;
    Session: ModelCtor<SessionInstance>;
    Role: ModelCtor<RoleInstance>;
    User_Pass: ModelCtor<UserPassInstance>;
    Pass: ModelCtor<PassInstance>;
    Pass_Space: ModelCtor<PassSpaceInstance>;
    Space_Logs: ModelCtor<SpaceLogsInstance>;
    Animal_HealthBook: ModelCtor<AnimalHealthBookInstance>;
    Animal: ModelCtor<AnimalInstance>;
    Space: ModelCtor<SpaceInstance>;
    Maintenance_Space: ModelCtor<MaintenanceSpaceInstance>;
    Opening_Time: ModelCtor<OpeningTimeInstance>;
    Space_Image: ModelCtor<SpaceImageInstance>;

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
            timezone: process.env.DB_TIMEZONE,
            port: Number.parseInt(process.env.DB_PORT as string)
        });
        await sequelize.authenticate();
        const managerProps: SequelizeManagerProps = {
            sequelize,
            User: userCreator(sequelize),
            Session: sessionCreator(sequelize),
            Role: roleCreator(sequelize),
            User_Pass: userPassCreator(sequelize),
            Pass: passCreator(sequelize),
            Pass_Space: passSpaceCreator(sequelize),
            Space_Logs: spaceLogsCreator(sequelize),
            Animal_HealthBook: animalHealthBookCreator(sequelize),
            Animal: animalCreator(sequelize),
            Space: spaceCreator(sequelize),
            Maintenance_Space: maintenanceSpaceCreator(sequelize),
            Opening_Time: openingTimeCreator(sequelize),
            Space_Image: spaceImageCreator(sequelize)
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

        props.Space.hasMany(props.Animal); // Space N Animal
        props.Animal.belongsTo(props.Space); // Animal 1 Space

        props.Role.hasOne(props.User); // Un user a un rôle

        props.Animal.hasMany(props.Animal_HealthBook); // Animal N Health Book
        props.Animal_HealthBook.belongsTo(props.Animal); // Healthbook Many Animals

        props.Space.hasMany(props.Space_Image);
        props.Space_Image.belongsTo(props.Space);

        props.Space.hasMany(props.Opening_Time);
        props.Opening_Time.belongsTo(props.Space);

        props.Space.hasMany(props.Maintenance_Space);
        props.Maintenance_Space.belongsTo(props.Space);

        props.Space.hasMany(props.Pass_Space);
        props.Pass_Space.belongsTo(props.Space);

        props.Pass.hasMany(props.Pass_Space);
        props.Pass_Space.belongsTo(props.Pass);

        props.Pass.hasMany(props.User_Pass);
        props.User_Pass.belongsTo(props.Pass);

        props.User.hasMany(props.User_Pass);
        props.User_Pass.belongsTo(props.User);

        props.Space.hasMany(props.Space_Logs);
        props.Space_Logs.belongsTo(props.Space);

        props.User.hasMany(props.Space_Logs);
        props.Space_Logs.belongsTo(props.User);
    }

    private constructor(props: SequelizeManagerProps) {
        this.sequelize = props.sequelize;
        this.User = props.User;
        this.Session = props.Session;
        this.Role = props.Role;
        this.User_Pass = props.User_Pass;
        this.Pass = props.Pass;
        this.Pass_Space = props.Pass_Space;
        this.Space_Logs = props.Space_Logs;
        this.Animal_HealthBook = props.Animal_HealthBook;
        this.Animal = props.Animal;
        this.Space = props.Space;
        this.Maintenance_Space = props.Maintenance_Space;
        this.Opening_Time = props.Opening_Time;
        this.Space_Image = props.Space_Image;
    }

}