import { container } from "tsyringe";
import { CreateUserPublicationController } from "@userPublications/controllers/CreateUserPublicationController";
import { UsersPublicationRepository } from "@userPublications/repositories/UserPublicationRepository";
import { GetAllUserPublicationController } from "@userPublications/controllers/GetAllUserPublicationController";

//controllers
container.registerSingleton("CreateUserPublicationController", CreateUserPublicationController);
container.registerSingleton("GetAllUserPublicationController", GetAllUserPublicationController)

//repositories
container.registerSingleton("UsersPublicationRepository", UsersPublicationRepository);
