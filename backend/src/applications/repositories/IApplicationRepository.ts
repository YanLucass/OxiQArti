//types
import { Applications } from "@applications/entities/Applications";
import { UserPublication } from "@userPublications/entities/UserPublication";
import { User } from "@users/entities/User";
//Create application 
export type CreateApplicationDTO = {
    userPublication: UserPublication;
    user: User
}

export type AcceptArtistDTO = {
    userPublicationId: string;
    artistId: string;
}

export interface IApplicationRepository {
   createApplication({userPublication, user}: CreateApplicationDTO): Promise<Applications>; 
   findRepeatApplication(userPublicationId: string, userId: string): Promise<Applications | null>
   getAllArtistsApplications(userPublicationId: string): Promise<User[] | null>
   rejectAnotherApplications(userPublicationId: string): Promise<void>
}