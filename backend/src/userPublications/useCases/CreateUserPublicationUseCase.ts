import { IPublicationImageRepository } from "@publicationImages/repositories/IPublicationImageRepository";
import { AppError } from "@shared/errors/AppError";
import {
   CreateUserPublicationDTO,
   IUserPublicationRepository,
} from "@userPublications/repositories/IUserPublicationRepository";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserPublicationUseCase {
   constructor(
      @inject("PublicationImageRepository")
      private publicationImageRepository: IPublicationImageRepository,
      @inject("UsersPublicationRepository")
      private userPublicationRepository: IUserPublicationRepository,
      @inject("UsersRepository") private usersRepository: IUsersRepository,
   ) {}

   async execute({ title, description, service, userId }: CreateUserPublicationDTO, reqFiles) {
      //create user publication

      //Check if the user onwer of id exits to pass for "create" from repository.
      const user = await this.usersRepository.findUserById(userId);

      //se cair aq o usuario nãoévalido
      if (!user) {
         throw new AppError("Apenas usuários autenticados podem fazer publicações");
      }

      const userPublication = await this.userPublicationRepository.createUserPublication({
         title,
         description,
         service,
         user,
      });

      //check if publication have images
      if (reqFiles) {
         //save imagens in the "images" table
         for (let i = 0; i < reqFiles.length; i++) {
            await this.publicationImageRepository.saveImage({
               nameImage: reqFiles[i].filename,
               userPublication: userPublication,
               userId: user.id,
            });
         }
      }
      return userPublication;
   }
}
