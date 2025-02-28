"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfessionSchema = void 0;
const zod_1 = require("zod");
exports.createConfessionSchema = zod_1.z.object({
    confession: zod_1.z
        .string()
        .max(200, 'Exceeded the maximum length of confession father names.'),
});
//# sourceMappingURL=confession.zod.js.map