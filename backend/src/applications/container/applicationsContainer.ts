import { container } from "tsyringe";

//controllers
import { CreateApplicationController } from "@applications/controllers/CreateApplicationController";
import { GetAllArtistApplicationsController } from "@applications/controllers/GetAllArtistApplicationsController";
import { AcceptArtistController } from "@applications/controllers/AcceptArtistController";
//repositories
import { ApplicationRepository } from "@applications/repositories/ApplicationRepository";

//register controllers
container.registerSingleton("CreateApplicationController", CreateApplicationController);
container.registerSingleton("GetAllArtistApplicationController", GetAllArtistApplicationsController);
container.registerSingleton("AcceptArtistController", AcceptArtistController);
//register repositories
container.registerSingleton("ApplicationRepository", ApplicationRepository)