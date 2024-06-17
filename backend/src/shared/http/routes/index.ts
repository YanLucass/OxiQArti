import { usersRouter } from "@users/http/router/usersRouter";
import { authenticationRouter } from "@authentication/http/router/authenticationRouter";
import { Router } from "express";
import { publicationImageRouter } from "@publicationImages/http/router/PublicationImageRouter";
import { userPublicationRouter } from "@userPublications/http/router/userPublicationsRouter";
import { applicationRouter } from "@applications/http/applicationsRouter";
//all routers.
const router = Router();

//users router
router.use("/users", usersRouter);

//authentication routes
router.use("/auth", authenticationRouter);

//PublicationImages
router.use("/publicationImage", publicationImageRouter);

//User Publication
router.use("/userPublication", userPublicationRouter);

//application router
router.use("/applications", applicationRouter);

export { router };
