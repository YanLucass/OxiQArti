import { UserPublication } from "@userPublications/entities/UserPublication";
import { User } from "@users/entities/User";

export type CreateUserPublicationDTO = {
   title: string;
   description: string;
   service: string;
   user: User;
};

export interface IUserPublicationRepository {
   createUserPublication({
      title,
      description,
      service,
      user,
   }: CreateUserPublicationDTO): Promise<UserPublication>;
}
