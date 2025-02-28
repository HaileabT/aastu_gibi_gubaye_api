"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogedInPerson = exports.updateStudent = exports.deleteStudent = exports.getOneStudent = exports.createStudent = exports.getStudents = void 0;
require("reflect-metadata");
const data_source_1 = require("../data_source");
const studentModel_1 = require("../models/studentModel");
const catchAsync_utils_1 = require("../shared/utils/catchAsync.utils");
const customError_1 = require("../shared/utils/customError");
const filterUtils_1 = require("../shared/utils/filterUtils");
const languageModel_1 = require("../models/languageModel");
const serviceModel_1 = require("../models/serviceModel");
const auth_controller_1 = require("./auth.controller");
const searchUtils_1 = require("../shared/utils/searchUtils");
const student_validator_1 = require("../shared/validators/student.validator");
const studentRepo = data_source_1.AppDataSource.getRepository(studentModel_1.Student);
const serviceRepo = data_source_1.AppDataSource.getRepository(serviceModel_1.Service);
const languageRepo = data_source_1.AppDataSource.getRepository(languageModel_1.Language);
const getTotalStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield studentRepo.count();
});
exports.getStudents = (0, catchAsync_utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { department, service, language, confession, current_year, role, gender, sort = 'first_name', limit = 10, page = 1, keyword = '', } = req.query;
    const queryBuilder = studentRepo.createQueryBuilder('student');
    const filters = {
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
    (0, filterUtils_1.filterUtils)(queryBuilder, filters);
    if (keyword) {
        (0, searchUtils_1.searchUtils)(queryBuilder, keyword.toString());
    }
    const skip = (Number(page) - 1) * Number(limit);
    queryBuilder.take(Number(limit));
    queryBuilder.skip(skip);
    let students = yield queryBuilder
        .addSelect(`LOWER(student.${sort})`, 'loweredStu')
        .orderBy('loweredStu', 'ASC')
        .getMany();
    const totalStudents = yield getTotalStudents();
    res.status(200).json({
        status: 'success',
        total: totalStudents,
        length: students.length,
        data: {
            students,
        },
    });
}));
exports.createStudent = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const reqBody = req.body;
    const password = req.body.password;
    const serviceIds = (_a = req.body.service) !== null && _a !== void 0 ? _a : [];
    const languageIds = (_b = req.body.language) !== null && _b !== void 0 ? _b : [];
    const services = [];
    const languages = [];
    yield (0, student_validator_1.studentAddValidator)(req.body);
    serviceIds.forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
        const service = yield serviceRepo.findOneBy({ id });
        if (service) {
            services.push(service);
        }
    }));
    languageIds.forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
        const language = yield languageRepo.findOneBy({ id });
        if (language) {
            languages.push(language);
        }
    }));
    const hashedPassword = yield (0, auth_controller_1.hashPassword)(password);
    const student = yield studentRepo.save(Object.assign(Object.assign({}, reqBody), { password: hashedPassword }));
    student.service = services;
    student.language = languages;
    const s = yield studentRepo.save(student);
    res.status(201).json({
        status: 'success',
        data: {
            student: s,
        },
    });
}));
exports.getOneStudent = (0, catchAsync_utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.id;
    const student = yield studentRepo.findOne({
        where: { id: studentId },
        relations: ['confession', 'department', 'language', 'service'],
    });
    if (!student) {
        throw new customError_1.customError('there is no student in this id', 404);
    }
    res.status(200).json({
        status: 'success',
        data: {
            student,
        },
    });
}));
exports.deleteStudent = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.id;
    const student = yield studentRepo.findOne({ where: { id: studentId } });
    if (!student) {
        throw new customError_1.customError('Student not found', 404);
    }
    yield studentRepo.delete(studentId);
    return res.status(200).json({
        status: 'success',
        message: 'Student deleted',
    });
}));
exports.updateStudent = (0, catchAsync_utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const studentId = req.params.id;
    const serviceIds = (_a = req.body.service) !== null && _a !== void 0 ? _a : [];
    const languageIds = (_b = req.body.language) !== null && _b !== void 0 ? _b : [];
    const _c = req.body, { service, language } = _c, otherFields = __rest(_c, ["service", "language"]);
    const reqBody = req.body;
    const student = yield studentRepo.findOne({
        where: { id: studentId },
        relations: ['department', 'language', 'confession', 'service'],
    });
    if (!student) {
        throw new customError_1.customError('Student not found', 404);
    }
    Object.assign(student, otherFields);
    ////to update the language and service
    if (reqBody.language !== null &&
        reqBody.language !== undefined &&
        reqBody.language.length > 0) {
        const languages = yield Promise.all(languageIds.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield languageRepo.findOneBy({ id }); })));
        student.language = languages.filter(Boolean);
    }
    else {
        student.language = student.language;
    }
    if (reqBody.service !== null &&
        reqBody.service !== undefined &&
        reqBody.service.length > 0) {
        const services = yield Promise.all(serviceIds.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield serviceRepo.findOneBy({ id }); })));
        student.service = services.filter(Boolean);
    }
    else {
        student.service = student.service;
    }
    // Object.assign(student, otherFields);
    yield studentRepo.save(student);
    return res.status(200).json({
        status: 'success',
        data: student,
    });
}));
exports.getLogedInPerson = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.student;
    return res.status(200).json({
        status: 'success',
        data: data,
    });
}));
//# sourceMappingURL=student.controller.js.map