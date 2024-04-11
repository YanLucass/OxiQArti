import { Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";
import { container } from "tsyringe";
import { CreateUserPublicationUseCase } from "@userPublications/useCases/CreateUserPublicationUseCase";

//class transformer
import { instanceToInstance } from "class-transformer";
import { UserPublication } from "@userPublications/entities/UserPublication";

export class CreateUserPublicationController {
   async handle(req: Request, res: Response) {
      const createUserPublicationUseCase = container.resolve(CreateUserPublicationUseCase);

      const userId = req.user.id;

      //get title, description, service from req body
      const { title, description, service } = req.body;

      //get publication images(if exists)
      const reqFiles = req.files;

      const newUserPublication = await createUserPublicationUseCase.execute(
         { title, description, service, userId },
         reqFiles,
      );

      return res.status(201).json({
         message: "new user publication created",
         UserPublication: instanceToInstance(newUserPublication),
      });
   }
}
