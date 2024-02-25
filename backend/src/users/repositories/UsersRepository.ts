import { User } from "@users/entities/User";
import { CreateUserDTO, IUsersRepository } from "./IUsersRepository";
import { Repository } from "typeorm";
import { PostgresDataSource } from "@shared/typeorm/connect";

export class UsersRepository implements IUsersRepository {
   private usersRepository: Repository<User>;

   //get users repository
   constructor() {
      this.usersRepository = PostgresDataSource.getRepository(User);
   }

   async createUser({ name, email, likes, password }: CreateUserDTO): Promise<User> {
      const user = await this.usersRepository.create({ name, email, password, likes });
      return this.usersRepository.save(user);
   }

   async findUserByEmail(email): Promise<User> {
      return this.usersRepository.findOneBy({ email });
   }
}
