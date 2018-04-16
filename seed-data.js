const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db');

fs.readFile('./voters.csv', 'utf8',(err, data) => {
let Voters = data
if (err) throw err;
let VotersFile =[]
let dataVoters = Voters.split('\n')
  for (var k = 1; k < dataVoters.length-1; k++) {
    let ValidVoters =dataVoters[k].split(",")
    VotersFile.push(ValidVoters)
  }
    for (var k = 0; k < VotersFile.length; k++) {
      let value = VotersFile[k]
      var query = `INSERT INTO Voters
                    (voters_id,first_name,last_name,gender,age)
                    VALUES(null,?,?,?,?)`

        db.serialize(function() {
            db.run(query,`${value[0]}`,`${value[1]}`,`${value[2]}`,`${value[3]}`)
            console.log(VotersFile[k],'sukses');
        })
    }

})

fs.readFile('./votes.csv', 'utf8',(err, data) => {
let votes = data
if (err) throw err;
//console.log(err);
let votesFile=[];
  let dataVotes = votes.split("\n")
    for (var i = 1; i <dataVotes.length-1; i++) {
        validVotes=dataVotes[i].split(",")
        votesFile.push(validVotes)
    }
    for (var v = 0; v < votesFile.length; v++) {
          let value = votesFile[v]
           var query = `INSERT INTO Votes
                         (votes_id,voters_id,Politicians_id)
                         VALUES(null,?,?)`
            db.serialize(function(){
              db.run(query,`${value[0]}`,`${value[1]}`)
              console.log(votesFile[v],'sukses juga');
            })
        }
})



fs.readFile('./politicians.csv', 'utf8',(err, data) => {
    let Politicians = data
    if (err) throw err;
    let dataFile=[]
    let dataEnter = Politicians.split('\n')
    for (let i = 1; i < dataEnter.length-1; i++) {
      let validData = dataEnter[i].split(",")
      console.log(dataEnter[i]);
      dataFile.push(validData)
    }
      console.log(dataFile)
      for (var j = 0; j < dataFile.length; j++) {
          let value = dataFile[j]
          var query =`INSERT INTO Politicians
                      (Politicians_id,name,party,address,grade_current)
                      VALUES(null,?,?,?,?)`
          db.serialize(function(){
            db.run(query,`${value[0]}`,`${value[1]}`,`${value[2]}`,`${value[3]}`)
            console.log(dataFile[j],'masuk juga');
          })
      }
})
