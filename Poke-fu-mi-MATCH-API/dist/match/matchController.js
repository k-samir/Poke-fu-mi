"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDB = exports.listUsers = void 0;
const matchRepository_1 = __importDefault(require("./matchRepository"));
const matchRepository = new matchRepository_1.default();
const listUsers = () => {
    return matchRepository.getAllMatch();
};
exports.listUsers = listUsers;
const clearDB = () => {
    return matchRepository.clearDB();
};
exports.clearDB = clearDB;
//# sourceMappingURL=matchController.js.map