const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')
const ReadFile = require('./read-file.js')

class seedData{
    static insertDataFromCSV(){
        ReadFile.read('politicians.csv',addPoliticians)
        function addPoliticians(listPoliticians){
            db.serialize(function(){
                let title = db.prepare("INSERT INTO politicians (name,party,location,grade_current) VALUES (?,?,?,?)")
                for(let i=0;i<listPoliticians.length;i++){
                    title.run(listPoliticians[i][0],listPoliticians[i][1],listPoliticians[i][2],listPoliticians[i][3])
                }
                title.finalize()
            })
            console.log("Proses data Politicians sedang ditambah ke tabel politicians")
        }

        ReadFile.read('voters.csv',addVoters)
        function addVoters(listVoters){
            db.serialize(function(){
                let title = db.prepare("INSERT INTO voters (first_name,last_name,gender,age) VALUES (?,?,?,?)")
                for(let i=0;i<listVoters.length;i++){
                    title.run(listVoters[i][0],listVoters[i][1],listVoters[i][2],listVoters[i][3])
                }
                title.finalize()
            })
            console.log("Proses data Voters sedang ditambahkan ke tabel voters")
        }

        ReadFile.read('votes.csv',addVotes)
        function addVotes(listVotes){
            db.serialize(function(){
                let title = db.prepare("INSERT INTO votes (voterId,politicianId) VALUES (?,?)")
                for(let i=0;i<listVotes.length;i++){
                    title.run(listVotes[i][0],listVotes[i][1])
                }
                title.finalize()
            })
            console.log("Proses data Votes sedang ditambahkan ke table votes")
        }
    }

    static insertDataPoliticians(tabel,name,party,location,grade_current){
        db.serialize(function(){
            db.run(`INSERT INTO ${tabel} (name,party,location,grade_current) VALUES (?,?,?,?)`,name,party,location,grade_current)
        })
    }

    static insertDataVoters(tabel,first_name,last_name,gender,age){
        db.serialize(function(){
            db.run(`INSERT INTO ${tabel} (first_name,last_name,gender,age) VALUES (?,?,?,?)`,[first_name,last_name,gender,age])
        })
    }

    static insertDataVotes(tabel,voterId,politicianId){
        db.serialize(function(){
            db.run(`INSERT INTO ${tabel} (voterId,politicianId) VALUES ($voterId,$politicianId)`,{$voterId: voterId,$politicianId: politicianId})
        })
    }

    static updateData(tabel,kolom,data,id){
        db.serialize(function(){
            db.run(`UPDATE ${tabel} SET ${kolom} = "${data}" WHERE id = ${id}`,function(err){
                if(err){
                    throw err
                }
                console.log(`name ${tabel} with kolom ${kolom} has been changed with ${data}`)
            })
        })
    }

    static deleteData(tabel,id){
        db.serialize(function(){
            db.run(`DELETE FROM ${tabel} WHERE id = ${id}`,function(err){
                if(err){
                    throw err
                }
                console.log(`id ${id} has been deleted`)
            })
        })
    }
    
    static displayData(tabel){
        db.serialize(function(){
            db.each(`SELECT * FROM ${tabel}`,function (err,row){
                if(err){
                    throw err
                }
                console.log(row)
            })
        })
    }
}

// seedData.insertDataFromCSV()

// seedData.insertDataPoliticians("politicians","dimas","R","LA",8.90001233)
// seedData.displayData("politicians")

// seedData.insertDataVoters("voters","airy","room","female",40)
// seedData.displayData("voters")

// seedData.insertDataVotes("votes",1,123)
// seedData.displayData("votes")

// seedData.updateData("politicians",'party','D',20)
// seedData.displayData("politicians")

// seedData.deleteData("politicians",21)
// seedData.displayData("politicians")


//QUERY DATABASE
// 1. Tampilkan nama Politicians, partai dan grade_current yg berada
//    di partai R dan memiliki grade_current range 9 s/d 11

//    SELECT name,party,grade_current FROM politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11;

// 2. Hitung jumlah vote untuk politicians bernama "Olympia Snowe"

//    SELECT COUNT(*) AS "totalvote",politicians.name FROM votes JOIN politicians ON votes.politicianId = politicians.id WHERE politicians.id = (SELECT id FROM politicians WHERE name = "Olympia Snowe");

// 3. Hitung jumlah vote untuk politicians yg namanya mengandung kata adam

//    SELECT politicians.name, COUNT(*) AS "totalvote" FROM votes JOIN politicians ON votes.politicianId = politicians.id WHERE politicians.name LIKE "Adam %" GROUP BY politicians.id;

// 4. Tampilkan 3 politicians beserta nama partai dan lokasi politicians yg memiliki suara terbanyak

//    SELECT COUNT(*) AS "totalVote", politicians.name, politicians.party, politicians.location FROM politicians JOIN votes ON politicians.id = votes.politicianId GROUP BY politicians.name ORDER BY totalVote DESC LIMIT 3;

// 5. Tampilkan siapa saja yang melakukan voting ke politicians yg bernama Olympia Snowe

//    SELECT voters.first_name, voters.last_name, voters.gender, voters.age FROM voters JOIN votes ON voters.id = votes.voterId WHERE votes.politicianId = (SELECT id FROM politicians WHERE name = "Olympia Snowe");