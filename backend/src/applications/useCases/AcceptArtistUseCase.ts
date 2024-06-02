import { AcceptArtistDTO } from "@applications/repositories/IApplicationRepository";
import { AppError } from "@shared/errors/AppError";
import { IUserPublicationRepository } from "@userPublications/repositories/IUserPublicationRepository";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class AcceptArtistUseCase {
    constructor(
        @inject("UsersPublicationRepository") private usersPublicationRepository: IUserPublicationRepository,
        @inject("UsersRepository") private usersRepository: IUsersRepository

    ) {}

    async execute({ userPublicationId, artistId, userId}: AcceptArtistDTO) {
        //check if is a user(only user can accept artists applications).
        const user = await this.usersRepository.findUserById(userId);
        if(!user) {
            throw new AppError("Apenas o donos dos serviços pode aceitar candidaturas.");
        }

        //check if userPublicatione exists
        const userPublication = await this.usersPublicationRepository.findUserPublicationById(userPublicationId);
        if(!userPublication) {
            throw new AppError("Hey! Esse serviço foi apagado ou não existe.");
        }
        
        //check if userPublication(art service) belong this user
        if(userPublication.user.id !== userId) {
            throw new AppError("Apenas o dono da publicação pode aceitar o artista escolhido.");
        }

        //set userPublication to available "false".
        





    }
}