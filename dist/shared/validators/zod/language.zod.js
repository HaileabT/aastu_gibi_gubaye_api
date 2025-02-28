"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLanguageSchema = void 0;
const zod_1 = require("zod");
exports.createLanguageSchema = zod_1.z.object({
    language: zod_1.z
        .string()
        .max(100, 'Exceeded the maximum length of language names'),
});
//# sourceMappingURL=language.zod.js.map