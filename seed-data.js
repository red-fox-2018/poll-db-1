const fs = require('fs')
const sqlite = require('sqlite3')
const db = new sqlite.Database('database.db')

function readFile(fileName, cb) {
  fs.readFile(fileName, 'utf-8', (err, resultData) => {
    if(err) {
      throw err
    } else {
      cb(resultData)
    }
  })
}

function getPoliticians(cb) {
  readFile('./politicians.csv', (politiciansFile) => {
      var edited = politiciansFile.trim().split("\n")
      var arrPoliticians = []
      for(let i in edited) {
        var splitted = edited[i].split(',')
        arrPoliticians.push(splitted)
      }
      cb(arrPoliticians);
  })
}

function getVoters(cb) {
  readFile('./voters.csv', (votersFile) => {
      var edited = votersFile.trim().split("\n")
      var arrVoters = []
      for(let i in edited) {
        var splitted = edited[i].split(',')
        arrVoters.push(splitted)
      }
      cb(arrVoters);
  })
}

function getVotes(cb) {
  readFile('./votes.csv', (votesFile) => {
      var edited = votesFile.trim().split("\n")
      var arrVotes = []
      for(let i in edited) {
        var splitted = edited[i].split(',')
        arrVotes.push(splitted)
      }
      cb(arrVotes);
  })
}

function insertPoliticians(politiciansFile) {
  db.serialize(() => {
    for(let i = 1; i < politiciansFile.length; i++) {
      db.run(`INSERT INTO politicians (id, ${politiciansFile[0][0]}, ${politiciansFile[0][1]}, ${politiciansFile[0][2]}, ${politiciansFile[0][3]}) VALUES (NULL, ?, ?, ?, ?)`, politiciansFile[i][0], politiciansFile[i][1], politiciansFile[i][2], politiciansFile[i][3])
    }
  })
}

function insertVoters(votersFile) {
  db.serialize(() => {
    for(let i = 1; i < votersFile.length; i++) {
      db.run(`INSERT INTO voters (id, ${votersFile[0][0]}, ${votersFile[0][1]}, ${votersFile[0][2]}, ${votersFile[0][3]}) VALUES (NULL, ?, ?, ?, ?)`, votersFile[i][0], votersFile[i][1], votersFile[i][2], votersFile[i][3])
    }
  })
}

function insertVotes(votesFile) {
  db.serialize(() => {
    for(let i = 1; i < votesFile.length; i++) {
      db.run(`INSERT INTO votes (id, ${votesFile[0][0]}, ${votesFile[0][1]}) VALUES (NULL, ?, ?)`, votesFile[i][0], votesFile[i][1])
    }
  })
}

function addPolitician(objPolitician) {
  db.serialize((err) => {
    db.run(`INSERT INTO politicians (id, name, party, location, grade_current) VALUES (null, ${objPolitician.name}, ${objPolitician.party}, ${objPolitician.location}, ${objPolitician.grade_current})`)
  })
}

function addVoter(objVoter) {
  db.serialize(() => {
    db.run(`INSERT INTO voters (id, first_name, last_name, gender, age) VALUES (null, ${objVoter.first_name}, ${objVoter.last_name}, ${objVoter.gender}, ${objVoter.age})`)
  })
}

function addVote(objVote) {
  db.serialize(() => {
    db.run(`INSERT INTO votes (id, voterId, politicianId) VALUES (null, ${objVote.voterId}, ${objVote.politicianId})`)
  })
}

function update(tableName, column, input, id) {
  db.serialize(() => {
    db.run(`UPDATE ${tableName} SET ${column} = ${input} WHERE id = ${id}`)
  })
}

function deleteData(tableName, id) {
  db.serialize(() => {
    db.run(`DELETE ${tableName} WHERE id = ${id}`)
  })
}

getPoliticians(insertPoliticians)
getVoters(insertVoters)
getVotes(insertVotes)
// addPolitician({name: 'Sam', party: 'R', location: 'Seattle', grade_current: 10.04463507})
