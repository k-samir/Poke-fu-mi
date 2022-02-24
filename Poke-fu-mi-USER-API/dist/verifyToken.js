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
exports.verify = void 0;
const got_1 = __importDefault(require("got"));
function verify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield got_1.default.post('http://auth:5000/verify', {
                json: req.body,
                headers: req.headers
            });
            console.log(JSON.parse(data.body).role);
            if (JSON.parse(data.body).role === 'user') {
                next();
            }
            else {
                res.send('Access Denied');
            }
            // TODO SAME WITH ADMIN
        }
        catch (err) {
            res.send("Access Denied");
        }
    });
}
exports.verify = verify;
//# sourceMappingURL=verifyToken.js.map