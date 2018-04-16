//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db-poll.db');


function create_politicians() {
  db.run(`CREATE TABLE politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current REAL
  )`, (err) => {
    console.log(err);
  });
}

function create_voters() {
  db.run(`CREATE TABLE voters(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT,
          last_name TEXT,
          gender TEXT,
          age INTEGER
  )`, (err) => {
    console.log(err);
  })
}

function create_votes() {
  db.run(`CREATE TABLE votes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,
    politicianId INTEGER
  )`, (err) => {
    console.log(err);
  })
}

// create_politicians()
// create_voters()
// create_votes()
