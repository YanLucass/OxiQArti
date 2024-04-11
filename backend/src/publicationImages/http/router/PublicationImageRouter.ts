import { Router } from "express";
import { container } from "tsyringe";
//multer
import multer from "multer";
import uploadConfig from "@config/uploadImage";

const publicationImageRouter = Router();

//import controllers
import { CreatePublicationImageController } from "@publicationImages/controllers/CreatePublicationImageController";
import { IsAuthenticated } from "@shared/http/middlewares/IsAuthenticated";

const upload = multer(uploadConfig);

//get controller
const createPublicationImageController = container.resolve(CreatePublicationImageController);
//router to create publication image
publicationImageRouter.post("/create", upload.array("images", 2), IsAuthenticated, (req, res) => {
   return createPublicationImageController.handle(req, res);
});

export { publicationImageRouter };
