"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.addUser = exports.listUsers = void 0;
const userRepository_1 = __importDefault(require("./userRepository"));
const userRepository = new userRepository_1.default();
const listUsers = () => {
    return userRepository.getAllUsers();
};
exports.listUsers = listUsers;
const addUser = (newUser) => {
    userRepository.createUser(newUser.name, newUser.password);
    return userRepository.getAllUsers();
};
exports.addUser = addUser;
const login = (newUser) => {
    return userRepository.login(newUser.name, newUser.password);
};
exports.login = login;
//# sourceMappingURL=userController.js.map