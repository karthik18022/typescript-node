"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
// import { getClient } from './config/dbconfig.js';
require('dotenv').config();
const Address_1 = __importDefault(require("./models/Address"));
const User_1 = __importDefault(require("./models/User"));
const externalData_1 = __importDefault(require("./models/externalData"));
const swagger_1 = __importDefault(require("./Utils/swagger"));
const app = (0, express_1.default)();
const UserEndpoint = require('./router/userRouter');
const externalCallEndpoint = require('./router/externalcall.ts');
app.use(express_1.default.json());
app.use('/user', UserEndpoint);
app.use('/external', externalCallEndpoint);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    (0, swagger_1.default)(app, 8081);
});
const sequelize = new sequelize_1.Sequelize('type_db', 'postgres', 'demo', {
    host: 'localhost',
    dialect: 'postgres'
});
Address_1.default.initModel(sequelize);
User_1.default.initModel(sequelize);
externalData_1.default.initModel(sequelize);
sequelize.sync({}).then(result => {
    console.log('db connected');
}).catch(err => {
    console.log('err', err);
});
