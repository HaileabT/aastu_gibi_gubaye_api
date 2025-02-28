"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (fn) => (req, res, next) => {
    Promise.all([fn(req, res, next)]).catch(err => {
        next(err);
    });
};
exports.catchAsync = catchAsync;
//# sourceMappingURL=catchAsync.utils.js.map