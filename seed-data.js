"use strict"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const readFile = require('./readfile').readFile;

class Model {
  static insertDataPoliticians() {
    readFile('./politicians.csv', data => {
      data = data.split('\n');
      let dataPoliticians = [];

      data.forEach(politician => {
        dataPoliticians.push(politician.split(','));
      });

      dataPoliticians.forEach((politician, i) => {
        if (i !== 0) {
          let queryPolitician = `INSERT INTO Politicians
                                 VALUES (NULL, "${politician[0]}", "${politician[1]}", "${politician[2]}", "${politician[3]}");`;

          db.serialize(() => {
            db.run(queryPolitician, data => {
              console.log(`${i}. Data telah berhasil dibuat`);
            });
          });
        }
      });
    });
  }

  static insertDataVoters() {
    readFile('./voters.csv', data => {
      data = data.split('\n');
      let dataVoters = [];

      data.forEach(voter => {
        dataVoters.push(voter.split(','));
      });
      
      dataVoters.forEach((voter, i) => {
        if (i !== 0) {
          let queryVoter =`INSERT INTO Voters
                           VALUES (NULL, "${voter[0]}", "${voter[1]}", "${voter[2]}", "${voter[3]}");`;

          db.serialize(() => {
            db.run(queryVoter, data => {
              console.log(`${i}. Data telah berhasil dibuat`);
            });
          });
        }
      });
    });
  }

  static insertDataVotes() {
    readFile('./votes.csv', data => {
      data = data.split('\n');
      let dataVotes = [];

      data.forEach(vote => {
        dataVotes.push(vote.split(','));
      });

      dataVotes.forEach((vote, i) => {
        if (i !== 0) {
          let queryVote = `INSERT INTO Votes
                           VALUES (NULL, "${vote[0]}", "${vote[1]}");`;

          db.serialize(() => {
            db.run(queryVote, data => {
              console.log(`${i}. Data telah berhasil dibuat`);
            });
          });
        }
      });
    });
  }

  static query(inputQuery) {
    db.all(inputQuery, (err, rows) => {
      console.log(rows);
    });
  }
}

// Release 1
// INSERT data from csv file
// Model.insertDataPoliticians();
// Model.insertDataVoters();
// Model.insertDataVotes();

// Release 3
Model.query(`SELECT name, party, grade_current 
             FROM Politicians 
             WHERE grade_current > 9 OR grade_current < 11 AND party = "R";`);
Model.query(`SELECT COUNT(*) as totalVote, name 
             FROM Politicians
             JOIN Votes ON Votes.politicianId = Politicians.id
             WHERE name = "Olympia Snowe";`);
Model.query(`SELECT COUNT(*) as totalVote, name FROM Politicians
             JOIN Votes ON Votes.politicianId = Politicians.id
             WHERE name LIKE "Adam%"
             GROUP BY Politicians.id;`);
Model.query(`SELECT COUNT(*) as totalVote, name FROM Politicians
             JOIN Votes ON Votes.politicianId = Politicians.id
             GROUP BY Politicians.id 
             ORDER BY totalVote DESC LIMIT 3;`);
Model.query(`SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age FROM Votes
             JOIN Politicians ON Politicians.id= Votes.politicianId
             JOIN Voters ON Voters.id= Votes.VoterId
             WHERE Politicians.name = "Olympia Snowe";`);