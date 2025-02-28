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
exports.deleteConfession = exports.updateConfession = exports.getConfession = exports.getAllConfession = exports.createConfession = void 0;
require("reflect-metadata");
const data_source_1 = require("../data_source");
const confessionModel_1 = require("../models/confessionModel");
const catchAsync_utils_1 = require("../shared/utils/catchAsync.utils");
const customError_1 = require("../shared/utils/customError");
const confessionRepo = data_source_1.AppDataSource.getRepository(confessionModel_1.Confession);
exports.createConfession = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const newConfession = yield confessionRepo.save(reqBody);
    res.status(201).json({
        status: 'success',
        data: {
            newConfession,
        },
    });
}));
exports.getAllConfession = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confession = yield confessionRepo.find();
    res.status(200).json({
        status: 'success',
        data: {
            confession,
        },
    });
}));
exports.getConfession = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confessionId = req.params.id;
    const confession = yield confessionRepo.findOne({ where: { id: confessionId } });
    if (!confession) {
        throw new customError_1.customError('there is no user in this id', 404);
    }
    res.status(200).json({
        status: 'success',
        data: {
            confession,
        },
    });
}));
exports.updateConfession = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confessionId = req.params.id;
    const reqBody = req.body;
    const confession = yield confessionRepo.findOne({
        where: { id: confessionId },
    });
    if (!confession) {
        throw new customError_1.customError('there is no confession by this id', 404);
    }
    yield confessionRepo.update(confessionId, reqBody);
    res.status(200).json({
        status: 'success',
        message: 'confession updated',
    });
}));
exports.deleteConfession = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confessionId = req.params.id;
    if (!confessionId) {
        throw new customError_1.customError('Student not found', 404);
    }
    yield confessionRepo.delete(confessionId);
    res.status(200).json({
        status: 'success',
        message: 'confession father deleted',
    });
}));
//# sourceMappingURL=confession.controller.js.map