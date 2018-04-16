const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');

class QueryClass {
  constructor() {

  }

  convertData(objInput){
    let column = Object.keys(objInput)
    let values = Object.values(objInput)
    return {column: column, values: values}
  }

  create(tableName, objInput){
    let inputData = this.convertData(objInput)
    let valueQuery = "NULL";

    inputData.values.forEach(col=>{
      valueQuery += ', ?'
    })

    db.run(`INSERT INTO ${tableName} (id, ${inputData.column.join(", ")}) VALUES (${valueQuery})`, inputData.values, (err) =>{
      if(err){
        console.log(err);
      }else{
      console.log(`success insert data to ${tableName} table`);
      }
    });
  }

  update(tableName, objData, idData){
    let inputData = this.convertData(objData)
    db.run(`UPDATE ${tableName} SET ${inputData.column.join("")} = ? WHERE id = ?`, [inputData.values[0], idData], (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log('update data success');
      }
    });
  }

  delete(tableName, idData){
    db.run(`DELETE FROM ${tableName} WHERE id = ${idData}`, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log(`success delete data with id : ${idData}`);
      }
    })
  }

  read(queryInput){
    db.each(queryInput, (err, row)=>{
      console.log(row);
    })
    console.log(queryInput);
  }
}

let query = new QueryClass()
/*
let dataPolitician = {
                        name : 'Doni Marco',
                        party: 'Merdeka',
                        location: 'Bekasi',
                        grade_current: 74.48332
                      }
query.create("Politicians", dataPolitician)
let dataPolitician = {
                        name : 'Doni Bony',
                      }
query.update("Politicians", dataPolitician, 22)

query.delete("Politicians", 21)


//RELEASE 3
1. SELECT * FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;
2. SELECT count(*) WHERE 'totalVote', Politicians.name FROM Votes JOIN Politicians ON Politicians.id = Votes.politicianId WHERE Politicians.name = 'Olympia Snowe';
3. SELECT name, (SELECT count(*) FROM Votes WHERE Politicians.id = Votes.politicianId) WHERE 'totalVote'FROM Politicians WHERE Politicians.name LIKE 'Adam%';
4. SELECT (SELECT count(*) FROM Votes WHERE Politicians.id = Votes.politicianId) WHERE 'totalVote', name, party, location FROM Politicians ORDER BY totalVote DESC LIMIT 0, 3;
5. SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age FROM Votes JOIN Politicians, Voters ON Politicians.id = Votes.politicianId AND Votes.voterId = Voters.Id WHERE Politicians.name = 'Olympia Snowe';

*/
query.read("SELECT * FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;")
