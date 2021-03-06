import express from "express";
import {OpeningTimeController} from "../controllers/opening_time.controller";

const openingTimeRouter = express.Router();

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

openingTimeRouter.post("/add", async function (req, res) {
    const opening_time = req.body.opening_time;
    const closing_time = req.body.closing_time;
    const day = req.body.day;
    const name_space = req.body.name_space;
    if (opening_time === undefined || closing_time === undefined || day === undefined) {
        res.status(400).end();
        return;
    }
    const openingTimeController = await OpeningTimeController.getInstance();
    const openingTime = await openingTimeController.add({
        opening_time,
        closing_time,
        day
    }, name_space);
    if (openingTime !== null){
        res.status(201);
        res.json(openingTime);
    } else {
        res.status(409).end();
    }
});

openingTimeRouter.post("/update", async function (req, res) {
    const id = req.body.id;
    const opening_time = checkDate(req.body.opening_time);
    const closing_time = checkDate(req.body.closing_time);
    const day = checkNumber(req.body.day);

    opening_time !== undefined || null ? req.body.opening_time = opening_time : req.body.opening_time;
    closing_time !== undefined || null ? req.body.closing_time = closing_time : req.body.closing_time;
    day !== undefined || null ? req.body.day = day : req.body.day;

    if (id === undefined || opening_time === undefined || closing_time === undefined || day === undefined) {
        res.status(400).end();
        return;
    }
    const openingTimeController = await OpeningTimeController.getInstance();
    const uOpeningTime = await openingTimeController.modify(id, opening_time, closing_time, day);
    if (uOpeningTime === null){
        res.status(404).end();
        return;
    } else {
        res.json(uOpeningTime);
    }
});

openingTimeRouter.post("/delete", async function (req,res) {
    const OpeningTime_id = req.body.id;
    if (OpeningTime_id !== undefined){
        const openingTimeController = await OpeningTimeController.getInstance();
        const idOpeningTime = await openingTimeController.delete(OpeningTime_id);
        if (idOpeningTime !== null) {
            res.status(200);
            res.send("This OpeningTime has been deleted");
        } else {
            res.status(409).end();
            return;
        }
    } else {
        res.status(404).end();
    }
})

export {
    openingTimeRouter
}