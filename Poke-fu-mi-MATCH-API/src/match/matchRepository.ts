import Database from 'better-sqlite3'
import fs from 'fs'
import { Match } from '../model/Match'

export default class MatchRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/match.db', { verbose: console.log });
    this.applyMigrations()
  }

  //Table creation
  applyMigrations() {
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }

    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'match'").get()

    if (!testRow) {
      console.log('Applying migrations on DB users...')
      const migrations = ['db/migrations/init.sql']
      migrations.forEach(applyMigration)
    }
  }

  getAllMatch(): Match[] {
    const statement = this.db.prepare("SELECT * FROM match")
    const rows: Match[] = statement.all()
    return rows
  }

  clearDB() {
    this.db.exec("DELETE FROM match");
  }

}

