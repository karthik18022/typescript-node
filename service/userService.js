"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utils = require('../Utils/userUtils.js');
const User_1 = __importDefault(require("../models/User"));
const ApiError = require('../error/ApiError');
exports.userCreation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, password } = req.body;
    const existingUser = yield User_1.default.findOne({ where: { email: email } });
    if (existingUser) {
        res.status(400).send('email already exists, please login');
        return res;
    }
    const hashPassword = yield hashGeneration(password);
    try {
        const newUser = new User_1.default({
            email,
            firstName,
            lastName,
            password: hashPassword
        });
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        console.error('user creation error', err);
        res.status(500).json({ error: 'User creation failed' });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ where: { email: email } });
        if (!user || user === null) {
            throw new ApiError('NOT_FOUND', 404, true, 'user not found');
        }
        const value = yield checkPassword(password, user.password, user.email, user.id);
        return res.status(200).json(value);
    }
    catch (err) {
        throw new ApiError('NOT_FOUND', 404, true, 'user not found', res);
    }
});
exports.userDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = Utils.getUserId(req, res);
    const userId = response.userId;
    const user = yield User_1.default.findOne({ where: { id: userId } });
    res.status(200).json(user);
});
exports.healthcheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('server running...');
});
const hashGeneration = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcrypt.hash(password, 10);
        return hash;
    }
    catch (err) {
        console.error("Error hashing the value:", err);
        throw err; // You may want to handle the error differently here
    }
});
const checkPassword = (password, userPassword, email, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield bcrypt.compare(password, userPassword);
        if (!match) {
            return {
                error: "Password does not match"
            };
        }
        const token = jwt.sign({ email, userId: userId, }, 'ben103');
        const response = {
            message: "User signed in!",
            token: token,
        };
        return response;
    }
    catch (err) {
        console.error("Error comparing passwords or signing JWT:", err);
        throw err; // You may want to handle the error differently here
    }
});
