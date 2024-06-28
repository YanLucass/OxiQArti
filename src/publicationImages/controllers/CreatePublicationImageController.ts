import { CreatePublicationImageUseCase } from "@publicationImages/useCases/CreatePublicationImageUseCase";
import { UnprocessableEntityError } from "@shared/errors/AppError";
import { Request } from "express";
import { container } from "tsyringe";
export class CreatePublicationImageController {
    async handle(req: Request) {
        const createPublicationImageUseCase = container.resolve(CreatePublicationImageUseCase);
        if (!req.files || req.files.length === 0) {
            throw new UnprocessableEntityError("Nenhuma imagem anexeda");
        }
        await createPublicationImageUseCase.execute(req.files);
    }
}

