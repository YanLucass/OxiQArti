import { Request, Response } from "express";
import { container } from "tsyringe";
import { CancelHiredArtistUseCase } from "@applications/useCases/CancelHiredArtistUseCase";

export class CancelHiredArtistController {
    async handle(req: Request, res: Response): Promise<Response> {
        const cancelHiredArtistUseCase = container.resolve(CancelHiredArtistUseCase)
        const { userPublicationId } = req.params;
        const userId = req.user.id;

        await cancelHiredArtistUseCase.execute({userId, userPublicationId});

        return res.status(200).json({
            message: "Artista contratado removido!"
        })
        
        
    }
}