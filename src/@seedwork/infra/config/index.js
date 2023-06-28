"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configTest = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
function makeConfig(envFile) {
    const output = (0, dotenv_1.config)({ path: envFile });
    return {
        db: {
            vendor: output.parsed.DB_VENDOR,
            host: output.parsed.DB_HOST,
            logging: output.parsed.DB_LOGGING === 'true',
        },
    };
}
const envTestingFile = (0, path_1.join)(__dirname, '../../../../.env');
exports.configTest = makeConfig(envTestingFile);
