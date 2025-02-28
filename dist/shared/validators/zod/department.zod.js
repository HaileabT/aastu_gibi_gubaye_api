"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDepartmentSchema = void 0;
const zod_1 = require("zod");
exports.createDepartmentSchema = zod_1.z.object({
    department: zod_1.z
        .string()
        .max(100, 'Exceeded maximum length of department names'),
});
//# sourceMappingURL=department.zod.js.map