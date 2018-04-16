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

module.exports = {insert_politicians, update_politicians, delete_politicians}
