import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { CreateUserDTO, IUsersRepository } from "@users/repositories/IUsersRepository";
//bcrypt method
import { hash } from "bcryptjs";
import { createUserAccessToken } from "src/helpers/create-user-Access-token";
import { createUserRefreshToken } from "src/helpers/create-user-RefreshToken";
import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";

//Response to CreateUserUseCase
type CreateUserResponse = {
   user: User;
   accessToken: string;
   refreshToken: string;
};

@injectable()
export class CreateUserUseCase {
   constructor(
      @inject("UsersRepository") private usersRepository: IUsersRepository,
      @inject("RefreshTokenRepository") private refreshTokenRepository: IRefreshTokenRepository,
   ) {}

   async execute({ name, email, likes, password }: CreateUserDTO): Promise<CreateUserResponse> {
      //check if emails already use.
      const emailAlreadyExists = await this.usersRepository.findUserByEmail(email);

      if (emailAlreadyExists) {
         throw new AppError("Esse email já está em uso escolha outro!", 422);
      }

      //create hashedPassword.
      const hashedPassword = await hash(password, 12);

      const user = await this.usersRepository.createUser({
         name,
         email,
         likes,
         password: hashedPassword,
      });

      //create user accessToken
      const accessToken = createUserAccessToken(user);

      //create userRefreshToken
      const { refreshToken, expires } = createUserRefreshToken(user);

      //save refresh token in bd
      this.refreshTokenRepository.create({ user_id: user.id, refreshToken, expires, valid: true });

      return {
         user,
         accessToken,
         refreshToken,
      };
   }
}
