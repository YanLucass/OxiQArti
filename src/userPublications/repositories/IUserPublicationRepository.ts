import { UserPublication } from "@userPublications/entities/UserPublication";
import { User } from "@users/entities/User";

export type CreateUserPublicationDTO = {
    title: string;
    description: string;
    service: string;
    user: User;
};

//type to paginate params
export type GetAllPaginateParams = {
    page: number;
    skip: number;
    take: number;
};

//paginate date return
export type ListUserPublicationPaginateReturn = {
    per_page: number; //limit per page
    total: number; //total records in bd
    current_page: number;
    data: UserPublication[]; // array all records(formart userPublications).
};
export interface IUserPublicationRepository {
    createUserPublication({
        title,
        description,
        service,
        user,
    }: CreateUserPublicationDTO): Promise<UserPublication>;

    //get all userPublication with pagination
    getAllUserPublications({
        page,
        skip,
        take,
    }: GetAllPaginateParams): Promise<ListUserPublicationPaginateReturn>;
    findUserPublicationById(id: string): Promise<UserPublication | null>;
    invalidateUserPublication(userPublication: UserPublication): Promise<void>;
    insertHiredArtistUserPublication(
        userPublication: UserPublication,
        artistId: string,
    ): Promise<void>;
    cancelHiredArtistUserPublication(userPublication: UserPublication): Promise<void>;
}

