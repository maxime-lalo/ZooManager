import express from "express";
import {ZooController} from "../controllers/zoo.controller";

const zooRouter = express.Router();

zooRouter.get("/isOpened",async function(req,res){
    const zooController = await ZooController.getInstance();
    res.json(await zooController.isOpened());
    res.status(200);
})

export {
    zooRouter
}