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
exports.LogIn = void 0;
const catchAsync_utils_1 = require("../shared/utils/catchAsync.utils");
const data_source_1 = require("../data_source");
const auth_controller_1 = require("./auth.controller");
const studentModel_1 = require("../models/studentModel");
const customError_1 = require("../shared/utils/customError");
const studentRepo = data_source_1.AppDataSource.getRepository(studentModel_1.Student);
exports.LogIn = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { studentId, password } = req.body;
    const student = yield studentRepo.findOne({ where: { student_id: studentId } });
    if (!student) {
        throw new customError_1.customError('there is no user in this id', 400);
    }
    if (!student.password) {
        return res
            .status(400)
            .json({ message: 'Password is not available for this user.' });
    }
    const isMatch = yield (0, auth_controller_1.comparePassword)(password, student.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = (0, auth_controller_1.generateToken)(student.id);
    res.cookie('auth-token', token, {
        httpOnly: true,
        secure: ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'production',
        maxAge: 3600 * 1000 * 24 * 30, // a month
    });
    res.status(200).json({
        status: 'success',
        token,
    });
}));
//# sourceMappingURL=login.controller.js.map