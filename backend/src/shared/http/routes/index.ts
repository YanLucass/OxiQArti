import { usersRouter } from "@users/http/router/usersRouter";
import { Router } from "express";

//all routers.
const router = Router();

//users router
router.use("/users", usersRouter);

export { router };
