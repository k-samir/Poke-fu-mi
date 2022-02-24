import Database from 'better-sqlite3'
import fs from 'fs'
import { User } from '../model/User'
var bcrypt = require('bcrypt');
const saltRounds = 10;
export default class UserRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/users.db', { verbose: console.log });
    this.applyMigrations()
  }

  //Table creation
  applyMigrations() {
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }

    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get()

    if (!testRow) {
      console.log('Applying migrations on DB users...')
      const migrations = ['db/migrations/init.sql']
      migrations.forEach(applyMigration)
    }
  }

  getAllUsers(): User[] {
    const statement = this.db.prepare("SELECT name,score FROM users WHERE role = 'user' ")
    const rows: User[] = statement.all()
    return rows
  }

  async login(name: string, password: string): Promise<User[]> {

    const statement = this.db.prepare("SELECT COUNT(*) AS nbr FROM users WHERE name = ?")
    const statement2 = this.db.prepare("SELECT password FROM users WHERE name = ?")

    try {
      let row = statement.get(name)
      if (row.nbr == 1) {
        let hash = statement2.get(name);
        let result: boolean = await bcrypt.compare(password, hash.password)
        if (result) { 
          return this.getUserByName(name);
        }
        else { return null; }
      }
      else {
        return null;
      }
    }
    catch (error) {
      return error;
    }
  }

  NameUsed(name: string): boolean {
    const statement = this.db.prepare("SELECT COUNT(*) AS nbr FROM users WHERE name = ?")
    try {
      let row = statement.get(name)
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

  getUserById(userId: number) {
    const statement = this.db
      .prepare("SELECT * FROM users WHERE id = ?")
    const rows: User[] = statement.get(userId)
    return rows
  }



  getUserByName(name: string) {
    const statement = this.db
      .prepare("SELECT * FROM users WHERE name = ?")
    const rows: User[] = statement.get(name)
    return rows
  }

  createUser(name: string, password: string) {
    let used = this.NameUsed(name)
    if (used) {
      console.log("Username already used");
      throw new Error("Username already used")
    }
    else {
      const statement = this.db.prepare("INSERT INTO users (name,password) VALUES (?,?)")
      bcrypt.hash(password, saltRounds, function (err: any, hash: any) {
        if (err) { throw err }
        return statement.run(name, hash).lastInsertRowid
      });
    }
  }

  clearDB() {
    this.db.exec("DELETE FROM users");
  }



}

