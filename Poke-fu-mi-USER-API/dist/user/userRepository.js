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
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
var bcrypt = require('bcrypt');
const saltRounds = 10;
class UserRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/users.db', { verbose: console.log });
        this.applyMigrations();
        this.initDB();
    }
    initDB() {
        const init = fs_1.default.readFileSync('db/pop/userInit.sql', 'utf8');
        this.db.exec(init);
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
            const migrations = ['db/migrations/user.sql'];
            console.log(migrations);
            migrations.forEach(applyMigration);
        }
    }
    getAllUsers() {
        const statement = this.db.prepare("SELECT id,name,score FROM users WHERE role = 'user' ");
        const rows = statement.all();
        return rows;
    }
    login(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const statement = this.db.prepare("SELECT COUNT(*) AS nbr FROM users WHERE name = ?");
            const statement2 = this.db.prepare("SELECT password FROM users WHERE name = ?");
            try {
                let row = statement.get(name);
                if (row.nbr == 1) {
                    let hash = statement2.get(name);
                    let result = yield bcrypt.compare(password, hash.password);
                    if (result) {
                        return this.getUserByName(name);
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    idUsed(id) {
        const statement = this.db.prepare("SELECT COUNT(*) AS nbr FROM users WHERE id = ?");
        try {
            let row = statement.get(id);
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
            .prepare("SELECT * FROM users WHERE id = ?");
        const rows = statement.get(userId);
        return rows;
    }
    getUserByName(name) {
        const statement = this.db
            .prepare("SELECT * FROM users WHERE name = ?");
        const rows = statement.get(name);
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
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) {
                    throw err;
                }
                console.log(hash);
                return statement.run(name, hash).lastInsertRowid;
            });
        }
    }
    clearDB() {
        this.db.exec("DELETE FROM users");
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map