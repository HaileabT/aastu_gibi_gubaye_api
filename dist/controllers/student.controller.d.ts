import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
export declare const getStudents: (req: Request, res: Response, next: NextFunction) => void;
export declare const createStudent: (req: Request, res: Response, next: NextFunction) => void;
export declare const getOneStudent: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteStudent: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateStudent: (req: Request, res: Response, next: NextFunction) => void;
export declare const getLogedInPerson: (req: Request, res: Response, next: NextFunction) => void;
