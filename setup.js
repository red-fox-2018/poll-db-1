const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db')
const fs = require('fs')


var politicians = fs.readFileSync('./politicians.csv','utf8').split('\n')
// console.log(politicians)

var dataPolitikus = []
for(let i=0; i<politicians.length; i++){
    dataPolitikus.push(politicians[i].split(','))
}
// console.log(dataPolitikus)

db.serialize(function(){
    let HeaderName = dataPolitikus[0][0]
    let HeaderParty = dataPolitikus[0][1]
    let HeaderLocation = dataPolitikus[0][2]
    let HeaderGrade_current = dataPolitikus[0][3]
    
    for(let j=1; j<dataPolitikus.length; j++){
        var query = `insert into politicians(id,${HeaderName},${HeaderParty},${HeaderLocation},${HeaderGrade_current})
                        values(null,'${dataPolitikus[j][0]}','${dataPolitikus[j][1]}','${dataPolitikus[j][2]}',${dataPolitikus[j][3]});`
    
        // console.log(query)
        db.run(query)
    }   
})

// db.close()


var voters = fs.readFileSync('./voters.csv','utf8').split('\n')
// console.log(politicians)

var dataPemilih = []
for(let i=0; i<voters.length; i++){
    dataPemilih.push(voters[i].split(','))
}
// first_name,last_name,gender,age
// console.log(dataPemilih)

db.serialize(function(){
    let HeaderFirstName = dataPemilih[0][0]
    let HeaderLastName = dataPemilih[0][1]
    let HeaderGender = dataPemilih[0][2]
    let HeaderAge = dataPemilih[0][3]
    
    for(let j=1; j<dataPemilih.length; j++){
        var query = `insert into voters(id,${HeaderFirstName},${HeaderLastName},${HeaderGender},${HeaderAge})
                        values(null,"${dataPemilih[j][0]}","${dataPemilih[j][1]}","${dataPemilih[j][2]}",${dataPemilih[j][3]});`
    
        // console.log(query)
        db.run(query)
    }   


})

// db.close()

var votes = fs.readFileSync('./votes.csv','utf8').split('\n')
// console.log(politicians)

var pilihan = []
for(let i=0; i<votes.length; i++){
    pilihan.push(votes[i].split(','))
}
// first_name,last_name,gender,age
// console.log(pilihan)

db.serialize(function(){
    let HeaderVoterId = pilihan[0][0]
    let HeaderPoliticianId = pilihan[0][1]
    
    for(let j=1; j<pilihan.length; j++){
        var query = `insert into votes(id,${HeaderVoterId},${HeaderPoliticianId})
                        values(null,${pilihan[j][0]},${pilihan[j][1]});`
    
        // console.log(query)
        db.run(query)
    }   


})


db.close()