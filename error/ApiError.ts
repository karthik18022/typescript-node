// import { BaseError } from "./baseError";
import { HttpStatusCode } from "axios";
const BaseError = require('./baseError')

class ApiError extends BaseError {
    constructor(name: string, httpCode = HttpStatusCode.InternalServerError, isOperational: boolean = true, description: string = 'internal server error', res: Response) {
      super(name, httpCode,  description, isOperational, res);
    }
}

module.exports = ApiError