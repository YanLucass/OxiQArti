import { inject, injectable } from "tsyringe";
import { Artist } from "@artists/entities/Artist";
import { CreateArtistDTO, IArtistsRepository } from "@artists/repositories/IArtistsRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { createUserAccessToken } from "src/helpers/create-user-Access-token";
import { createUserRefreshToken } from "src/helpers/create-user-RefreshToken";
import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";

//to useCase response
type IResponse = {
   artist: Artist;
   accessToken: string;
   refreshToken: string;
};
@injectable()
export class CreateArtistUseCase {
   constructor(
      @inject("ArtistsRepository") private artistsRepository: IArtistsRepository,
      @inject("RefreshTokenRepository") private refreshTokenRepository: IRefreshTokenRepository,
   ) {}

   async execute({
      name,
      email,
      phone,
      anotherContacts,
      url,
      state,
      city,
      specialty,
      avatarFileName,
      password,
   }: CreateArtistDTO): Promise<IResponse> {
      //check if email already exists
      const emailAlreadyExists = await this.artistsRepository.findArtistByEmail(email);
      if (emailAlreadyExists) {
         throw new AppError("Esse email já está em uso!", 422);
      }

      //check if this phone number already registered
      const artistPhoneNumber = await this.artistsRepository.findArtistByPhone(phone);
      if (artistPhoneNumber) {
         throw new AppError("Esse telefone já está vinculado a outra conta");
      }

      //validate formart phone number
      const telefoneRegex = /^\(\d{2}\) ?(9\d{4}-\d{4}|\d{4}-\d{4})$/;
      if (!telefoneRegex.test(phone)) {
         throw new AppError("Por favor insira o telefone num formato válido!");
      }
      //create password with bcrypt
      const hashedPassword = await hash(password, 12);

      //create new artist
      const artist = await this.artistsRepository.createArtist({
         name,
         email,
         phone,
         anotherContacts,
         url,
         state,
         city,
         specialty,
         avatarFileName,
         password: hashedPassword,
      });

      //create accessToken
      const accessToken = createUserAccessToken(artist);

      //create refreshToken
      const { refreshToken, expires } = createUserRefreshToken(artist);

      //save refresh token in bd
      await this.refreshTokenRepository.create({
         artist_id: artist.id,
         refreshToken,
         valid: true,
         expires,
      });

      return {
         artist,
         accessToken,
         refreshToken,
      };
   }
}
