export class AppError extends Error {
    public readonly message: string;
    public readonly statusCode: number;
    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
export class BadRequestError extends AppError {
    constructor(message: string = "Bad request") {
        super(message, 404);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Não encontrado.") {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized acess") {
        super(message, 401);
    }
}

export class UnprocessableEntityError extends AppError {
    constructor(message: string = "Argumentos faltantes ou ausentes.") {
        super(message, 422);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Argumentos conflitantes.") {
        super(message, 409);
    }
}

