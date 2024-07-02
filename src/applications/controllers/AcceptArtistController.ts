import { AcceptArtistUseCase } from "@applications/useCases/AcceptArtistUseCase";
import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class AcceptArtistController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const acceptArtistUseCase = container.resolve(AcceptArtistUseCase);

            const { userPublicationId } = req.params;
            const { artistId } = req.body;
            const userId = req.user.id;

            const artist = await acceptArtistUseCase.execute(
                { userPublicationId, artistId },
                userId,
            );

            return res.status(201).json({
                message: `Candidatura aceita, entre em contato com ${artist.name} para acertar `,
            });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            } else {
                console.log("Erro", error);
                return res.status(500).json({
                    error: error,
                    message: "Erro inesperado ao aceitar um artista. Tente novamente mais tarde!",
                });
            }
        }
    }
}

