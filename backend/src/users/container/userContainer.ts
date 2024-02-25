import { container } from "tsyringe";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { CreateUserController } from "@users/controllers/CreateUserController";

//register dependencies. UsersRepository follow the interface.
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);

//controllers
container.registerSingleton("CreateUserController", CreateUserController);
