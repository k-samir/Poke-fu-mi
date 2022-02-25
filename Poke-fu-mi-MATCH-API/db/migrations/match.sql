CREATE TABLE IF NOT EXISTS match
(
   id                  INTEGER PRIMARY KEY,
   deck_p1_id          INTEGER NOT NULL,
   deck_p2_id          INTEGER NOT NULL,
   id_player1          INTEGER NOT NULL,
   id_player2          INTEGER,
   status              TEXT DEFAULT 'NO PLAYER2',
   FOREIGN KEY(deck_p1_id) REFERENCES deck(id),
   FOREIGN KEY(deck_p2_id) REFERENCES deck(id)
);

