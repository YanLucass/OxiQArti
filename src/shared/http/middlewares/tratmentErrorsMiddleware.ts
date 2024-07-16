import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import multer from "multer";
import { QueryFailedError } from "typeorm";
import logger from "@shared/errors/logger";

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
        logger.error("Erro no multer", error);
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(401).json({
                statusCode: 401,
                message:
                    "Erro ao subir imagens. Por favor certifique-se que está subindo a quantidade adequada de imagnes",
            });
        }
    } else if (error instanceof QueryFailedError) {
        logger.error("Erro de banco de dados", error);
    } else {
        logger.error("Erro inesperado na aplicação:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "International server error",
        });
    }
};

