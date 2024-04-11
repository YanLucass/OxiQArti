import { PublicationImage } from "@publicationImages/entities/PublicationImage";
import { PostgresDataSource } from "@shared/typeorm/connect";
import { Repository } from "typeorm";
import {
   CreatePublicationImageDTO,
   IPublicationImageRepository,
} from "./IPublicationImageRepository";

export class PublicationImageRepository implements IPublicationImageRepository {
   publicationImagesRepository: Repository<PublicationImage>;
   constructor() {
      this.publicationImagesRepository = PostgresDataSource.getRepository(PublicationImage);
   }

   async saveImage({
      nameImage,
      userPublication,
      userId,
   }: CreatePublicationImageDTO): Promise<void> {
      //save image in bd
      const image = await this.publicationImagesRepository.create({
         nameImage,
         userPublication,
         userId,
      });
      console.log(image);

      await this.publicationImagesRepository.save(image);
   }
}
