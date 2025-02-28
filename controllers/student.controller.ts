import 'reflect-metadata';
import {AppDataSource} from '../data_source';
import {Student} from '../models/studentModel';

import {catchAsync} from '../shared/utils/catchAsync.utils';
import {customError} from '../shared/utils/customError';
import {filterUtils, filterOption} from '../shared/utils/filterUtils';
import {NextFunction, Request, Response} from 'express';
import {Language} from '../models/languageModel';
import {Service} from '../models/serviceModel';
import {ServiceD} from '../domain_entities/service.entity';
import {LanguageD} from '../domain_entities/language.entity';
import {hashPassword} from './auth.controller';
import {searchUtils} from '../shared/utils/searchUtils';
import {studentReq} from '../types/custom';
import {studentAddValidator} from '../shared/validators/student.validator';
import {format} from 'fast-csv';
import {capitalize} from '../shared/utils/capitalize.utils';

const studentRepo = AppDataSource.getRepository(Student);
const serviceRepo = AppDataSource.getRepository(Service);
const languageRepo = AppDataSource.getRepository(Language);

export const getStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      department,
      service,
      language,
      confession,
      current_year,
      role,
      gender,
      sort = 'first_name',
      limit = 10,
      page = 1,
      keyword = '',
    } = req.query;

    const queryBuilder = studentRepo.createQueryBuilder('student');

    const filters: filterOption = {
      department: typeof department === 'string' ? department : undefined,
      confession: typeof confession === 'string' ? confession : undefined,
      language: typeof language === 'string' ? language : undefined,
      service: typeof service === 'string' ? service : undefined,
      role: typeof role === 'string' ? role : undefined,
      current_year: typeof current_year === 'string' ? current_year : undefined,
      gender: typeof gender === 'string' ? gender : undefined,
      page: Number(page),
      limit: Number(limit),
      sort: typeof sort === 'string' ? sort : 'first_name',
    };

    queryBuilder
      .leftJoinAndSelect('student.department', 'department')
      .leftJoinAndSelect('student.service', 'service')
      .leftJoinAndSelect('student.language', 'language')
      .leftJoinAndSelect('student.confession', 'confession');

    filterUtils(queryBuilder, filters);
    if (keyword) {
      searchUtils(queryBuilder, keyword.toString());
    }

    const totalStudents = await queryBuilder.getCount();

    const skip = (Number(page) - 1) * Number(limit);
    queryBuilder.take(Number(limit));
    queryBuilder.skip(skip);

    let students = await queryBuilder
      .addSelect(`LOWER(student.${sort})`, 'loweredStu')
      .orderBy('loweredStu', 'ASC')
      .getMany();

    res.status(200).json({
      status: 'success',
      total: totalStudents,
      length: students.length,
      data: {
        students,
      },
    });
  }
);

export const createStudent = catchAsync(async (req: Request, res: Response) => {
  const reqBody = req.body;
  const {first_name, last_name, baptismal_name} = reqBody;
  reqBody.first_name = capitalize(first_name);
  reqBody.last_name = capitalize(last_name);
  reqBody.baptismal_name = capitalize(baptismal_name);
  const password = req.body.password;
  const serviceIds: string[] = req.body.service ?? [];
  const languageIds: string[] = req.body.language ?? [];
  const services: ServiceD[] = [];
  const languages: LanguageD[] = [];

  await studentAddValidator(req.body);

  serviceIds.forEach(async id => {
    const service = await serviceRepo.findOneBy({id});

    if (service) {
      services.push(service);
    }
  });
  languageIds.forEach(async id => {
    const language = await languageRepo.findOneBy({id});

    if (language) {
      languages.push(language);
    }
  });

  const hashedPassword = await hashPassword(password);

  const student: Student = await studentRepo.save({
    ...reqBody,
    password: hashedPassword,
  });

  student.service = services;
  student.language = languages;

  const s = await studentRepo.save(student);

  res.status(201).json({
    status: 'success',
    data: {
      student: s,
    },
  });
});

export const getOneStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;

    const student = await studentRepo.findOne({
      where: {id: studentId},
      relations: ['confession', 'department', 'language', 'service'],
    });

    if (!student) {
      throw new customError('there is no student in this id', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        student,
      },
    });
  }
);

export const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const student = await studentRepo.findOne({where: {id: studentId}});

  if (!student) {
    throw new customError('Student not found', 404);
  }
  await studentRepo.delete(studentId);

  return res.status(200).json({
    status: 'success',
    message: 'Student deleted',
  });
});

export const updateStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id;
    const serviceIds: string[] = req.body.service ?? [];
    const languageIds: string[] = req.body.language ?? [];
    const {service, language, ...otherFields} = req.body;
    const reqBody = req.body;
    const {first_name, last_name, baptismal_name} = reqBody;
    reqBody.first_name = capitalize(first_name);
    reqBody.last_name = capitalize(last_name);
    reqBody.baptismal_name = capitalize(baptismal_name);

    const student = await studentRepo.findOne({
      where: {id: studentId},
      relations: ['department', 'language', 'confession', 'service'],
    });

    if (!student) {
      throw new customError('Student not found', 404);
    }

    Object.assign(student, otherFields);
    ////to update the language and service
    if (
      reqBody.language !== null &&
      reqBody.language !== undefined &&
      reqBody.language.length > 0
    ) {
      const languages = await Promise.all(
        languageIds.map(async id => await languageRepo.findOneBy({id}))
      );
      student.language = languages.filter(Boolean) as LanguageD[];
    } else {
      student.language = student.language;
    }

    if (
      reqBody.service !== null &&
      reqBody.service !== undefined &&
      reqBody.service.length > 0
    ) {
      const services = await Promise.all(
        serviceIds.map(async id => await serviceRepo.findOneBy({id}))
      );
      student.service = services.filter(Boolean) as ServiceD[];
    } else {
      student.service = student.service;
    }
    // Object.assign(student, otherFields);
    await studentRepo.save(student);

    return res.status(200).json({
      status: 'success',
      data: student,
    });
  }
);

export const getLogedInPerson = catchAsync(
  async (req: studentReq, res: Response) => {
    const data = req.student;
    return res.status(200).json({
      status: 'success',
      data: data,
    });
  }
);

export const getStatsStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {department, service, current_year, role, gender} = req.query;

    const queryBuilder = studentRepo.createQueryBuilder('student');

    const filters: filterOption = {
      department: typeof department === 'string' ? department : undefined,
      service: typeof service === 'string' ? service : undefined,
      role: typeof role === 'string' ? role : undefined,
      current_year: typeof current_year === 'string' ? current_year : undefined,
      gender: typeof gender === 'string' ? gender : undefined,
    };

    queryBuilder
      .leftJoinAndSelect('student.department', 'department')
      .leftJoinAndSelect('student.service', 'service')
      .leftJoinAndSelect('student.language', 'language')
      .leftJoinAndSelect('student.confession', 'confession');

    filterUtils(queryBuilder, filters);

    let students = await queryBuilder.getMany();

    res.status(200).json({
      status: 'success',
      Studentlangth: students.length,
      data: {
        students,
      },
    });
  }
);

export const downloadStudentSpreadsheet = catchAsync(
  async (req: Request, res: Response) => {
    const {
      department,
      service,
      language,
      confession,
      current_year,
      role,
      gender,
      sort = 'first_name',
      keyword = '',
    } = req.query;

    const queryBuilder = studentRepo.createQueryBuilder('student');

    const filters: filterOption = {
      department: typeof department === 'string' ? department : undefined,
      confession: typeof confession === 'string' ? confession : undefined,
      language: typeof language === 'string' ? language : undefined,
      service: typeof service === 'string' ? service : undefined,
      role: typeof role === 'string' ? role : undefined,
      current_year: typeof current_year === 'string' ? current_year : undefined,
      gender: typeof gender === 'string' ? gender : undefined,
      sort: typeof sort === 'string' ? sort : 'first_name',
    };

    queryBuilder
      .select()
      .leftJoinAndSelect('student.department', 'department')
      .leftJoinAndSelect('student.service', 'service')
      .leftJoinAndSelect('student.language', 'language')
      .leftJoinAndSelect('student.confession', 'confession');

    filterUtils(queryBuilder, filters);
    if (keyword) {
      searchUtils(queryBuilder, keyword.toString());
    }

    let students = await queryBuilder
      .addSelect(`LOWER(student.${sort})`, 'loweredStu')
      .orderBy('loweredStu', 'ASC')
      .getMany();

    res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
    res.setHeader('Content-Type', 'text/csv');

    const csvStream = format({headers: true});
    csvStream.pipe(res);

    type PasswordIDOmitted = Omit<Student, 'password'>;
    type CSVStudent = Omit<
      PasswordIDOmitted,
      'department' | 'service' | 'language' | 'confession' | 'id'
    > & {
      id?: string;
      department: string;
      service: string;
      language: string;
      confession: string;
    };

    students.forEach(student => {
      delete student['password'];

      const stu = {
        ...student,
        department: student.department.department,
        service: student.service
          ? student.service.map(ser => ser.name).join(' & ')
          : '',
        language: student.language.map(lang => lang.name).join(' & '),
        confession: student.confession
          ? student.confession.first_name + ' ' + student.confession.last_name
          : '',
      } as CSVStudent;

      delete stu['id'];

      csvStream.write(stu);
    });

    csvStream.end();
  }
);
