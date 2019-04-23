export enum ErrorCodes{
    INVALID_EMAIL,
    EXISTING_ACCOUNT,
    INVALID_USERNAME
}
const httpCodes = new Map();
httpCodes.set(ErrorCodes.INVALID_EMAIL, 400);
httpCodes.set(ErrorCodes.EXISTING_ACCOUNT, 409);
httpCodes.set(ErrorCodes.INVALID_USERNAME, 400);

export class BaseError extends Error {
    constructor(public message: string, public code:ErrorCodes) {
        super();
        Error.captureStackTrace(this, this.constructor);
    }

    public static code2http(code:ErrorCodes): number{
        if(httpCodes.has(code))
            return httpCodes.get(code);
        return 500;
    }
}