"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
class ExternalData extends sequelize_1.Model {
    static initModel(sequelize) {
        ExternalData.init({
            id: {
                type: sequelize_typescript_1.DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            apiRequests: {
                type: sequelize_typescript_1.DataType.STRING
            },
            apiResponse: {
                type: sequelize_typescript_1.DataType.STRING
            },
            data: {
                type: sequelize_typescript_1.DataType.STRING(10000)
            }
        }, {
            sequelize,
            underscored: true,
            tableName: 'external_data_node'
        });
    }
}
exports.default = ExternalData;
