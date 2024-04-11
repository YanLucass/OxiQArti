import { UserPublication } from "@userPublications/entities/UserPublication";
import { CreateUserPublicationDTO, IUserPublicationRepository } from "./IUserPublicationRepository";
import { Repository } from "typeorm";
import { PostgresDataSource } from "@shared/typeorm/connect";

export class UsersPublicationRepository implements IUserPublicationRepository {
   userPublicationRepository: Repository<UserPublication>;
   constructor() {
      this.userPublicationRepository = PostgresDataSource.getRepository(UserPublication);
   }

   //create user Publication
   async createUserPublication({
      title,
      description,
      service,
      user,
   }: CreateUserPublicationDTO): Promise<UserPublication> {
      const userPublication = await this.userPublicationRepository.create({
         title,
         description,
         service,
         //instance user to typeorm save userId
         user,
      });

      return this.userPublicationRepository.save(userPublication);
   }
}
