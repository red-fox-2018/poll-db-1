var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('poll.db');

db.serialize(function (err) {
    if(err) {
        console.log('error')
    }
    db.run('CREATE TABLE politicians(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, party TEXT, location TEXT, grade_current FLOAT)')
    db.run('CREATE TABLE voters(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT,last_name TEXT,gender TEXT,age INTEGER)')
    db.run('CREATE TABLE votes(id INTEGER PRIMARY KEY AUTOINCREMENT,voterId INTEGER REFERENCES Voters(id),politicianId INTEGER REFERENCES Politicians(id))')
});

db.close();//your code here
