import {Request, Response, NextFunction} from 'express';
import {verifyToken} from '../controllers/auth.controller';
import {Student} from '../models/studentModel';
import {AppDataSource} from '../data_source';
import {studentReq} from '../types/custom';

const studentRepo = AppDataSource.getRepository(Student);

export const authenticateJWT = async (
  req: studentReq,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(403).json({message: 'Access denied. No token provided.'});
    return;
  }
  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({message: 'Invalid token'});
    return;
  }
  try {
    const studentId = decoded.studentId;
    const student = await studentRepo.findOne({
      where: {id: studentId},
      relations: ['confession', 'department', 'language', 'service'],
    });

    if (!student) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }

    req.student = student;
    next();
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching student data',
    });
  }
};

export const authorizeAdmin = (
  req: studentReq,
  res: Response,
  next: NextFunction
) => {
  if (
    (req.student && req.student.role === 'admin') ||
    (req.student && req.student.role === 'Super-admin')
  ) {
    return next();
  } else {
    res.status(403).json({
      message: 'You are not authorized to do this action',
    });
    return;
  }
};

export const AddAdminAndSuperAdmin = (
  req: studentReq,
  res: Response,
  next: NextFunction
) => {
  if (
    req.student &&
    (req.student.role == 'admin' || req.student.role == 'Enroller') &&
    (req.body.role == 'Super-admin' || req.body.role == 'admin')
  ) {
    res.status(403).json({
      message: 'You are not authorized to add admin or super admin',
    });
    return;
  } else {
    next();
  }
};

export const RegisterAuthorizer = (
  req: studentReq,
  res: Response,
  next: NextFunction
) => {
  if (
    (req.student && req.student.role === 'admin') ||
    (req.student && req.student.role === 'Super-admin') ||
    (req.student && req.student.role === 'Enroller')
  ) {
    return next();
  } else {
    res.status(403).json({
      message: 'You are not authorized to do this action',
    });
    return;
  }
};
