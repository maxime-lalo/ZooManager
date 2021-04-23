import express from "express";
import {RoleController} from "../controllers/role.controller";

const roleRouter = express.Router();

roleRouter.post("/add", async function (req, res) {
    const name_role = req.body.name_role;
    if (name_role === undefined) {
        res.status(400).end();
        return;
    }
    const roleController = await RoleController.getInstance();
    const role = await roleController.add({
        name_role
    });
    if (role !== null){
        res.status(201);
        res.json(role);
    } else {
        res.status(409).end();
    }
});

roleRouter.post("/update", async function (req, res) {
    const id = req.body.id;
    const name_role = req.body.name_role;
    if (id === undefined || name_role === undefined) {
        res.status(400).end();
        return;
    }
    const roleController = await RoleController.getInstance();
    const uRole = await roleController.modify(id, name_role);
    if (uRole === null){
        res.status(404).end();
        return;
    } else {
        res.json(uRole);
    }
});

roleRouter.post("/delete", async function (req,res) {
    const role_id = req.body.id;
    if (role_id !== undefined){
        const roleController = await RoleController.getInstance();
        const idRole = await roleController.delete(role_id);
        if (idRole !== null) {
            res.status(200);
            res.send("This role has been deleted");
        } else {
            res.status(409).end();
            return;
        }
    } else {
        res.status(404).end();
    }
})

export {
    roleRouter
}