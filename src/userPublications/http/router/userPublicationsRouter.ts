import { container } from "tsyringe";
import { Router } from "express";
import { IsAuthenticated } from "@shared/http/middlewares/IsAuthenticated";
import { CreateUserPublicationController } from "@userPublications/controllers/CreateUserPublicationController";
import { Joi, Segments, celebrate } from "celebrate";

//multer
import multer from "multer";
import uploadConfig from "@config/uploadImage";
import { GetAllUserPublicationController } from "@userPublications/controllers/GetAllUserPublicationController";
import { authRoles } from "@applications/middlewares/authRoles";

const upload = multer(uploadConfig);
const userPublicationRouter = Router();

//controllers
const createUserPublicationController = container.resolve(CreateUserPublicationController);
const getAllUserPublicationController = container.resolve(GetAllUserPublicationController);

//create user publication
userPublicationRouter.post(
    "/create",
    upload.array("images", 2),
    IsAuthenticated,
    authRoles(["onlyContracting", "contractingArtist"]),
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().optional(),
            description: Joi.string().required().messages({
                "any.required": "A descrição é obrigatória!",
            }),

            service: Joi.string().required().messages({
                "any.required": "Hey, forneça um servico. Exemplo: Pintura a oléo",
            }),
        }),
    }),

    (req, res) => {
        return createUserPublicationController.handle(req, res);
    },
);

//get all userPublication
userPublicationRouter.get("/getAll", (req, res) => {
    return getAllUserPublicationController.handle(req, res);
});

export { userPublicationRouter };

