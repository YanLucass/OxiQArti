import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { createUserAccessToken } from "./create-user-Access-token";
import { createUserRefreshToken } from "./create-user-RefreshToken";
import { PostgresDataSource } from "@shared/typeorm/connect";


type newAccessTokensDTO = {
   user: User,
   refresh_token: string,
   refreshTokenRepository: IRefreshTokenRepository,
}


//refresh token response
type IResponse = {
   accessToken: string;
   refreshToken: string;
};

export const handleRefreshToken = async (
   {user, refresh_token, refreshTokenRepository}: newAccessTokensDTO
): Promise<IResponse> => {
   

   let accessToken: string = "";
   let refreshToken: string = ""

   // find refreshToken
   const refreshTokenByToken = await refreshTokenRepository.findRefreshTokenByRefreshToken(refresh_token);
   if (!refreshTokenByToken) {
      throw new AppError("Refresh token invalid", 401);  
   }
   

   // wrap all operations in a transaction
   await PostgresDataSource.transaction(async transactionalEntityManager => {
      //invalidate current refreshToken to create another.
      await refreshTokenRepository.invalidateRefreshToken(refreshTokenByToken);

      // delete old refreshToken
      await refreshTokenRepository.deleteRefreshToken(refreshTokenByToken);
      
      // check if token is invalid or expired it cannot.
      // expired if current time > token expires time
      const currentTime = new Date().getTime();
      if (!refreshTokenByToken.valid || currentTime > refreshTokenByToken.expires.getTime()) {
         throw new AppError("Refresh token is invalid / expired.");
      }

      // create new access token
      accessToken = await createUserAccessToken(user);

      // create new refreshToken
      const newToken = await createUserRefreshToken(user);
      refreshToken = newToken.refreshToken;
      

      // save new token in bd
      await refreshTokenRepository.create({
         user_id: user.id,
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
