"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUtils = void 0;
const typeorm_1 = require("typeorm");
const searchUtils = (queryBuilder, keyword) => {
    queryBuilder.andWhere(new typeorm_1.Brackets(qb => {
        qb.where('student.first_name LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('confession.first_name LIKE :keyword', {
            keyword: `%${keyword}%`,
        })
            .orWhere('student.last_name LIKE :keyword', {
            keyword: `%${keyword}%`,
        })
            .orWhere('student.phone_number LIKE :keyword', {
            keyword: `%${keyword}%`,
        })
            .orWhere('student.student_id LIKE :keyword', {
            keyword: `%${keyword}%`,
        });
    }));
    return queryBuilder;
};
exports.searchUtils = searchUtils;
//# sourceMappingURL=searchUtils.js.map