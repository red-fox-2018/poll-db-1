"use strict"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(() => {
  // Release 0
  // Create Table Politicians
  db.run(`CREATE TABLE IF NOT EXISTS Politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    party VARCHAR,
    location VARCHAR,
    grade_current VARCHAR
  );`, data => {
    if (!data) {
      console.log(`TABLE Politicians TELAH DIBUAT`);
    } else {
      console.log(data);
    }
  });
  // Create Table Voters
  db.run(`CREATE TABLE IF NOT EXISTS Voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR,
    last_name VARCHAR,
    gender VARCHAR,
    age INTEGER
  );`, data => {
    if (!data) {
      console.log(`TABLE Voters TELAH DIBUAT`);
    } else {
      console.log(data);
    }
  });
  // Create Table Votes
  db.run(`CREATE TABLE IF NOT EXISTS Votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,
    politicianId INTEGER
  );`, data => {
    if (!data) {
      console.log(`TABLE Votes TELAH DIBUAT`);
    } else {
      console.log(data);
    }
  });
});

db.close();