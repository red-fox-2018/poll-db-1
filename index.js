const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db')

class Generate_Data {
  constructor() {
    this.table_name = ''
  }

  update(id, column, value){

    db.run(`UPDATE ${this.table_name}
            SET "${column}" = "${value}"
            WHERE id = "${id}"`)

  }

  remove(id){

    db.run(`DELETE FROM ${this.table_name}
            WHERE id = ${id};`)

  }

}

class Politicians extends Generate_Data{
  constructor() {
    super()
    this.table_name = 'politicians'
  }

  insert(name, party, location, grade_current){
    db.run(`INSERT INTO politicians(name, party, location, grade_current)
            VALUES("${name}", "${party}", "${location}", "${grade_current}")`)

    db.close()
  }

}


class Voters extends Generate_Data{
  constructor() {
    super()
    this.table_name = 'voters'
  }

  insert(first_name, last_name, gender, age){

    db.run(`INSERT INTO voters(first_name, last_name, gender, age)
            VALUES("${first_name}",
                   "${last_name}",
                   "${gender}",
                   "${age}");`)

    db.close()

  }

}

class Votes extends Generate_Data {
  constructor() {
    super()
    this.table_name = 'votes'
  }

  insert(voterId, politicianId){

    db.run(`INSERT INTO votes(voterId, politicianId)
            VALUES(${voterId},
                   ${politicianId});`)

    db.close()

  }

}

let politician = new Politicians()

// politician.insert("Taufik", "asdf", "adsf", 12325365)
// politician.update(23, "party", "slipknot")
