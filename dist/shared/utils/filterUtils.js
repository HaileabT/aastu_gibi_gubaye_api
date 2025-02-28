"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterUtils = void 0;
const filterUtils = (queryBuilder, filters) => {
    const { department, service, language, confession, current_year, role, gender, page = 1, sort = 'first_name', limit = 10, } = filters;
    if (department) {
        queryBuilder.andWhere('department.department = :department', { department });
    }
    if (service) {
        queryBuilder.andWhere('service.name = :service', { service });
    }
    if (language) {
        queryBuilder.andWhere('language.name = :language', { language });
    }
    if (confession) {
        queryBuilder.andWhere('confession.name = :confession', { confession });
    }
    if (role) {
        queryBuilder.andWhere('student.role = :role', { role });
    }
    if (gender) {
        queryBuilder.andWhere('student.gender = :gender', { gender });
    }
    if (current_year) {
        queryBuilder.andWhere('student.current_year = :current_year', {
            current_year,
        });
    }
    return queryBuilder;
};
exports.filterUtils = filterUtils;
//# sourceMappingURL=filterUtils.js.map