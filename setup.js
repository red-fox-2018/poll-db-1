const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('database.db')

class Politicians{

    static readPoliticiansCSV(){
        fs.readFile('politicians.csv','utf8',function(err, data){
            let dataTrim = data.trim()
            let politiciansData = dataTrim.split('\n')
            for(let i=1;i<politiciansData.length;i++){
                let newPoliticiansData = politiciansData[i].split(',')
                db.run(`INSERT INTO politicians VALUES (null, '${newPoliticiansData[0]}', '${newPoliticiansData[1]}', '${newPoliticiansData[2]}', ${newPoliticiansData[3]})`)
            }
        })
    }

    static CreatedPoliticiansTable(){
        db.serialize(() => {
            db.run('CREATE TABLE politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, party TEXT, location TEXT, grade_current REAL)')
        })
    }

    static insertToPoliticiansTable(name, party, location, grade_current){
        db.serialize(() => {
            db.run(`INSERT INTO politicians VALUES (null, '${name}', '${party}', '${location}', ${grade_current})`)
        })
    }

    static updateToPoliticiansTable(insert_parameter){
        db.serialize(() => {
            db.run(insert_parameter)
        })
    }

    static deleteToPoliticiansTable(id){
        db.serialize(() => {
            db.run(`DELETE FROM politicians WHERE id = ${id}`)
        })
    }

    static getData1(){
        let sql = `SELECT name, party, grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`
        db.all(sql,[], function(err, rows){
            if (err) {
                throw err;
              }
            console.log(rows)
        })
    }

    static getData2(){
        let sql = `SELECT COUNT(politicianId) AS 'totalvote', politicians.name, politicians.party, politicians.location  
                    FROM politicians JOIN votes ON politicians.id = votes.politicianId 
                    GROUP BY politicians.name ORDER BY totalvote DESC LIMIT 3`
        db.all(sql,[], function(err, rows){
            if (err) {
                throw err;
              }
            console.log(rows)
        })
    }

    static getData3(){
        let sql = `SELECT politicians.name, politicians.location, politicians.grade_current, COUNT(politicianId) AS 'TotalVote' 
                    FROM politicians JOIN votes ON politicians.id = votes.politicianId 
                    WHERE politicians.grade_current < 9 GROUP BY politicians.name ORDER BY TotalVote`
        db.all(sql,[], function(err, rows){
            if (err) {
                throw err;
              }
            console.log(rows)
        })
    }

    static getData4(){
        let sql = `WITH param AS(
                        SELECT 
                        COUNT(politicianId) AS 'totalvote', politicians.name AS 'politicianName', politicians.id  
                        FROM politicians 
                        JOIN votes 
                        ON politicians.id = votes.politicianId 
                        GROUP BY politicians.name 
                        ORDER BY totalvote 
                        DESC LIMIT 3
                    ) 
                    ,param2 AS(
                        SELECT 
                        voters.first_name ||' '|| voters.last_name AS 'voterName',
                        voters.gender,
                        votes.politicianId
                        FROM voters
                        JOIN votes
                        ON voters.id = votes.voterId
                    )
                    SELECT param.totalvote AS 'Total Vote', param.politicianName AS 'Politician Name', 
                    param2.voterName AS 'Voter Name', param2.gender AS ' Gende'
                        FROM param
                        JOIN param2
                        ON param.id = param2.politicianId
                        ORDER BY param.totalvote DESC`
        db.all(sql,[], function(err, rows){
            if (err) {
                throw err;
              }
            console.log(rows)
        })
    }

    static getData5(){
        let sql = `SELECT tab.name, tab.v
                        FROM(SELECT voters.first_name||' '||voters.last_name AS 'name', COUNT(votes.politicianId) AS v
                        FROM voters JOIN votes
                        ON voters.id = votes.voterId
                        GROUP BY voters.first_name
                        ORDER BY v DESC) as tab
                        WHERE tab.v > 1`
        db.all(sql,[], function(err, rows){
            if (err) {
                throw err;
              }
            console.log(rows)
        })
    }
}

class Voters{

    static readVotersCSV(){
        fs.readFile('voters.csv','utf8',function(err, data){
            let dataTrim = data.trim()
            let votersData = dataTrim.split('\n')
            for(let i=1;i<votersData.length;i++){
                let newVotersData = votersData[i].split(',')
                db.run(`INSERT INTO voters VALUES (null, '${newVotersData[0]}', "${newVotersData[1]}", '${newVotersData[2]}', ${newVotersData[3]})`)
            }
        })
    }

    static CreatedVotersTable(){
        db.serialize(() => {
            db.run('CREATE TABLE voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, gender TEXT, age INTEGER)')
        })
    }

    static insertToVotersTable(first_name, last_name, gender, age){
        db.serialize(() => {
            db.run(`INSERT INTO voters VALUES (null, '${first_name}', "${last_name}", '${gender}', ${age})`)
        })
    }

    static updateToVotersTable(insert_parameter){
        db.serialize(() => {
            db.run(insert_parameter)
        })
    }

    static deleteToVotersTable(id){
        db.serialize(() => {
            db.run(`DELETE FROM voters WHERE id = ${id}`)
        })
    }

    static getData1(){
        let sql = `SELECT first_name, last_name, gender, age FROM voters JOIN votes ON voters.id = votes.voterId 
                    WHERE politicianId = (SELECT id FROM politicians WHERE name = 'Olympia Snowe')`
        db.all(sql, [], function(err,rows){
            if(err){
                throw err;
            }
            console.log(rows)
        })
    }
}

class Votes{

    static readVotesCSV(){
        fs.readFile('votes.csv','utf8',function(err, data){
            let dataTrim = data.trim()
            let votesData = dataTrim.split('\n')
            for(let i=1;i<votesData.length;i++){
                let newVotesData = votesData[i].split(',')
                db.run(`INSERT INTO votes VALUES (null, ${newVotesData[0]}, ${newVotesData[1]})`)
            }
        })
    }

    static CreatedVotesTable(){
        db.serialize(() => {
            db.run('CREATE TABLE votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER)') 
        })
    }

    static insertToVotesTable(voterId, politiciansId){
        db.serialize(() => {
            db.run(`INSERT INTO votes VALUES (null, ${voterId}, ${politiciansId})`)
        })
    }

    static updateToVotesTable(insert_parameter){
        db.serialize(() => {
            db.run(insert_parameter)
        })
    }

    static deleteToVotesTable(id){
        db.serialize(() => {
            db.run(`DELETE FROM votes WHERE id = ${id}`)
        })
    }

    static getData1(){
        let sql = `SELECT COUNT(politicianId) AS 'total vote', politicians.name 
                    FROM votes JOIN politicians ON votes.politicianId = politicians.id 
                    WHERE politicianId = (SELECT id FROM politicians WHERE name = 'Olympia Snowe')`
        db.all(sql, [], function(err,rows){
            if(err){
                throw err;
            }
            console.log(rows)
        })
    }

    static getData2(){
        let sql = `SELECT politicians.name, COUNT(politicianId) AS 'total vote' 
                    FROM votes JOIN politicians ON votes.politicianId = politicians.id 
                    WHERE politicians.name LIKE '%adam%' GROUP BY politicians.name`
        db.all(sql, [], function(err,rows){
            if(err){
                throw err;
            }
            console.log(rows)
        })
    }
}

// Politicians.CreatedPoliticiansTable()
// Voters.CreatedVotersTable()
// Votes.CreatedVotesTable()
// Politicians.readPoliticiansCSV()
// Voters.readVotersCSV()
// Votes.readVotesCSV()
// Politicians.getData1()
// Politicians.getData2()
// Politicians.getData3()
// Politicians.getData4()
// Voters.getData1()
// Votes.getData1()
// Votes.getData2()
