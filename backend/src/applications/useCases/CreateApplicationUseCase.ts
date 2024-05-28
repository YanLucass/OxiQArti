import { IApplicationRepository } from "@applications/repositories/IApplicationRepository";
import { IArtistsRepository } from "@artists/repositories/IArtistsRepository";
import { AppError } from "@shared/errors/AppError";
import { IUserPublicationRepository } from "@userPublications/repositories/IUserPublicationRepository";
import { inject, injectable } from "tsyringe";



type CreateApplicationDTO = {
    userId: string;
    userPublicationId: string;
}
@injectable()
export class CreateApplicationUseCase {
    

    private applicationRepository: IApplicationRepository
    private artistRepository: IArtistsRepository
    private userPublicationRepository: IUserPublicationRepository;
    constructor(
        @inject("ApplicationRepository") applicationRepository: IApplicationRepository,
        @inject("ArtistsRepository") artistRepository: IArtistsRepository,
        @inject("UsersPublicationRepository") usersPublicationRepository: IUserPublicationRepository
    )
    
    {
        this.applicationRepository = applicationRepository;
        this.artistRepository= artistRepository;
        this.userPublicationRepository = usersPublicationRepository;
    }

    async execute({userId, userPublicationId}: CreateApplicationDTO) {
        //check if id belong a artist
        const artist = await this.artistRepository.findArtistById(userId);

        //if a commom user
        if(!artist) {
            throw new AppError("Apenas artistas podem se candidatar a serviços.", 401);
        }
    
        //check if userPublication(artService) exits
        const userPublication = await this.userPublicationRepository.findUserPublicationById(userPublicationId);
        if(!userPublication) {
            throw new AppError("Não é possível se candidatar a uma publicação que não existe", 401);
        }

        //check if userPublication(serviceArt) is available
        if(!userPublication.available) {
            throw new AppError("Puxa, esse serviço não está mais disponível. Encontre mais em: (dominio)", 401)
        }

        //check if artist already application to job.
        //preciso verificar na tabela applications se tem uma mesma userPublication. é so 
        const artistAlreadyApplication = await this.applicationRepository.findRepeatApplication
        (userPublicationId, userId);

        if(artistAlreadyApplication) {
            throw new AppError(`Olá ${artist.name} relaxe, você já se candidatou a esse serviço :)`, 401);
        }
        

        //create application
        return this.applicationRepository.createApplication({userPublication, artist});        
        
    }
}