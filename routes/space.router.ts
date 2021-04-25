import express from "express";
import {SpaceController} from "../controllers/space.controller";

const spaceRouter = express.Router();

function checkString(value: string | null | undefined){
    if (value !== undefined && value !== null) {
        return value;
    }
}

function checkNumber(value: number | null | undefined){
    if (value !== undefined && value !== null) {
        return value;
    }
}
function checkDate(value: Date | null | undefined){
    if (value !== undefined && value !== null) {
        return value;
    }
}

function checkBool(value: boolean | null | undefined){
    if (value !== undefined && value !== null) {
        return value;
    }
}

spaceRouter.get("/get",async function(req,res){
    const spaceController = await SpaceController.getInstance();
    res.json(await spaceController.getAll());
    res.status(200);
})

spaceRouter.get("/get/:id",async function(req,res){
    const spaceController = await SpaceController.getInstance();
    const space = await spaceController.getSpace(parseInt(req.params.id));
    if (space){
        res.json(space);
        res.status(200);
    }else{
        res.status(404);
        res.end();
    }
})

spaceRouter.post("/add", async function (req, res) {
    const name_space = req.body.name_space;
    const description = req.body.description;
    const type = req.body.type;
    const capacity = req.body.capacity;
    const duration = req.body.duration;
    const handicap_access = req.body.handicap_access;
    if (name_space === undefined || description === undefined || type === undefined || capacity === undefined || duration === undefined || handicap_access === undefined) {
        res.status(400).end();
        return;
    }
    const spaceController = await SpaceController.getInstance();
    const space = await spaceController.add({
        name_space,
        description,
        type,
        capacity,
        duration,
        handicap_access
    });
    if (space !== null){
        res.status(201);
        res.json(space);
    } else {
        res.status(409).end();
    }
});

spaceRouter.post("/update", async function (req, res) {
    const name_space = checkString(req.body.name_space);
    const description = checkString(req.body.description);
    const type = checkString(req.body.type);
    const capacity = checkNumber(req.body.capacity);
    const duration = checkDate(req.body.duration);
    const handicap_access = checkBool(req.body.handicap_access);
    const id = req.body.id;

    /*if (req.body.name_space_space) {
        const name_space = req.body.name_space;
    }
    if (req.body.description) {
        const description = req.body.description;
    }
    if (req.body.type) {
        const type = req.body.type;
    }
    if (req.body.capacity) {
        const capacity = req.body.capacity;
    }
    if (req.body.duration) {
        const duration = req.body.duration;
    }
    if (req.body.opening_time) {
        const opening_time = req.body.opening_time;
    }
    if (req.body.handicap_access) {
        const handicap_access = req.body.handicap_access;
    }
    if (req.body.is_active) {
        const is_active = req.body.is_active;
    }*/

    name_space !== undefined || null ? req.body.name_space = name_space : req.body.name_space;
    description !== undefined || null ? req.body.description = description : req.body.description;
    type !== undefined || null ? req.body.type = type : req.body.type;
    capacity !== undefined || null ? req.body.capacity = capacity : req.body.capacity;
    duration !== undefined || null ? req.body.duration = duration : req.body.duration;
    handicap_access !== undefined || null ? req.body.handicap_access = handicap_access : req.body.handicap_access;

    /*if (name_space === undefined || description === undefined || type === undefined || capacity === undefined || duration === undefined || opening_time === undefined || handicap_access === undefined || is_active === undefined || id) {
        res.status(400).end();
        return;
    }*/
    const spaceController = await SpaceController.getInstance();
    // @ts-ignore
    const space = await spaceController.modify(id, name_space, description, type, capacity, duration, handicap_access);
    if (space === null){
        res.status(404).end();
        return;
    } else {
        res.json(space);
    }
});

spaceRouter.post("/delete", async function (req,res) {
    const space_id = req.body.id;
    if (space_id !== undefined){
        const spaceController = await SpaceController.getInstance();
        const idSpace = await spaceController.delete(space_id);
        if (idSpace !== null) {
            res.status(200);
            res.send("This space has been deleted");
        } else {
            res.status(409).end();
            return;
        }
    } else {
        res.status(404).end();
    }
})

export {
    spaceRouter
}