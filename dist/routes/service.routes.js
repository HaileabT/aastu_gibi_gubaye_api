"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const express_1 = require("express");
const services_controller_1 = require("../controllers/services.controller");
// const {createService} = serviceController;
const router = (0, express_1.Router)();
router.route('/').post(services_controller_1.createService).get(services_controller_1.getServices);
router.route('/:id').put(services_controller_1.updateService);
exports.serviceRouter = router;
//# sourceMappingURL=service.routes.js.map