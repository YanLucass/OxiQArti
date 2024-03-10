import { RefreshToken } from "@authentication/entities/RefreshToken";

export type CreateRefreshTokenDTO = {
   user_id?: string;
   artist_id?: string;
   refreshToken: string;
   valid: boolean;
   expires: Date;
};

export interface IRefreshTokenRepository {
   create({
      user_id,
      artist_id,
      refreshToken,
      valid,
      expires,
   }: CreateRefreshTokenDTO): Promise<RefreshToken>;
   findRefreshTokeByToken(refresh_token: string): Promise<RefreshToken | null>;
   invalidateRefreshToken(refresh_token: RefreshToken): Promise<void>;
   deleteRefreshToken(refresh_token: RefreshToken): Promise<void>;
}
