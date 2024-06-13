import { AcceptArtistUseCase } from "@applications/useCases/AcceptArtistUseCase";
import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class AcceptArtistController {
    async handle(req: Request, res: Response) {
        try {
            const acceptArtistUseCase = container.resolve(AcceptArtistUseCase);
        
        const { userPublicationId } = req.params;
        const { artistId } = req.body;
        const userId = req.user.id;

        const artist = await acceptArtistUseCase.execute({userPublicationId, artistId}, userId);
        
        return res.status(201).json({
            message: `Candidatura aceita, entre em contato com ${artist.name} para acertar `
        })
        
        } catch (error) {
            console.error("Deu erro no AcceptArtistController", error)
            if(error instanceof AppError) {
                throw error;
            } else {
                throw new AppError("Erro inesperado ao aceitar um artista", 500);
            }
        }
        
        
    }
}