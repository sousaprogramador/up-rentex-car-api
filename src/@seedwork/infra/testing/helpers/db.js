"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../../config");
const sequelizeOptions = {
    dialect: config_1.configTest.db.vendor,
    host: config_1.configTest.db.host,
    logging: config_1.configTest.db.logging,
};
function setupSequelize(options = {}) {
    let _sequelize;
    beforeAll(() => (_sequelize = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({}, sequelizeOptions), options))));
    beforeEach(async () => {
        await _sequelize.sync({ force: true });
    });
    afterAll(async () => {
        await _sequelize.close();
    });
    return {
        get sequelize() {
            return _sequelize;
        },
    };
}
exports.setupSequelize = setupSequelize;
