"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDB = exports.listDeck = void 0;
const deckRepository_1 = __importDefault(require("./deckRepository"));
const deckRepository = new deckRepository_1.default();
const listDeck = () => {
    return deckRepository.getAllDecks();
};
exports.listDeck = listDeck;
const clearDB = () => {
    return deckRepository.clearDB();
};
exports.clearDB = clearDB;
//# sourceMappingURL=deckController.js.map