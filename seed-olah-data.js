/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/
/*jshint -W083*/
/*jshint -W138*/


const fs = require('fs');
var Table = require('cli-table');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('poll.db', (err) => {
   if (err) {
      return console.error(err.message);
   }
   console.log('Connected to the in-memory SQlite database.');
});

//Release 2======
class InsertData {
   static insertDataPoliticians(politician_name, party, location, grade_current) {
      db.run(`INSERT INTO Politicians (politician_id, politician_name, party, location, grade_current) VALUES (
         null, '${politician_name}', '${party}', '${location}', '${grade_current}')`);
   }
   static insertDataVoters(first_name, last_name, gender, age) {
      db.run(`INSERT INTO Voters (voter_id, first_name, last_name, gender, age) VALUES (
          null, '${first_name}', '${last_name}', '${gender}', '${age}')`);
   }
   static insertDataVotes(voter_id, politician_id) {
      db.run(`INSERT INTO Votes (vote_id, voter_id, politician_id) VALUES (
          null, '${voter_id}', '${politician_id}')`);
   }
}
// InsertData.insertDataPoliticians('David Joshua', 'R', 'LA', 9.99999999);
// InsertData.insertDataVoters('David', 'Joshua', 'male', 30);
// InsertData.insertDataVotes(21, 151);

class UpdateData {
   static updateDataPoliticians(politician_name, party, location, grade_current, politician_id) {
      db.run(`UPDATE Politicians SET politician_name = '${politician_name}',
                                  party = '${party}',
                                  location = '${location}',
                                  grade_current = '${grade_current}'
                                  WHERE politician_id = ${politician_id};`);
   }
   static updateDataVoters(first_name, last_name, gender, age, voter_id) {
      db.run(`UPDATE Voters SET first_name = '${first_name}',
                                  last_name = '${last_name}',
                                  gender = '${gender}',
                                  age = '${age}'
                                  WHERE voter_id = ${voter_id};`);
   }
   static updateDataVotes(voter_id, politician_id, vote_id) {
      db.run(`UPDATE Votes SET voter_id = ${voter_id},
                                  politician_id = ${politician_id}
                                  WHERE vote_id = ${vote_id};`);

   }
}
// UpdateData.updateDataCandidates('David Joshua', 'R', 'LA', 9.99999999, 1);


class DeleteData {
   static deleteDataPoliticians(politician_id) {
      db.run(`DELETE FROM Politicians WHERE politician_id = ${politician_id};`);
   }
   static deleteDataVoters(voter_id) {
      db.run(`DELETE FROM Voters WHERE voter_id = ${voter_id};`);
   }
   static deleteVotes(vote_id) {
      db.run(`DELETE FROM Votes WHERE vote_id = ${vote_id};`);
   }
}
// DeleteData.deleteDataPoliticians(21);

//data politicians=====
db.all(`SELECT * FROM Politicians`, (err, dataRows)=>{
  if (err) throw err;
  else {
    console.log('', '');
    console.log('DATA POLITICIANS');
    var table = new Table({
       head: ['Id', 'Name Politicians','Party', 'Location', 'Grade Current'],
       colWidths: [5, 20, 8, 10, 15]
    });
    for (let i = 0; i < dataRows.length; i++) {
       table.push([`${dataRows[i].politician_id}`, `${dataRows[i].politician_name}`, `${dataRows[i].party}`, `${dataRows[i].location}`, `${dataRows[i].grade_current}` ]);
    }
    console.log(table.toString());
  }
});

//data voters=====
db.all(`SELECT * FROM Voters`, (err, dataRows)=>{
  if (err) throw err;
  else {
    console.log('', '');
    console.log('DATA VOTERS');
    var table = new Table({
       head: ['Id', 'First Name', 'Last Name', 'Gender', 'Age'],
       colWidths: [5, 20, 20, 10, 8]
    });
    for (let i = 0; i < dataRows.length; i++) {
       table.push([`${dataRows[i].voter_id}`, `${dataRows[i].first_name}`, `${dataRows[i].last_name}`, `${dataRows[i].gender}`, `${dataRows[i].age}` ]);
    }
    console.log(table.toString());
  }
});

//Release 3======
// 1.
db.all(`SELECT politician_name, party, grade_current FROM Politicians
        WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;`, (err, dataRows) => {
   if (err) throw err;
   else {
      console.log('', '');
      console.log('Release 3 NO.1');
      var table = new Table({
         head: ['Name', 'Party', 'Grade Current'],
         colWidths: [20, 8, 18]
      });
      for (let i = 0; i < dataRows.length; i++) {
         table.push([`${dataRows[i].politician_name}`, `${dataRows[i].party}`, `${dataRows[i].grade_current}`]);
      }
      console.log(table.toString());
   }
});

//=========================
// 2.
db.all(`SELECT COUNT(*) AS totalVote, politician_name AS name FROM Votes
        LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id
        WHERE politician_name = 'Olympia Snowe';`, (err, dataRows) => {
   if (err) throw err;
   else {
      console.log('', '');
      console.log('Release 3 NO.2');
      var table = new Table({
         head: ['Total Vote', 'Name Politician', ],
         colWidths: [15, 20]
      });
      for (let i = 0; i < dataRows.length; i++) {
         table.push([`${dataRows[i].totalVote}`, `${dataRows[i].name}`]);
      }
      console.log(table.toString());
   }
});

//=========================
// 3.
db.all(`SELECT politician_name AS name, COUNT(*) AS totalVote FROM Votes
        LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id
        WHERE politician_name LIKE 'Adam%' GROUP BY 1;`, (err, dataRows) => {
   if (err) throw err;
   else {
     console.log('', '');
     console.log('Release 3 NO.3');
     var table = new Table({
        head: ['Total Vote', 'Name Politician', ],
        colWidths: [15, 20]
     });
     for (let i = 0; i < dataRows.length; i++) {
        table.push([`${dataRows[i].totalVote}`, `${dataRows[i].name}`]);
     }
     console.log(table.toString());
   }
});

//=========================
// 4.
db.all(`SELECT COUNT(*) AS totalVote, politician_name AS name, party, location FROM Votes
        LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id
        GROUP BY name
        ORDER BY totalVote DESC
        LIMIT 3;`, (err, dataRows) => {
   if (err) throw err;
   else {
      console.log('', '');
      console.log('Release 3 NO.4');
      var table = new Table({
         head: ['Total Vote', 'Name Politician','Party', 'Location'],
         colWidths: [15, 20, 8, 10]
      });
      for (let i = 0; i < dataRows.length; i++) {
         table.push([`${dataRows[i].totalVote}`, `${dataRows[i].name}`, `${dataRows[i].party}`, `${dataRows[i].location}`]);
      }
      console.log(table.toString());
   }
});

//=========================
// 5.
db.all(`SELECT first_name, last_name, gender, age FROM Votes
        LEFT JOIN Voters ON Voters.voter_id = Votes.voter_id
        LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id
        WHERE politician_name = 'Olympia Snowe';`, (err, dataRows) => {
   if (err) throw err;
   else {
      console.log('', '');
      console.log('Release 3 NO.5');
      var table = new Table({
         head: ['First Name', 'Last Name','Gender', 'Age'],
         colWidths: [15, 15, 10, 5]
      });
      for (let i = 0; i < dataRows.length; i++) {
         table.push([`${dataRows[i].first_name}`, `${dataRows[i].last_name}`, `${dataRows[i].gender}`, `${dataRows[i].age}`]);
      }
      console.log(table.toString());
   }
});



db.close((err) => {
   if (err) {
      return console.error(err.message);
   }
   console.log('Close the database connection.');
});
