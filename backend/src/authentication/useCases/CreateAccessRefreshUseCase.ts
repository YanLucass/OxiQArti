import { Artist } from "@artists/entities/Artist";
import { IArtistsRepository } from "@artists/repositories/IArtistsRepository";
import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { handleRefreshToken } from "src/helpers/handle-refresh-token";
import { inject, injectable } from "tsyringe";

//dto
export type CreateAccessAndRefreshTokenDTO = {
   user_id: string;
   refresh_token: string;
};

//response
type IResponse = {
   user: User | Artist;
   accessToken: string;
   refreshToken: string;
};

@injectable()
export class CreateAccessAndRefreshTokenUseCase {
   constructor(
      @inject("RefreshTokenRepository") private refreshTokenRepository: IRefreshTokenRepository,
      //usersRepository to get user by id
      @inject("UsersRepository") private usersRepository: IUsersRepository,
      //artist repository
      @inject("ArtistsRepository") private artistsRepository: IArtistsRepository,
   ) {}

   async execute({ user_id, refresh_token }: CreateAccessAndRefreshTokenDTO): Promise<IResponse> {
      //find user
      const user: User | null = await this.usersRepository.findUserById(user_id);

      if (!user) {
         const artist = await this.artistsRepository.findArtistById(user_id);

         //not user or artist
         if (!artist) {
            throw new AppError("User not found", 404);
         }

         //validations to create new access and refreshToken
         const { refreshToken, accessToken } = await handleRefreshToken(
            artist,
            refresh_token,
            this.refreshTokenRepository,
         );

         //return response
         return {
            user: artist,
            accessToken,
            refreshToken,
         };
      }

      //case have user
      const { refreshToken, accessToken } = await handleRefreshToken(
         user,
         refresh_token,
         this.refreshTokenRepository,
      );

      return {
         user,
         accessToken,
         refreshToken,
      };
   }
}
