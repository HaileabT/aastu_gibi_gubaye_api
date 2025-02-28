"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentSchema = void 0;
const zod_1 = require("zod");
exports.createStudentSchema = zod_1.z.object({
    first_name: zod_1.z.string().max(100, 'Exceeded the max string length for names'),
    last_name: zod_1.z.string().max(100, 'Exceeded the max string length for names'),
    student_id: zod_1.z
        .string()
        .length(10, 'Invalid student ID has been provided')
        .regex(/^(ETS)/, 'Student id must start with ETS'),
    phone_number: zod_1.z
        .string()
        .regex(/(\+251|0)[0-9]{9}/, 'Invalid phone number provided'),
    gender: zod_1.z.enum(['male', 'female']),
    baptismal_name: zod_1.z.string().max(256, 'Name overflowed memory.').optional(),
    email: zod_1.z.string().email('Invalid email address').optional().or((0, zod_1.literal)('')),
    role: zod_1.z.enum(['std-user', 'vice_admin', 'admin', 'Super-admin']).optional(),
    current_year: zod_1.z.string().optional(),
    service: zod_1.z.string().array().optional(),
    department: zod_1.z.string(),
    confession: zod_1.z.string().optional(),
    language: zod_1.z.string().array(),
});
//# sourceMappingURL=student.zod.js.map