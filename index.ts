import {config} from "dotenv";
config();
import express, {Express} from "express";

const app: Express = express();

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Listening on ${port}...`);
});