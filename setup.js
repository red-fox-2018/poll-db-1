//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');
 
db.serialize(function() {
 db.run("CREATE TABLE Politicians (PoliticianID INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT,Party TEXT,Location TEXT, Grade_Current FLOAT)")
 db.run("CREATE TABLE Voters (VoterID INTEGER PRIMARY KEY AUTOINCREMENT,First_Name TEXT,Last_Name TEXT,Gender TEXT, Age Integer)")
 db.run("CREATE TABLE Votes (VoteID INTEGER PRIMARY KEY,VoterID INTEGER,PoliticianID INTEGER, FOREIGN KEY (VoterID) REFERENCES Voters(VoterID), FOREIGN KEY (PoliticianID) REFERENCES Politicians(PoliticianID) )")
});
 
db.close();