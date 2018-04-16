//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/data.db');

db.serialize(function(){
  let createPolitician= `CREATE TABLE IF NOT EXISTS Politicians(
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name VARCHAR(50),
                          party VARCHAR(50),
                          location VARCHAR(255),
                          grade_current FLOAT
                        );`;

  let createVoter = `CREATE TABLE IF NOT EXISTS Voters(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        first_name VARCHAR(50),
                        last_name VARCHAR(50),
                        gender VARCHAR(20),
                        age INTEGER
                    );`;

  let createVotes = `CREATE TABLE IF NOT EXISTS Votes(
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      voterId INTEGER,
                      politicianId INTEGER,

                      FOREIGN KEY(voterId) REFERENCES Voters(id),
                      FOREIGN KEY(politicianId) REFERENCES Politicians(id)
                    );`;

  db.run(createPolitician)
  db.run(createVoter)
  db.run(createVotes)
})
db.close()
