import { Router } from "express";
import { container } from "tsyringe";
//multer
import multer from "multer";
import uploadConfig from "@config/uploadImage";

const publicationImageRouter = Router();

//import controllers
import { CreatePublicationImageController } from "@publicationImages/controllers/CreatePublicationImageController";
import { IsAuthenticated } from "@shared/http/middlewares/IsAuthenticated";
import { authRoles } from "@applications/middlewares/authRoles";

const upload = multer(uploadConfig);

//get controller
const createPublicationImageController = container.resolve(CreatePublicationImageController);
//router to create publication image
publicationImageRouter.post(
    "/create",
    upload.array("images", 2),
    IsAuthenticated,
    authRoles(["onlyArtist", "contractingArtist"]),
    req => {
        return createPublicationImageController.handle(req);
    },
);

export { publicationImageRouter };

