import {
    AcceptArtistDTO,
    IApplicationRepository,
} from "@applications/repositories/IApplicationRepository";
import { AppError, NotFoundError, UnauthorizedError } from "@shared/errors/AppError";
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
        const artist = await this.usersRepository.findUserById(artistId);

        if (!artist) {
            throw new AppError("Usuário inválido", 401);
        }

        //check if userPublicatione exists
        const userPublication = await this.usersPublicationRepository.findUserPublicationById(
            "4fee823a-dfe8-48d9-9ce8-38e0a6fd6310",
        );
        if (!userPublication) {
            throw new NotFoundError("Hey! Esse serviço foi apagado ou não existe.");
        }

        //check if userPublication(art service) belong this user
        if (userPublication.user.id !== userId) {
            throw new UnauthorizedError(
                "Apenas o dono da publicação pode aceitar o artista escolhido.",
            );
        }
        //check if user already accepted a artist.
        if (userPublication.hiredArtist) {
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

        return artist;
    }
}

