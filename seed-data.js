const {politicians, voters, votes} = require('./parser.js');
const {insert_politicians, update_politicians, delete_politicians} = require('./query.js');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db-poll.db');

function seed_politicians() {
  db.serialize(() => {
    var stmt_pol = db.prepare(`INSERT INTO politicians(name, party, location, grade_current)
    VALUES(?, ?, ?, ?)`);
    for (var i = 0; i < politicians.length; i++) {
      stmt_pol.run(politicians[i][0], politicians[i][1], politicians[i][2], politicians[i][3]);
    };
    stmt_pol.finalize();
  });
  db.close();
}

function seed_voters() {
  db.serialize(() => {
    var stmt_voters = db.prepare(`INSERT INTO voters(first_name, last_name, gender, age)
    VALUES(?, ?, ?, ?)`);
    for (var i = 0; i < voters.length; i++) {
      stmt_voters.run(voters[i][0], voters[i][1], voters[i][2], voters[i][3]);
    };
    stmt_voters.finalize();
  });
  db.close();
}

function seed_votes() {
  db.serialize(() => {
    var stmt_votes = db.prepare(`INSERT INTO votes(voterId, politicianId)
    VALUES(?, ?)`);
    for (var i = 0; i < votes.length; i++) {
      stmt_votes.run(votes[i][0], votes[i][1]);
    };
    stmt_votes.finalize();
  });
  db.close();
}



// seed_politicians()
// seed_voters()
// seed_votes()

// insert_politicians('Mamat', 'Terong', 'Ds Il', 99.999);
// update_politicians('name', 'John', 21)
delete_politicians(21)

// console.log(insert);
