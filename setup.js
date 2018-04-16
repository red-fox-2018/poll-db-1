//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

db.run(`CREATE TABLE IF NOT EXISTS politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        party VARCHAR(2),
        location VARCHAR(5),
        grade_current FLOAT
      );`)

db.run(`CREATE TABLE IF NOT EXISTS voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(25),
        last_name VARCHAR(25),
        gender VARCHAR(7),
        age INTEGER
      );`)

db.run(`CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterID INTEGER,
        politicianId INTEGER
      );`)
