CREATE TABLE IF NOT EXISTS invitation (
  id INTEGER PRIMARY KEY,
  fromId	INTEGER NOT NULL,
  fromName TEXT NOT NULL,
  matchId   INTEGER NOT NULL,
  invitRecipient INTEGER NOT NULL
)


