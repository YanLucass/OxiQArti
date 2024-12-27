import { NextFunction, Request, Response } from "express";
import { GetUserByIdController } from "@users/controllers/GetUserByIdController";
import { container } from "tsyringe";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { GetUserByIdUseCase } from "@users/useCases/GetUserByIdUseCase";
import { UserRole } from "@users/repositories/IUsersRepository";
import { NotFoundError } from "@shared/errors/AppError";

describe("GetUserByIdController", () => {
    let getUserByIdController: GetUserByIdController;
    let req: Partial<Request>;
    let res: Partial<Response>;
    // Usando jest.Mocked para o mock
    let mockUsersRepository: jest.Mocked<UsersRepository>;
    let next: NextFunction;

    beforeEach(() => {
        getUserByIdController = new GetUserByIdController();
        req = {
            params: { id: "56b60c00-dc02-4853-93c5-792f386c46eb" },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();

        // Criando o mock do UsersRepository
        mockUsersRepository = {
            findUserById: jest.fn(),
            findUserByEmail: jest.fn(),
            findUserByPhoneNumber: jest.fn(),
            createUser: jest.fn(),
        } as unknown as jest.Mocked<UsersRepository>; // Casting para o tipo correto

        // registrar o mock no container do tsyringe
        container.register("UsersRepository", {
            useValue: mockUsersRepository,
        });

        // mockar o getUserByIdUseCase
        container.register("GetUserByIdUseCase", {
            useClass: GetUserByIdUseCase,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
        container.clearInstances();
    });

    it("should be defined", () => {
        expect(getUserByIdController).toBeDefined();
    });

    it("return a user", async () => {
        // Configurando o mock para retornar um usuário
        mockUsersRepository.findUserById.mockResolvedValue({
            id: "56b60c00-dc02-4853-93c5-792f386c46eb",
            name: "Nikolas Telas",
            email: "nikolas@gmail.com",
            password: "$2a$12$oyZA3vDse.CG0D1DiImeoOrvQTm55MJM8NgVTPov2PxYsam3k0naC",
            phone: "(81) 99387-0043",
            contact: "@yanL",
            about: "Meu nome é scar veja o linkedin: https://www.linkedin.com/in/yan-lucas-398a19267/",
            state: "Pernambuco",
            city: "Recife",
            specialty: "",
            role: UserRole.ContractingArtist,
            avatar: "",
            created_at: new Date("08/09/2005"),
        });

        await getUserByIdController.handle(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Usuario resgatado com sucesso",
            user: {
                id: "56b60c00-dc02-4853-93c5-792f386c46eb",
                name: "Nikolas Telas",
                email: "nikolas@gmail.com",
                password: "$2a$12$oyZA3vDse.CG0D1DiImeoOrvQTm55MJM8NgVTPov2PxYsam3k0naC",
                phone: "(81) 99387-0043",
                contact: "@yanL",
                about: "Meu nome é scar veja o linkedin: https://www.linkedin.com/in/yan-lucas-398a19267/",
                state: "Pernambuco",
                city: "Recife",
                specialty: "",
                role: "contractingArtist",
                avatar: "",
                created_at: new Date("08/09/2005"),
            },
        });
    });

    it("return 404 case user don't exist", async () => {
        // Mockar o retorno para simular que o usuário não existe
        mockUsersRepository.findUserById.mockResolvedValue(null);

        await getUserByIdController.handle(req as Request, res as Response, next);
        // expect(res.status).toHaveBeenCalledWith(200);
        expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
});

