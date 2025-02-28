import { Request, Response, NextFunction } from "express";
import { customError } from './customError';
export declare const errorHandler: (err: customError, req: Request, res: Response, next: NextFunction) => void;
