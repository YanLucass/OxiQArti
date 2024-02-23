import express, { NextFunction, Request, Response } from "express";
const app = express();
//router
import { router } from "./routes/";
import { AppError } from "@shared/errors/AppError";

//traffic messages
app.use(express.json());
//define router
app.use(router);

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
   return res.status(500).json({
      status: "error",
      message: "Internal server error",
   });
});

export { app };
