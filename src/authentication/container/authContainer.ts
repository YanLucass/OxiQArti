import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";
import { RefreshTokenRepository } from "@authentication/repositories/RefreshTokenRepository";
import { container } from "tsyringe";

//import controllers
import { CreateAccessAndRefreshTokenController } from "@authentication/controllers/CreateAccessAndRefreshTokenController";
import { LoginController } from "@authentication/controllers/LoginController";

//repositories
container.registerSingleton<IRefreshTokenRepository>(
   "RefreshTokenRepository",
   RefreshTokenRepository,
);

//controllers
container.registerSingleton("CreateRefreshTokenController", CreateAccessAndRefreshTokenController);
container.registerSingleton("LoginController", LoginController);
