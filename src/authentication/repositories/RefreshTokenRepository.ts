import { RefreshToken } from '@authentication/entities/RefreshToken';
import { PostgresDataSource } from '@shared/typeorm/connect';
import { Repository } from 'typeorm';
import { CreateRefreshTokenDTO, IRefreshTokenRepository } from './IRefreshTokenRepository';
import { AppError } from '@shared/errors/AppError';

export class RefreshTokenRepository implements IRefreshTokenRepository {
    private refreshTokenRepository: Repository<RefreshToken>;

    constructor() {
        this.refreshTokenRepository = PostgresDataSource.getRepository(RefreshToken);
    }

    async create({
        user_id,
        refreshToken,
        valid,
        expires,
    }: CreateRefreshTokenDTO): Promise<RefreshToken> {
        // Converter para UTC
        const utcExpires = new Date(expires.toISOString());

        const token = this.refreshTokenRepository.create({
            user_id,
            refreshToken,
            valid,
            expires: utcExpires,
        });


        return this.refreshTokenRepository.save(token);
    }

    findRefreshTokenByRefreshToken(refresh_token: string): Promise<RefreshToken | null> {
        return this.refreshTokenRepository.findOneBy({ refreshToken: refresh_token });
    }

    async invalidateRefreshToken(refresh_token: RefreshToken): Promise<void> {
        const token = await this.findRefreshTokenByRefreshToken(refresh_token.refreshToken);
        if (!token) throw new AppError('RefreshToken not found');
        token.valid = false;
        await this.refreshTokenRepository.save(token);
    }

    async deleteRefreshToken(refresh_token: RefreshToken): Promise<void> {
        await this.refreshTokenRepository.delete({ refreshToken: refresh_token.refreshToken });
    }
}
