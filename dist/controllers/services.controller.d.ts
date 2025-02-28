import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
export declare const createService: (req: Request, res: Response, next: NextFunction) => void;
export declare const getServices: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateService: (req: Request, res: Response, next: NextFunction) => void;
