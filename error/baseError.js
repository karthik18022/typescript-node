"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(name, httpCode, description, isOperational, res) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        console.log('base error called');
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        res.status(400).send({ error: this.name, message: this.message });
    }
}
module.exports = BaseError;
