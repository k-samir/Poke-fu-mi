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
exports.verifyAdmin = exports.verifyUser = void 0;
const got_1 = __importDefault(require("got"));
const UserController = __importStar(require("./user/userController"));
function verifyUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return verify(req, res, next, "user");
    });
}
exports.verifyUser = verifyUser;
function verifyAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return verify(req, res, next, "admin");
    });
}
exports.verifyAdmin = verifyAdmin;
function verify(req, res, next, typeOfCheck) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield got_1.default.post('http://auth:5000/verify', {
                json: req.body,
                headers: req.headers
            });
            if (JSON.parse(data.body).role === typeOfCheck) {
                if (UserController.userInDb(JSON.parse(data.body).name)) {
                    next();
                }
                else {
                    res.send('Access Denied : Unknown User, create an account');
                }
            }
            else {
                res.send('Access Denied : You need to be "' + typeOfCheck + '" to access this page');
            }
        }
        catch (err) {
            res.send("Access Denied : Login to use the app");
        }
    });
}
//# sourceMappingURL=verifyToken.js.map