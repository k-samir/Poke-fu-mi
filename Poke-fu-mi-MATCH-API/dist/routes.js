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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const MatchController = __importStar(require("./match/matchController"));
const PokemonController = __importStar(require("./pokemon/pokemonController"));
const DeckController = __importStar(require("./deck/deckController"));
const RoundController = __importStar(require("./round/roundController"));
const verifyToken_1 = require("./verifyToken");
var request = require('request');
const register = (app) => {
    app.get('/', (req, res) => res.send('Hello World! MATCH'));
    app.get('/a', verifyToken_1.verifyUser, (req, res) => res.send('Hello World! MATCH USER'));
    app.get('/b', verifyToken_1.verifyAdmin, (req, res) => res.send('Hello World! MATCH ADMIN'));
    app.get('match/clear', verifyToken_1.verifyAdmin, (req, res) => {
        res.status(200).json(MatchController.clearDB());
    });
    app.get('deck/clear', verifyToken_1.verifyAdmin, (req, res) => {
        res.status(200).json(DeckController.clearDB());
    });
    app.get('pokemon/clear', verifyToken_1.verifyAdmin, (req, res) => {
        res.status(200).json(PokemonController.clearDB());
    });
    app.get('round/clear', verifyToken_1.verifyAdmin, (req, res) => {
        res.status(200).json(RoundController.clearDB());
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map