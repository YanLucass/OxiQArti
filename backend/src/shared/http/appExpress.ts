import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
//router
import { router } from "./routes/";
import { AppError } from "@shared/errors/AppError";

//container
import "@shared/Container/containers";

//to celebrate
import { errors } from "celebrate";

const app = express();

//traffic messages
app.use(express.json());
//define router
app.use(router);

//case celebrate detected some error
app.use(errors());

//file static
app.use(express.static("uploads"));

//middleware to class AppError.
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
   //our class of erros
   if (error instanceof AppError) {
      //return error and statusCode reported in class AppError.
      return res.status(error.statusCode).json({
         status: "error",
         message: error.message,
      });
   }

   //case server error
   console.log(error);

   return res.status(500).json({
      status: "error",
      message: "Internal server error",
   });
});

export { app };
