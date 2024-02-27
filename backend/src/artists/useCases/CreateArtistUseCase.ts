import { inject, injectable } from "tsyringe";
import { Artist } from "@artists/entities/Artist";
import { CreateArtistDTO, IArtistsRepository } from "@artists/repositories/IArtistsRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { createUserAccessToken } from "src/helpers/create-user-Access-token";
import { createUserRefreshToken } from "src/helpers/create-user-RefreshToken";

//to useCase response
type IResponse = {
   artist: Artist;
   accessToken: string;
   refreshToken: string;
};
@injectable()
export class CreateArtistUseCase {
   constructor(@inject("ArtistsRepository") private artistsRepository: IArtistsRepository) {}

   async execute({
      name,
      email,
      state,
      city,
      specialty,
      password,
   }: CreateArtistDTO): Promise<IResponse> {
      //check if email already exists
      const emailAlreadyExists = await this.artistsRepository.findArtistByEmail(email);
      if (emailAlreadyExists) {
         throw new AppError("Esse email já está em uso!", 422);
      }

      //create password with bcrypt
      const hashedPassword = await hash(password, 12);

      //create new artist
      const artist = await this.artistsRepository.createArtist({
         name,
         email,
         state,
         city,
         specialty,
         password: hashedPassword,
      });

      //create accessToken
      const accessToken = createUserAccessToken(artist);

      //create refreshToken
      const { refreshToken } = createUserRefreshToken(artist);

      return {
         artist,
         accessToken,
         refreshToken,
      };
   }
}
