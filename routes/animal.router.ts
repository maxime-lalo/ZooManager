import express from "express";
import {AnimalController} from "../controllers/animal.controller";
import {veterinaryMiddleware} from "../middlewares/veterinary.middleware";
import {SpaceController} from "../controllers/space.controller";

const animalRouter = express.Router();

animalRouter.get("/get", async function(req,res){
    const animalController = await AnimalController.getInstance();
    res.json(await animalController.getAll());
    res.status(200);
});

animalRouter.get('/get/:id', async function(req, res){
    const animalController = await AnimalController.getInstance();
    const animal = await animalController.getOne(parseInt(req.params.id));
    if (animal){
        res.json(animal);
        res.status(200);
    }else{
        res.status(404);
        res.end();
    }
});

animalRouter.post("/add", async function (req, res) {
    const species = req.body.species;
    const space = req.body.space;
    if (species === undefined || space === undefined) {
        res.status(400).end();
        return;
    }

    const animalController = await AnimalController.getInstance();
    const animal = await animalController.add({
        species
    });

    if (animal !== null){
        await animal.setSpace(space);
        await animal.save();
        res.status(201);
        res.json(animal);
    } else {
        res.status(409).end();
    }
});

animalRouter.delete("/delete", async function (req,res) {
    const id = req.body.id;
    if (id !== undefined){
        const controller = await AnimalController.getInstance();
        const idElement = await controller.delete(id);
        if (idElement !== null) {
            res.status(200);
            res.send("This element has been deleted");
        } else {
            res.status(409).end();
            return;
        }
    } else {
        res.status(404).end();
    }
});

animalRouter.post("/addHealthBook", veterinaryMiddleware, async function(req, res){
    const animal = req.body.animal;
    const commentary = req.body.commentary;

    if (animal === undefined || commentary === undefined){
        res.status(400).end();
        return null;
    }

    const controller = await AnimalController.getInstance();

    const healthBook = await controller.addHealthBook(animal,commentary);
    if(healthBook !== null){
        res.status(201);
        res.json(healthBook);
    }else{
        res.status(400).end();
    }
});

animalRouter.post("/changeSpace", async function(req, res){
    const id = req.body.id;
    const space = req.body.space;

    if (id === null || space === null){
        res.status(400);
        res.json({
            "error" : "Missing fields"
        })
    }

    const animalController = await AnimalController.getInstance();
    const animal = await animalController.modify(id, space);
    if (animal === null){
        res.status(404).end();
        return;
    } else {
        res.status(204);
        res.json(animal);
    }
})

export {
    animalRouter
}