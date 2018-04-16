
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

function createTable() {
  db.serialize(function() {
    db.run(`CREATE TABLE politicians (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT,
      party         TEXT,
      location      TEXT,
      grade_current REAL
      );
  `);
  db.run(`CREATE TABLE voters (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name  TEXT,
      gender     TEXT,
      age        INTEGER
    );
  `);
  db.run(`CREATE TABLE votes (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId      INTEGER,
    politicianId INTEGER,
    FOREIGN KEY (
        voterId
    )
    REFERENCES voters (id),
    FOREIGN KEY (
        politicianId
    )
    REFERENCES politicians (id) 
    );
  `);
  })  
}

function seedPoliticians() {
  db.serialize(function() {
    fs.readFile('politicians.csv', 'utf8', (err, result) => {
      let rows = result.split('\n');
      for (let i = 1; i < rows.length; i++) {
        let newRow = rows[i].split(',');
        if (newRow.length == 4) {
          db.run(`INSERT INTO politicians VALUES (null, '${newRow[0]}', '${newRow[1]}', '${newRow[2]}', ${Number(newRow[3])});`);
        }
      }
    });
  })
}

function seedVoters() {
  db.serialize(function() {
    fs.readFile('voters.csv', 'utf8', (err, result) => {
      let rows = result.split('\n');
      for (let i = 1; i < rows.length; i++) {
        let newRow = rows[i].split(',');
        if (newRow.length == 4) {
          db.run(`INSERT INTO voters VALUES (null, '${newRow[0]}', '${newRow[1]}', '${newRow[2]}', ${Number(newRow[3])});`);
        }
      }
    });
  })
}

function seedVotes() {
  db.serialize(function() {
    fs.readFile('votes.csv', 'utf8', (err, result) => {
      let rows = result.split('\n');
      for (let i = 1; i < rows.length; i++) {
        let newRow = rows[i].split(',');
        if (newRow.length == 2) {
          db.run(`INSERT INTO votes VALUES (null, ${Number(newRow[0])}, ${Number(newRow[1])});`);
        }
      }
    });
  })
}

// createTable();
// seedPoliticians()
// seedVoters()
// seedVotes();
