import { container } from "tsyringe";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { CreateUserController } from "@users/controllers/CreateUserController";
import { GetUserByIdController } from "@users/controllers/GetUserByIdController";

//register dependencies. UsersRepository follow the interface.
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);

//controllers
container.registerSingleton("CreateUserController", CreateUserController);
container.registerSingleton("GetUserByIdController", GetUserByIdController);

