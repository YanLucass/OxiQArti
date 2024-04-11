import { Artist } from "@artists/entities/Artist";
import { IArtistsRepository } from "@artists/repositories/IArtistsRepository";
import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { createUserAccessToken } from "src/helpers/create-user-Access-token";
import { createUserRefreshToken } from "src/helpers/create-user-RefreshToken";
import { inject, injectable } from "tsyringe";

//LoginParams
type LoginParams = {
   email: string;
   password: string;
};

//Response from LoginUseCase
type IResponse = {
   user: User | Artist;
   accessToken: string;
   refreshToken: string;
};

@injectable()
export class LoginUseCase {
   constructor(
      @inject("UsersRepository") private usersRepository: IUsersRepository,
      @inject("ArtistsRepository") private artistsRepository: IArtistsRepository,
      @inject("RefreshTokenRepository") private refreshTokenRepository: IRefreshTokenRepository,
   ) {}

   async execute({ email, password }: LoginParams): Promise<IResponse> {
      // Check if it is a common user.
      const commomUser = await this.usersRepository.findUserByEmail(email);

      // Search in artists if not found as a common user.
      if (!commomUser) {
         const artist = await this.artistsRepository.findArtistByEmail(email);

         // If the artist doesn't exist, throw an error.
         if (!artist) throw new AppError("Esse email não está registrado", 401);

         // Compare artist's password.
         const passwordMatch = await compare(password, artist.password);

         // If passwords don't match, throw an error.
         if (!passwordMatch) throw new AppError("email / password inválido!", 401);

         // Create access token for the artist.
         const accessToken = createUserAccessToken(artist);
         // Create refresh token for the artist.
         const { refreshToken, expires } = createUserRefreshToken(artist);

         //save refreshToken in bd
         await this.refreshTokenRepository.create({
            artist_id: artist.id,
            refreshToken,
            valid: true,
            expires,
         });
         // Return artist information with tokens.
         return {
            user: artist,
            accessToken,
            refreshToken,
         };
      }

      // Compare password for common user.
      const commomUserPasswordMatch = await compare(password, commomUser.password);

      // If passwords don't match, throw an error.
      if (!commomUserPasswordMatch) throw new AppError("Invalid email / password", 401);

      // Create access token for common user.
      const accessToken = createUserAccessToken(commomUser);
      // Create refresh token for common user.
      const { refreshToken, expires } = createUserRefreshToken(commomUser);

      //saveRefreshToken in bd
      await this.refreshTokenRepository.create({
         user_id: commomUser.id,
         refreshToken,
         valid: true,
         expires,
      });

      // Return common user information with tokens.
      return {
         user: commomUser,
         accessToken,
         refreshToken,
      };
   }
}
