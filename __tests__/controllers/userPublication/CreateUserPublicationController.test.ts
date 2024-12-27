import { UsersRepository } from "@users/repositories/UsersRepository";
import { UsersPublicationRepository } from "@userPublications/repositories/UserPublicationRepository";
import { PublicationImageRepository } from "@publicationImages/repositories/PublicationImageRepository";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { IPublicationImageRepository } from "@publicationImages/repositories/IPublicationImageRepository";
import { IUserPublicationRepository } from "@userPublications/repositories/IUserPublicationRepository";
import { CreateUserPublicationController } from "@userPublications/controllers/CreateUserPublicationController";
import { CreateUserPublicationUseCase } from "@userPublications/useCases/CreateUserPublicationUseCase";
import { UserPublication } from "@userPublications/entities/UserPublication";

const usersRepositoryMock = {
    createUser: jest.fn(),
    findUserByEmail: jest.fn(),
    findUserById: jest.fn(),
    findUserByPhoneNumber: jest.fn(),
} as jest.Mocked<IUsersRepository>;

const publicationImageRepositoryMock = {
    saveImage: jest.fn(),
} as jest.Mocked<IPublicationImageRepository>;

const usersPublicationRepositoryMock = {
    createUserPublication: jest.fn(),
    getAllUserPublications: jest.fn(),
    findUserPublicationById: jest.fn(),
    invalidateUserPublication: jest.fn(),
    insertHiredArtistUserPublication: jest.fn(),
    cancelHiredArtistUserPublication: jest.fn(),
} as jest.Mocked<IUserPublicationRepository>;

describe("Create user Publication tests", () => {
    let createUserPublicationController: CreateUserPublicationController;
    let createUserPublicationUseCase: CreateUserPublicationUseCase;

    beforeAll(() => {
        createUserPublicationController = new CreateUserPublicationController();
        createUserPublicationUseCase = new CreateUserPublicationUseCase(
            publicationImageRepositoryMock,
            usersPublicationRepositoryMock,
            usersRepositoryMock,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar 201 e os dados da publicação do usuário", async () => {
        const mockUserPublication = {
            id: "c2b4171b-26ef-4d6b-b2b8-829fa7149e62",
            title: "Quadro de HXH",
            description:
                "Alguém fera poderia fazer um quadro de HXH para mim? Essa é a foto de referencia:",
            service: "Tinta",
            hiredArtist: null,
            available: true,
            images: [],
            applications: [],
            user: {
                id: "e92073ad-3dd5-420e-9b17-4eb4c5e4c0fa",
                name: "Nikolas",
                email: "yanenem@gmail.com",
                phone: "(81) 99387-0041",
                contact: "@yanL",
                about: "Meu nome é scar veja o linkedin: https://www.linkedin.com/in/yan-lucas-398a19267/",
                state: "Pernambuco",
                city: "Recife",
                specialty: "",
                role: "contractingArtist",
                avatar: "",
                password: "senhalouca",
                created_at: new Date("2024-11-03T22:37:47.559Z"),
            },
            created_at: new Date("2024-11-10T21:53:21.052Z"),
        };

        const mockAccessToken = "mockAccessToken";
        const mockRefreshToken = "mockRefreshToken";

        jest.spyOn(createUserPublicationUseCase, "execute").mockResolvedValue(
            mockUserPublication as UserPublication,
        );
    });
});

