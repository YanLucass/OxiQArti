import { container } from "tsyringe";
import { Router } from "express";
import { IsAuthenticated } from "@shared/http/middlewares/IsAuthenticated";
import { CreateUserPublicationController } from "@userPublications/controllers/CreateUserPublicationController";
import { Joi, Segments, celebrate } from "celebrate";

//multer
import multer from "multer";
import uploadConfig from "@config/uploadImage";

const upload = multer(uploadConfig);
const userPublicationRouter = Router();

//controllers
const createUserPublicationController = container.resolve(CreateUserPublicationController);

//create user publication
userPublicationRouter.post(
   "/create",
   upload.array("images", 2),
   IsAuthenticated,
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

export { userPublicationRouter };
