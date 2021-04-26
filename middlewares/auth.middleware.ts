import express from "express";
import {AuthController} from "../controllers/auth.controller";

export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.headers["authorization"];
    if (auth !== undefined){
        const token = auth.slice(7);
        const authController = await AuthController.getInstance();
        const session = await authController.getSession(token);
        if (session !== null) {
            next();
            return;
        } else {
            res.status(403);
            res.json({
                "error": "You must be logged in to use this API"
            });
        }
    } else {
        res.status(401);
        res.json({
            "error": "You must have an account to use this API"
        });
    }
}