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
exports.userInDb = exports.clearDB = exports.login = exports.addUser = exports.listUsers = void 0;
const userRepository_1 = __importDefault(require("./userRepository"));
const userRepository = new userRepository_1.default();
const listUsers = () => {
    return userRepository.getAllUsers();
};
exports.listUsers = listUsers;
const addUser = (newUser) => {
    userRepository.createUser(newUser.name, newUser.password);
    return newUser.name + " account succesfuly created";
};
exports.addUser = addUser;
const userInDb = (id) => {
    return userRepository.idUsed(id);
};
exports.userInDb = userInDb;
const login = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.login(newUser.name, newUser.password);
});
exports.login = login;
const clearDB = () => {
    return userRepository.clearDB();
};
exports.clearDB = clearDB;
//# sourceMappingURL=userController.js.map