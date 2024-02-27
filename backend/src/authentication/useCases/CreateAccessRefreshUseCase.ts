import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { createUserAccessToken } from "src/helpers/create-user-Access-token";
import { createUserRefreshToken } from "src/helpers/create-user-RefreshToken";
import { inject, injectable } from "tsyringe";

//dto
type CreateAccessAndRefreshTokenDTO = {
   user_id: string;
   refresh_token: string;
};

//response
type IResponse = {
   user: User;
   accessToken: string;
   refreshToken: string;
};
@injectable()
export class CreateAccessAndRefreshTokenUseCase {
   constructor(
      @inject("RefreshTokenRepository") private refreshTokenRepository: IRefreshTokenRepository,
      //usersRepository to get user by id
      @inject("UsersRepository") private usersRepository: IUsersRepository,
   ) {}

   async execute({ user_id, refresh_token }: CreateAccessAndRefreshTokenDTO): Promise<IResponse> {
      //find user
      const user = await this.usersRepository.findUserById(user_id);

      if (!user) {
         throw new AppError("User not found", 404);
      }

      //check if refresh token exists
      const refresh = await this.refreshTokenRepository.findRefreshTokeByToken(refresh_token);

      if (!refresh) {
         throw new AppError("valid refresh token is required", 401);
      }

      //if refreshToken invalid or expired throw error.
      const dateNow = new Date().getTime();
      if (!refresh.valid || dateNow > refresh.expires.getTime()) {
         throw new AppError("Token invalid or expired", 401);
      }

      //invalidate current refreshToken to generate another.
      await this.refreshTokenRepository.invalidateRefreshToken(refresh);

      //create new access and refresh token
      const accessToken = createUserAccessToken(user);
      const { refreshToken, expires } = createUserRefreshToken(user);

      //save new refreshToken in bd
      await this.refreshTokenRepository.create({
         user_id: user.id,
         refreshToken,
         valid: true,
         expires,
      });

      return {
         user: user,
         accessToken,
         refreshToken,
      };
   }
}
