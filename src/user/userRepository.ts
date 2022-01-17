import Database from 'better-sqlite3'
import fs from 'fs'
import { User } from '../model/User'

export default class UserRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/users.db', { verbose: console.log });
    this.applyMigrations()    
  }

  //Table creation
  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get()

    if (!testRow){
      console.log('Applying migrations on DB users...')
      const migrations = ['db/migrations/init.sql'] 	 
      migrations.forEach(applyMigration)
    }
  }

  getAllUsers(): User[] {
    const statement = this.db.prepare("SELECT * FROM users")
    const rows: User[] = statement.all()
    return rows
  }

  getUserById(userId: number) {
	const statement = this.db
        .prepare("SELECT * FROM users WHERE user_id = ?")
	const rows: User[] = statement.get(userId)
	return rows    
  }

  createUser(name: string) {
    const statement = 
      this.db.prepare("INSERT INTO users (name) VALUES (?)")
    return statement.run(name).lastInsertRowid
  }


  
}

