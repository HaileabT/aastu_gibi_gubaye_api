"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = require("express");
const student_controller_1 = require("../controllers/student.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const login_controller_1 = require("../controllers/login.controller");
const router = (0, express_1.Router)();
router
    .route('/')
    .get(auth_middleware_1.authenticateJWT, auth_middleware_1.authorizeAdmin, student_controller_1.getStudents)
    .post(auth_middleware_1.authenticateJWT, auth_middleware_1.authorizeAdmin, auth_middleware_1.AddAdminAndSuperAdmin, student_controller_1.createStudent);
router
    .route('/:id')
    .get(student_controller_1.getOneStudent)
    .delete(auth_middleware_1.authenticateJWT, auth_middleware_1.authorizeAdmin, student_controller_1.deleteStudent)
    .put(auth_middleware_1.authenticateJWT, auth_middleware_1.authorizeAdmin, student_controller_1.updateStudent);
router.route('/logedin/person').get(auth_middleware_1.authenticateJWT, student_controller_1.getLogedInPerson);
router.route('/login').post(login_controller_1.LogIn);
exports.studentRouter = router;
//# sourceMappingURL=student.routes.js.map