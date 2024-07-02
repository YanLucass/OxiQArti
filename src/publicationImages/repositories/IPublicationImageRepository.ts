import { UserPublication } from "@userPublications/entities/UserPublication";

export type CreatePublicationImageDTO = {
   nameImage: string;
   userPublication: UserPublication;
   userId?: string;
   artistId?: string | null;
};

export interface IPublicationImageRepository {
   saveImage({
      nameImage,
      userPublication,
      userId,
   }: CreatePublicationImageDTO): Promise<void>;
}
