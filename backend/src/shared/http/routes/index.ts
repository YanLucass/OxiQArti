import { usersRouter } from "@users/http/router/usersRouter";
import { authenticationRouter } from "@authentication/http/router/authenticationRouter";
import { Router } from "express";

//all routers.
const router = Router();

//users router
router.use("/users", usersRouter);
//authentication routes
router.use("/auth", authenticationRouter);

export { router };
