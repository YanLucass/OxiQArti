import { Artist } from "@artists/entities/Artist";
import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { createUserAccessToken } from "./create-user-Access-token";
import { createUserRefreshToken } from "./create-user-RefreshToken";
import { PostgresDataSource } from "@shared/typeorm/connect";

type IResponse = {
   accessToken: string;
   refreshToken: string;
};

export const handleRefreshToken = async (
   entity: User | Artist | null,
   refresh_token: string,
   refreshTokenRepository: IRefreshTokenRepository,
): Promise<IResponse> => {
   // if not user
   if (!entity) {
      throw new AppError("User not found", 404);
   }

   let accessToken: string = "";
   let refreshToken: string = "";

   // find refreshToken
   const refreshTokenByToken = await refreshTokenRepository.findRefreshTokeByToken(refresh_token);
   if (!refreshTokenByToken) {
      throw new AppError("Refresh token invalid", 401);
   }

   // wrap all operations in a transaction
   await PostgresDataSource.transaction(async transactionalEntityManager => {
      // invalidate current refreshToken to create another.
      await refreshTokenRepository.invalidateRefreshToken(refreshTokenByToken);

      // delete old refreshToken
      await refreshTokenRepository.deleteRefreshToken(refreshTokenByToken);

      // check if token is invalid or expired it cannot.
      // expired if current time > token expires time
      const currentTime = new Date().getTime();
      if (!refreshTokenByToken.valid || refreshTokenByToken.expires.getTime() < currentTime) {
         throw new AppError("Refresh token invalid or expired.");
      }

      // create new access token
      accessToken = await createUserAccessToken(entity);

      // create new refreshToken
      const newToken = await createUserRefreshToken(entity);
      refreshToken = newToken.refreshToken;
      // determinate the ID and type for the entity
      const entityId = entity instanceof Artist ? entity.id : entity.id;
      const entityField = entity instanceof Artist ? "artist_id" : "user_id";

      // save new token in bd
      await refreshTokenRepository.create({
         // artist_id or user_id
         [entityField]: entityId,
         refreshToken,
         valid: true,
         expires: newToken.expires,
      });
   });

   // return new refresh and access token
   return {
      accessToken,
      refreshToken,
   };
};
