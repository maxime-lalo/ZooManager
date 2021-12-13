import express from "express";
import {SpaceImageController} from "../controllers/space_images.controller";

const spaceImageRouter = express.Router();

spaceImageRouter.post("/add", async function (req, res) {
    const image = req.body.image;
    const name_space = req.body.name_space;

    if (image === undefined || name_space === undefined) {
        res.status(400).end();
        return;
    }
    const spaceImageController = await SpaceImageController.getInstance();
    const spaceImage = await spaceImageController.add({
        image
    }, name_space);
    if (spaceImage !== null){
        res.status(201);
        res.json(spaceImage);
    } else {
        res.status(409).end();
    }
});

spaceImageRouter.post("/update", async function (req, res) {
    const id = req.body.id;
    const image = req.body.image;

    if (id === undefined || image === undefined) {
        res.status(400).end();
        return;
    }
    const spaceImageController = await SpaceImageController.getInstance();
    const uSpaceImage = await spaceImageController.modify(id, image);
    if (uSpaceImage === null){
        res.status(404).end();
        return;
    } else {
        res.json(uSpaceImage);
    }
});

spaceImageRouter.post("/delete", async function (req,res) {
    const OpeningTime_id = req.body.id;
    if (OpeningTime_id !== undefined){
        const spaceImageController = await SpaceImageController.getInstance();
        const idOpeningTime = await spaceImageController.delete(OpeningTime_id);
        if (idOpeningTime !== null) {
            res.status(200);
            res.send("This SpaceImage has been deleted");
        } else {
            res.status(409).end();
            return;
        }
    } else {
        res.status(404).end();
    }
})

export {
    spaceImageRouter
}