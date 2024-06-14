import { IApplicationRepository } from '@applications/repositories/IApplicationRepository';
import { AppError } from '@shared/errors/AppError';
import { IUserPublicationRepository } from '@userPublications/repositories/IUserPublicationRepository';
import { IUsersRepository } from '@users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

type CreateApplicationDTO = {
    userId: string;
    userPublicationId: string;
};
@injectable()
export class CreateApplicationUseCase {
    private applicationRepository: IApplicationRepository;
    private userPublicationRepository: IUserPublicationRepository;
    private usersRepository: IUsersRepository;
    constructor(
        @inject('ApplicationRepository') applicationRepository: IApplicationRepository,
        @inject('UsersPublicationRepository')
        usersPublicationRepository: IUserPublicationRepository,
        @inject('UsersRepository') usersRepository: IUsersRepository,
    ) {
        this.applicationRepository = applicationRepository;
        this.userPublicationRepository = usersPublicationRepository;
        this.usersRepository = usersRepository;
    }

    async execute({ userId, userPublicationId }: CreateApplicationDTO) {
        //find user
        const user = await this.usersRepository.findUserById(userId);
        if (!user) throw new AppError('User id invalid or user not exits');

        //check if userPublication(artService) exits
        const userPublication =
            await this.userPublicationRepository.findUserPublicationById(userPublicationId);
        if (!userPublication) {
            throw new AppError('Não é possível se candidatar a uma publicação que não existe', 401);
        }

        //check if userPublication(serviceArt) is available
        if (!userPublication.available) {
            throw new AppError(
                'Puxa, esse serviço não está mais disponível. Encontre mais em: (dominio)',
                401,
            );
        }

        //check if user already application to job.
        //preciso verificar na tabela applications se tem uma mesma userPublication. é so
        const artistAlreadyApplication = await this.applicationRepository.findRepeatApplication(
            userPublicationId,
            userId,
        );

        if (artistAlreadyApplication) {
            throw new AppError(`Você já se candidatou a esse serviço :)`, 401);
        }

        //create application
        return this.applicationRepository.createApplication({ userPublication, user });
    }
}
