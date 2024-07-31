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
import cors from "cors";

const app = express();
//traffic messages
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//define router

morganBody(app, {
    filterParameters: ["password"],
}); //morgan for console

//morgan to save request in files.
const logPath = path.join(__dirname, "./logs", `${moment().format("YYYY-MM-DD")}httpRequests$.log`);

const logStream = fs.createWriteStream(logPath, { flags: "a" });
morganBody(app, {
    noColors: true,
    stream: logStream,
    filterParameters: ["password"],
});

//define router

app.use(router);

//case celebrate detected some error
app.use(errors());

//file static
app.use("/uploads", express.static(path.join(__dirname, "../../../uploads")));
console.log(path.join(__dirname, "../../../uploads"));

//middleware to tratment.
app.use(tratmentErrors);

export { app };

