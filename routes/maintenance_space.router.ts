import express from "express";
import {MaintenanceSpaceController} from "../controllers/maintenance_space.controller";
import {adminMiddleware} from "../middlewares/admin.middleware";

const maintenanceSpaceRouter = express.Router();

maintenanceSpaceRouter.post("/add", adminMiddleware, async function (req, res) {
    const space = req.body.space;
    if(space === undefined){
        res.status(400).end();
        return;
    }

    const maintenanceController = await MaintenanceSpaceController.getInstance();

    const isAlreadyMaintained = await maintenanceController.getActive(space);

    if(isAlreadyMaintained){
        res.status(409);
        res.json({
            "error": "This space is already in maintenance"
        });
        return;
    }

    const maintenance = await maintenanceController.add({
        "timestamp" : new Date(),
        "state" : true
    })

    if(maintenance !== null){
        await maintenance.setSpace(space);
        await maintenance.save();

        res.status(201);
        res.json(maintenance);
    }else{
        res.status(400).end();
        return;
    }
});

export {
    maintenanceSpaceRouter
}