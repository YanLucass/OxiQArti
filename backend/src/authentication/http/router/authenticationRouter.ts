import { container } from "tsyringe";
import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

//controllers import
import { CreateAccessAndRefreshTokenController } from "@authentication/controllers/CreateAccessAndRefreshTokenController";
import { addUserInfoToRequest } from "../middlewares/addUserInfoToRequest";
import { LoginController } from "@authentication/controllers/LoginController";

const authenticationRouter = Router();

//controllers
const createAccessAndRefreshTokenController = container.resolve(
   CreateAccessAndRefreshTokenController,
);
const loginController = container.resolve(LoginController);

//login
authenticationRouter.post(
   "/",
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         email: Joi.string().email().required().messages({
            "any.required": "O email é obrigatório!",
            "string.email": "Por favor, insira um e-mail válido!",
         }),

         password: Joi.string().required().messages({
            "any.required": "A senha é obrigatória!",
         }),
      }),
   }),

   (req, res) => {
      return loginController.handle(req, res);
   },
);

//router to create access token and refreshToken
authenticationRouter.post(
   //middleware to add user_id to request
   "/refresh_token",
   addUserInfoToRequest,
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         refreshToken: Joi.string().required(),
      }),
   }),

   (req, res) => {
      return createAccessAndRefreshTokenController.handle(req, res);
   },
);

export { authenticationRouter };
