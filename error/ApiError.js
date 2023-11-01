"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { BaseError } from "./baseError";
const axios_1 = require("axios");
const BaseError = require('./baseError');
class ApiError extends BaseError {
    constructor(name, httpCode = axios_1.HttpStatusCode.InternalServerError, isOperational = true, description = 'internal server error', res) {
        super(name, httpCode, description, isOperational, res);
    }
}
module.exports = ApiError;
