const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

class Poll {
  static insertDataPolitician() {
    fs.readFile('./politicians.csv', 'utf8', (err, data) => {
      if (err) {
        console.log('error');
      } else {
        var politicianData = data.split('\n');
        politicianData.pop();
        for (var i = 1; i < politicianData.length; i++) {
          var dataToInsert = politicianData[i].split(',');
          db.serialize(function() {
            db.run(`INSERT INTO Politicians
            (name, party, location, grade_current)
            VALUES ("${dataToInsert[0]}", "${dataToInsert[1]}", "${dataToInsert[2]}", "${dataToInsert[3]}")`);
          })
        }
      }
    })
  }

  static insertDataVoters() {
    fs.readFile('./voters.csv', 'utf8', (err, data) => {
      if (err) {
        console.log('error');
      } else {
        var votersData = data.split('\n');
        votersData.pop();
        for (var i = 1; i < votersData.length; i++) {
          var dataToInsert = votersData[i].split(',');
          db.serialize(function() {
            db.run(`INSERT INTO Voters
            (first_name, last_name, gender, age)
            VALUES ("${dataToInsert[0]}", "${dataToInsert[1]}", "${dataToInsert[2]}", "${dataToInsert[3]}")`);
          })
        }
      }
    })
  }

  static insertDataVotes() {
    fs.readFile('./votes.csv', 'utf8', (err, data) => {
      if (err) {
        console.log('error');
      } else {
        var votesData = data.split('\n');
        votesData.pop();
        for (var i = 1; i < votesData.length; i++) {
          var dataToInsert = votesData[i].split(',');
          db.serialize(function() {
            db.run(`INSERT INTO Votes
            (voter_id, Politician_id)
            VALUES ("${dataToInsert[0]}", "${dataToInsert[1]}")`);
          })
        }
      }
    })
  }

  static insertDataToTable() {
    db.run(`INSERT INTO Politicians
      (name, party, location, grade_current)
      VALUES ("aliong jaya", "tanah abang", "jakarta", "11.5362423")`)
  }

  static updateData() {
    db.run(`UPDATE politicians
      SET name = "bun Sung", party = "jemb 5", location = "jakarta", grade_current = "34.4543534"
      WHERE Politician_id = 21
    `);
  }

  static deleteData() {
    db.run(`DELETE FROM politicians
      WHERE Politician_id = 21
    `)
  }

  static release3No1() {
    db.all(`SELECT name, party, grade_current
        FROM politicians
        WHERE party = 'R' AND grade_current BETWEEN 9 AND 11
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })
  }

  static release3No2() {
    db.all(`SELECT (SELECT count(*)
      FROM votes
      WHERE Politicians.Politician_id = Votes.Politician_id) AS totalVote, name
      FROM politicians
      where name = "Olympia Snowe"
    `, (err, data) => {
      if (err) {
        console.log('error');
      } else {
        console.log(data);
      }
    })
  }

  static release3No3() {
    db.all(`SELECT name,
        (SELECT count(*) FROM Votes WHERE Politicians.Politician_id = Votes.Politician_id) as totalVote
        FROM Politicians
        where name LIKE 'Adam%'`, (err, data) => {
          if (err) {
            console.log('error');
          } else {
            console.log(data);
        }
    })
  }

  static release3No4() {
    db.all(`SELECT (SELECT count(*) FROM Votes WHERE Politicians.Politician_id = Votes.Politician_id) as totalVote,
          name, party, location
          FROM Politicians
          where totalVote order by totalVote DESC limit 3
    `, (err, data) => {
      if (err) {
        console.log('error');
      } else {
        console.log(data);
      }
    })
  }

  static release3No5() {
    db.all(`SELECT first_name, last_name, gender, age FROM Voters
      LEFT JOIN Votes
      ON Voters.voter_id = Votes.voter_id
      LEFT JOIN Politicians
      ON Votes.Politician_id = Politicians.Politician_id
      WHERE name = 'Olympia Snowe'
      `, (err, data) => {
        if (err) {
          console.log('error');
        } else {
          console.log(data);
        }
    })
  }
}

// db.close();


// Poll.insertDataPolitician()
// Poll.insertDataVoters();
// Poll.insertDataVotes();

// Poll.insertDataToTable()
// Poll.updateData()
// Poll.deleteData();

// Poll.release3No1();
// Poll.release3No2();
// Poll.release3No3();
// Poll.release3No4();
Poll.release3No5();
