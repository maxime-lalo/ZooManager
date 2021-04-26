import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {UserInstance} from "../models/user.model";
import {SpaceInstance} from "../models/space.model";
import {SpaceLogsInstance} from "../models/space_logs.model";

export class ZooController {

    User: ModelCtor<UserInstance>;
    Space: ModelCtor<SpaceInstance>;
    Space_Logs: ModelCtor<SpaceLogsInstance>;

    private static instance: ZooController;

    public static async getInstance(): Promise<ZooController> {
        if (ZooController.instance === undefined) {
            const {User, Space, Space_Logs} = await SequelizeManager.getInstance();
            ZooController.instance = new ZooController(User, Space, Space_Logs);
        }
        return ZooController.instance;

    }

    private constructor(user: ModelCtor<UserInstance>, space: ModelCtor<SpaceInstance>, space_logs: ModelCtor<SpaceLogsInstance>) {
        this.User = user;
        this.Space = space;
        this.Space_Logs = space_logs;
    }

    public async isOpened():Promise<boolean>{
        const usersInZoo = await this.User.findAll({
            where: {
                "in_zoo" : true
            }
        });

        let hasHostess = false;
        let hasHealer = false;
        let hasCleanupAgent = false;
        let hasVendor = false;

        for(let i = 0; i < usersInZoo.length; i++){
            const userRole = await usersInZoo[i].getRole();
            if (userRole !== null){
                switch (userRole.name_role){
                    case "Hostess":
                        hasHostess = true;
                        break;
                    case "Healer":
                        hasHealer = true;
                        break;
                    case "CleanupAgent":
                        hasCleanupAgent = true;
                        break;
                    case "Vendor":
                        hasVendor = true;
                        break;
                    default:
                        break;
                }
            }
        }

        return (hasHostess && hasHealer && hasVendor && hasCleanupAgent);
    }

    public async joinSpace(userId : number, spaceId : number): Promise<SpaceLogsInstance | null>{
        const user = await this.User.findOne({
            where: {
                "id" : userId
            }
        });

        if(user === null){
            return null;
        }

        const spaceIn = await this.Space.findOne({
            where: {
                "id" : spaceId
            }
        });

        if (spaceIn === null){
            return null;
        }

        /**
         * Si le user est dans le zoo, c'est qu'il passe d'un space à un autre
         * il faut donc dire qu'il sort de son précedent in, log un out et ensuite log un in
         * Sinon c'est qu'il rentre dans le zoo
         */
        if(user.in_zoo){
            const lastSpaceIn = await this.Space_Logs.findOne({
                where: {
                    "in_out": true
                },
                include:{
                    model: this.User,
                    as: this.User.tableName,
                    where:{
                        '$User.id$' : userId
                    }
                },
                order: [
                    ['timestamp', 'DESC']
                ]
            });

            const lastSpaceInSpaceObj = await lastSpaceIn?.getSpace();

            // Si on essaie de sortir et d'entrer dans le même space
            if(spaceIn.id === await lastSpaceInSpaceObj?.id){
                return null;
            }
            const spaceLogOut = await this.Space_Logs.create({
                "in_out": false,
                "timestamp": new Date()
            });

            spaceLogOut.setSpace(await lastSpaceIn?.getSpace());
            spaceLogOut.setUser(user);
            await spaceLogOut.save();
        }else{
            user.in_zoo = true;
            await user.save();
        }

        // Dans les deux cas on log le in
        const spaceLogIn = await this.Space_Logs.create({
            "in_out": true,
            "timestamp": new Date()
        });

        spaceLogIn.setSpace(spaceIn);
        spaceLogIn.setUser(user);
        await spaceLogIn.save();

        return spaceLogIn;
    }

    public async leaveZoo(userId: number): Promise<UserInstance | null>{
        const user = await this.User.findOne({
            where: {
                "id" : userId
            }
        });

        if(user === null || user.in_zoo === false){
            return null;
        }

        const lastSpaceIn = await this.Space_Logs.findOne({
            where: {
                "in_out": true
            },
            include:{
                model: this.User,
                as: this.User.tableName,
                where:{
                    '$User.id$' : userId
                }
            },
            order: [
                ['timestamp', 'DESC']
            ]
        });

        const spaceLogOut = await this.Space_Logs.create({
            "in_out": false,
            "timestamp": new Date()
        });

        spaceLogOut.setSpace(await lastSpaceIn?.getSpace());
        spaceLogOut.setUser(user);
        await spaceLogOut.save();
        
        user.in_zoo = false;
        await user.save();
        return user;
    }
}