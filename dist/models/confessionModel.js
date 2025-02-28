"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Confession = void 0;
const typeorm_1 = require("typeorm");
const studentModel_1 = require("./studentModel");
let Confession = class Confession {
};
exports.Confession = Confession;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Confession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', type: 'varchar' }),
    __metadata("design:type", String)
], Confession.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', type: 'varchar' }),
    __metadata("design:type", String)
], Confession.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar' }),
    __metadata("design:type", String)
], Confession.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => studentModel_1.Student, student => student.confession),
    __metadata("design:type", Array)
], Confession.prototype, "students", void 0);
exports.Confession = Confession = __decorate([
    (0, typeorm_1.Entity)('confession')
], Confession);
//# sourceMappingURL=confessionModel.js.map