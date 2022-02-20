"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jwt = require('jsonwebtoken');
const accessTokenSecret = "youraccesstokensecret";
const signJWT = (payload) => {
    return jwt.sign(payload, accessTokenSecret, { expiresIn: "1h" });
};
exports.signJWT = signJWT;
const verifyJWT = (token) => {
    return jwt.verify(token, accessTokenSecret);
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=authController.js.map