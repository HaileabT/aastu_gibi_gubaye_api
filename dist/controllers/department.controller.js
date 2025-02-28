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
exports.updateDepartment = exports.getDepartment = exports.create = void 0;
const data_source_1 = require("../data_source");
const departmentModel_1 = require("../models/departmentModel");
const customError_1 = require("../shared/utils/customError");
const catchAsync_utils_1 = require("../shared/utils/catchAsync.utils");
const deptRepo = data_source_1.AppDataSource.getRepository(departmentModel_1.Department);
exports.create = (0, catchAsync_utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newDept = yield deptRepo.save(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            department: newDept,
        },
    });
}));
exports.getDepartment = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield deptRepo.find();
    res.status(200).json({
        status: 'success',
        data: {
            department,
        },
    });
}));
exports.updateDepartment = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.id;
    const reqBody = req.body;
    const department = yield deptRepo.findOne({ where: { id: studentId } });
    if (!department) {
        throw new customError_1.customError('there is no department in this id', 404);
    }
    yield deptRepo.update(studentId, reqBody);
    const updatedDep = yield deptRepo.findOne({ where: { id: studentId } });
    return res.status(200).json({
        status: 'success',
        data: {
            updatedDep,
        },
    });
}));
//# sourceMappingURL=department.controller.js.map