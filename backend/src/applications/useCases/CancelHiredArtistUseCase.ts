import { AppError } from "@shared/errors/AppError";
import { IUserPublicationRepository } from "@userPublications/repositories/IUserPublicationRepository";
import { inject, injectable } from "tsyringe";

type cancelHiredArtistDTO = {
    userId: string;
    userPublicationId: string
}

@injectable()
export class CancelHiredArtistUseCase {
    constructor(@inject("UsersPublicationRepository") private usersPublicationRepository: IUserPublicationRepository) {}
    async execute({userId, userPublicationId}: cancelHiredArtistDTO) {
        //check if user is owner from userPublication(only onwers can reject artist).
        const userPublication = await this.usersPublicationRepository.findUserPublicationById(userPublicationId);
        if(!userPublication) throw new AppError("Essa publicação não existe ou foi removida.");
        if(userPublication.user.id !== userId) throw new AppError("Apenas o dono da publicação pode remover o artista contratado");

        //cancel hiredArtist
        return this.usersPublicationRepository.removeHiredArtistUserPublication(userPublication);
        
    }
}