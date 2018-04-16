const fs = require('fs')
const politiciansFile = './politicians.csv'
const votersFile = './voters.csv'
const votesFile = './votes.csv'
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');
// readFile
class Poll{
  constructor(){
    this.politicians = []
    this.voters = []
    this.votes = []
  }
  readFileCsv(filename,cb){

    fs.readFile(filename,'UTF8',(err,data)=>{
        if(err){
          cb('error read csv file')
        }else{
          let splited = data.trim().split('\n')
          let splited1 = splited.slice(1)
          // console.log(splited1)
          splited1.forEach(dataSplit=>{
            if(filename === './politicians.csv'){
              this.politicians.push(dataSplit.split(','))
            }else if(filename === './voters.csv'){
              this.voters.push(dataSplit.split(','))
            }else{
              this.votes.push(dataSplit.split(','))
            }
          })
          cb()
        }
    })

  }

  seedData(){
    for(let dataPoll in this){
      this[dataPoll].forEach((data)=>{
        if(dataPoll === 'votes'){
          db.serialize(function() {
            db.run(`INSERT INTO ${dataPoll} VALUES(null,"${data[0]}","${data[1]}");`)
          })
        }else{
          db.serialize(function() {
            db.run(`INSERT INTO ${dataPoll} VALUES(null,"${data[0]}","${data[1]}","${data[2]}","${data[3]}");`)
          })
        }
      })
    }
    db.close()
  }
}

let poll = new Poll()
poll.readFileCsv(politiciansFile,dataPoliticians=>{
  poll.readFileCsv(votersFile,dataPoliticians=>{
    poll.readFileCsv(votesFile,dataPoliticians=>{
        poll.seedData()
    })
  })
})
