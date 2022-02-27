import Database from 'better-sqlite3'
import fs from 'fs'
import MatchStatus from "../model/enum/MatchStatus";
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
    var statements=  this.db.prepare("SELECT * FROM match WHERE id = (?)")
    var res: Match = statements.get(matchId)
    return res.status
  }

  getMatchOwner(matchId:number){
    var statements=  this.db.prepare("SELECT * FROM match WHERE id = (?)")
    var res: Match = statements.get(matchId)
    return res.id_player1
  }

  matchExists(matchId:number){
    const statement = this.db.prepare("SELECT COUNT(*) AS nbr FROM match WHERE id = (?)")
    try {
      let row = statement.get(matchId)
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


  nextMatchStatus(matchId:number){
    var oldStatus = this.getMatchStatus(matchId) // string NO_PLAYER2
    var newStatus =  MatchStatus.StatusEnum[MatchStatus.indxOf(oldStatus) +1]
    console.log(oldStatus + " " +newStatus)
    const statement = this.db.prepare("UPDATE match SET status = (?) WHERE id = (?)")
    return statement.run(newStatus,matchId).lastInsertRowid;
  }

  // do we need a confirmation for player2 ?
  needPlayer2Confirm(matchId:number){
    var oldStatus = this.getMatchStatus(matchId) // string NO_PLAYER2
    if(MatchStatus.indxOf(oldStatus) == MatchStatus.StatusEnum.INVITE_PLAYER2_PENDING){
      return true;
    }
    else{
      return false;
    }
  }

  addPlayer2(player2:number,idMatch:number){
    const statement = this.db.prepare("UPDATE match SET id_player2 = (?) WHERE id = (?)")
    var res =  statement.run(player2,idMatch).lastInsertRowid;
    this.nextMatchStatus(idMatch);
    this.nextMatchStatus(idMatch);
    return res
    
  } 

  needPlayer2(idMatch:number):boolean{
    const statement = this.db.prepare("SELECT COUNT(*) as nbr FROM match WHERE id = ? AND id_player2 IS NULL ")
    try {
      let row = statement.get(idMatch)
      if (row.nbr > 0) {
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




}

