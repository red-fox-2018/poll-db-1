const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

// ------------------ RELEASE 2 ------------------------
class Model {
  static insertPoliticians(name, party, location, gradeCurrent) {
    db.serialize(function() {
      db.run(`INSERT INTO politicians VALUES (null, ?, ?, ?, ?)`, name, party, location, gradeCurrent);
    })
  }
  static insertVoters(firstName, lastName, gender, age) {
    db.serialize(function() {
      db.run(`INSERT INTO voters VALUES (null, ?, ?, ?, ?)`, firstName, lastName, gender, age);
    })
  }
  static insertVotes(voterId, politicianId) {
    db.serialize(function() {
      db.run(`INSERT INTO votes VALUES (null, ?, ?)`, voterId, politicianId);
    })
  }
  static deletePoliticians(id) {
    db.serialize(function() {
      db.run(`DELETE FROM politicians WHERE id = ${id}`);
    })
  }
  static deleteVoters(id) {
    db.serialize(function() {
      db.run(`DELETE FROM voters WHERE id = ${id}`);
    })
  }
  static deleteVotes(id) {
    db.serialize(function() {
      db.run(`DELETE FROM votes WHERE id = ${id}`);
    })
  }
}

// Model.insertVoters('Nabila', 'Permata', 'female', 21);


// RELEASE 3
class Solution {
  static soalSatu() {
    console.log('soal 1');
    let sql = `SELECT name, party, grade_current from politicians where party = 'R' and grade_current between 9 and 11`;
    db.all(sql, [], (err, res) => {
      console.log(res);
    })
  }
  static soalDua() {
    console.log('soal 2');
    let sql = `SELECT count(*) as totalVote, politicians.name from votes join politicians on votes.politicianId = politicians.id where politicians.name = 'Olympia Snowe'`;
    db.all(sql, [], (err, res) => {
      console.log(res);
    })
  }
  static soalTiga() {
    console.log('soal 3');
    let sql = `SELECT count(*) as totalVote, politicians.name
                from votes join politicians on votes.politicianId = politicians.id
                where politicians.name like '%Adam%' group by politicians.name`;
    db.all(sql, [], (err, res) => {
      console.log(res);
    })
  }
  static soalEmpat() {
    console.log('soal 4');
    let sql = `SELECT
                count(*) as totalVote,
                politicians.name,
                politicians.party,
                politicians.location
                from votes
                join politicians on votes.politicianId = politicians.id group by politicians.name
                order by totalVote desc limit 3`;
    db.all(sql, [], (err, res) => {
      console.log(res);
    })
  }
  static soalLima() {
    let sql = `SELECT first_name, last_name, gender, age from voters join votes on voters.id = votes.voterId
                where politicianId = (select id from politicians where name = 'Olympia Snowe')`
    db.all(sql, [], (err, res) => {
      console.log(res);
    });
  }
}

// Solution.soalSatu();
// Solution.soalDua();
// Solution.soalTiga();
// Solution.soalEmpat();
// Solution.soalLima();