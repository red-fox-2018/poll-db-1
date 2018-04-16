const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');


function insertData(fileName, tableName){
  fs.readFile(fileName, 'utf8', (err, data)=>{
    db.serialize(function(){
      let arrData = data.trim().split("\n");
      let nameColumn = arrData.shift().split(",");

      let valueQuery = "NULL";
      nameColumn.forEach(col=>{
        valueQuery += ', ?'
      })

      let insertDataTable = db.prepare(`INSERT INTO ${tableName} VALUES (${valueQuery})`);
      arrData.forEach((dataInput)=>{
        insertDataTable.run(dataInput.split(","))
      })
      insertDataTable.finalize();
    })
    // db.close()
  })
}

// insertData('votes.csv', 'Votes')
// insertData('politicians.csv', 'Politicians')
// insertData('voters.csv', 'Voters')
