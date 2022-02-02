"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class UserRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/users.db', { verbose: console.log });
        this.applyMigrations();
    }
    //Table creation
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get();
        if (!testRow) {
            console.log('Applying migrations on DB users...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllUsers() {
        const statement = this.db.prepare("SELECT * FROM users");
        const rows = statement.all();
        return rows;
    }
    login(name, password) {
        const statement = this.db.prepare("SELECT COUNT(*) AS nbr FROM users WHERE name = ? AND password = ?");
        try {
            let row = statement.get(name, password);
            if (row.nbr == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            return false;
        }
    }
    NameUsed(name) {
        const statement = this.db.prepare("SELECT COUNT(*) AS nbr FROM users WHERE name = ?");
        try {
            let row = statement.get(name);
            if (row.nbr != 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            return error;
        }
    }
    getUserById(userId) {
        const statement = this.db
            .prepare("SELECT * FROM users WHERE user_id = ?");
        const rows = statement.get(userId);
        return rows;
    }
    createUser(name, password) {
        let used = this.NameUsed(name);
        if (used) {
            console.log("Username already used");
            throw new Error("Username already used");
        }
        else {
            const statement = this.db.prepare("INSERT INTO users (name,password) VALUES (?,?)");
            return statement.run(name, password).lastInsertRowid;
        }
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map