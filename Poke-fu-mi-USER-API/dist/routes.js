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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const UserController = __importStar(require("./user/userController"));
const InvitationController = __importStar(require("./invitation/invitationController"));
const verifyToken_1 = require("./verifyToken");
var request = require('request');
const register = (app) => {
    app.get('/', (req, res) => res.send('Hello World! USER'));
    // m'inscrire à la plateforme avec un nom d'utilisateur unique.
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
    // me connecter à la plateforme utilisant mon nom d’utilisateur et un mot de passe
    app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = req.body;
        let user = yield UserController.login(newUser);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(409).json({ "status": false, "result": "Login failed for user!" });
        }
    }));
    app.get('/users', verifyToken_1.verifyUser, (req, res) => {
        res.status(200).json(UserController.listUsers());
    });
    app.post('/userInDb', (req, res) => {
        try {
            let json = UserController.userInDb(req.body.name);
            res.status(200).json(json);
        }
        catch (error) {
            res.status(409).json({ "status": false, "result": error.message });
        }
    });
    app.get('users/clear', verifyToken_1.verifyAdmin, (req, res) => {
        res.status(200).json(UserController.clearDB());
    });
    app.get('invitation/clear', verifyToken_1.verifyAdmin, (req, res) => {
        res.status(200).json(InvitationController.clearDB());
    });
    app.get('/pokemon', verifyToken_1.verifyUser, (req, res) => {
        var url = 'https://pokeapi.co/api/v2/pokemon/';
        req.pipe(request(url)).pipe(res);
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map