import { container } from "tsyringe";
import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

//controllers import
import { CreateAccessAndRefreshTokenController } from "@authentication/controllers/CreateAccessAndRefreshTokenController";
import { addUserInfoToRequest } from "../middlewares/addUserInfoToRequest";

const authenticationRouter = Router();

//controllers
const createAccessAndRefreshTokenController = container.resolve(
   CreateAccessAndRefreshTokenController,
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
