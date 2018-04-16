"use strict"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Crud {
  static insertData(tableName, objData) {
    let query;

    if (tableName === 'Politicians') {
      query = `INSERT INTO Politicians
               VALUES (NULL, "${objData.name}", "${objData.party}", "${objData.location}", "${objData.grade_current}");`;
    } else if (tableName === 'Voters') {
      query = `INSERT INTO Voters
               VALUES (NULL, "${objData.first_name}", "${objData.last_name}", "${objData.gender}", "${objData.age}");`;
    } else if (tableName === 'Votes') {
      query = `INSERT INTO Votes
               VALUES (NULL, "${objData.voterId}", "${objData.politicianId}");`;
    }

    db.run(query, data => {
      console.log('Data berhasil dimasukkan');
    });
  }

  static updateData(tableName, column, value, id) {
    let query = `UPDATE "${tableName}"
                 SET "${column}" = "${value}"
                 WHERE id = ${id};`;;

    db.run(query, data => {
      console.log('Data berhasil diperbaharui');
    });
  }

  static deleteData(tableName, id) {
    let query = `DELETE FROM "${tableName}"
                 WHERE id = ${id};`;

    db.run(query, data => {
      console.log('Data berhasil dihapus');
    });
  }
}

// INSERT Data to database.db
// Crud.insertData('Politicians', {name: 'Ihsan', party: 'M', location: 'RM', grade_current: '13.73585922'});
// Crud.insertData('Voters', {first_name: 'Ihsan', last_name: 'Maulana', gender: 'male', age: 21});
// Crud.insertData('Votes', {voterId: '152', politicianId: '7'});

// UPDATE Data to database.db by id
// Crud.updateData('Politicians', 'name', 'Ihsan Maulana', 22);
// Crud.updateData('Voters', 'age', 22, 151);
// Crud.updateData('Votes', 'voterId', '151', 164);

// DELETE Data to database.db by id
// Crud.deleteData('Politicians', 22);
// Crud.deleteData('Voters', 151);
// Crud.deleteData('Votes', 164);