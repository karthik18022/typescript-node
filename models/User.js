"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
class User extends sequelize_1.Model {
    static initModel(sequelize) {
        User.init({
            id: {
                type: sequelize_typescript_1.DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false
            },
            firstName: {
                type: sequelize_typescript_1.DataType.STRING
            },
            lastName: {
                type: sequelize_typescript_1.DataType.STRING
            },
            password: {
                type: sequelize_typescript_1.DataType.STRING
            }
        }, {
            sequelize,
            underscored: true,
            tableName: 'user'
        });
    }
}
exports.default = User;
