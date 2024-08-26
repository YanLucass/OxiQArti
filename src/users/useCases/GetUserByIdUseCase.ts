import { NotFoundError } from "@shared/errors/AppError";
import logger from "@shared/errors/logger";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetUserByIdUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute(id: string) {
        const user = await this.usersRepository.findUserById(id);
        if (!user) {
            logger.info("Tentativa de resgate ao um usuário inexistente");
            throw new NotFoundError("Usuario não existe");
        }

        return user;
    }
}

