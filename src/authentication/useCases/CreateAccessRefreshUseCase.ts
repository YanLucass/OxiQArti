import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";
import { UnauthorizedError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { handleRefreshToken } from "src/helpers/handle-refresh-token";
import { inject, injectable } from "tsyringe";

//dto
export type CreateAccessAndRefreshTokenDTO = {
    user_id: string;
    refresh_token: string;
};

//response refreshToken
type IResponse = {
    user: User;
    accessToken: string;
    refreshToken: string;
};

@injectable()
export class CreateAccessAndRefreshTokenUseCase {
    constructor(
        @inject("RefreshTokenRepository") private refreshTokenRepository: IRefreshTokenRepository,
        //usersRepository to get user by id
        @inject("UsersRepository") private usersRepository: IUsersRepository,
    ) {}

    async execute({ user_id, refresh_token }: CreateAccessAndRefreshTokenDTO): Promise<IResponse> {
        //find user
        const user: User | null = await this.usersRepository.findUserById(user_id);

        if (!user) {
            throw new UnauthorizedError("Apenas usuários logados podem solictar um refreshToken");
        }

        //case have user create new acess and refresh token with helper.
        const { refreshToken, accessToken } = await handleRefreshToken({
            user,
            refresh_token,
            refreshTokenRepository: this.refreshTokenRepository,
        });

        return {
            user,
            accessToken,
            refreshToken,
        };
    }
}

