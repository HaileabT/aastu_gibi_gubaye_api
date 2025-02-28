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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAdminAndSuperAdmin = exports.authorizeAdmin = exports.authenticateJWT = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
const studentModel_1 = require("../models/studentModel");
const data_source_1 = require("../data_source");
const studentRepo = data_source_1.AppDataSource.getRepository(studentModel_1.Student);
const authenticateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: 'Access denied. No token provided.' });
        return;
    }
    const decoded = (0, auth_controller_1.verifyToken)(token);
    if (!decoded) {
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
    try {
        const studentId = decoded.studentId;
        const student = yield studentRepo.findOne({
            where: { id: studentId },
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
    }
    catch (err) {
        res.status(500).json({
            message: 'Error fetching student data',
        });
    }
});
exports.authenticateJWT = authenticateJWT;
const authorizeAdmin = (req, res, next) => {
    if ((req.student && req.student.role === 'admin') ||
        (req.student && req.student.role === 'Super-admin')) {
        return next();
    }
    else {
        res.status(403).json({
            message: 'You are not authorized to do this action',
        });
        return;
    }
};
exports.authorizeAdmin = authorizeAdmin;
const AddAdminAndSuperAdmin = (req, res, next) => {
    if (req.student &&
        req.student.role == 'admin' &&
        (req.body.role == 'Super-admin' || req.body.role == 'admin')) {
        res.status(403).json({
            message: 'You are not authorized to add admin or super admin',
        });
        return;
    }
    else {
        next();
    }
};
exports.AddAdminAndSuperAdmin = AddAdminAndSuperAdmin;
//# sourceMappingURL=auth.middleware.js.map