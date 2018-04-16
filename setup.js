//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');
 
db.serialize(function() {
  db.run("CREATE TABLE politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, party VARCHAR(1), location VARCHAR(2), grade_current FLOAT)");
  db.run("CREATE TABLE voters (id INTEGER PRIMARY KEY AUTOINCREMENT, First_name TEXT, Last_name TEXT, Gender TEXT, Age INTEGER)");
  db.run("CREATE TABLE votes (voter_id INTEGER, politician_id INTEGER, FOREIGN KEY(voter_id) REFERENCES voters(id), FOREIGN KEY(politician_id) REFERENCES politicians(id))");
});
 
db.close();