import { User } from "@users/entities/User";
import jwtConfig from "@config/jwtConfig";
import { sign } from "jsonwebtoken";
import { Artist } from "@artists/entities/Artist";

//type to middleware response
type RefreshTokenResponse = {
   expires: Date;
   refreshToken: string;
};

//to define user common or artist
type Payload = {
   identifier: string;
   isArtist: boolean;
};

//helper to create a new RefreshToken.
export const createUserRefreshToken = (user: User | Artist): RefreshTokenResponse => {
   //create new date with refreshToken duration to expires column.
   const expires = new Date(Date.now() + jwtConfig.refreshToken.duration);

   //check if refreshToken secret is present
   if (!jwtConfig.refreshToken.secret) {
      throw new Error("jwtConfig.refresh.secret não está definido");
   }

   //payload to token

   //check if is artist or user commom to generate identifer to token
   const isArtist = "specialty" in user;

   const payload: Payload = {
      identifier: isArtist ? "artist" : "user",
      isArtist,
   };

   //create refresh token with userID
   const refreshToken = sign(payload, jwtConfig.refreshToken.secret, {
      subject: user.id,
      //expiration
      expiresIn: jwtConfig.refreshToken.expiresIn,
   });

   return {
      expires,
      refreshToken,
   };
};
