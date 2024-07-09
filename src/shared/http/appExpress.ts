import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
//router
import { router } from "./routes/";
//container
import "@shared/Container/containers";
//to celebrate
import { errors } from "celebrate";
import { tratmentErrors } from "@shared/http/middlewares/tratmentErrorsMiddleware";
//anothers
import morganBody from "morgan-body";
import path from "path";
import moment from "moment";
import fs from "fs";

const app = express();

//traffic messages
app.use(express.json());

const logPath = path.join(__dirname, "./logs", `${moment().format("YYYY-MM-DD")}httpRequests$.log`);

const logStream = fs.createWriteStream(logPath, { flags: "a" });

//define router

morganBody(app, {
    noColors: true,
    stream: logStream,
    filterParameters: ["password"],
});
app.use(router);

//case celebrate detected some error
app.use(errors());

//file static
app.use(express.static("uploads"));

//middleware to tratment.
app.use(tratmentErrors);

export { app };

