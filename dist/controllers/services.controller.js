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
exports.updateService = exports.getServices = exports.createService = void 0;
require("reflect-metadata");
const data_source_1 = require("../data_source");
const serviceModel_1 = require("../models/serviceModel");
const catchAsync_utils_1 = require("../shared/utils/catchAsync.utils");
const customError_1 = require("../shared/utils/customError");
const serviceRepo = data_source_1.AppDataSource.getRepository(serviceModel_1.Service);
exports.createService = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const service = yield serviceRepo.save(reqBody);
    res.status(201).json({
        status: 'success',
        data: {
            service,
        },
    });
}));
exports.getServices = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield serviceRepo.find();
    res.status(200).json({
        status: 'success',
        data: [services],
    });
}));
exports.updateService = (0, catchAsync_utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.id;
    const reqBody = req.body;
    const service = yield serviceRepo.findOne({ where: { id: serviceId } });
    if (!service) {
        throw new customError_1.customError('there is no service in this id', 404);
    }
    yield serviceRepo.update(serviceId, reqBody);
    const updatedService = yield serviceRepo.findOne({ where: { id: serviceId } });
    res.status(200).json({
        status: 'success',
        data: {
            updatedService,
        },
    });
}));
//# sourceMappingURL=services.controller.js.map