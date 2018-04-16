var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');
var fs=require('fs');
// db.serialize(function() {
	

// });

 
// db.close();


class Poll {

	static readFile(file_name,cb) {
		fs.readFile(file_name,'utf8',function(err,data) {
			if (err) throw err;
			var toString=data.toString().split('\n');
			cb(toString);  
		})
	}

	static politicianData() {
		var arrPolitician=[];
		Poll.readFile('politicians.csv',function(filePolitician) {
			for(let i=0;i<filePolitician.length;i++) {
				arrPolitician.push(filePolitician[i].split(','));
			}
			var objPolitician=[]
			for(let i=1;i<arrPolitician.length;i++) {
				objPolitician.push(new Politician(arrPolitician[i][0],arrPolitician[i][1],arrPolitician[i][2],arrPolitician[i][3]))
			}
			
			db.serialize(function() {
			  
			  var stmt = db.prepare("INSERT INTO Politicians(name,party,location,grade_current) VALUES (?, ?, ?, ?)");
			  for (var i = 0; i < objPolitician.length; i++) {
			      stmt.run(objPolitician[i].name,objPolitician[i].party,objPolitician[i].location,objPolitician[i].grade_current);
			  } 
			});
			// console.log(objPolitician)
		} )
	}

	static voterData() {
		var arrVote=[];
		Poll.readFile('voters.csv',function(fileVoter) {
			for(let i=0;i<fileVoter.length;i++) {
				arrVote.push(fileVoter[i].split(','));
			}
			var objVoter=[]
			for(let i=1;i<arrVote.length;i++) {
				objVoter.push(new Voter(arrVote[i][0],arrVote[i][1],arrVote[i][2],arrVote[i][3]))
			}
			
			db.serialize(function() {
			  
			  var stmt = db.prepare("INSERT INTO Voters(first_name,last_name,gender,age) VALUES (?, ?, ?, ?)");
			  for (var i = 0; i < objVoter.length; i++) {
			      stmt.run(objVoter[i].first_name,objVoter[i].last_name,objVoter[i].gender,objVoter[i].age);
			  } 
			});
			
		} )
	} 


	static voteData() {
		var arrVote=[];
		Poll.readFile('votes.csv',function(fileVote) {
			for(let i=0;i<fileVote.length;i++) {
				arrVote.push(fileVote[i].split(','));
			}
			var objVote=[]
			for(let i=1;i<arrVote.length;i++) {
				objVote.push(new Vote(arrVote[i][0],arrVote[i][1]))
			}
			
			//console.log(objVote)
			db.serialize(function() {
			  
			  var stmt = db.prepare("INSERT INTO Votes(voterId,politicianId) VALUES (?, ?)");
			  for (var i = 0; i < objVote.length; i++) {
			      stmt.run(objVote[i].voterID,objVote[i].politicianID);
			  } 
			});
			
		} )
	}




}

class Politician {
	constructor(name,party,location,grade_current) {
		this.name=name
		this.party=party
		this.location=location
		this.grade_current=grade_current
	}

	static insertDataPoliticians(name,party,location,grade_current) {
		var stmt = db.prepare("INSERT INTO Politicians(name,party,location,grade_current) VALUES (?,?,?,?)");
		stmt.run(name,party,location,grade_current);
	}

	static deletePolitician(id) {
		db.run(`DELETE FROM Politicians WHERE PoliticianId = ${id}`)
	}

	static updatePolitician(atribut,value,id) {
		db.run(`UPDATE Politicians SET ${atribut} = "${value}" WHERE Politicianid= ${id}`)
	}

}


class Voter {
	constructor(first_name,last_name,gender,age) {
		this.first_name=first_name
		this.last_name=last_name
		this.gender=gender
		this.age=age
	}

	static insertDataVoters(first_name,last_name,gender,age) {
		var stmt = db.prepare("INSERT INTO Voters(first_name,last_name,gender,age) VALUES (?,?,?,?)");
		stmt.run(first_name,last_name,gender,age);
	}

	static deleteVoter(id) {
		db.run(`DELETE FROM Voters WHERE VoterId = ${id}`)
	}

	static updateVoter(atribut,value,id) {
		db.run(`UPDATE Voters SET ${atribut} = "${value}" WHERE VoterId= ${id}`)
	}

}


class Vote {
	constructor(voterID,politicianID) {
		this.voterID=voterID
		this.politicianID=politicianID
		
	}

	static insertDataVote(voterID, politicianID) {
		var stmt = db.prepare("INSERT INTO Votes(voterID, politicianID) VALUES (?,?)");
		stmt.run(voterID, politicianID);
	}

	static deleteVote(id) {
		db.run(`DELETE FROM Votes WHERE VoteID = ${id}`)
	}

	static updateVote(atribut,value,id) {
		db.run(`UPDATE Votes SET ${atribut} = ${value} WHERE VoteId= ${id}`)
	}
}


function nomor1() {
	db.all(`SELECT name,party,grade_current FROM Politicians WHERE Party='R' AND Grade_Current BETWEEN 9 AND 11;`,function(err,rows) {
		console.log('==nomor 1==')
		console.log(rows);
	} )
}

function nomor2() {
	db.all(`SELECT COUNT(*) AS TotalVote,name FROM Politicians LEFT JOIN Votes ON Politicians.PoliticianID = Votes.PoliticianID WHERE Politicians.Name = 'Olympia Snowe';`,function(err,rows) {
		console.log('==nomor 2==')
		console.log(rows);
	} )
}

function nomor3() {
	db.all(`SELECT Name,COUNT(*)AS TotalVote FROM Politicians JOIN Votes ON Politicians.PoliticianID = Votes.PoliticianID WHERE Name LIKE '%Adam%'GROUP BY NAME;`,function(err,rows) {
		console.log('==nomor 3==')
		console.log(rows);
	} )
}

function nomor4() {
	db.all(`SELECT COUNT(*) AS TotalVote,Name,Party,Location FROM Politicians JOIN Votes ON Politicians.PoliticianID = Votes.PoliticianID GROUP BY Name ORDER BY TotalVote DESC LIMIT 3;`,function(err,rows) {
		console.log('==nomor 4==')
		console.log(rows);
	} )
}

function nomor5() {
	db.all(`SELECT first_name,last_name,gender,age FROM Voters JOIN Votes ON Voters.VoterID=Votes.VoterID WHERE PoliticianID = (SELECT PoliticianID FROM Politicians WHERE name='Olympia Snowe');`,function(err,rows) {
		console.log('==nomor 5==')
		console.log(rows);
	} )
}

nomor1();
nomor2();
nomor3();
nomor4();
nomor5();


  








// CREATE VIEW tableTemp
// AS
// SELECT First_Name,Last_Name,Gender,Age, PoliticianID
// FROM Voters
// JOIN Votes
// 	ON Voters.VoterID = Votes.VoterID;

// SELECT First_Name,Last_Name,Gender,Age
// FROM tableTemp
// JOIN Politicians
// 	ON tableTemp.PoliticianID = Politicians.PoliticianID
// WHERE Politicians.name = 'Olympia Snowe'
// GROUP BY 1;	








// Poll.politicianData();
// Poll.voterData();

//Poll.voteData();

// Politician.insertDataPoliticians('andi','GARUDA','Jakarta','123.34234')
//Voter.insertDataVoters('andi','budiman','male',25);
// Vote.insertDataVote(30,30);
