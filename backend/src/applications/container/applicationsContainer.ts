import { container } from "tsyringe";

//controllers
import { CreateApplicationController } from "@applications/controllers/CreateApplicationController";
import { GetAllArtistApplicationsController } from "@applications/controllers/GetAllArtistApplicationsController";
//repositories
import { ApplicationRepository } from "@applications/repositories/ApplicationRepository";

//register controllers
container.registerSingleton("CreateApplicationController", CreateApplicationController);
container.registerSingleton("GetAllArtistApplicationController", GetAllArtistApplicationsController);
//register repositories
container.registerSingleton("ApplicationRepository", ApplicationRepository)