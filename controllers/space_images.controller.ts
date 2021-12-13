import {ModelCtor} from "sequelize";
import {SpaceImageCreationProps, SpaceImageInstance} from "../models/space_images.model";
import {SequelizeManager} from "../models";
import {SpaceInstance} from "../models/space.model";

export class SpaceImageController {

    SpaceImage: ModelCtor<SpaceImageInstance>;
    Space: ModelCtor<SpaceInstance>;

    private static instance: SpaceImageController;

    public static async getInstance(): Promise<SpaceImageController> {
        if (SpaceImageController.instance === undefined) {
            const {Space_Image, Space} = await SequelizeManager.getInstance();
            SpaceImageController.instance = new SpaceImageController(Space_Image, Space);
        }
        return SpaceImageController.instance;

    }
    private constructor(SpaceImage: ModelCtor<SpaceImageInstance>, Space: ModelCtor<SpaceInstance>) {
        this.SpaceImage = SpaceImage;
        this.Space = Space;
    }

    public async add(props: SpaceImageCreationProps, name_space: string): Promise<SpaceImageInstance | null> {
        const space = await this.Space.findOne({
            where: {
                name_space
            }
        });

        if (space === null) {
            return null;
        }
        if (name_space !== space.name_space){
            return null;
        }

        const spI = await this.SpaceImage.create({
            ...props
        });
        await spI.setSpace(space);
        return spI;
    }

    public async modify(id: number, image: string): Promise<SpaceImageInstance | null> {
        const spaceImage = await this.SpaceImage.findOne({
            where: {
                id
            }
        });
        if (spaceImage === null) {
            return null;
        }
        if (id !== spaceImage.id){
            return null;
        }

        spaceImage.image = image;
        return await spaceImage.save();
    }

    public async delete(id: number): Promise<void | null> {
        const spaceImage = await this.SpaceImage.findOne({
            where: {
                id
            }
        });
        if (spaceImage === null) {
            return null;
        }
        if (id !== spaceImage.id){
            return null;
        }
        return await spaceImage.destroy();
    }

}