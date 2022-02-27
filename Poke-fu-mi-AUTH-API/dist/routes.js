"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.register = void 0;
const got_1 = __importDefault(require("got"));
const AuthController = __importStar(require("./auth/authController"));
var request = require('request');
const register = (app) => {
    app.get('/', (req, res) => res.send('Hello World! AUTH'));
    app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        got_1.default.post('http://localhost:5000/login', {
            json: req.body
        }).then(response => response.body)
            .then(body => JSON.parse(body))
            .then(json => AuthController.signJWT({ name: json.name, role: json.role }))
            .then(token => res.header('auth-token', token).send(token))
            .catch(error => res.status(error.response.statusCode || 500).send(error.response.body || "Erreur"));
    }));
    app.post("/verify", (req, res) => {
        const token = req.header('auth-token');
        if (!token)
            return res.status(401).send('Access Denied');
        try {
            const verified = AuthController.verifyJWT(token);
            res.send(verified);
        }
        catch (err) {
            res.status(400).send('Invalid token');
        }
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map