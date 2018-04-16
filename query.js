var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db-poll.db');

function insert_politicians(nameParam, partyParam, locParam, gradeParam) {
  db.run(`INSERT INTO politicians(name, party, location, grade_current)
          VALUES(?, ?, ?, ?)`, nameParam, partyParam, locParam, gradeParam)
};

function update_politicians(col_name, col_value, id_value) {
  db.run(`UPDATE politicians SET ${col_name} = ? WHERE id = ?`, [col_value, id_value])
}

function delete_politicians(id_value) {
  db.run(`DELETE FROM politicians WHERE id = $id`, {$id: id_value})
}

// insert_politicians('Mamat', 'Terong', 'Ds Il', 99.999);
// update_politicians('name', 'John', 21)
// delete_politicians(21)


class Query {
  constructor() {

  }

  static select(col_name, table_name, condition) {
    db.all(`SELECT ${col_name} FROM ${table_name} WHERE ${condition}`, (err, output_by_party) => {
      console.log(output_by_party);
    })
  }

  static showOlympiaSnowe(){
    db.get(`SELECT COUNT(*) AS 'totalVote', politicians.name
            FROM votes
            LEFT JOIN politicians
            ON votes.politicianId = politicians.id
            WHERE politicians.name = 'Olympia Snowe'`, (err, olympia_snowe) => {
      console.log(olympia_snowe);
    })
  }

  static show3Politicians(){
    db.all(`SELECT COUNT(*) AS 'totalVote', politicians.name, politicians.party, politicians.location
            FROM votes
            LEFT JOIN politicians
              ON votes.politicianId = politicians.id
            GROUP BY politicians.name
            ORDER BY totalVote DESC
            LIMIT 3`, (err, politicians) => {
      console.log(politicians);
    })
  }

  static whoVoteOlympiaSnowe() {
    let innerQuery = `SELECT *
                      FROM votes
                      LEFT JOIN politicians
                        ON votes.politicianId = politicians.id
                      WHERE politicians.name = 'Olympia Snowe'`
    db.all(`WITH inner AS (${innerQuery})
            SELECT first_name, last_name, gender, age
            FROM inner
            LEFT JOIN voters
              ON inner.voterId = voters.id`, (err, voters) => {
      console.log(voters);
      console.log(err);;
    })
  }
}

let condition = "grade_current BETWEEN 9 AND 11 AND party = 'R'"
// Query.select('name, party, grade_current', 'politicians', condition);
// Query.showOlympiaSnowe()
// Query.show3Politicians()
Query.whoVoteOlympiaSnowe()


module.exports = {insert_politicians, update_politicians, delete_politicians}
