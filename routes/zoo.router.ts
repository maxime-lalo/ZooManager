import express from "express";
import {ZooController} from "../controllers/zoo.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {AuthController} from "../controllers/auth.controller";

const zooRouter = express.Router();

zooRouter.get("/isOpened",async function(req,res){
    const zooController = await ZooController.getInstance();
    res.json(await zooController.isOpened());
    res.status(200);
})

zooRouter.post("/joinSpace",authMiddleware, async function(req, res){
    const zooController = await ZooController.getInstance();
    const authController = await AuthController.getInstance();

    const auth = req.headers["authorization"];

    if (auth !== undefined) {
        const token = auth.slice(7);
        const idSpace = req.body.space;
        if (idSpace === null){
            res.status(400);
            res.json({
                "error" : "Missing fields"
            });
        }else{
            const session = await authController.getSession(token);
            const user = await session?.getUser();

            if (user === undefined){
                res.status(400);
                res.json({
                    "error" : "Incorrect user"
                });
            }else{
                const logs = await zooController.joinSpace(user.id, idSpace);
                if (logs === null){
                    res.status(400);
                    res.json({
                        "error" : "Incorrect fields"
                    });
                }else{
                    res.status(201);
                    res.json(logs);
                }
            }
        }
    }else{
        res.status(403);
        res.json({
            "error" : "Must have a valid token"
        });
    }
});

export {
    zooRouter
}