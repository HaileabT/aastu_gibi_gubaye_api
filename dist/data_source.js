"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'gebigubye.db',
    entities: process.env.NODE_ENV === 'production'
        ? [__dirname + '/dist/models/**/*.js']
        : [__dirname + '/models/**/*.ts'],
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
});
//# sourceMappingURL=data_source.js.map