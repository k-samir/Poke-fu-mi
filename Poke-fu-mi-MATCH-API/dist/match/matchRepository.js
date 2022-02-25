"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class MatchRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/match.db', { verbose: console.log });
        this.applyMigrations();
    }
    //Table creation
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'match'").get();
        if (!testRow) {
            console.log('Applying migrations on DB match ...');
            const migrations = ['db/migrations/match.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllMatch() {
        const statement = this.db.prepare("SELECT * FROM match");
        const rows = statement.all();
        return rows;
    }
    clearDB() {
        this.db.exec("DELETE FROM match");
    }
}
exports.default = MatchRepository;
//# sourceMappingURL=matchRepository.js.map