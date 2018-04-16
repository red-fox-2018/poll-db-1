const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');

class Politician {
  constructor(name, party, location, grade_current) {
    this.name = name,
      this.party = party,
      this.location = location,
      this.grade_current = grade_current
  }
}

class Voter {
  constructor(first_name, last_name, gender, age) {
    this.first_name = first_name,
      this.last_name = last_name,
      this.gender = gender,
      this.age = age
  }
}

class Vote {
  constructor(voter_id, politician_id) {
    this.voter_id = voter_id,
      this.politician_id = politician_id
  }
}

class InsertDB {
  static insertFromCsv(filename, query) {
    let path = __dirname + filename;
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) throw err;
      var obj = data.split('\n');
      var polArr = []
      for (let i of obj) {
        polArr.push(i.split(','));
      }
      polArr.splice(0, 1);
      let dbArrObj = [];
      for (let i of polArr) {
        if (filename === '/politicians.csv') {
          dbArrObj.push(new Politician(i[0], i[1], i[2], i[3]));
        } else if (filename === '/voters.csv') {
          dbArrObj.push(new Voter(i[0], i[1], i[2], i[3]));
        } else if (filename === '/votes.csv') {
          dbArrObj.push(new Vote(i[0], i[1]));
        }
      }
      db.serialize(function () {
        var sql = db.prepare(query);
        dbArrObj.forEach(element => {
          if (filename === '/politicians.csv') {
            sql.run(element.name, element.party, element.location, element.grade_current);
          } else if (filename === '/voters.csv') {
            sql.run(element.first_name, element.last_name, element.gender, element.age);
          } else if (filename === '/votes.csv') {
            sql.run(element.voter_id, element.politician_id);
          }
        });
        sql.finalize();
      });
    })
  }
  static insertFromInput(tableName, input1, input2, input3, input4) {
    db.serialize(function () {
      if (tableName == 'politicians') {
        var sql = db.prepare('INSERT INTO politicians(name, party, location, grade_current) VALUES (?, ?, ?, ?)');
        sql.run(input1, input2, input3, input4);
      } else if (tableName == 'voters') {
        var sql = db.prepare('INSERT INTO voters(First_name, Last_name, Gender, Age) VALUES (?, ?, ?, ?)');
        sql.run(input1, input2, input3, input4);
      } else if (tableName == 'votes') {
        var sql = db.prepare('INSERT INTO voters(First_name, Last_name, Gender, Age) VALUES (?, ?, ?, ?)');
        sql.run(input1, input2, input3, input4);
      }
    });
  }
}
class Modify {
  static update(tableName, colName, newData, idData) {
    db.serialize(function () {
      db.run(`UPDATE ${tableName} SET ${colName} = '${newData}' WHERE id = ${idData}`);
    });
  }
  static delete(tableName, idData) {
    db.serialize(function () {
      db.run(`DELETE FROM ${tableName} WHERE id = ${idData}`);
    });
  }
}

class Output {
  static testCase1() {
    db.all("SELECT name, party, grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11", function (err, rows) {
      console.log('============TEST CASE 1============')
      console.log(rows);
    });
  }
  static testCase2() {
    db.all('SELECT COUNT(*) as totalVote, politicians.name FROM politicians LEFT JOIN votes ON politicians.id = votes.politician_id WHERE politicians.name = "Olympia Snowe"', function (err, rows) {
      console.log('============TEST CASE 2============')
      console.log(rows, );
    });
  }
  static testCase3() {
    db.all('SELECT politicians.name, COUNT(*) as totalVote FROM politicians LEFT JOIN votes ON politicians.id = votes.politician_id WHERE politicians.name LIKE "Adam%" GROUP BY politicians.name', function (err, rows) {
      console.log('============TEST CASE 3============')
      console.log(rows);
    });
  }
  static testCase4() {
    db.all('select * from (select count(*) as totalVote, politicians.name, politicians.party, politicians.location from politicians left join votes on politicians.id = votes.politician_id group by politicians.name) order by totalVote desc limit 3', function (err, rows) {
      console.log('============TEST CASE 4============')
      console.log(rows);
    });
  }
  static testCase5() {
    db.all('SELECT voters.First_name, voters.Last_name, voters.Gender, voters.Age FROM voters LEFT JOIN votes ON voters.id = votes.voter_id WHERE votes.politician_id  = (SELECT id FROM politicians WHERE name = "Olympia Snowe")', function (err, rows) {
      console.log('============TEST CASE 5============')
      console.log(rows);
    });
  }
}

// TEST CASE
// InsertDB.insertFromCsv('/politicians.csv', 'INSERT INTO politicians(name, party, location, grade_current) VALUES (?, ?, ?, ?)');

// InsertDB.insertFromCsv('/voters.csv', 'INSERT INTO voters(First_name, Last_name, Gender, Age) VALUES (?, ?, ?, ?)');

// InsertDB.insertFromCsv('/votes.csv', 'INSERT INTO votes(voter_id, politician_id) VALUES (?, ?)');

// InsertDB.insertFromInput('politicians', 'FAIP MARDONI', 'F', 'NJ', 12.76643582);

// Modify.update('politicians', 'name', 'Faip Mardoni', 22);

// Modify.delete('politicians', 22);

Output.testCase1()
Output.testCase2()
Output.testCase3()
Output.testCase4()
Output.testCase5()




