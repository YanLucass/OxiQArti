import { CreateAccessAndRefreshTokenUseCase } from "@authentication/useCases/CreateAccessRefreshUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateAccessAndRefreshTokenController {
   async handle(req: Request, res: Response): Promise<Response> {
      //get useCase
      const createAccessAndRefreshTokenUseCase = container.resolve(
         CreateAccessAndRefreshTokenUseCase,
      );
      //get current refresh token
      const refresh_token = req.body.refreshToken;

      const { user, accessToken, refreshToken } = await createAccessAndRefreshTokenUseCase.execute({
         user_id: req.user.id,

         refresh_token: refresh_token,
      });

      console.log(refreshToken);

      return res.status(201).json({
         user,
         accessToken,
         refreshToken,
      });
   }
}
