import { sign } from "jsonwebtoken";
import jwtConfig from "@config/jwtConfig";
import { User } from "@users/entities/User";

//type to middleware response
type RefreshTokenResponse = {
   expires: Date;
   refreshToken: string;
};



//helper to create a new RefreshToken.
export const createUserRefreshToken = (user: User): RefreshTokenResponse => {
   //create new date with refreshToken duration to expires column.
   const currentDate = new Date().toISOString();
   const dateFormated = new Date(currentDate);
   //brazilian time
   
      
   const expires = new Date(dateFormated.getTime() + jwtConfig.refreshToken.duration);
   

   //check if refreshToken secret is present
   if (!jwtConfig.refreshToken.secret) {
      throw new Error("jwtConfig.refresh.secret não está definido");
   }

   //create refresh token with userID
   const refreshToken = sign({}, jwtConfig.refreshToken.secret, {
      subject: user.id,
      //expiration
      expiresIn: jwtConfig.refreshToken.expiresIn,
   });

   return {
      expires,
      refreshToken,
   };
};
