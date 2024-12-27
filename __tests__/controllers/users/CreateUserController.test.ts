import { CreateUserController } from "@users/controllers/CreateUserController";
import { CreateUserUseCase } from "@users/useCases/CreateUserUseCase";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { IRefreshTokenRepository } from "@authentication/repositories/IRefreshTokenRepository";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import { UserRole } from "@users/repositories/IUsersRepository";

// Mocks para os repositórios
const usersRepositoryMock = {
    createUser: jest.fn(),
    findUserByEmail: jest.fn(),
    findUserById: jest.fn(),
    findUserByPhoneNumber: jest.fn(),
} as jest.Mocked<IUsersRepository>;

const refreshTokenRepositoryMock = {
    create: jest.fn(),
    findRefreshTokenByRefreshToken: jest.fn(),
    invalidateRefreshToken: jest.fn(),
    deleteRefreshToken: jest.fn(),
} as jest.Mocked<IRefreshTokenRepository>;

describe("CreateUserController", () => {
    let createUserController: CreateUserController;
    let createUserUseCase: CreateUserUseCase;

    beforeAll(() => {
        createUserController = new CreateUserController();

        createUserUseCase = new CreateUserUseCase(usersRepositoryMock, refreshTokenRepositoryMock);

        container.registerInstance(CreateUserUseCase, createUserUseCase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar status 201 e os dados do usuário criado", async () => {
        const mockUser = {
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
        };

        const mockAccessToken = "mockAccessToken";
        const mockRefreshToken = "mockRefreshToken";

        jest.spyOn(createUserUseCase, "execute").mockResolvedValue({
            user: mockUser,
            accessToken: mockAccessToken,
            refreshToken: mockRefreshToken,
        });

        const req = {
            body: {
                name: "Nikolas Telas",
                email: "nikolas@gmail.com",
                phone: "(81) 99387-0043",
                contact: "@yanL",
                about: "Meu nome é scar veja o linkedin: https://www.linkedin.com/in/yan-lucas-398a19267/",
                state: "Pernambuco",
                city: "Recife",
                specialty: "",
                role: "contractingArtist",
                password: "superSecret",
            },
            file: { filename: "avatar.jpg" },
        } as unknown as Request;

        const res = {} as Response;
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);

        await createUserController.handle(req, res);

        expect(createUserUseCase.execute).toHaveBeenCalledWith({
            name: "Nikolas Telas",
            email: "nikolas@gmail.com",
            phone: "(81) 99387-0043",
            contact: "@yanL",
            about: "Meu nome é scar veja o linkedin: https://www.linkedin.com/in/yan-lucas-398a19267/",
            state: "Pernambuco",
            city: "Recife",
            specialty: "",
            role: "contractingArtist",
            avatarFileName: "avatar.jpg",
            password: "superSecret",
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "New user created.",
            user: instanceToInstance(mockUser),
            accessToken: mockAccessToken,
            refreshToken: mockRefreshToken,
        });
    });
});

