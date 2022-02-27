CREATE TABLE IF NOT EXISTS match
(
   id                  INTEGER PRIMARY KEY,
   deck_p1_id          INTEGER,
   deck_p2_id          INTEGER,
   id_player1          INTEGER NOT NULL,
   id_player2          INTEGER,
   currentRound        INTEGER DEFAULT -1,
   status              TEXT DEFAULT 'NO_PLAYER2'

);

