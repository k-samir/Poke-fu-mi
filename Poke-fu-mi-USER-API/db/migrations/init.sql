CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name	TEXT NOT NULL,
  password TEXT NOT NULL,
  score   INTEGER DEFAULT 0,
  role TEXT DEFAULT 'user'
)
