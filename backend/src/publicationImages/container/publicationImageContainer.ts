import { CreatePublicationImageController } from "@publicationImages/controllers/CreatePublicationImageController";
import { PublicationImageRepository } from "@publicationImages/repositories/PublicationImageRepository";
import { container } from "tsyringe";

//controllers
container.registerSingleton("CreatePublicationImageController", CreatePublicationImageController);

//repositories
container.registerSingleton("PublicationImageRepository", PublicationImageRepository);
