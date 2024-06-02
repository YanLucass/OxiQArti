import { container } from "tsyringe";
import { CreateUserUseCase } from "@users/useCases/CreateUserUseCase";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

export class CreateUserController {
   async handle(req: Request, res: Response): Promise<Response> {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      const { name, email, phone, contact, about, state, city, specialty, role, password } = req.body;

      // get user and accessToken from service
      const { user, accessToken, refreshToken } = await createUserUseCase.execute({
         name,
         email,
         phone, 
         contact,
         about,
         state,
         city,
         specialty,
         role,
         avatarFileName: req.file?.filename,
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
