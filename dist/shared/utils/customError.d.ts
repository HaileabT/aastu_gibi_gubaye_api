export declare class customError extends Error {
    statusCode: number;
    status: string;
    constructor(message: string, statusCode: number);
}
