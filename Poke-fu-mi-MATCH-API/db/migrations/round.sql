CREATE TABLE IF NOT EXISTS round
(
   id                INTEGER  PRIMARY KEY,
   winner            INTEGER,
   match_id          INTEGER NOT NULL,
   pokemon1_id       INTEGER NOT NULL,
   pokemon2_id       INTEGER NOT NULL,
   FOREIGN KEY (match_id) REFERENCES match(id) ON DELETE CASCADE
);
