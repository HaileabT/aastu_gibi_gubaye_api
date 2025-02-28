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
exports.Student = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const departmentModel_1 = require("./departmentModel");
const confessionModel_1 = require("./confessionModel");
const serviceModel_1 = require("./serviceModel");
const languageModel_1 = require("./languageModel");
let Student = class Student {
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', type: 'varchar' }),
    __metadata("design:type", String)
], Student.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', type: 'varchar' }),
    __metadata("design:type", String)
], Student.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id', unique: true, type: 'varchar' }),
    __metadata("design:type", String)
], Student.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gender', type: 'varchar' }),
    __metadata("design:type", String)
], Student.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'baptismal_name', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "baptismal_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number', type: 'varchar' }),
    __metadata("design:type", String)
], Student.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => languageModel_1.Language, language => language.students),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Student.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departmentModel_1.Department, department => department.students),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", departmentModel_1.Department)
], Student.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => serviceModel_1.Service, service => service.students, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Student.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role', default: 'std-user', type: 'varchar' }),
    __metadata("design:type", String)
], Student.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_year', type: 'int' }),
    __metadata("design:type", String)
], Student.prototype, "current_year", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => confessionModel_1.Confession, confession => confession.students, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'confession_id' }),
    __metadata("design:type", confessionModel_1.Confession)
], Student.prototype, "confession", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)('student')
], Student);
//# sourceMappingURL=studentModel.js.map