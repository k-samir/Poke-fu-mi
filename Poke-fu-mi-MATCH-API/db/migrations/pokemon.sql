
CREATE TABLE IF NOT EXISTS pokemon
(
   id           INTEGER PRIMARY KEY,
   deck_id      INTEGER NOT NULL,
   name         TEXT NOT NULL,
   type         TEXT NOT NULL,
   image        TEXT,
   deck         INTEGER NOT NULL,
   status       TEXT
);



  

