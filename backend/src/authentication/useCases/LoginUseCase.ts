import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { AppError } from "@shared/errors/AppError";

//entities
import { User } from "@users/entities/User";

//interface
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";

//helpers
import { createUserAccessToken } from "src/helpers/create-user-Access-token";
import { createUserRefreshToken } from "src/helpers/create-user-RefreshToken";

//LoginParams
type LoginParams = {
   email: string;
   password: string;
};

//Response from LoginUseCase
type IResponse = {
   user: User;
   accessToken: string;
   refreshToken: string;
};

@injectable()
export class LoginUseCase {
   constructor(
      @inject("UsersRepository") private usersRepository: IUsersRepository,
      @inject("RefreshTokenRepository") private refreshTokenRepository: IRefreshTokenRepository,
   ) {}

   async execute({ email, password }: LoginParams): Promise<IResponse> {
      // Check if user is valid.
      const user = await this.usersRepository.findUserByEmail(email);
      if (!user) {
         throw new AppError("Email don't registerd.");
      }

      //case user exists
      // Compare password
      const userPasswordMatch = await compare(password, user.password);

      // If passwords don't match, throw an error.
      if (!userPasswordMatch) throw new AppError("Invalid email / password", 401);

      // Create access token for common user.
      const accessToken = createUserAccessToken(user);
      // Create refresh token for common user.
      const { refreshToken, expires } = createUserRefreshToken(user);

      //saveRefreshToken in bd
      await this.refreshTokenRepository.create({
         user_id: user.id,
         refreshToken,
         valid: true,
         expires,
      });

      // Return common user information with tokens.
      return {
         user: user,
         accessToken,
         refreshToken,
      };
   }
}
