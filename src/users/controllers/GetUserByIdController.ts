import { GetUserByIdUseCase } from "@users/useCases/GetUserByIdUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class GetUserByIdController {
    async handle(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const getUserByIdUseCase = container.resolve(GetUserByIdUseCase);

        const user = await getUserByIdUseCase.execute(id);
        return res.status(200).json({
            message: "Usuario resgatado com sucesso",
            user: user,
        });
    }
}

