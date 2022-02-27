import Database from 'better-sqlite3'
import fs from 'fs'
import { Pokemon } from '../model/Pokemon'

export default class PokemonRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/pokemon.db', { verbose: console.log });
    this.applyMigrations()
  }

  //Table creation
  applyMigrations() {
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }

    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'pokemon'").get()

    if (!testRow) {
      console.log('Applying migrations on DB pokemon ...')
      const migrations = ['db/migrations/pokemon.sql']
      migrations.forEach(applyMigration)
    }
  }

  getAllPokemon(): Pokemon[] {
    const statement = this.db.prepare("SELECT * FROM pokemon")
    const rows: Pokemon[] = statement.all()
    return rows
  }

  clearDB() {
    this.db.exec("DELETE FROM pokemon");
  }

}

