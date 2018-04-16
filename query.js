const sqlite = require('sqlite3')
const db = new sqlite.Database('database.db')

db.each("SELECT * FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11", (err, row) => {
  console.log(row);
})

db.each("SELECT COUNT(*) as'totalVote', name FROM votes JOIN politicians ON politicians.id = votes.politicianId WHERE politicians.name = 'Olympia Snowe'", (err, row) => {
  console.log(row);
})

db.each("SELECT name, (SELECT COUNT(*) FROM votes WHERE votes.politicianId = politicians.id) AS 'totalVote' FROM politicians WHERE name LIKE 'Adam %'", (err, row) => {
  console.log(row);
})

db.each("SELECT (SELECT COUNT(*) FROM votes WHERE votes.politicianId = politicians.id) as 'totalVote', name, party, location FROM politicians ORDER BY totalVote DESC LIMIT 3;", (err, row) => {
  console.log(row);
})

db.each("SELECT first_name, last_name, gender, age FROM voters JOIN votes ON votes.voterId = voters.id JOIN politicians ON politicians.id = votes.politicianId WHERE politicians.id = 17;", (err, row) => {
  console.log(row);
})
