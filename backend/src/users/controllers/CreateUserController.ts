import { CreateUserUseCase } from "@users/useCases/CreateUserUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateUserController {
   async handle(req: Request, res: Response): Promise<Response> {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      const { name, email, password, likes } = req.body;

      //get user and accessToken from service
      const { user, accessToken } = await createUserUseCase.execute({
         name,
         email,
         likes,
         password,
      });
      return res.status(201).json({
         message: "New user created.",
         user,
         accessToken,
      });
   }
}
