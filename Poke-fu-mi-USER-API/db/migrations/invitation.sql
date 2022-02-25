CREATE TABLE IF NOT EXISTS invitation (
  id INTEGER PRIMARY KEY,
  fromId	TEXT NOT NULL,
  fromName TEXT NOT NULL,
  matchId   INTEGER NOT NULL,
  invitRecipient INTEGER NOT NULL,
  FOREIGN KEY(invitRecipient) REFERENCES users(id)

)


