
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

class Model {
  static addOnePoliticians(name, party, location, gradeCurrent) {
    db.serialize(function() {
      db.run(`INSERT INTO politicians VALUES (null, '${name}', '${party}', '${location}', ${gradeCurrent});`);
    })
  }
  static addOneVoters(firstName, lastName, gender, age) {
    db.serialize(function() {
      db.run(`INSERT INTO voters VALUES (null, '${firstName}', '${lastName}', '${gender}', ${age});`);
    })
  }
  static addOneVotes(voterId, politicianId) {
    db.serialize(function() {
      db.run(`INSERT INTO votes VALUES (null, ${voterId}, ${politicianId});`);
    })
  }
  static updatePoliticians(id) {
    db.serialize(function() {
      db.run(`INSERT INTO votes VALUES (null, ${voterId}, ${politicianId});`);
    })
  }
}

Model.addOneVoters('Iswanul', 'Umam', 'male', 23);