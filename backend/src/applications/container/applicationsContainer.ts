import { container } from "tsyringe";

//controllers
import { CreateApplicationController } from "@applications/controllers/CreateApplicationController";
//repositories
import { ApplicationRepository } from "@applications/repositories/ApplicationRepository";

//register controllers
container.registerSingleton("CreateApplicationController", CreateApplicationController);

//register repositories
container.registerSingleton("ApplicationRepository", ApplicationRepository)