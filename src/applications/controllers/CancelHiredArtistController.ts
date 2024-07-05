import { CancelHiredArtistUseCase } from "@applications/useCases/CancelHiredArtistUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CancelHiredArtistController {
    async handle(req: Request, res: Response) {
        const { id } = req.user;
        const { userPublicationId } = req.params;
        const cancelHiredArtistUseCase = container.resolve(CancelHiredArtistUseCase);
        await cancelHiredArtistUseCase.execute(userPublicationId, id);

        return res.status(200).json({
            message: "Artista cancelado com sucesso.",
        });
    }
}

