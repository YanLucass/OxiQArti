import {
    AcceptArtistDTO,
    IApplicationRepository,
} from "@applications/repositories/IApplicationRepository";
import { AppError, NotFoundError, UnauthorizedError } from "@shared/errors/AppError";
import logger from "@shared/errors/logger";
import { IUserPublicationRepository } from "@userPublications/repositories/IUserPublicationRepository";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class AcceptArtistUseCase {
    constructor(
        @inject("UsersPublicationRepository")
        private usersPublicationRepository: IUserPublicationRepository,
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject("ApplicationRepository")
        private applicationsRepository: IApplicationRepository,
    ) {}

    async execute({ userPublicationId, artistId }: AcceptArtistDTO, userId: string) {
        logger.info("Iniciando processo de aceitar artista a um serviço");
        const artist = await this.usersRepository.findUserById(artistId);

        if (!artist) {
            logger.warn(
                `Usuário tentando aceitar artista que não existe no banco de dados. UserId: ${userId} UserPublicationID: ${userPublicationId}`,
            );
            throw new AppError("Usuário inválido", 401);
        }

        //check if userPublicatione exists
        const userPublication =
            await this.usersPublicationRepository.findUserPublicationById(userPublicationId);
        if (!userPublication) {
            logger.warn(
                `Usuário tentando contratar artista numa publicação inexistente. UserPublicationId: ${userPublicationId}`,
            );
            throw new NotFoundError("Hey! Esse serviço foi apagado ou não existe.");
        }

        //check if userPublication(art service) belong this user
        if (userPublication.user.id !== userId) {
            logger.warn(
                `Usuário alheio tentando aceitar um artista no serviço postado por outro usuário!  UserId: ${userId} UserPublicationID: ${userPublicationId}`,
            );
            throw new UnauthorizedError(
                "Apenas o dono da publicação pode aceitar o artista escolhido.",
            );
        }
        //check if user already accepted a artist.
        if (userPublication.hiredArtist) {
            logger.warn(
                `Usuário tentando aceitar artista novamente, UserId: ${userId} UserPublicationID: ${userPublicationId} `,
            );
            throw new UnauthorizedError(
                "Você já aceitou um artista nesse serviço, veja em seu perfil.",
            );
        }

        //set userPublication to available "false".
        await this.usersPublicationRepository.invalidateUserPublication(userPublication);

        //insert artist id in the "hired artist field"
        await this.usersPublicationRepository.insertHiredArtistUserPublication(
            userPublication,
            artistId,
        );

        //delete all candidates from this userPublication in  table applications
        await this.applicationsRepository.rejectAnotherApplications(userPublicationId);

        logger.info("Artista aceito com sucesso");
        return artist;
    }
}

