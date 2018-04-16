const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

db.serialize(function(err){
    if(err){
        throw err
    }

    db.run(`CREATE TABLE politicians
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(30),
            party VARCHAR(1),
            location VARCHAR(2),
            grade_current FLOAT UNSIGNED)`);

    db.run(`CREATE TABLE votes
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterId INTEGER,
            politicianId INTEGER,
            FOREIGN KEY(voterId) REFERENCES voters(id),
            FOREIGN KEY(politicianId) REFERENCES politicians(id))`);
    
    db.run(`CREATE TABLE voters
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name VARCHAR(30),
            last_name VARCHAR(15),
            gender VARCHAR(6),
            age INTEGER UNSIGNED)`);
})

db.close();
