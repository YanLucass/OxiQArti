import { LoginUseCase } from "@authentication/useCases/LoginUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class LoginController {
   async handle(req: Request, res: Response): Promise<Response> {
      //get login use case
      const loginUseCase = container.resolve(LoginUseCase);
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await loginUseCase.execute({ email, password });

      return res.status(200).json({
         message: "Vamos navegar no mar de tinta!",
         user,
         accessToken,
         refreshToken,
      });
   }
}
