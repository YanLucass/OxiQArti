import { Artist } from "@artists/entities/Artist";

export type CreateArtistDTO = {
   name: string;
   email: string;
   state: string;
   city: string;
   specialty: string;
   password: string;
};

export interface IArtistsRepository {
   createArtist({
      name,
      email,
      state,
      city,
      specialty,
      password,
   }: CreateArtistDTO): Promise<Artist>;
   findArtistByEmail(email: string): Promise<Artist | null>;
}
