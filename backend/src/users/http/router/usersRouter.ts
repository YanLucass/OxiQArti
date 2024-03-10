import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";
import { container } from "tsyringe";
import { CreateUserController } from "@users/controllers/CreateUserController";
import multer from "multer";
import uploadConfig from "@config/uploadImage";
const createUserController = container.resolve(CreateUserController);
const usersRouter = Router();

//multer middleware
const upload = multer(uploadConfig);

//create user router
usersRouter.post(
   "/",
   upload.single("image"),
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         name: Joi.string().required().messages({
            "any.required": "O email é obrigatório!",
         }),

         email: Joi.string().email().required().messages({
            "any.required": "O email é obrigatório!",
            "string.email": "Por favor, insira um e-mail válido!",
         }),
         password: Joi.string().required().messages({
            "any.required": "A senha é obrigatória!",
         }),
         //confirm passwrod equals password
         confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
            "any.only": "As senhas devem ser iguais",
         }),

         likes: Joi.string().optional(),
      }),
   }),
   (req, res) => {
      return createUserController.handle(req, res);
   },
);

export { usersRouter };
