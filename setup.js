//your code here
const fs = require('fs');
const sqlite3 =require('sqlite3').verbose()
let db = new sqlite3.Database('database.db')

class Politicians {
  static createTable (){
    db.serialize(function (){
      db.run('CREATE TABLE politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, party VARCHAR, location TEXT, grade_current REAL)')
    })
  }
  static insertTable (){
    fs.readFile('./politicians.csv', 'utf8', (err, data) => {
      data = data.trim()
      let dataPoliticians = data.split('\n')
      for (var i = 1; i < dataPoliticians.length; i++) {
        let splitData = dataPoliticians[i].split(',')
        db.run(`INSERT INTO politicians VALUES (null,'${splitData[0]}','${splitData[1]}','${splitData[2]}',${splitData[3]})`)
      }
    })
  }
  static updateTable(id,name){
    db.run(`UPDATE politicians SET name = "${name}" WHERE id = ${id}`)
  }
  static deleteTable(id){
    db.run(`DELETE FROM politicians WHERE id = ${id}`)
  }
  static getDataR(){
    db.all(`SELECT name, party, grade_current FROM politicians WHERE grade_current BETWEEN 9 AND 11 AND party = 'R'`,[],(err,data) =>{
      console.log(data);
    })
  }
  static countVoteAdam(){
    db.all(`SELECT name, COUNT(*) AS totalVote FROM politicians JOIN votes ON politicians.id = votes.politician_id WHERE politicians.name LIKE "Adam %" GROUP BY politicians.name`,[],(err,data) => {
      console.log(data);
    })
  }
  static maxVote(){
    db.all(`SELECT count(*) AS totalVote, name, party, location FROM politicians JOIN votes ON politicians.id = votes.politician_id GROUP BY politician_id ORDER BY totalVote DESC LIMIT 3`,[],(err,data) => {
      console.log(data);
    })
  }
}
class Voters {
  static createTable(){
    db.run('CREATE TABLE voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR, last_name VARCHAR, gender VARCHAR, age INTEGER)')
  }
  static insertTable (){
    fs.readFile('./voters.csv', 'utf8', (err, data) => {
      data = data.trim()
      let dataVoters = data.split('\n')
      for (var i = 1; i < dataVoters.length; i++) {
        let splitData = dataVoters[i].split(',')
        db.run(`INSERT INTO voters VALUES (null,'${splitData[0]}',"${splitData[1]}",'${splitData[2]}',${splitData[3]})`)
      }
    })
  }
  static updateTable(id,firstName,lastName){
    db.run(`UPDATE voters SET first_name = ${firstName}, last_name = ${lastName} WHERE id = ${id}`)
  }
  static deleteTable(id){
    db.run(`DELETE FROM voters WHERE id = ${id}`)
  }
  static whoVoteOlympia(){
    db.all(`SELECT first_name,last_name,gender,age FROM voters JOIN votes ON voters.id = votes.voter_id WHERE votes.politician_id = 17`, [], (err,data) => {
      console.log(data);
    })
  }
}
class Votes {
  static createTable(){
    db.run('CREATE TABLE votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voter_id INTEGER, politician_id INTEGER)')
  }
  static insertTable (){
    fs.readFile('./votes.csv', 'utf8', (err, data) => {
      data = data.trim()
      let dataVotes = data.split('\n')
      for (var i = 1; i < dataVotes.length; i++) {
        let splitData = dataVotes[i].split(',')
        db.run(`INSERT INTO votes VALUES (null,${splitData[0]},${splitData[1]})`)
      }
    })
  }
  static deleteTable(id){
    db.run(`DELETE FROM votes WHERE id = ${id}`)

  }
  static countVoteOlympia(){
    db.all(`SELECT politicians.name, COUNT(politician_id) AS "totalVote" FROM votes JOIN politicians ON politicians.id = votes.politician_id WHERE politician_id = 17 `, [], (err,data) => {
      console.log(data);
    })
  }

}
//
// Politicians.createTable()
// Politicians.insertTable()
// Politicians.updateTable(20,'Adhitya Rahman')
// Politicians.deleteTable(20)
// Politicians.getDataR()
// Politicians.countVoteAdam()
// Politicians.maxVote()
// Voters.createTable()
// Voters.insertTable()
Voters.whoVoteOlympia()
// Votes.createTable()
// Votes.insertTable()
// Votes.countVoteOlympia()
