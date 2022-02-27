"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class InvitationRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/invitations.db', { verbose: console.log });
        this.applyMigrations();
    }
    //Table creation
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'invitation'").get();
        if (!testRow) {
            console.log('Applying migrations on DB invitation...');
            const migrations = ['db/migrations/invitation.sql'];
            console.log(migrations);
            migrations.forEach(applyMigration);
        }
    }
    getAllInvitations(userId) {
        const statement = this.db.prepare("SELECT * FROM invitation WHERE invitRecipient = ? ");
        try {
            const rows = statement.all(userId);
            return rows;
        }
        catch (error) {
            return error;
        }
    }
    createInvitation(fromId, fromName, matchId, invitRecipient) {
        const statement = this.db.prepare("INSERT INTO invitation (fromId,fromName,matchId,invitRecipient) VALUES (?,?,?,?)");
        return statement.run(fromId, fromName, matchId, invitRecipient).lastInsertRowid;
    }
    inviteExist(inviteId, invitRecipient) {
        const statement = this.db.prepare("SELECT COUNT(*) as nbr FROM invitation WHERE id = ? AND invitRecipient = ?");
        try {
            let row = statement.get(inviteId, invitRecipient);
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
    removeInvitation(inviteId) {
        const statement = this.db.prepare("DELETE FROM invitation WHERE id = (?)");
        return statement.run(inviteId).lastInsertRowid;
    }
    getMatchId(inviteId) {
        const statements = this.db.prepare("SELECT * FROM invitation WHERE id = ?");
        var res = statements.all(inviteId);
        return res[0].matchId;
    }
    clearDB() {
        this.db.exec("DELETE FROM invitations");
    }
}
exports.default = InvitationRepository;
//# sourceMappingURL=invitationRepository.js.map