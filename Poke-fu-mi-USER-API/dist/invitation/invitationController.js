"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDB = exports.listInvitation = void 0;
const invitationRepository_1 = __importDefault(require("./invitationRepository"));
const invitationRepository = new invitationRepository_1.default();
const listInvitation = (userId) => {
    return invitationRepository.getAllInvitations(userId);
};
exports.listInvitation = listInvitation;
const clearDB = () => {
    return invitationRepository.clearDB();
};
exports.clearDB = clearDB;
//# sourceMappingURL=invitationController.js.map