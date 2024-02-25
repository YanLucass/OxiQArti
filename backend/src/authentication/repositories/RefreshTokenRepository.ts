import { RefreshToken } from "@authentication/entities/RefreshToken";
import { PostgresDataSource } from "@shared/typeorm/connect";
import { Repository } from "typeorm";
import { CreateRefreshTokenDTO, IRefreshTokenRepository } from "./IRefreshTokenRepository";

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
      const token = await this.refreshTokenRepository.create({
         user_id,
         refreshToken,
         valid,
         expires,
      });
      return this.refreshTokenRepository.save(token);
   }
}
