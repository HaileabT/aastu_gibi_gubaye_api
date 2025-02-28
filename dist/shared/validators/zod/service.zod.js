"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceSchema = void 0;
const zod_1 = require("zod");
exports.createServiceSchema = zod_1.z.object({
    service: zod_1.z.string().max(100, 'Exceeded the length of service names.'),
});
//# sourceMappingURL=service.zod.js.map