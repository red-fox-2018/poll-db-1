// import { read } from 'fs';
// import { create } from 'domain';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');
const fs = require('fs')
const Add = require('./add.js')

class Insert{
    static politician(name, party, location, grade_current){
        // db.run(`INSERT INTO Politicians(name,party,location,grade_current) VALUES (?,?,?,?)`, name, party, location, grade_current)
   
        db.run(`INSERT INTO Politicians(name, party, location, grade_current) VALUES ($name,$party,$location,$grade_current)`, {$name:name, $party:party, $location:location, $grade_current:grade_current})
    }
    static voter(first_name, last_name, gender, age){
        // db.run(`INSERT INTO Voters(first_name, last_name, gender, age) VALUES (?,?,?,?)`, first_name, last_name, gender, age)
        db.run(`INSERT INTO Voters(first_name, last_name, gender, age) VALUES ($first_name, $last_name, $gender, $age)`, { $first_name: first_name, $last_name: last_name, $gender: gender, $age: age})
    }
    static vote(voterId, politicianId){
        // db.run(`INSERT INTO Votes(voterId, politicianId) VALUES (?,?)`,voterId, politicianId)
        db.run(`INSERT INTO Votes(voterId, politicianId) VALUES ($voterId, $politicianId)`, { $voterId: voterId, $politicianId: politicianId})
    }
}

function Update(table,value,change_value,id) {
    db.run(`UPDATE ${table} SET ${value}  =  '${change_value}' WHERE id = ${id}`)
   
}

function Delete(table,id) {
    db.run(`DELETE FROM ${table} WHERE id = ${id}`)
}

db.serialize(function (err) {
    if (err) {
        console.log('error')
    }
    db.all(`SELECT name,party,grade_current FROM politicians WHERE party='R' AND grade_current BETWEEN 9 AND 11;`, function (err,rows) {
    console.log('----------- Question No.1-----------')
    console.log(rows) 
    console.log()
    })
    db.all(`SELECT COUNT(*) AS totalVote,politicians.name FROM votes 
    JOIN politicians 
    WHERE politicianId = (SELECT id FROM politicians WHERE name = 'Olympia Snowe') 
    AND politicians.name = 'Olympia Snowe';`, function (err, rows) {
        console.log('----------- Question No.2-----------')
        console.log(rows)
        console.log()
    })
    db.all(`SELECT politicians.name,COUNT(*) AS totalVote FROM politicians 
    JOIN votes
    ON politicians.id = votes.politicianId  
    WHERE politicians.name LIKE '%Adam%'
    GROUP BY politicians.name;`, function (err, rows) {
        console.log('----------- Question No.3-----------')
        console.log(rows)
        console.log()
    })
    db.all(`WITH vote AS(
    SELECT COUNT(*) AS totalVote,politicians.name,politicians.party,politicians.location FROM politicians
    JOIN votes
    ON politicians.id = votes.politicianId
    GROUP BY politicians.name )
    SELECT * FROM vote
    ORDER BY totalVote Desc LIMIT 3;`, function (err, rows) {
        console.log('----------- Question No.4-----------')
        console.log(rows)
        console.log()
    })
    db.all(`SELECT voters.first_name,voters.last_name,voters.gender,voters.age FROM voters
    join votes
    ON voters.id = votes.voterId
    WHERE votes.politicianId = (SELECT id FROM politicians WHERE politicians.name='Olympia Snowe')
`, function (err, rows) {
            console.log('----------- Question No.5-----------')
            console.log(rows)
            console.log()
        }) 


    // Add.politicians('politicians.csv', function (data) {
    //     var insert = db.prepare('INSERT INTO Politicians(name,party,location,grade_current) VALUES (?,?,?,?)');        
    //     data.forEach(function (politician) {
    //         insert.run(politician.name, politician.party, politician.location, politician.grade_current)
    //     })
    // })
    // Add.voters('voters.csv',function (data) {
    //     var insert = db.prepare('INSERT INTO Voters(first_name,last_name,gender,age) VALUES (?,?,?,?)');
    //     data.forEach(function (voter) {
    //         insert.run(voter.first_name,voter.last_name,voter.gender,voter.age)
    //     })
    // })
    // Add.votes('votes.csv', function (data) {
    //     var insert = db.prepare('INSERT INTO Votes(voterId,politicianId) VALUES (?,?)');
    //     data.forEach(function (votes) {
    //         insert.run(votes.voterId, votes.politicianId)
    //     })
    // })
    
});

// db.close();//your code here


