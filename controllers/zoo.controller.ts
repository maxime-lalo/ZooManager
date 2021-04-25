import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {UserInstance} from "../models/user.model";

export class ZooController {

    User: ModelCtor<UserInstance>;

    private static instance: ZooController;

    public static async getInstance(): Promise<ZooController> {
        if (ZooController.instance === undefined) {
            const {User} = await SequelizeManager.getInstance();
            ZooController.instance = new ZooController(User);
        }
        return ZooController.instance;

    }

    private constructor(user: ModelCtor<UserInstance>) {
        this.User = user;
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
}