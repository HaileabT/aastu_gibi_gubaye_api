"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./data_source");
try {
    const connection = data_source_1.AppDataSource.initialize()
        .then(() => {
        app_1.default.listen(3000, () => {
            console.log('Server is runnng');
        });
    })
        .catch(err => {
        console.log(err);
    });
}
catch (err) {
    console.log(err);
    data_source_1.AppDataSource.destroy();
    data_source_1.AppDataSource.initialize()
        .then(() => {
        app_1.default.listen(3000, () => {
            console.log('Server is runnng');
        });
    })
        .catch(err => {
        console.log(err);
    });
}
//# sourceMappingURL=server.js.map