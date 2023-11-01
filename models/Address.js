"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
class Address extends sequelize_1.Model {
    static initModel(sequelize) {
        Address.init({
            id: {
                type: sequelize_typescript_1.DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            address: {
                type: sequelize_typescript_1.DataType.STRING
            },
            area: {
                type: sequelize_typescript_1.DataType.STRING
            }
        }, {
            sequelize,
            underscored: true,
            tableName: 'address'
        });
    }
}
exports.default = Address;
