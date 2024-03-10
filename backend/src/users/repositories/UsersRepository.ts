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

   //create user
   async createUser({
      name,
      email,
      likes,
      avatarFileName,
      password,
   }: CreateUserDTO): Promise<User> {
      const user = await this.usersRepository.create({
         name,
         email,
         avatar: avatarFileName,
         password,
         likes,
      });
      return this.usersRepository.save(user);
   }

   //findByEmail
   async findUserByEmail(email: string): Promise<User | null> {
      return this.usersRepository.findOneBy({ email });
   }

   //findById
   findUserById(id: string): Promise<User | null> {
      return this.usersRepository.findOneBy({ id: id });
   }
}
