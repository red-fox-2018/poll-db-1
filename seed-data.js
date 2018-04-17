/*jshint esversion:6*/
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');



function addPolitician(){
  db.serialize(()=>{
    fs.readFile('./politicians.csv','utf8',(err,data)=>{
      if(err){
        throw err;
      }
      else{
        var newDataPoliticians = data.trim().split('\n');
        for(let i = 1 ; i < newDataPoliticians.length; i++){
          db.run(`INSERT INTO politicians(name,party,location,grade_current) VALUES ("${newDataPoliticians[i].split(',')[0]}",
                    "${newDataPoliticians[i].split(',')[1]}",
                      "${newDataPoliticians[i].split(',')[2]}",
                        "${newDataPoliticians[i].split(',')[3]}")`);
        }
      }
    });
  });
}

function addVoters(){
  db.serialize(()=>{
    fs.readFile('./voters.csv','utf8',(err,data)=>{
      if(err){
        throw err;
      }
      else{
        var newDataVoters =data.trim().split('\n');
        for(let i = 1 ; i < newDataVoters.length ;i++){
          db.run(`INSERT INTO voters(first_name,last_name,gender,age) VALUES("${newDataVoters[i].split(',')[0]}",
                    "${newDataVoters[i].split(',')[1]}",
                      "${newDataVoters[i].split(',')[2]}",
                        "${newDataVoters[i].split(',')[3]}")`);
        }
      }
    });
  });
}

function addVotes(){
  db.serialize(()=>{
    fs.readFile('./votes.csv','utf8',(err,data)=>{
      if(err){
        throw err;
      }
      else{
        var newDataVotes =data.trim().split('\n');
        for(let i = 1 ; i < newDataVotes.length ;i++){
          db.run(`INSERT INTO votes(voterId,politicianId) VALUES("${newDataVotes[i].split(',')[0]}",
                    "${newDataVotes[i].split(',')[1]}")`);
        }
      }
    });
  });
}

function createDataVoters(firstname,lastname,gender,age){
  db.serialize(()=>{
    db.run(`INSERT INTO voters(first_name,last_name,gender,age) VALUES("${firstname}","${lastname}",
              "${gender}","${age}")`);
  });
}

function updateVoters(id,firstname,lastname,gender,age){
  db.run(`UPDATE voters SET first_name = '${firstname}',
          last_name = '${lastname}',
          gender = '${gender}',
          age = ${age}
          WHERE id =${id}`);
}

function deleteVoters(id){
  db.run(`DELETE FROM voters WHERE id = ${id} `);
}

//release 3.1
function searchPartyR(){
  db.all(`SELECT politicians.name,politicians.party,politicians.grade_current from politicians
    where politicians.grade_current > 9 OR politicians.grade_current < 11 AND politicians.party = 'R'`,
    (err,row)=>{
    if(err){
      throw err;
    } else{
      console.log(row);
    }
  });
}

function searchName(namePolitician){
  db.all(`select politicians.name, count(*)  AS TotalVote from votes
            inner join politicians on politicians.id = votes.politicianId
              where politicians.name = "${namePolitician}"`,
  (err,row)=>{
    if(err){
      throw err;
    }else{
      console.log(row);
    }
  });
}

function searchNameNearBy(namePolitician){
  db.all(`select politicians.name, count(*)  AS TotalVote from votes inner join politicians
            on politicians.id = votes.politicianId
              WHERE politicians.name LIKE '${namePolitician}%' group by politicians.name;`,
  (err,row)=>{
    if(err){
      throw err;
    }else{
      console.log(row);
    }
  });
}

function searchBigThree(){
  db.all(`select count(*) as totalVote, name from politicians
            join votes on politicians.id = votes.politicianId
              group by politicians.id order by totalVote desc limit 3`,
  (err,row)=>{
    if(err){
      throw err;
    }else{
      console.log(row);
    }
  });
}

function voteForOlympia(){
  db.all(`SELECT voters.first_name, voters.last_name, voters.gender,voters.age
          FROM politicians
          inner join votes on politicians.id = votes.politicianId
          inner join voters on voters.id = votes.voterId
          where politicians.name = 'Olympia Snowe';`,
  (err,data)=>{
    if(err){
      throw err;
    }else{
      console.log(data);
    }
  });
}



// addPolitician();
// addVoters();
// addVotes();

// createDataVoters("joko","widodo","male",59);
// updateVoters(151,"pakwowo",null,"male",62);
// deleteVoters(151);

// searchPartyR();
// searchName("Olympia Snowe");
// searchNameNearBy('adam');
// searchBigThree();
// voteForOlympia()
// searchSmalestThree()
