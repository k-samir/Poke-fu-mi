"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
module.exports = function (req, res, next) {
    got_1.default.get('http://localhost:5001/verify').then(response => response.body);
    next();
};
//# sourceMappingURL=verifyToken.js.map