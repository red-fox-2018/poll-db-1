const fs = require ('fs')
var sqlite3 = require('sqlite3').verbose();
let dbPoliticians = new sqlite3.Database('./politicians.db');

// let names = ['Budi','Susi','Tono','Bibu']
// let placeholders = names.map((nama)=>'(?)').join(',')
// console.log(placeholders)
// let sql = 'INSERT INTO pejabats(nama) VALUES ' + placeholders 

// 'INSERT INTO pejabats(nama) VALUES (?)  '
// db.run(sql,names,function(err){
//     if(err){
//         return console.log(err.message)
//     }
//     console.log(`Masukk ${this.changes}`)
// })


function createTable(table){
    dbPoliticians.run(table,function(err){
        if(err){
            console.log(err)
        }
        console.log('Table created')
    });
    
    dbPoliticians.close()
}

function getFilePoliticians(cb){
    fs.readFile('./politicians.csv','utf-8',function(err,data){
        if(err) throw err
        cb(data)
    })
}

function splitDataPoliticians(cb){
    getFilePoliticians(function(data){
        var pltcns=[]
        var convertData=data.split('\n')
        for(var i=0; i<convertData.length; i++){
            var separateComa=convertData[i].split(",")
            pltcns.push(separateComa)
        }
        cb(pltcns)
    })  
}

function insertPoliticians(table_name){
    splitDataPoliticians(function(input){
        for(var i=0; i<input.length; i++){
            let query = `INSERT INTO ${table_name} (id,name,party,location,grade_current) VALUES(NULL,'${input[i][0]}','${input[i][1]}','${input[i][2]}','${input[i][3]}')`
            console.log('query: ', query)
            dbPoliticians.run(query,function(err){
                if(err){
                    return console.log('errroorrrr',err)
                }
                console.log(`yeee masuk ${this.lastID}`)
            })
        }
    })
}

function update(table_name,column_name,inputValue,certainValue){
    let query=`UPDATE ${table_name} SET ${column_name} ='${inputValue}' WHERE ${column_name}='${certainValue}'`
    console.log('query:', query)
    dbPoliticians.run(query,function(err){
        if(err){
            return console.error(err.message)
        }
        console.log(`Row updated : ${this.changes}`)
    })
}


function deleteData(table_name,column_name,inputValue){
    let query=`DELETE from ${table_name} WHERE ${column_name}= '${inputValue}'`
    dbPoliticians.run(query,function(err){
        if(err){
            return console.error(err.message)
        }
        console.log(`Row deleted : ${this.changes}`)
    })
}


function getFileVoters(cb){
    fs.readFile('./voters.csv','utf-8',function(err,data){
        if(err) throw err
        cb(data)
    })
}

function splitDataVoters(cb){
    getFileVoters(function(data){
        var voters=[]
        var convertData=data.split('\n')
        for(var i=0; i<convertData.length; i++){
            var separateComa=convertData[i].split(",")
            voters.push(separateComa)
        }
        console.log(voters)
        cb(voters)
    })  
}


function insertVoters(){
    splitDataVoters(function(input){
        for(var i=0; i<input.length; i++){
            let query = `INSERT INTO voters (id,first_name,last_name,gender,age) VALUES(NULL,'${input[i][0]}','${input[i][1]}','${input[i][2]}','${input[i][3]}')`
            console.log('query: ', query)
            dbPoliticians.run(query,function(err){
                if(err){
                    return console.log('errroorrrr',err)
                }
                console.log(`yeee masuk ${this.lastID}`)
            })
        }
    })
}

function getFileVotess(cb){
    fs.readFile('./votes.csv','utf-8',function(err,data){
        if(err) throw err
        cb(data)
    })
}

function splitDataVotess(cb){
    getFileVotess(function(data){
        var votess=[]
        var convertData=data.split('\n')
        for(var i=0; i<convertData.length; i++){
            var separateComa=convertData[i].split(",")
            votess.push(separateComa)
        }
        console.log(votess)
        cb(votess)
    })  
}


function insertVotess(){
    splitDataVotess(function(input){
        for(var i=0; i<input.length; i++){
            let query = `INSERT INTO votes (voterId,politicianId) VALUES('${input[i][0]}','${input[i][1]}')`
            dbPoliticians.run(query,function(err){
                if(err){
                    return console.log('errroorrrr',err)
                }
                console.log(`yeee masuk ${this.lastID}`)
            })
        }
    })
}

function retrieveData(){
    var list=[]
    
    let query =`SELECT name,party,grade_current FROM politicians WHERE party="R"`
    dbPoliticians.all(query,(err,rows)=>{
        if(err){
            return console.log(err);
        }
        rows.forEach((row)=>{
            var obj={}
            // console.log(row.name)
            obj['name']=row.name
            obj['party']=row.party
            obj['grade_current']=row.grade_current
            list.push(obj)
        })
        console.log(list)
    })
}


function countVote(){
    var list=[]
    
    let query =`SELECT COUNT(*) 
    FROM voters 
    INNER JOIN votes ON voters.id = votes.voterId
    INNER JOIN politicians ON votes.politicianId = politicians.id
    WHERE politicians.name = "Olympia Snowe"`
    dbPoliticians.all(query,(err,rows)=>{
        if(err){
            return console.log(err);
        }
        rows.forEach((row)=>{
            var obj={}
            obj["Total_Vote"]=voters.count
            obj["name"]="Olympia Snowe"
            list.push(obj)
        })
        
        console.log(list)
    })
}

// Release 3 no 2 query
// select  count (politicianId) from votes where votes.politicianId= (select id from politicians where  politicians.name="Olympia Snowe")

//Release 3 no 3 query
// SELECT name, (SELECT COUNT(politicianId) FROM votes
// WHERE politicianId = politicians.id) 
// FROM politicians where name like "Adam%"

//Release 3 no 4 query
//SELECT name,(SELECT COUNT(politicianId) from votes where politicianId=politicians.id) as totalvote ,party,locationfrom politicians ORDER BY totalvote DESC LIMIT 3

//Release 3 no 5 query



console.log(countVote())



// INSERT INTO politicians(id, name, party) VALUES (null, "John", "D")
// INSERT INTO politicians VALUES (null, "John", "D", "jakarta")

let politicians='CREATE TABLE politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, party TEXT, location TEXT, grade_current INTEGER)'
let voters ='CREATE TABLE voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, gender TEXT, age INTEGER)'
let votes ='CREATE TABLE votes (voterId INTEGER, politicianId Integer)'

// console.log(insertVoters())
// createTable(votes)
// console.log(createTable(politicians))
// console.log(insertPoliticians("politicians"))

// console.log(insertVotess())
// UPDATE politicians 

