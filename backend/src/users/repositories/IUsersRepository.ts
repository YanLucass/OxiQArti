import { User } from "@users/entities/User";
//create user dto
export type CreateUserDTO = {
   name: string;
   email: string;
   avatarFileName?: string;
   password: string;
   likes: string;
};

export interface IUsersRepository {
   createUser({ name, email, avatarFileName, password, likes }: CreateUserDTO): Promise<User>;
   findUserByEmail(email: string): Promise<User | null>;
   findUserById(id: string): Promise<User | null>;
}
