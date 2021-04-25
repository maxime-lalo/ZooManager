import express from "express";
import {AuthController} from "../controllers/auth.controller";

export async function adminMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.headers["authorization"];
    if (auth !== undefined){
        const token = auth.slice(7);
        const authController = await AuthController.getInstance();
        const role = await authController.getRole(token);
        if (role !== null) {
            if (role.name_role === "Administrator"){
                next();
                return;
            }else{
                res.status(403).end();
                return;
            }
        } else {
            res.status(403).end();
            return;
        }
    } else {
        res.status(401).end();
    }
}