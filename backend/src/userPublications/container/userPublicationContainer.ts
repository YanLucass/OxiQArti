import { container } from "tsyringe";
import { CreateUserPublicationController } from "@userPublications/controllers/CreateUserPublicationController";
import { UsersPublicationRepository } from "@userPublications/repositories/UserPublicationRepository";

//controllers
container.registerSingleton("CreateUserPublicationController", CreateUserPublicationController);

//repositories
container.registerSingleton("UsersPublicationRepository", UsersPublicationRepository);
