import { RefreshToken } from "@authentication/entities/RefreshToken";

import { PostgresDataSource } from "@shared/typeorm/connect";

import { Repository } from "typeorm";

import { CreateRefreshTokenDTO, IRefreshTokenRepository } from "./IRefreshTokenRepository";

import { AppError } from "@shared/errors/AppError";



export class RefreshTokenRepository implements IRefreshTokenRepository {

   private refreshTokenRepository: Repository<RefreshToken>;

   constructor() {

      this.refreshTokenRepository = PostgresDataSource.getRepository(RefreshToken);

   }



   //create refreshToken

   async create({

      user_id,

      artist_id,

      refreshToken,

      valid,

      expires,

   }: CreateRefreshTokenDTO): Promise<RefreshToken> {

      const token = await this.refreshTokenRepository.create({

         user_id,

         artist_id,

         refreshToken,

         valid,

         expires,

      });

      return this.refreshTokenRepository.save(token);

   }



   //find refreshToken by id

   findRefreshTokeByToken(refresh_token: string): Promise<RefreshToken | null> {

      return this.refreshTokenRepository.findOneBy({ refreshToken: refresh_token });

   }



   //invalidate

   async invalidateRefreshToken(refresh_token: RefreshToken): Promise<void> {

      const token = await this.findRefreshTokeByToken(refresh_token.refreshToken);



      //check if exists

      if (!token) throw new AppError("RefreshToken not found");

      token.valid = false;

      await this.refreshTokenRepository.save(token);

   }



   //delete refreshToken

   async deleteRefreshToken(refresh_token: RefreshToken): Promise<void> {

      await this.refreshTokenRepository.delete({ refreshToken: refresh_token.refreshToken });

   }

}

