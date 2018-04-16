/*jshint esversion:6*/

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

db.serialize(()=>{
  db.run("CREATE TABLE politicians(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(50),party VARCHAR(5),location VARCHAR(5),grade_current INTEGER)");
  db.run("CREATE TABLE voters(id INTEGER PRIMARY KEY AUTOINCREMENT,first_name VARCHAR(50), last_name VARCHAR(50),gender VARCHAR(10),age INTEGER)");
  db.run("CREATE TABLE votes(id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER )");
});
