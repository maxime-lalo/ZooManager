import {Express} from "express";
import {authRouter} from "./auth.router";
import {spaceRouter} from "./space.router";

export function buildRoutes(app: Express) {
    app.use("/auth", authRouter);
    app.use("/space", spaceRouter);
}