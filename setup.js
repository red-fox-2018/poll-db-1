/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/
/*jshint -W083*/
/*jshint -W138*/

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('poll.db', (err) => {
   if (err) {
      return console.error(err.message);
   }
   console.log('Connected to the in-memory SQlite database.');
});

class Setup {

   static create() {
      db.serialize(() => {
         db.run(`
            CREATE TABLE IF NOT EXISTS Voters (
            voter_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            gender VARCHAR(10) NOT NULL,
            age INTEGER NOT NULL
            )`, (err) => {
            if (err) throw err;
            else {
               console.log('Table Voters created successfully');
            }
         });

         db.run(`
           CREATE TABLE IF NOT EXISTS Politicians (
           politician_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
           politician_name TEXT NOT NULL,
           party VARCHAR(2) NOT NULL,
           location VARCHAR(3) NOT NULL,
           grade_current REAL NOT NULL
           )`, (err) => {
            if (err) throw err;
            else {
               console.log('Table Politicians created successfully');
            }
         });

         db.run(`
           CREATE TABLE IF NOT EXISTS Votes (
           vote_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
           voter_id INTEGER NOT NULL,
           politician_id INTEGER NOT NULL,
           FOREIGN KEY (voter_id) REFERENCES Voters(voter_id),
           FOREIGN KEY (politician_id) REFERENCES Politicians(politician_id)
           )`, (err) => {
            if (err) throw err;
            else {
               console.log('Table Votes created successfully');
            }
         });
      });
   }
}

Setup.create();

db.close((err) => {
   if (err) {
      return console.error(err.message);
   }
   console.log('Close the database connection.');
});
