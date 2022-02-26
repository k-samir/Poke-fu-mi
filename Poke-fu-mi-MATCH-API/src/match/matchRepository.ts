import Database from 'better-sqlite3'
import fs from 'fs'
import {MatchStatus} from "../model/enum/MatchStatus";
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
      console.log('Applying migrations on DB match ...')
      const migrations = ['db/migrations/match.sql']
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

  createEmptyMatch(matchOwner:number):number {
    const statement = this.db.prepare("INSERT INTO match (id_player1) VALUES (?)")
    return Number(statement.run(matchOwner).lastInsertRowid);
  }

  createMatch(matchOwner:number,id_player2:number):number {
    const statement = this.db.prepare("INSERT INTO match (id_player1,id_player2) VALUES (?,?)")
    return Number(statement.run(matchOwner,id_player2).lastInsertRowid);
  }

  getMatchStatus(matchId:number){
    const statement = this.db.prepare("SELECT status FROM match WHERE id = (?)")
    return String(statement.run(matchId).changes)
  }

  nextMatchStatus(matchId:number){
    var oldStatus = this.getMatchStatus(matchId) // string NO_PLAYER2
    var newStatus =  MatchStatus[ Object.keys(MatchStatus).indexOf(oldStatus) +1 ]

    console.log("OLD " + oldStatus + "NEW : "+newStatus )
    const statement = this.db.prepare("UPDATE match SET status = (?) WHERE id = (?)")
    return statement.run(newStatus,matchId).lastInsertRowid;
  }

}

