import { CreateAccessAndRefreshTokenController } from "@authentication/controllers/CreateAccessAndRefreshTokenController";
import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";
import { RefreshTokenRepository } from "@authentication/repositories/RefreshTokenRepository";
import { container } from "tsyringe";

container.registerSingleton<IRefreshTokenRepository>(
   "RefreshTokenRepository",
   RefreshTokenRepository,
);

//controllers
container.registerSingleton("CreateRefreshTokenController", CreateAccessAndRefreshTokenController);
