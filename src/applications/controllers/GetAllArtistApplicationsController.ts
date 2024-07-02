import { GetAllArtistApplicationsUseCase } from "@applications/useCases/GetAllArtistApplicationsUseCase";
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
export class GetAllArtistApplicationsController {
    async handle(req: Request, res: Response) {

        const getAllArtistApplicationsUseCase = container.resolve(GetAllArtistApplicationsUseCase);
        const userPublicationId = req.params.id;
        const userId = req.user.id;

        const artistsApplications = await getAllArtistApplicationsUseCase.execute({userPublicationId, userId});

        return res.json({
            message: "Artistas que se candidataram a essa publicação",
            artists: instanceToInstance(artistsApplications)
        })
        
        
    }
}