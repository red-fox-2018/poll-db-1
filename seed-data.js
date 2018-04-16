const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db')

class Poll {
  constructor() {

  }

  static seed_politicians(path){

    const data_politicians = fs.readFileSync(path, 'utf8').trim().split('\n').slice(1)

    data_politicians.forEach(politicians => {

      db.serialize(() => {
        db.run(`INSERT INTO politicians(name, party, location, grade_current)
                VALUES("${politicians.split(',')[0]}",
                       "${politicians.split(',')[1]}",
                       "${politicians.split(',')[2]}",
                       "${politicians.split(',')[3]}");`)
      })


    })

    db.close()

  }

  static seed_voters(path){

    const data_voters = fs.readFileSync(path, 'utf8').trim().split('\n').slice(1)

    data_voters.forEach(data => {

      db.serialize(() => {

        db.run(`INSERT INTO voters(first_name,last_name,gender,age)
                VALUES("${data.split(',')[0]}",
                       "${data.split(',')[1]}",
                       "${data.split(',')[2]}",
                       "${data.split(',')[3]}");`)
        })

    })

    db.close()

  }

  static seed_votes(path){

    const data_votes = fs.readFileSync(path, 'utf8').trim().split('\n').slice(1)

    data_votes.forEach(votes => {

      db.serialize(() => {

        db.run(`INSERT INTO votes(voterId, politicianId)
        VALUES(${votes.split(',')[0]},
        ${votes.split(',')[1]});`)

      })


    })

    db.close()

  }

  // release 3

  static politician_filter(){

    db.all(`SELECT * FROM politicians
              WHERE politicians.party = "R"
                AND politicians.grade_current BETWEEN 9 AND 11`, (err, data) => {
                if(err){
                  console.log(err);
                } else {
                  console.log(data);
                }
              })

  }

  static count_vote(){

    db.all(`select name, COUNT(votes.politicianId)
        	  AS total FROM votes
          	  INNER JOIN politicians ON politicians.id = votes.politicianId
          		  WHERE politicians.name = "Olympia Snowe"`, (err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(data);
                  }
                })

  }

  static count_vote_politician(){

    db.all(`select name, COUNT(votes.politicianId)
        	  AS total FROM votes
          	  INNER JOIN politicians ON politicians.id = votes.politicianId
          		  WHERE politicians.name LIKE "Adam%" group by name`, (err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(data);
                  }
                })

  }

  static filter_most_politicians(){

    db.all(`select name, party, location, COUNT(votes.politicianId)
        	  AS total FROM votes
          	  INNER JOIN politicians ON politicians.id = votes.politicianId
              GROUP BY name ORDER BY total DESC LIMIT 3`, (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(data);
                }
              })

  }

  static show_vote_politician(){

    db.all(`SELECT first_name, last_name, gender, age
          	FROM voters
          	JOIN votes
          		ON voters.id = votes.voterId
          		JOIN politicians
          			ON votes.politicianId = politicians.id
          				WHERE politicians.name = "Olympia Snowe"`, (err, data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(data);
                    }
                  })

  }
}

// Poll.seed_politicians('./politicians.csv')
// Poll.seed_voters('./voters.csv')
// Poll.seed_votes('./votes.csv')
// Poll.politician_filter()
// Poll.count_vote()
// Poll.count_vote_politician()
// Poll.filter_most_politicians()
// Poll.show_vote_politician()
