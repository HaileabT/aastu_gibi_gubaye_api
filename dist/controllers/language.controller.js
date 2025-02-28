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
exports.updateLanguage = exports.getLanguage = exports.create = void 0;
const data_source_1 = require("../data_source");
const languageModel_1 = require("../models/languageModel");
const catchAsync_utils_1 = require("../shared/utils/catchAsync.utils");
const customError_1 = require("../shared/utils/customError");
const languageRepo = data_source_1.AppDataSource.getRepository(languageModel_1.Language);
exports.create = (0, catchAsync_utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newLang = yield languageRepo.save(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            language: newLang,
        },
    });
}));
exports.getLanguage = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = yield languageRepo.find();
    res.status(200).json({
        status: 'success',
        data: {
            language,
        },
    });
}));
exports.updateLanguage = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.id;
    const reqBody = req.body;
    const language = yield languageRepo.findOne({ where: { id: studentId } });
    if (!language) {
        throw new customError_1.customError('there is no language in this id', 404);
    }
    yield languageRepo.update(studentId, reqBody);
    const updatedLanguage = yield languageRepo.findOne({
        where: { id: studentId },
    });
    return res.status(200).json({
        status: 'success',
        data: {
            updatedLanguage,
        },
    });
}));
//# sourceMappingURL=language.controller.js.map