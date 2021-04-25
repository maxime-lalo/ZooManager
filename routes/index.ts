import {Express} from "express";
import {authRouter} from "./auth.router";
import {roleRouter} from "./role.router";
import {spaceRouter} from "./space.router";
import {passRouter} from "./pass.router";
import {zooRouter} from "./zoo.router";
import {maintenanceSpaceRouter} from "./maintenance_space.router";
import {openingTimeRouter} from "./opening_time.router";
import {spaceImageRouter} from "./space_images.router";
import {animalRouter} from "./animal.router";

export function buildRoutes(app: Express) {
    app.use("/auth", authRouter);
    app.use("/role", roleRouter);
    app.use("/space", spaceRouter);
    app.use("/pass", passRouter);
    app.use("/zoo", zooRouter);
    app.use("/maintenance_space", maintenanceSpaceRouter);
    app.use("/openingTime", openingTimeRouter);
    app.use("/spaceImage", spaceImageRouter);
    app.use("/animal", animalRouter);
}