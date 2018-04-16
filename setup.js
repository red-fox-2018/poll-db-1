const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
//your code here
db.serialize(function() {

db.run("CREATE TABLE Politicians (Politicians_id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20),party VARCHAR(10),address VARCHAR(10),grade_current FLOAT)");

db.run("CREATE TABLE Voters (voters_id INTEGER PRIMARY KEY AUTOINCREMENT,first_name VARCHAR(20),last_name VARCHAR(20),gender VARCHAR(10), age FLOAT)");

db.run("CREATE TABLE Votes (votes_id INTEGER PRIMARY KEY AUTOINCREMENT,voters_id VARCHAR(5),Politicians_id VARCHAR(5))");
})



db.close();
