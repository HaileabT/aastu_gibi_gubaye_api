"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.envs = {
    _JWT_SECRET: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'aastu-gibi-gubaye',
};
//# sourceMappingURL=environment_vars.js.map