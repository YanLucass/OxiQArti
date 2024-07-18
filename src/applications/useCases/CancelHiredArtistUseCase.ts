import { BadRequestError, NotFoundError, UnauthorizedError } from "@shared/errors/AppError";
import logger from "@shared/errors/logger";
import { IUserPublicationRepository } from "@userPublications/repositories/IUserPublicationRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CancelHiredArtistUseCase {
    constructor(
        @inject("UsersPublicationRepository")
        private userPublicationRepository: IUserPublicationRepository,
    ) {}

    async execute(userPublicationId: string, userId: string) {
        logger.info("Iniciando processo de cancelar artista contratado");
        const userPublication =
            await this.userPublicationRepository.findUserPublicationById(userPublicationId);
        if (!userPublication) {
            logger.warn(
                `Tentativa de cancelar um artista num serviço inexistente UserPublicationId: ${userPublicationId}`,
            );
            throw new NotFoundError("Esse serviço não existe ou foi deletado :/");
        }

        //check if users is owner of the service.
        if (userId !== userPublication.user.id) {
            logger.warn(
                `Usuário não autorizado tentando cancelar um artista contratado de
                 um serviço UserPublicationId: ${userPublicationId}`,
            );
            throw new UnauthorizedError("Apenas o dono do serviço pode cancelar um artista");
        }

        //check if have a artist contracted
        if (!userPublication.hiredArtist) {
            logger.warn(
                `Usário tentando cancelar artista inexistente na publicação UserId ${userId}, UserPublicationId: ${userPublicationId}`,
            );
            throw new BadRequestError("Não há artista contratado nesse serviço.");
        }

        await this.userPublicationRepository.cancelHiredArtistUserPublication(userPublication);

        logger.info("Artista cancelado com sucesso");
    }
}

