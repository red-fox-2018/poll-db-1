//your code here
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db')

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS politicians (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    party VARCHAR,
    location VARCHAR,
    grade_current FLOAT
  );`)

  db.run(`CREATE TABLE IF NOT EXISTS voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR,
    last_name VARCHAR,
    gender VARCHAR,
    age INTEGER
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,
    politicianId INTEGER
  )`)
})



db.close()
