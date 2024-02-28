import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";
const artistsRouter = Router();

//multer
import multer from "multer";
//import uploadConfig
import uploadConfig from "@config/uploadImage";

//import controllers
import { CreateArtistController } from "@artists/controllers/CreateArtistController";

//controller instance
const createArtistController = container.resolve(CreateArtistController);

//multer middleware
const upload = multer(uploadConfig);

//create new artist
artistsRouter.post(
   "/",
   upload.single("image"),
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         name: Joi.string().required().messages({
            "any.required": "O nome é obrigatório",
         }),

         email: Joi.string().email().required().messages({
            "any.required": "O email é obrigatório!",
            "string.email": "Por favor, insira um e-mail válido!",
         }),

         phone: Joi.string().required().messages({
            "any.required": "O telefone é obrigatório",
         }),

         anotherContacts: Joi.string().optional(),

         url: Joi.string().optional(),

         state: Joi.string().required().messages({
            "any.required": "O estado é obrigatório",
         }),

         city: Joi.string().required().messages({
            "any.required": "A cidade é obrigatória",
         }),

         specialty: Joi.string().optional(),

         password: Joi.string().required().messages({
            "any.required": "A senha é obrigatória!",
         }),

         confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
            "any.required": "A confirmação de senha é obrigatória!",
            "any.only": "As senhas devem ser iguais",
         }),
      }),
   }),

   (req, res) => {
      return createArtistController.handle(req, res);
   },
);

export { artistsRouter };
