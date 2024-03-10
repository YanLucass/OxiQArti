import { Artist } from "@artists/entities/Artist";
import jwtConfig from "@config/jwtConfig";
import { User } from "@users/entities/User";
import { sign } from "jsonwebtoken";

//to define user common or artist
type Payload = {
   identifier: string;
   isArtist: boolean;
};

//create jwt access token helper
export const createUserAccessToken = (user: User | Artist): string => {
   //check if accessToken secret is present
   if (!jwtConfig.jwt.secret) {
      throw new Error("jwtConfig.refresh.secret não está definido");
   }

   //check if user is artist or user commom to generate token
   const isArtist = "specialty" in user;

   //payload to token
   const payload: Payload = {
      identifier: isArtist ? "artist" : "user",
      isArtist: isArtist,
   };

   const token = sign(payload, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
   });

   return token;
};
