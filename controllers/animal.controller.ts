import {Model, ModelCtor} from "sequelize";
import {AnimalCreationProps, AnimalInstance} from "../models/animal.model";
import {SequelizeManager} from "../models";
import {SpaceInstance} from "../models/space.model";
import {AnimalHealthBookInstance} from "../models/animal_health_book.model";

export class AnimalController {

    Animal: ModelCtor<AnimalInstance>;
    Space: ModelCtor<SpaceInstance>;
    Animal_HealthBook: ModelCtor<AnimalHealthBookInstance>;
    private static instance: AnimalController;

    public static async getInstance(): Promise<AnimalController> {
        if (AnimalController.instance === undefined) {
            const {Animal, Space, Animal_HealthBook} = await SequelizeManager.getInstance();
            AnimalController.instance = new AnimalController(Animal, Space, Animal_HealthBook);
        }
        return AnimalController.instance;

    }

    private constructor(Animal: ModelCtor<AnimalInstance>,
                        Space: ModelCtor<SpaceInstance>,
                        Animal_HealthBook: ModelCtor<AnimalHealthBookInstance>) {
        this.Animal = Animal;
        this.Space = Space;
        this.Animal_HealthBook = Animal_HealthBook;
    }

    public async getAll():Promise<Array<AnimalInstance>>{
        return await this.Animal.findAll();
    }

    public async getOne(id: number):Promise<AnimalInstance | null>{
        return await this.Animal.findOne({
            where:{
                id
            }
        })
    }

    public async add(props: AnimalCreationProps):Promise<AnimalInstance | null>{
        return this.Animal.create({
            ...props
        })
    }

    public async delete(id: number){
        const animal = await this.Animal.findOne({
            where: {
                id
            }
        });
        if(animal === null){
            return null;
        }
        if (id !== animal.id){
            return null;
        }
        return await animal.destroy();
    }

    public async addHealthBook(id: number,commentary: string):Promise<AnimalHealthBookInstance | null>{
        const animal = await this.Animal.findOne({
            where:{
                id
            }
        });

        if(animal === null){
            return null;
        }else{
            const healthBook = await this.Animal_HealthBook.create({
                commentary,
                'timestamp' : new Date()
            });
            await healthBook.setAnimal(animal);
            await healthBook.save();

            return healthBook;
        }
    }

    public async modify(id:number, space_id: number): Promise<AnimalInstance | null>{
        const animal = await this.Animal.findOne({
            where:{
                id
            }
        });

        if (animal === null){
            return null;
        }

        const space = await this.Space.findOne({
            where:{
                "id" : space_id
            }
        });

        if (space === null){
            return null;
        }

        animal.setSpace(space);
        return await animal.save();
    }
}