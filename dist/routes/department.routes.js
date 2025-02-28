"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deptRouter = void 0;
const express_1 = require("express");
const department_controller_1 = require("../controllers/department.controller");
// import {catchAsync} from '../shared/utils/catchAsync.utils';
const router = (0, express_1.Router)();
router.route('/').post(department_controller_1.create).get(department_controller_1.getDepartment);
router.route('/:id').put(department_controller_1.updateDepartment);
exports.deptRouter = router;
//# sourceMappingURL=department.routes.js.map