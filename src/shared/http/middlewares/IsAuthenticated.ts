import jwtConfig from "@config/jwtConfig";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

type JwtPayload = {
   sub: string;
};
export const IsAuthenticated = (req: Request, res: Response, next: NextFunction) => {
   //auth headers not present
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      return res.status(401).json({
         error: true,
         code: "token.invalid",
         message: "access token is not present",
      });
   }

   const token = authHeader.replace("Bearer ", ""); //remove bearer of token

   // Check if the token is empty
   if (!token) {
      return res.status(401).json({
         error: true,
         code: "token.invalid",
         message: "Access token not present",
      });
   }

   //Decode token to check if is valid or expired
   try {
      //it will decode the token, if it cannot, it is because the token invalid /expired.
      const decodedToken = verify(token, jwtConfig.jwt.secret as Secret);
      const { sub } = decodedToken as JwtPayload;
      req.user = { id: sub };
      next();
   } catch (error) {
      return res.status(401).json({
         error: true,
         code: "token.expired", //used by the frontend to request new token
         message: "Acess token expired",
      });
   }
};
