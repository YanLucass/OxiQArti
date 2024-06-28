import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import multer from "multer";
import { QueryFailedError } from "typeorm";

export const tratmentErrors = (
    error: Error & AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    //custom classes(ApiError, NotFoundError etc) include statusCode.
    if (error && error.statusCode) {
        return res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message,
        });
    } else if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(404).json({
                statusCode: 401,
                message:
                    "Erro ao subir imagens. Por favor certifique-se que está subindo a quantidade adequada de imagnes",
            });
        }
    } else if (error instanceof QueryFailedError) {
        console.error("Erro de query do bd", error);
    } else {
        console.error("Erro inesperado na aplicação: ", error);
        console.error(error.stack);
        return res.status(500).json({
            statusCode: 500,
            message: "International server error",
        });
    }
};

