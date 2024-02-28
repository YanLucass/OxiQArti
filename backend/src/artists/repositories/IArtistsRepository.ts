import { Artist } from "@artists/entities/Artist";

export type CreateArtistDTO = {
   name: string;
   email: string;
   phone: string;
   anotherContacts?: string;
   url?: string;
   state: string;
   city: string;
   specialty?: string;
   avatarFileName?: string;
   password: string;
};

export interface IArtistsRepository {
   createArtist({
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
   }: CreateArtistDTO): Promise<Artist>;
   //findbyEmail
   findArtistByEmail(email: string): Promise<Artist | null>;
   //findByPhone
   findArtistByPhone(phone: string): Promise<Artist | null>;
}
