//your code here

const fs = require('fs')
const voters = fs.readFileSync('./voters.csv','UTF-8').split('\n')
const politicians = fs.readFileSync('./politicians.csv','UTF-8').split('\n')
const votes = fs.readFileSync('./votes.csv','UTF-8')	.split('\n')
let tampung = []
let tampungVoters = []
let tampungVotes = []
//console.log(voters)
for(var i=0;i<politicians.length;i++){
	tampung.push(politicians[i].split(','))
}
for(var i=0;i<voters.length;i++){
	tampungVoters.push(voters[i].split(','))
}
for(var i=0;i<votes.length;i++){
	tampungVotes.push(votes[i].split(','))
}
//console.log(tampungVotes)
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db')
//db.run('CREATE TABLE politicians (info TEXT)')

//db.close()
db.serialize(function(){
	db.run('CREATE TABLE politicians(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,party TEXT, location TEXT,grade_curent FLOAT)')
	db.run('CREATE TABLE voters(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, gender TEXT, age INTEGER)')
	db.run('CREATE TABLE votes(id INTEGER, politicianID INTEGER)')
	 for(var i=1;i<tampung.length;i++){
		let query = `INSERT INTO politicians (id, name, party, location, grade_curent) VALUES (${i}, '${tampung[i][0]}', '${tampung[i][1]}', '${tampung[i][2]}', ${tampung[i][3]});`
		//console.log('query:', query)
		db.run(query)
	}
	for(var i=1;i<tampungVoters.length;i++){
		let query = `INSERT INTO voters (first_name, last_name, gender, age) VALUES('${tampungVoters[i][0]}', "${tampungVoters[i][1]}",'${tampungVoters[i][2]}',${tampungVoters[i][3]})`
		console.log(query)
		db.run(query)
	}
	for(var i=1;i<tampungVotes.length;i++){
		let query = `INSERT INTO votes (id, politicianID) VALUES(${i},${tampungVotes[i][1]})`
		console.log(query)
		db.run(query)
	}

	//1.tampilkan nama politician
	db.all(`SELECT name, party, grade_curent FROM politicians 
        WHERE party = ? AND grade_curent BETWEEN ? AND ?`, ['R', 9, 11], (err, rows) => {
        if (err) throw err
        else {
            console.log(rows)
        }
	})
	//2.hitung jumlah vote unutuk olympia snowe
	db.all(`SELECT COUNT(*) AS totalVote, name AS name FROM politicians 
        LEFT JOIN votes ON politicians.id = votes.politicianID 
        WHERE name = 'Olympia Snowe'`, [], (err, rows) => {
        if (err) throw err
        else {
            console.log(rows)
        }
	})
	//3.hitung jumlah vote untuk yang namanya ada adam
	db.all(`SELECT name AS name, COUNT(*) AS totalVote FROM votes 
        LEFT JOIN politicians ON politicians.id = votes.politicianID 
        WHERE name LIKE 'Adam%' GROUP BY 1`, [], (err, rows) => {
        if (err) throw err
        else {
            console.log(rows)
        }
	 })
	//4.tampilkan 3 politician beserta nama partai dan lokasi politician yang memiliki suara terbanyak
	db.all(`SELECT COUNT(*) AS totalVote, name, party, location FROM votes
        LEFT JOIN politicians ON politicians.id = votes.politicianID
        GROUP BY name
        ORDER BY totalVote DESC
        LIMIT 3`, [], (err, rows) => {
        if (err) throw err
        else {
            console.log(rows)
        }
	})
	//5.tampilan orang yang voting ke olympia snowee
	db.all(`SELECT first_name, last_name, gender, age FROM votes
        LEFT JOIN voters ON voters.id = votes.id
        LEFT JOIN politicians ON politicians.id = votes.politicianID
        WHERE name = 'Olympia Snowe'`, [], (err, rows) => {
        if (err) throw err
        else {
            console.log(rows)
        }
	})
 })
db.close()



//console.log(tampungVoters)

function insertTablePolitician (name,party,location,grade_curent) {
	// body... 
	let query = `INSERT INTO politicians(name,party,location,grade_curent) VALUES(?,?,?,?) name,party,location,grade_curent`
	return query
}

function updateTableData (nameColumn,columnValue,valueID){
	// body... 
	let query = `UPDATE politicians SET ${nameColumn} = ? WHERE id=${valueID} nameColumn, columnValue, valueID`
	return query
}
function deleteTableData (nameTable,valueID) {
	// body... 
	let query = `DELETE FROM '${nameTable}' WHERE id=${valueID}`
	return query
}



//var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
 
// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");
 
//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();
 
//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });
 
// db.close();