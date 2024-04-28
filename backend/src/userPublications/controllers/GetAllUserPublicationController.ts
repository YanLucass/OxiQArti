import { GetAllUserPublication } from "@userPublications/useCases/GetAllUserPublicationUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";
export class GetAllUserPublicationController {
    
    async handle(req: Request, res: Response): Promise<Response> {

        //inject getAllService
        const getAllUserPublication = container.resolve(GetAllUserPublication)
        //define page and limit/take default.
        //to assign page from url if exists and be an number, case don't exists we assing default = 1.
        const page = req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1;

        //to assign limit from url if exists and be a number, case don't exists, we assing default = 15
        const limit = req.query.limit && Number(req.query.limit) > 0? Number(req.query.limit): 15;        
        
        const userPublications = await getAllUserPublication.execute({page, limit})

        return res.json(userPublications)
                
    }
}