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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const UserController = __importStar(require("./user/userController"));
var request = require('request');
const register = (app) => {
    app.get('/', (req, res) => res.send('Hello World! USER'));
    app.get('/user', (req, res) => {
        res.status(200).json(UserController.listUsers());
    });
    app.get('/clear', (req, res) => {
        res.status(200).json(UserController.clearDB());
    });
    app.get('/pokemon', (req, res) => {
        var url = 'https://pokeapi.co/api/v2/pokemon/';
        req.pipe(request(url)).pipe(res);
    });
    app.post('/register', (req, res) => {
        const newUser = req.body;
        try {
            let json = UserController.addUser(newUser);
            res.status(200).json(json);
        }
        catch (error) {
            res.status(409).json({ "status": false, "result": error.message });
        }
    });
    app.post('/login', (req, res) => {
        const newUser = req.body;
        let logged = UserController.login(newUser);
        if (logged) {
            res.status(200).json({ "status": true, "result": 'Login successfuly!' });
        }
        else {
            res.status(409).json({ "status": false, "result": "Login failed for user!" });
        }
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map