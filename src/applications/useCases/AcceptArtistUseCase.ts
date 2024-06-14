import {
    AcceptArtistDTO,
    IApplicationRepository,
} from '@applications/repositories/IApplicationRepository';
import { AppError } from '@shared/errors/AppError';
import { IUserPublicationRepository } from '@userPublications/repositories/IUserPublicationRepository';
import { IUsersRepository } from '@users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AcceptArtistUseCase {
    constructor(
        @inject('UsersPublicationRepository')
        private usersPublicationRepository: IUserPublicationRepository,
        @inject('UsersRepository') private usersRepository: IUsersRepository,
        @inject('ApplicationRepository')
        private applicationsRepository: IApplicationRepository,
    ) {}

    async execute({ userPublicationId, artistId }: AcceptArtistDTO, userId: string) {
        try {
            const artist = await this.usersRepository.findUserById(artistId);

            if (!artist) {
                throw new AppError('Usuário inválido', 401);
            }

            //check if userPublicatione exists
            const userPublication =
                await this.usersPublicationRepository.findUserPublicationById(userPublicationId);
            if (!userPublication) {
                throw new AppError('Hey! Esse serviço foi apagado ou não existe.');
            }

            //check if user already accepted a artist.
            if (userPublication.hiredArtist) {
                userPublication.hiredArtist = null;
                throw new AppError('Você já aceitou um artista nesse serviço, veja em seu perfil.');
            }

            //check if userPublication(art service) belong this user
            if (userPublication.user.id !== userId) {
                throw new AppError('Apenas o dono da publicação pode aceitar o artista escolhido.');
            }

            //set userPublication to available "false".
            await this.usersPublicationRepository.invalidateUserPublication(userPublication);

            //insert artist id in the "hired artist field"
            await this.usersPublicationRepository.insertHiredArtistUserPublication(artistId);

            //delete all candidates from this userPublication in  table applications
            await this.applicationsRepository.rejectAnotherApplications(userPublicationId);

            return artist;
        } catch (error) {
            console.error('Erro no acceptArtistUseCase', error);
            throw Error;
        }
    }
}

