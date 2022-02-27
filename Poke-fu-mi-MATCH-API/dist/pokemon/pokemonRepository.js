"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class PokemonRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/pokemon.db', { verbose: console.log });
        this.applyMigrations();
    }
    //Table creation
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'pokemon'").get();
        if (!testRow) {
            console.log('Applying migrations on DB pokemon ...');
            const migrations = ['db/migrations/pokemon.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllPokemon() {
        const statement = this.db.prepare("SELECT * FROM pokemon");
        const rows = statement.all();
        return rows;
    }
    clearDB() {
        this.db.exec("DELETE FROM pokemon");
    }
}
exports.default = PokemonRepository;
//# sourceMappingURL=pokemonRepository.js.map