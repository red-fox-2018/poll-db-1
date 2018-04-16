//your code here
const sqlite = require('sqlite3')
const db = new sqlite.Database('database.db')

db.run(
  "CREATE TABLE IF NOT EXISTS politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), party VARCHAR(5), location VARCHAR(10), grade_current REAL);"
);

db.run(
  "CREATE TABLE IF NOT EXISTS voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(20), last_name VARCHAR(20), gender VARCHAR(8), age VARCHAR(2));"
);

db.run(
  "CREATE TABLE IF NOT EXISTS votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER);"
);
