import { AppError } from "@shared/errors/AppError";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/test", (req, res) => {});

export { usersRouter };
