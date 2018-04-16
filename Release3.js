const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db');

class Query {
  constructor() {

  }

  static insertPoliticians(name, party, location, grade_current){
   db.run('INSERT INTO Politicians VALUES (NULL, ?, ?, ?, ?)', name, party, location, grade_current,function(err){
     if(err){
       console.log(err);
     }else{
        console.log(`politicians ${name} with party ${party} has been inserted`);
     }
   });

 }

 static DeletePoliticians(id){
    db.run('DELETE FROM Politicians WHERE Politicians_id = (?)',id,function(err){
      if(err){
        console.log(err);
      }else{
        console.log(`politicians with id ${id} has been deleted`);
      }
    });
  }




  static updatePoliticians(name){
     db.run(`UPDATE Politicians SET party = 'Perindo' WHERE name = (?)`,name,function(err){
       if(err){
         console.log(err);
       }else{
         console.log(`politicians with name ${name} has been updated`);
       }
     });
   }

   static selectBetween(){
     db.all(`SELECT * FROM POLITICIANS WHERE party IS 'R' AND grade_current BETWEEN 9 AND 11`,function(err,result){
       if(err){
         console.log(err);
       }else{
         console.log(result);
       }
     })
   }


   static Snowe(){
     db.all(`SELECT(SELECT COUNT(voters_id) FROM Votes WHERE Politicians.Politicians_id = Votes.Politicians_id)AS totalVote, name
             FROM POLITICIANS WHERE name is 'Olympia Snowe'`,function(err,result){
       if(err){
         console.log(err);
       }else{
         console.log(result);
       }
     })
   }

   static adam(){
       db.all(`SELECT name,(SELECT COUNT(voters_id) FROM Votes WHERE Politicians.Politicians_id = Votes.Politicians_id)AS totalVote
             FROM POLITICIANS WHERE name LIKE '%Adam%'`,function(err,result){
       if(err){
         console.log(err);
       }else{
         console.log(result);
       }
     })
   }

   static maxVote(){
     db.all(`SELECT first_name ,last_name,gender, age
             FROM Votes
             INNER JOIN Voters on  Voters.voters_id = Votes.voters_id
             INNER JOIN Politicians on  Politicians.Politicians_id = Votes.Politicians_id
             WHERE Politicians.name = 'Olympia Snowe'`,function(err,result){
       if(err){
         console.log(err);
       }else{
         console.log(result);
       }
     })
   }


   static polDb21(){
     db.all(`SELECT name,address,grade_current,
             (SELECT COUNT(*) FROM Votes WHERE Votes.Politicians_id=Politicians.Politicians_id)as totalvotes
             FROM Politicians WHERE grade_current < 9 ORDER BY totalvotes ASC `,function(err,result){
       if(err){
         console.log(err);
       }else{
         console.log(result);
       }
     })
   }



  static polDb22(){
    db.all(`SELECT (SELECT name FROM Politicians
            where Votes.Politicians_id=Politicians.Politicians_id) AS PoliticiansName,
            (SELECT COUNT(voters_id) FROM Votes WHERE Politicians.Politicians_id = Votes.Politicians_id)AS totalVote,
            (first_name || ' '||last_name)as voterName, gender
            FROM Votes
            INNER JOIN Voters on Votes.voters_id=Voters.voters_id
            INNER JOIN Politicians on Votes.Politicians_id=Politicians.Politicians_id
            WHERE totalvote > 10
            ORDER BY totalvote DESC`,function(err,result){
      if(err){
        console.log(err);
      }else{
        console.log(result);
      }
    })
  }

  static polDb22(){
    db.all(`SELECT (SELECT name FROM Politicians
            where Votes.Politicians_id=Politicians.Politicians_id) AS PoliticiansName,
            (SELECT COUNT(voters_id) FROM Votes WHERE Politicians.Politicians_id = Votes.Politicians_id)AS totalVote,
            (first_name || ' '||last_name)as voterName, gender
            FROM Votes
            INNER JOIN Voters on Votes.voters_id=Voters.voters_id
            INNER JOIN Politicians on Votes.Politicians_id=Politicians.Politicians_id
            WHERE totalvote > 10
            ORDER BY totalvote DESC`,function(err,result){
      if(err){
        console.log(err);
      }else{
        console.log(result);
      }
    })
  }

  static polDb23(){
    db.all(`SELECT (SELECT COUNT(voters_id) FROM Votes WHERE Votes.voters_id = Voters.voters_id)
            as totalvotes, (first_name || ' '||last_name) AS name,gender,age
            FROM Voters WHERE totalVotes>1 ORDER BY totalVotes DESC`,function(err,result){
      if(err){
        console.log(err);
      }else{
        console.log(result);
      }
    })
  }


}

// Query.insertPoliticians('Faldhi','Gerindra','UK',13.03522892)
//Query.DeletePoliticians(21)
//Query.updatePoliticians('Faldhi')
// Query.selectBetween()
// Query.Snowe()
// Query.adam()
// Query.maxVote()

Query.polDb23()
//Query.polDb22()
//Query.polDb21()








// SELECT * FROM POLITICIANS WHERE party IS 'R' AND grade_current BETWEEN 9 AND 11
//
//
// SELECT(SELECT COUNT(voters_id) FROM Votes WHERE Politicians.Politicians_id = Votes.Politicians_id)AS totalVote, name
//    FROM POLITICIANS WHERE name is 'Olympia Snowe'
//
//
// SELECT name,(SELECT COUNT(voters_id) FROM Votes WHERE Politicians.Politicians_id = Votes.Politicians_id)AS totalVote
//    FROM POLITICIANS WHERE name LIKE '%Adam%'
//
//
// SELECT (SELECT COUNT(voters_id) FROM Votes WHERE Politicians.Politicians_id = Votes.Politicians_id)AS totalVote, name,party,address
//    FROM POLITICIANS WHERE address = 'WA' ORDER BY totalvote DESC limit 0,3
//
//
// SELECT first_name ,last_name,gender, age
// FROM Votes
// INNER JOIN Voters on  Voters.voters_id = Votes.voters_id
// INNER JOIN Politicians on  Politicians.Politicians_id = Votes.Politicians_id
// WHERE Politicians.name = 'Olympia Snowe'
