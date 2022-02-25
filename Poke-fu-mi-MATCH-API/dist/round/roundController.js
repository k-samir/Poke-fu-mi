"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDB = exports.listRounds = void 0;
const roundRepository_1 = __importDefault(require("./roundRepository"));
const roundRepository = new roundRepository_1.default();
const listRounds = () => {
    return roundRepository.getAllRounds();
};
exports.listRounds = listRounds;
const clearDB = () => {
    return roundRepository.clearDB();
};
exports.clearDB = clearDB;
//# sourceMappingURL=roundController.js.map