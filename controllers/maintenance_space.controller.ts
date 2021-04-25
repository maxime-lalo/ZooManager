import {Model, ModelCtor} from "sequelize";
import {MaintenanceSpaceCreationProps, MaintenanceSpaceInstance} from "../models/maintenance_space.model";
import {SequelizeManager} from "../models";
import {SpaceInstance} from "../models/space.model";

export class MaintenanceSpaceController {

    Maintenance_Space: ModelCtor<MaintenanceSpaceInstance>;
    Space: ModelCtor<SpaceInstance>;

    private static instance: MaintenanceSpaceController;

    public static async getInstance(): Promise<MaintenanceSpaceController> {
        if (MaintenanceSpaceController.instance === undefined) {
            const {Maintenance_Space, Space} = await SequelizeManager.getInstance();
            MaintenanceSpaceController.instance = new MaintenanceSpaceController(Maintenance_Space, Space);
        }
        return MaintenanceSpaceController.instance;

    }

    private constructor(Maintenance_Space: ModelCtor<MaintenanceSpaceInstance>, Space: ModelCtor<SpaceInstance>) {
        this.Maintenance_Space = Maintenance_Space;
        this.Space = Space;
    }

    public async add(props: MaintenanceSpaceCreationProps):Promise<MaintenanceSpaceInstance | null>{
        return this.Maintenance_Space.create({
            ...props
        });
    }

    public async getOne(id: number): Promise<MaintenanceSpaceInstance | null>{
        return await this.Maintenance_Space.findOne({
            where: {
                id
            }
        })
    }

    public async getActive(id: number): Promise<boolean | null>{
        const space = await this.Space.findOne({
            where: {
                id
            }
        })

        if(space === null){
            return null;
        }else{
            const isInMaintenance = await this.Maintenance_Space.findOne({
                where:{
                    state: true
                },
                include: {
                    model: this.Space,
                    as: this.Space.tableName,
                    where: {
                        '$Space.id$' : id,
                    }
                },
                order: [
                    ['timestamp','DESC']
                ]
            });

            // Si on en trouve pas, il n'y a pas de maintenance active
            if (isInMaintenance !== null){
                return true;
            }else{
                return false;
            }
        }
    }
}