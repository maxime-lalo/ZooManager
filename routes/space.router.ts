import express from "express";
import {SpaceController} from "../controllers/space.controller";

const spaceRouter = express.Router();

spaceRouter.get("/get",async function(req,res){
    const spaceController = await SpaceController.getInstance();
    res.status(200);
    res.json(await spaceController.getSpace(1));
})

export {
    spaceRouter
}