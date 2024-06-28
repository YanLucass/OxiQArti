import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";
import { container } from "tsyringe";
import { CreateUserController } from "@users/controllers/CreateUserController";
import multer from "multer";
import uploadConfig from "@config/uploadImage";

//types
import { UserRole } from "@users/repositories/IUsersRepository";
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

         phone: Joi.string().optional(),
         contact: Joi.string().required().messages({
            "any.required": "Por favor, informe pelo menos um contato(Instagram, facebook, linkedin etc)"
         }),
         about: Joi.string().optional(),
         state: Joi.string().required().messages({
            "any.required": "O seu estado é obrigatório"
         }),

         city: Joi.string().required().messages({
            "any.required": "Por favor informe sua cidade."
         }),

         specialty: Joi.string().optional(),

    
         //valid verify if input value is a valid string 'only_artist' ...
        role: Joi.string().valid(...Object.values(UserRole)).required().messages({
            "any.required": "Por favor escolha uma modalidade para sua conta.",
            "any.only": "Os tipos de conta são: onlyArtist(Prestar serviços somente) contractingArtist(prestar e publicar) e onlyContracting(apenas contratar)" 
        }),

         password: Joi.string().required().messages({
            "any.required": "A senha é obrigatória!",
         }),
         //confirm passwrod equals password
         confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
            "any.only": "As senhas devem ser iguais",
         }),

        
      }),
   }),
   (req, res) => {
      return createUserController.handle(req, res);
   },
);

export { usersRouter };
