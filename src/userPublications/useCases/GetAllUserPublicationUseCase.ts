import { IUserPublicationRepository, ListUserPublicationPaginateReturn } from "@userPublications/repositories/IUserPublicationRepository";
import { inject, injectable } from "tsyringe";


type ListUserPublicationParams = {
    limit: number;
    page: number;
}
@injectable()
export class GetAllUserPublication {
    constructor(@inject("UsersPublicationRepository") private userPublicationRepository: IUserPublicationRepository) { }
    async execute({ page, limit }: ListUserPublicationParams): Promise<ListUserPublicationPaginateReturn>  {
        //get take. take(limit per page)
        const take = limit;

        //calculate pages skiped
        const skip = (page -1) * take;

        //pass to getAll method 
        const userPublications = await this.userPublicationRepository.getAllUserPublications({page, skip, take})
        
        return userPublications;


    }
}

