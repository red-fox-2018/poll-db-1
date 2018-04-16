var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

class Crud{
  static insert(tableName,values){
    if(tableName === 'votes'){
        db.run(`INSERT INTO ${tableName} VALUES(null,"${values[0]}","${values[1]}");`)
    }else{
        db.run(`INSERT INTO ${tableName} VALUES(null,"${values[0]}","${values[1]}","${values[2]}","${values[3]}");`)
    }
  }
  static update(tableName,column,values,id){
      db.run(`UPDATE ${tableName} SET ${column} = "${values}" WHERE ID = ${id};`,err=>{
        if(err)console.log(err)
      })
  }
  static delete(tableName,id){
      db.run(`DELETE FROM ${tableName} WHERE ID = ${id};`)
  }
}

Crud.insert('politicians',['abraham','G','TL','12.1234'])
Crud.update('politicians','name','Abraham John',21)
Crud.delete('politicians',22)

//release 3
db.serialize(function() {
  db.all(`SELECT name,party,grade_current FROM politicians WHERE politicians.party = "R" AND politicians.grade_current BETWEEN 9 AND 11`,(err,data)=>{
          console.log("======================================")
          console.log(data)
  })

  db.all(`SELECT COUNT(votes.politicianId) AS totalVote, name FROM votes JOIN
          politicians ON politicians.id = votes.politicianId WHERE politicians.name = "Olympia Snowe"`,(err,data)=>{
          console.log("======================================")
          console.log(data)
  })

  db.all(`SELECT name, COUNT(votes.politicianId) AS totalVote FROM votes JOIN
          politicians ON politicians.id = votes.politicianId WHERE politicians.name like "%Adam %" group by politicians.name`,(err,data)=>{
          console.log("======================================")
          console.log(data)
  })

  db.all(`SELECT COUNT(votes.politicianId) AS totalVote, name, party,location FROM votes JOIN
          politicians ON politicians.id = votes.politicianId GROUP BY politicians.name ORDER by totalVote DESC LIMIT 3`,(err,data)=>{
          console.log("======================================")
          console.log(data)
  })

  db.all(`SELECT first_name, last_name,gender, age from voters JOIN votes ON
          votes.voterID = voters.id JOIN politicians ON politicians.id = votes.politicianId
          WHERE politicians.name = "Olympia Snowe"`,(err,data)=>{
          console.log("======================================")
          console.log(data)
  })

})
