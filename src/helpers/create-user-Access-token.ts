import jwtConfig from '@config/jwtConfig';
import { sign } from 'jsonwebtoken';
import { User } from '@users/entities/User';

//to define user common or artist
type Payload = {
   userRole: string;
};

//create jwt access token helper
export const createUserAccessToken = (user: User): string => {
   //check if accessToken secret is present
   if (!jwtConfig.jwt.secret) {
      throw new Error('jwtConfig.refresh.secret não está definido');
   }

   let payload: Payload = { userRole: '' };

   //define usersRole from jwt
   const userRole: Record<string, string> = {
      onlyArtist: 'onlyArtist',
      contractingArtist: 'contractingArtist',
      default: 'contractingOnly',
   };

   payload = {
      userRole: userRole[user.role] || userRole['default'],
   };

   const token = sign(payload, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
   });

   return token;
};

