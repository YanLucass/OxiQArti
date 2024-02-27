import { Artist } from "@artists/entities/Artist";
import { PostgresDataSource } from "@shared/typeorm/connect";
import { Repository } from "typeorm";
import { CreateArtistDTO, IArtistsRepository } from "./IArtistsRepository";

export class ArtistsRepository implements IArtistsRepository {
   private artistsRepository: Repository<Artist>;
   constructor() {
      this.artistsRepository = PostgresDataSource.getRepository(Artist);
   }

   //create artist
   async createArtist({
      name,
      email,
      state,
      city,
      specialty,
      password,
   }: CreateArtistDTO): Promise<Artist> {
      const artist = await this.artistsRepository.create({
         name,
         email,
         state,
         city,
         specialty,
         password,
      });

      //save
      return this.artistsRepository.save(artist);
   }

   findArtistByEmail(email: string): Promise<Artist | null> {
      return this.artistsRepository.findOneBy({ email });
   }
}
