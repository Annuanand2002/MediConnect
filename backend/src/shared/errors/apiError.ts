export class APIError extends Error {
    constructor(public readonly statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}