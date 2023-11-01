"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    console.log('enterpoint', req);
    const token = req.header('authorization');
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token missing.' });
    }
    const finalToken = token.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(finalToken, 'ben103');
        req.user = decoded;
    }
    catch (error) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
    next();
}
// export { authenticateToken };
module.exports = { authenticateToken };
