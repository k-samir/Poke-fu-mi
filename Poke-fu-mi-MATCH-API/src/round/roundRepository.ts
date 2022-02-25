import Database from 'better-sqlite3'
import fs from 'fs'
import { Round } from '../model/Round'

export default class RoundRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/round.db', { verbose: console.log });
    this.applyMigrations()
  }

  //Table creation
  applyMigrations() {
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }

    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'round'").get()

    if (!testRow) {
      console.log('Applying migrations on DB round ...')
      const migrations = ['db/migrations/round.sql']
      migrations.forEach(applyMigration)
    }
  }

  getAllRounds(): Round[] {
    const statement = this.db.prepare("SELECT * FROM round")
    const rows: Round[] = statement.all()
    return rows
  }

  clearDB() {
    this.db.exec("DELETE FROM round");
  }

}

