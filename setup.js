var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS Politicians (
    Politician_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(30),
    party varchar(10),
    location varchar(20),
    grade_current INTEGER)`);

  db.run(`CREATE TABLE IF NOT EXISTS Voters (
    voter_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name varchar(20),
    last_name varchar(20),
    gender varchar(10),
    age INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Votes (
    votes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    voter_id,
    Politician_id
  )`)
});

db.close();
