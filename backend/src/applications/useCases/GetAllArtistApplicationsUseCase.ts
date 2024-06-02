import { IApplicationRepository } from "@applications/repositories/IApplicationRepository";
import { AppError } from "@shared/errors/AppError";
import { IUserPublicationRepository } from "@userPublications/repositories/IUserPublicationRepository";
import { inject, injectable } from "tsyringe";

type GetAllArtistApplicationsParams = {
    userPublicationId: string,
    userId: string;
}

@injectable()
export class GetAllArtistApplicationsUseCase {
    
    constructor(
        @inject("ApplicationRepository") private applicationsRepository: IApplicationRepository,
        @inject("UsersPublicationRepository") private usersPublication: IUserPublicationRepository
    ) {} 
    async execute({ userPublicationId, userId}: GetAllArtistApplicationsParams) {
        //validations
        //check if user is artist(it cannot see the other candidates)
        // const isArtists = await this.artistRepository.findArtistById(userId);
        // if(isArtists) {
        //     throw new AppError("Apenas usuários podem verificar os outros artistas candidatos ao serviço.")
        // }

        const userPublication = await this.usersPublication.findUserPublicationById(userPublicationId)
        
        
        //check if publication exits(probaly yes)
        if(!userPublication) {
            throw new AppError("Esse serviço não existe!");
        }
        //verificar se a lista está sendo exibida pro dono da publicação
        //como? Se essa userPublication(temos o id dela) tiver um userId igual ao userId recebido, a publicação é dele
        if(userPublication.user.id !== userId) {
            throw new AppError("Apenas o dono do serviço pode ver seus candidatos.");
        }


        
        


        return this.applicationsRepository.getAllArtistApplications(userPublicationId);
        
    }
}