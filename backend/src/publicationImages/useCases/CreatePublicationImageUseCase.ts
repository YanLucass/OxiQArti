import { IPublicationImageRepository } from "@publicationImages/repositories/IPublicationImageRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreatePublicationImageUseCase {
   constructor(
      @inject("PublicationImageRepository")
      private publicationImageRepository: IPublicationImageRepository,
   ) {}

   async execute(reqFiles) {
      console.log(reqFiles);
   }
}
