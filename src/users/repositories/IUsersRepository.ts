import { User } from "@users/entities/User";


export enum UserRole {
   OnlyArtist  = 'onlyArtist',
   ContractingArtist = 'contractingArtist',
   onlyContracting = 'onlyContracting'
}

//create user dto
export type CreateUserDTO = {
   name: string;
   email: string;
   phone?: string;
   contact: string;
   about: string;
   state: string;
   city: string;
   specialty?: string;
   role: UserRole
   avatarFileName?: string;
   password: string;
};

export interface IUsersRepository {
   createUser({ name, email, contact, phone, about, state, city, specialty, role, avatarFileName}: CreateUserDTO): Promise<User>;
   findUserByEmail(email: string): Promise<User | null>;
   findUserById(id: string): Promise<User | null>;
   findUserByPhoneNumber(phone: string): Promise<User | null>
}
