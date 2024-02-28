import { container } from "tsyringe";
import { CreateArtistUseCase } from "@artists/useCases/CreateArtistUseCase";
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";

export class CreateArtistController {
   async handle(req: Request, res: Response): Promise<Response> {
      const { name, email, phone, anotherContacts, url, state, city, specialty, password } =
         req.body;
      //get useCase
      const createArtistUseCase = container.resolve(CreateArtistUseCase);

      const { artist, accessToken, refreshToken } = await createArtistUseCase.execute({
         name,
         email,
         phone,
         anotherContacts,
         url,
         state,
         city,
         specialty,
         avatarFileName: req.file?.filename,
         password,
      });

      return res.status(201).json({
         message: "New artist createed",
         artist: instanceToInstance(artist),
         accessToken,
         refreshToken,
      });
   }
}
