import { BadRequestError, NotFoundError, UnauthorizedError } from "@shared/errors/AppError";
import { IUserPublicationRepository } from "@userPublications/repositories/IUserPublicationRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CancelHiredArtistUseCase {
    constructor(
        @inject("UsersPublicationRepository")
        private userPublicationRepository: IUserPublicationRepository,
    ) {}

    async execute(userPublicationId: string, userId: string) {
        const userPublication =
            await this.userPublicationRepository.findUserPublicationById(userPublicationId);
        if (!userPublication) throw new NotFoundError("Esse serviço não existe ou foi deletado :/");

        //check if users is owner of the service.
        if (userId !== userPublication.user.id)
            throw new UnauthorizedError("Apenas o dono do serviço pode cancelar um artista");

        //check if have a artist contracted
        if (!userPublication.hiredArtist)
            throw new BadRequestError("Não há artista contratado nesse serviço.");

        await this.userPublicationRepository.cancelHiredArtistUserPublication(userPublication);
    }
}

