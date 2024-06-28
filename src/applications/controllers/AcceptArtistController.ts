import { AcceptArtistUseCase } from "@applications/useCases/AcceptArtistUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class AcceptArtistController {
    async handle(req: Request, res: Response): Promise<Response> {
        const acceptArtistUseCase = container.resolve(AcceptArtistUseCase);

        const { userPublicationId } = req.params;
        const { artistId } = req.body;
        const userId = req.user.id;

        const artist = await acceptArtistUseCase.execute({ userPublicationId, artistId }, userId);

        return res.status(201).json({
            message: `Candidatura aceita, entre em contato com ${artist.name} para acertar `,
        });
    }
}

