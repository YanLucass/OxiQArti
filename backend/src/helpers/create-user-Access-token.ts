import jwtConfig from "@config/jwtConfig";
import { User } from "@users/entities/User";
import { sign } from "jsonwebtoken";

//create jwt access token helper
export const createUserAccessToken = (user: User): string => {
   const token = sign({ name: user.name }, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
   });

   return token;
};
