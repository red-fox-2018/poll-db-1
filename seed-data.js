const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll-db-1.db');


class PollDb {
    constructor(){

    }

    static readData(file, cb){
        fs.readFile(file, 'utf-8', (err, data)=>{
            if(!err){
                cb(data)
            } else {
                cb(err)
            }
        })
    }

    static inputPoliticians(){
        PollDb.readData('./politicians.csv', (data)=>{
            let politicians = data.trim().split('\n')
            let arrPoliticians = []
            
            for(let i = 0; i < politicians.length; i++){
                let tmp = politicians[i].split(',')
                arrPoliticians.push(tmp)
            }

            for(let i = 1; i < arrPoliticians.length; i++){
                db.serialize(()=>{
                    db.run(`INSERT INTO politicians (name, party, location, grade_current)
                    VALUES ("${arrPoliticians[i][0]}", 
                            "${arrPoliticians[i][1]}",
                            "${arrPoliticians[i][2]}",
                            "${arrPoliticians[i][3]}"
                    )`)
                })
            }
        })
    
    }

    static inputVoters(){
        PollDb.readData('./voters.csv', (data)=>{
            let voters = data.trim().split('\n')
            let arrVoters = []

            for(let i = 0; i < voters.length; i++){
                let tmp = voters[i].split(',')
                arrVoters.push(tmp)
            }

            for(let i = 1; i < arrVoters.length; i++){
                db.serialize(()=>{
                    db.run(`INSERT INTO voters (first_name, last_name, gender, age)
                    VALUES ("${arrVoters[i][0]}",
                            "${arrVoters[i][1]}",
                            "${arrVoters[i][2]}",
                            "${arrVoters[i][3]}"
                    )`)
                })
            }
        })
    }

    static inputVotes(){
        PollDb.readData('./votes.csv', (data)=>{
            let votes = data.trim().split('\n')
            let arrVotes = []

            for(let i = 0; i < votes.length; i++){
                let tmp = votes[i].split(',')
                arrVotes.push(tmp)
            }

            for(let i = 1; i < votes.length; i++){
                db.serialize(()=>{
                    db.run(`INSERT INTO votes (voterId, politicianId)
                    VALUES ("${arrVotes[i][0]}",
                            "${arrVotes[i][1]}"
                    )`)
                })
            }
        })
    }

    static insertData(tableName, values1, values2, values3, values4){
        db.run(`INSERT INTO ${tableName} 
                    VALUES (NULL, 
                            "${values1}",
                            "${values2}",
                            "${values3}",
                            "${values4}",
        )`)
    }

    static updateData(tableName, columnName, newValue, id){
        db.run(`UPDATE ${tableName} SET ${columnName} = "${newValue}" WHERE id = ${id}`)
    }

    static deleteData(tableName, id){
        db.run(`DELETE FROM ${tableName} WHERE id = ${id}`)
    }

    static partyRgrade911(){
        db.all(`SELECT name, party, grade_current FROM politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11`, (err, row)=>{
            console.log(row);
        })
    }

    static olympiaSnowe(){
        db.all(`SELECT count(*) AS totalVote, name FROM politicians JOIN votes ON politicians.id = votes.politicianId WHERE politicianId = 17`, (err, row)=>{
            console.log(row)
        })
    }

    static adam(){
        db.all(`SELECT name, count(*) AS totalVote FROM politicians JOIN votes ON politicians.id = votes.politicianId WHERE name LIKE "Adam%" GROUP BY politicianId`, (err, row)=>{
            console.log(row)
        })
    }

    static mostVotes(){
        db.all(`SELECT count(*) AS totalVote, name, party, location FROM politicians JOIN votes ON politicians.id = votes.politicianId GROUP BY politicianId ORDER BY totalVote desc limit 3`, (err, row)=>{
            console.log(row)
        })
    }

    static voteOlympia(){
        db.all(`SELECT voters.first_name, voters.last_name, voters.gender, voters.age from votes
                JOIN voters ON voters.id = votes.voterId
                JOIN politicians ON politicians.id = votes.politicianId
                WHERE politicians.name = "Olympia Snowe"
        `, (err, row)=>{
            console.log(row)
        })
    }

}


// PollDb.inputPoliticians()
// PollDb.inputVoters()
// PollDb.inputVotes()

// PollDb.partyRgrade911()
// PollDb.olympiaSnowe()
// PollDb.adam()
// PollDb.mostVotes()
PollDb.voteOlympia()