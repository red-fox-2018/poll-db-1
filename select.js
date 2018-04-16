const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db')

function tampilkanPolitician(){
    let query = `select name, party, grade_current
                 from politicians
                 where party = "R"
                 and grade_current between 9 and 11; 
                `
    db.all(query, [], (err, dataPolitikus) => {
        if(err) throw err;
            console.log(dataPolitikus)
    })            
}


function hitungJumlahVote(){
    let query = `select (select count(*) from votes where politicianId = politicians.id) totalVote, 
                 name 
                 from politicians 
                 where name = 'Olympia Snowe'
                `
    db.all(query, [], (err, snoweVotes) => {
        if(err) throw err;
        console.log(snoweVotes)
    })                            
}

function voteAdam(){
    let query = `select name, (select count(*) from votes where politicianId = politicians.id) totalVote 
                 from politicians 
                 where name like '%Adam%';`
    
    db.all(query, [], (err, likeAdamVotes) => {
        if(err) throw err;
        console.log(likeAdamVotes)
    })                 
}

function tigaPoliticianVoteTerbanyak(){
    let query = `select count(politicianId) totalVote, politicians.name, politicians.party, politicians.location
                 from votes
                 join politicians on politicians.id = votes.politicianId
                 group by name, party, location
                 order by totalvote desc limit 3;
                `
    
    db.all(query, [], (err, tigaPoliticianVoteTerbanyak) => {
        if(err) throw err;
        console.log(tigaPoliticianVoteTerbanyak)
    })                 
}

function votersVoteOlympia(){
    let query = `select first_name, last_name, gender, age from politicians
                 join votes on politicianId = politicians.id
                 join voters on voters.id = votes.voterId
                 where politicians.name = 'Olympia Snowe';
                `
    db.all(query, [], (err, votersVoteOlympia) => {
        if(err) throw err;
        console.log(votersVoteOlympia)
    })                                
}


// tampilkanPolitician()
// hitungJumlahVote()
// voteAdam()
// tigaPoliticianVoteTerbanyak()
votersVoteOlympia()