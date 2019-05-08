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

class CreateUpdateDelete {
  static insertData(tableName, objData) {
    let query;

    if (tableName === 'Politicians') {
      query = `INSERT INTO Politicians
               VALUES (NULL, "${objData.name}", "${objData.party}", "${objData.location}", "${objData.grade_current}");`;
    } else if (tableName === 'Voters') {
      query = `INSERT INTO Voters
               VALUES (NULL, "${objData.first_name}", "${objData.last_name}", "${objData.gender}", "${objData.age}");`;
    } else if (tableName === 'Votes') {
      query = `INSERT INTO Votes
               VALUES (NULL, "${objData.voterId}", "${objData.politicianId}");`;
    }

    db.run(query, data => {
      console.log('Data berhasil dimasukkan');
    });
  }

  static updateData(tableName, column, value, id) {
    let query = `UPDATE "${tableName}"
                 SET "${column}" = "${value}"
                 WHERE id = ${id};`;;

    db.run(query, data => {
      console.log('Data berhasil diperbaharui');
    });
  }

  static deleteData(tableName, id) {
    let query = `DELETE FROM "${tableName}"
                 WHERE id = ${id};`;

    db.run(query, data => {
      console.log('Data berhasil dihapus');
    });
  }
}

// Release 1
// INSERT data from csv file
// Model.insertDataPoliticians();
// Model.insertDataVoters();
// Model.insertDataVotes();

// Release 2
// INSERT Data to database.db
// CreateUpdateDelete.insertData('Politicians', {name: 'Ihsan', party: 'M', location: 'RM', grade_current: '13.73585922'});
// CreateUpdateDelete.insertData('Voters', {first_name: 'Ihsan', last_name: 'Maulana', gender: 'male', age: 21});
// CreateUpdateDelete.insertData('Votes', {voterId: '152', politicianId: '7'});

// UPDATE Data to database.db by id
// CreateUpdateDelete.updateData('Politicians', 'name', 'Ihsan Maulana', 23);
// CreateUpdateDelete.updateData('Voters', 'age', 22, 151);
// CreateUpdateDelete.updateData('Votes', 'voterId', '151', 164);

// DELETE Data to database.db by id
// CreateUpdateDelete.deleteData('Politicians', 23);
// CreateUpdateDelete.deleteData('Voters', 151);
// CreateUpdateDelete.deleteData('Votes', 164);

// Release 3
// Model.query(`SELECT name, party, grade_current 
//              FROM Politicians 
//              WHERE grade_current > 9 OR grade_current < 11 AND party = "R";`);
// Model.query(`SELECT COUNT(*) as totalVote, name 
//              FROM Politicians
//              JOIN Votes ON Votes.politicianId = Politicians.id
//              WHERE name = "Olympia Snowe";`);
// Model.query(`SELECT COUNT(*) as totalVote, name FROM Politicians
//              JOIN Votes ON Votes.politicianId = Politicians.id
//              WHERE name LIKE "Adam%"
//              GROUP BY Politicians.id;`);
// Model.query(`SELECT COUNT(*) as totalVote, name, party, location FROM Politicians
//              JOIN Votes ON Votes.politicianId = Politicians.id
//              GROUP BY Politicians.id 
//              ORDER BY totalVote DESC LIMIT 3;`);
// Model.query(`SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age FROM Votes
//              JOIN Politicians ON Politicians.id= Votes.politicianId
//              JOIN Voters ON Voters.id= Votes.VoterId
//              WHERE Politicians.name = "Olympia Snowe";`);