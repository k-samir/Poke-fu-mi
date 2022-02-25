import Database from 'better-sqlite3'
import fs from 'fs'
import { Deck } from '../model/Deck'

export default class DeckRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/deck.db', { verbose: console.log });
    this.applyMigrations()
  }

  //Table creation
  applyMigrations() {
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }

    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'deck'").get()

    if (!testRow) {
      console.log('Applying migrations on DB deck ...')
      const migrations = ['db/migrations/deck.sql']
      migrations.forEach(applyMigration)
    }
  }

  getAllDecks(): Deck[] {
    const statement = this.db.prepare("SELECT * FROM deck")
    const rows: Deck[] = statement.all()
    return rows
  }

  clearDB() {
    this.db.exec("DELETE FROM deck");
  }

}

