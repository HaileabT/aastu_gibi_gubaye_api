import { Response, NextFunction } from 'express';
import { studentReq } from '../types/custom';
export declare const authenticateJWT: (req: studentReq, res: Response, next: NextFunction) => Promise<void>;
export declare const authorizeAdmin: (req: studentReq, res: Response, next: NextFunction) => void;
export declare const AddAdminAndSuperAdmin: (req: studentReq, res: Response, next: NextFunction) => void;
