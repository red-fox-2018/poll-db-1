import { BADFAMILY } from 'dns';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

class Model {
  static insertPoliticians(name, party, location, gradeCurrent) {
    db.serialize(function() {
      db.run(`INSERT INTO politicians VALUES (null, '${name}', '${party}', '${location}', ${gradeCurrent});`);
    })
  }
  static insertVoters(firstName, lastName, gender, age) {
    db.serialize(function() {
      db.run(`INSERT INTO voters VALUES (null, '${firstName}', '${lastName}', '${gender}', ${age});`);
    })
  }
  static insertVotes(voterId, politicianId) {
    db.serialize(function() {
      db.run(`INSERT INTO votes VALUES (null, ${voterId}, ${politicianId});`);
    })
  }
  static deletePoliticians(id) {
    db.serialize(function() {
      db.run(`DELETE FROM politicians WHERE id = ${id};`);
    })
  }
  static deleteVoters(id) {
    db.serialize(function() {
      db.run(`DELETE FROM voters WHERE id = ${id};`);
    })
  }
  static deleteVotes(id) {
    db.serialize(function() {
      db.run(`DELETE FROM votes WHERE id = ${id};`);
    })
  }
}

// Model.insertVoters('Iswanul', 'Umam', 'male', 23);