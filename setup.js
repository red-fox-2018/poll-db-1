//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll-db-1.db');

db.serialize(function(){
    db.run("CREATE TABLE IF NOT EXISTS politicians(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), party VARCHAR(50), location VARCHAR(50), grade_current INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS voters(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50), last_name VARCHAR(50), gender VARCHAR(10), age INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS votes(id INTEGER PRIMARY KEY AUTOINCREMENT, voterId VARCHAR, politicianId VARCHAR)");
});
db.close();