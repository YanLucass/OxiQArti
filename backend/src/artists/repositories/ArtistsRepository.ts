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
      phone,
      anotherContacts,
      url,
      state,
      city,
      specialty,
      avatarFileName,
      password,
   }: CreateArtistDTO): Promise<Artist> {
      const artist = this.artistsRepository.create({
         name,
         email,
         phone,
         anotherContacts,
         url,
         state,
         city,
         specialty,
         avatar: avatarFileName,
         password,
      });

      //save
      return this.artistsRepository.save(artist);
   }

   findArtistByEmail(email: string): Promise<Artist | null> {
      return this.artistsRepository.findOneBy({ email });
   }

   findArtistByPhone(phone: string): Promise<Artist | null> {
      return this.artistsRepository.findOneBy({ phone });
   }

   findArtistById(id: string): Promise<Artist | null> {
      return this.artistsRepository.findOneBy({ id });
   }
}
