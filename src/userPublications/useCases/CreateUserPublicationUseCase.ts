import { IPublicationImageRepository } from "@publicationImages/repositories/IPublicationImageRepository";
import { IUserPublicationRepository } from "@userPublications/repositories/IUserPublicationRepository";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/AppError";

//type to create userPublication
type CreateUserPublication = {
    title: string;
    description: string;
    service: string;
};
@injectable()
export class CreateUserPublicationUseCase {
    constructor(
        @inject("PublicationImageRepository")
        private publicationImageRepository: IPublicationImageRepository,
        @inject("UsersPublicationRepository")
        private userPublicationRepository: IUserPublicationRepository,
        @inject("UsersRepository") private usersRepository: IUsersRepository,
    ) {}

    async execute(
        { title, description, service }: CreateUserPublication,
        userId: string,
        reqFiles,
    ) {
        //create user publication
        //Check if the user onwer of id exits to pass a correct id for "create" from repository.
        const user = await this.usersRepository.findUserById(userId);

        //user invalid / no authenticated
        if (!user) {
            throw new NotFoundError("Apenas usuários autenticados podem fazer publicações");
        } else {
            const userPublication = await this.userPublicationRepository.createUserPublication({
                title,
                description,
                service,
                user,
            });

            //check if publication have images
            if (reqFiles) {
                //save imagens in the "images" table
                for (const file of reqFiles) {
                    await this.publicationImageRepository.saveImage({
                        nameImage: file.filename,
                        userPublication: userPublication,
                        userId: user.id,
                    });
                }
            }
            return userPublication;
        }
    }
}

