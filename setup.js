const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./congress.db')

class Database {

    static create() {

        db.serialize(function(){

            db.run(`CREATE TABLE IF NOT EXISTS politicians (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name VARCHAR(20), 
                party VARCHAR(20), 
                location VARCHAR(20), 
                grade_current INTEGER
            )`)
        
            db.run(`CREATE TABLE IF NOT EXISTS voters (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                firstName VARCHAR(20), 
                lastName VARCHAR(20), 
                gender VARCHAR(20), 
                age INTEGER
            )`)
        
            db.run(`CREATE TABLE IF NOT EXISTS votes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_politician INTEGER, 
                id_voter INTEGER
            )`)
        })

        db.close()
    }

    static addVoters(firstName, lastName, gender, age) {

        db.serialize(function(){
            
            db.run(`INSERT INTO voters VALUES (null,'${firstName}','${lastName}','${gender}',${age})`)
        })

        db.close()
    }

    static updateVoters(id,firstName, lastName, gender, age) {

        db.run(`UPDATE voters
        SET firstName = '${firstName}', lastName = '${lastName}', gender = '${gender}', age = ${age} 
        WHERE
        id = ${id}`)

        db.close()
    }

    static deleteVoters(id) {

        db.run(`DELETE FROM voters
            WHERE id = ${id}
        `)

        db.close()
    }

    static getPolitician() {

        db.all(`SELECT name,party,grade_current FROM politicians 
        WHERE party = 'R' AND grade_current BETWEEN 9 AND 11
        `,function(err,row){
            console.log(row);
        })

        db.all(`SELECT COUNT(*) AS totalVote, 
        politicians.name FROM votes INNER JOIN politicians WHERE 
        politicians.name = 'Olympia Snowe' AND votes.id_politician = politicians.id`, function(err,row){

            console.log(row);
        })

        db.all(`SELECT politicians.name, COUNT(*) AS totalVote 
        FROM politicians INNER JOIN votes ON politicians.id = votes.id_politician 
        WHERE politicians.name LIKE 'Adam%' GROUP BY votes.id_politician`, function(err,row){
            
            console.log(row);
        })

        db.all(`SELECT COUNT(*) AS totalVote, politicians.name, politicians.party, politicians.location
        FROM votes INNER JOIN politicians ON votes.id_politician = politicians.id
        GROUP BY politicians.id ORDER BY totalVote DESC LIMIT 3`,function(err,row){
            
            console.log(row);
        })

        db.all(`SELECT voters.firstName, voters.lastName, voters.gender, voters.age
        FROM voters JOIN votes ON votes.id_voter = voters.id
        JOIN politicians ON votes.id_politician = politicians.id
        WHERE politicians.name='Olympia Snowe' GROUP BY voters.id`,function(err,row){

            console.log(row);
        })
    }
}

// Database.create()
// Database.addVoters('Phillip', 'Briyan', 'male', 21)
// Database.updateVoters(151,'David','Hamilton','male',23)
// Database.deleteVoters(151)
Database.getPolitician()


