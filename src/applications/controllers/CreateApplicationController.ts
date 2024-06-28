import { CreateApplicationUseCase } from "@applications/useCases/CreateApplicationUseCase";
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateApplicationController {
    async handle(req: Request, res: Response) {
        const createApplicationUseCase = container.resolve(CreateApplicationUseCase);
        const userId = req.user.id;
        const userPublicationId = req.params.userPublicationId;

        //send id to createApplication service
        const newApplication = await createApplicationUseCase.execute({
            userId,
            userPublicationId,
        });

        return res.status(201).json({
            message: "Candidatura enviada, boa sorte!",
            newApplication: instanceToInstance(newApplication),
        });
    }
}

