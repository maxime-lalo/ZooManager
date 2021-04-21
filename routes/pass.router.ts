import express from "express";
import {PassController} from "../controllers/pass.controller";

const passRouter = express.Router();

passRouter.post("/add", async function (req, res) {
    const name = req.body.name;
    if (name === undefined) {
        res.status(400).end();
        return;
    }
    const passController = await PassController.getInstance();
    const pass = await passController.add({
        name
    });
    if (pass !== null){
        res.status(201);
        res.json(pass);
    } else {
        res.status(409).end();
    }
});

passRouter.post("/update", async function (req, res) {
    const id = req.body.id;
    const name = req.body.name;
    if (id === undefined || name === undefined) {
        res.status(400).end();
        return;
    }
    const passController = await PassController.getInstance();
    const uPass = await passController.modify(id, name);
    if (uPass === null){
        res.status(404).end();
        return;
    } else {
        res.json(uPass);
    }
});

passRouter.post("/delete", async function (req,res) {
    const pass_id = req.body.id;
    if (pass_id !== undefined){
        const passController = await PassController.getInstance();
        const idPass = await passController.delete(pass_id);
        if (idPass !== null) {
            res.status(200);
            res.send("This pass has been deleted");
        } else {
            res.status(409).end();
            return;
        }
    } else {
        res.status(404).end();
    }
})

export {
    passRouter
}