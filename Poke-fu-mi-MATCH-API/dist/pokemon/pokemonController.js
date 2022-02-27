"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDB = exports.listPokemon = void 0;
const pokemonRepository_1 = __importDefault(require("./pokemonRepository"));
const pokemonRepository = new pokemonRepository_1.default();
const listPokemon = () => {
    return pokemonRepository.getAllPokemon();
};
exports.listPokemon = listPokemon;
const clearDB = () => {
    return pokemonRepository.clearDB();
};
exports.clearDB = clearDB;
//# sourceMappingURL=pokemonController.js.map