import { IApplicationRepository } from "@applications/repositories/IApplicationRepository";
import { inject, injectable } from "tsyringe";

type GetAllArtistApplicationsParams = {
    userPublicationId: string,
    userId: string;
}

@injectable()
export class GetAllArtistApplicationsUseCase {
    
    constructor(@inject("ApplicationRepository") private applicationsRepository: IApplicationRepository) {} 
    async execute({ userPublicationId, userId}: GetAllArtistApplicationsParams) {
        //validations
        return this.applicationsRepository.getAllArtistApplications(userPublicationId);
        
    }
}