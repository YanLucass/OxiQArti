import { IApplicationRepository } from "@applications/repositories/IApplicationRepository";
import { NotFoundError, UnauthorizedError } from "@shared/errors/AppError";
import { IUserPublicationRepository } from "@userPublications/repositories/IUserPublicationRepository";
import { inject, injectable } from "tsyringe";

type GetAllArtistApplicationsParams = {
    userPublicationId: string;
    userId: string;
};

@injectable()
export class GetAllArtistApplicationsUseCase {
    constructor(
        @inject("ApplicationRepository") private applicationsRepository: IApplicationRepository,
        @inject("UsersPublicationRepository") private usersPublication: IUserPublicationRepository,
    ) {}
    async execute({ userPublicationId, userId }: GetAllArtistApplicationsParams) {
        //validations

        //check if publication exits(probaly yes)
        const userPublication =
            await this.usersPublication.findUserPublicationById(userPublicationId);
        if (!userPublication) {
            throw new NotFoundError("Esse serviço não existe!");
        }

        // Check if the list is being displayed to the owner of the publication
        // How? If this userPublication (we have its ID) has a userId equal to the received userId, the publication belongs to the user
        if (userPublication.user.id !== userId) {
            throw new UnauthorizedError("Apenas o dono do serviço pode ver seus candidatos.");
        }

        //return all candidates
        return this.applicationsRepository.getAllArtistsApplications(userPublicationId);
    }
}

