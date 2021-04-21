import {Express} from "express";
import {authRouter} from "./auth.router";
import {roleRouter} from "./role.router";
import {spaceRouter} from "./space.router";
import {passRouter} from "./pass.router";

export function buildRoutes(app: Express) {
    app.use("/auth", authRouter);
    app.use("/role", roleRouter);
    app.use("/space", spaceRouter);
    app.use("/pass", passRouter);
}