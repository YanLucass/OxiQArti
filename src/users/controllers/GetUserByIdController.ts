import { GetUserByIdUseCase } from "@users/useCases/GetUserByIdUseCase";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export class GetUserByIdController {
    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const id = req.params.id;
        const getUserByIdUseCase = container.resolve(GetUserByIdUseCase);
        try {
            const user = await getUserByIdUseCase.execute(id);
            return res.status(200).json({
                message: "Usuario resgatado com sucesso",
                user: user,
            });
        } catch (error) {
            return next(error);
        }
    }
}

