import express from "express";
import {PassSpaceController} from "../controllers/pass_space.controller";

const passSpaceRouter = express.Router();

passSpaceRouter.post("/add", async function (req, res) {
    const order = req.body.order;
    const name_space = req.body.name_space;
    const name_pass = req.body.name_pass;

    if (order === undefined || name_space === undefined || name_pass === undefined) {
        res.status(400).end();
        return;
    }
    const passSpaceController = await PassSpaceController.getInstance();
    const passSpace = await passSpaceController.add({
        order
    }, name_space, name_pass);
    if (passSpace !== null){
        res.status(201);
        res.json(passSpace);
    } else {
        res.status(409).end();
    }
});

passSpaceRouter.post("/update", async function (req, res) {
    const id = req.body.id;
    const order = req.body.order;

    if (id === undefined || order === undefined) {
        res.status(400).end();
        return;
    }
    const passSpaceController = await PassSpaceController.getInstance();
    const uPassSpace = await passSpaceController.modify(id, order);
    if (uPassSpace === null){
        res.status(404).end();
        return;
    } else {
        res.json(uPassSpace);
    }
});

passSpaceRouter.post("/delete", async function (req,res) {
    const PassSpace_id = req.body.id;
    if (PassSpace_id !== undefined){
        const passSpaceController = await PassSpaceController.getInstance();
        const idPassSpace = await passSpaceController.delete(PassSpace_id);
        if (idPassSpace !== null) {
            res.status(200);
            res.send("This PassSpace has been deleted");
        } else {
            res.status(409).end();
            return;
        }
    } else {
        res.status(404).end();
    }
})

export {
    passSpaceRouter
}