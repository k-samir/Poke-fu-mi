"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.listUsers = void 0;
const userRepository_1 = __importDefault(require("./userRepository"));
const typedUsers = [];
const userRepository = new userRepository_1.default();
const listUsers = () => {
    return userRepository.getAllUsers();
};
exports.listUsers = listUsers;
const addUser = (newUser) => {
    userRepository.createUser(newUser.name);
    return userRepository.getAllUsers();
};
exports.addUser = addUser;
//# sourceMappingURL=userController.js.map