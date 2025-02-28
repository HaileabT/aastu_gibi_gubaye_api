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
exports.studentAddValidator = studentAddValidator;
const student_zod_1 = require("./zod/student.zod");
function studentAddValidator(student) {
    return __awaiter(this, void 0, void 0, function* () {
        const addStudentSchema = student_zod_1.createStudentSchema;
        const studentSafe = yield addStudentSchema.safeParseAsync(student);
        if (!studentSafe.success) {
            throw new Error(studentSafe.error.errors[0].message);
        }
    });
}
//# sourceMappingURL=student.validator.js.map