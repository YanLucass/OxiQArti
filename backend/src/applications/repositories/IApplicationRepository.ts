//types
import { Applications } from "@applications/entities/Applications";
import { Artist } from "@artists/entities/Artist";
import { UserPublication } from "@userPublications/entities/UserPublication";
//Create application 
export type CreateApplicationDTO = {
    userPublication: UserPublication;
    artist: Artist;
}


export interface IApplicationRepository {
   createApplication({userPublication, artist}: CreateApplicationDTO): Promise<Applications>; 
   findRepeatApplication(userPublicationId: string, artistId: string): Promise<Applications | null>
}