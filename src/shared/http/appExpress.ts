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
import { tratmentErrors } from "./middlewares/tratmentErrorsMiddleware";

const app = express();

//traffic messages
app.use(express.json());
//define router
app.use(router);

//case celebrate detected some error
app.use(errors());

//file static
app.use(express.static("uploads"));

//middleware to tratment.
app.use(tratmentErrors);

export { app };

