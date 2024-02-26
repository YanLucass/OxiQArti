import { container } from "tsyringe";
import { CreateUserUseCase } from "@users/useCases/CreateUserUseCase";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

export class CreateUserController {
   async handle(req: Request, res: Response): Promise<Response> {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      const { name, email, password, likes } = req.body;

      //get user and accessToken from service
      const { user, accessToken, refreshToken } = await createUserUseCase.execute({
         name,
         email,
         likes,
         password,
      });
      return res.status(201).json({
         message: "New user created.",
         user: instanceToInstance(user),
         accessToken,
         refreshToken,
      });
   }
}
