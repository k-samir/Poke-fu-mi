import Database from 'better-sqlite3'
import fs from 'fs'
import { Invitation } from '../model/Invitation';
export default class InvitationRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/invitations.db', { verbose: console.log });
    this.applyMigrations()
  }

  //Table creation
  applyMigrations() {

    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }

     const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'invitation'").get()

    if(!testRow) {
      console.log('Applying migrations on DB invitation...')
      const migrations = ['db/migrations/invitation.sql']
      console.log(migrations)
      migrations.forEach(applyMigration)
    }
  }

  getAllInvitations(userId:string): Invitation[] {
    const statement = this.db.prepare("SELECT * FROM invitations WHERE invitRecipient = ? ")
    try{
      const rows: Invitation[] = statement.all(userId)
      return rows
    }
    catch (error) {
      return error;
    }
  }

  clearDB() {
    this.db.exec("DELETE FROM invitations");
  }
}

