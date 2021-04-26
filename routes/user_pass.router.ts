import express from "express";
import {UserPassController} from "../controllers/user_pass.controller";

const userPassRouter = express.Router();

function getTimeNow(){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

userPassRouter.post("/add", async function (req, res) {
    const is_active = req.body.is_active;
    const acquisition_date = new Date(getTimeNow());
    const name_pass = req.body.name_pass;
    const user_id = req.body.user_id;

    if (is_active === undefined || acquisition_date === undefined || name_pass === undefined || user_id === undefined) {
        res.status(400).end();
        return;
    }
    const userPassController = await UserPassController.getInstance();
    const userPass = await userPassController.add({
        is_active,
        acquisition_date
    }, name_pass, user_id);
    if (userPass !== null){
        res.status(201);
        res.json(userPass);
    } else {
        res.status(409).end();
    }
});

userPassRouter.post("/update", async function (req, res) {
    const id = req.body.id;
    const is_active = req.body.is_active;
    const name_pass = req.body.name_pass;

    if (id === undefined || is_active === undefined || name_pass === undefined) {
        res.status(400).end();
        return;
    }
    const userPassController = await UserPassController.getInstance();
    const uUserPass = await userPassController.modify(id, is_active, name_pass);
    if (uUserPass === null){
        res.status(404).end();
        return;
    } else {
        res.json(uUserPass);
    }
});

userPassRouter.post("/delete", async function (req,res) {
    const UserPass_id = req.body.id;
    if (UserPass_id !== undefined){
        const userPassController = await UserPassController.getInstance();
        const idUserPass = await userPassController.delete(UserPass_id);
        if (idUserPass !== null) {
            res.status(200);
            res.send("This UserPass has been deleted");
        } else {
            res.status(409).end();
            return;
        }
    } else {
        res.status(404).end();
    }
})

export {
    userPassRouter
}