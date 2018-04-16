/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/
/*jshint -W083*/
/*jshint -W138*/

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const GetData = require('./getData.js');

let insertQueryPolitician = 'INSERT INTO politicians(politician_name, party, location, grade_current) VALUES (?,?,?,?)';
let insertQueryVoter = 'INSERT INTO voters(first_name, last_name, gender, age) VALUES (?,?,?,?)';
let insertQueryVotes = 'INSERT INTO votes(voter_id, politician_id) VALUES (?,?)';

let db = new sqlite3.Database('poll.db', (err) => {
   if (err) {
      return console.error(err.message);
   }
   console.log('Connected to the in-memory SQlite database.');
});

class DataParser {

   static insertPolitician(query) {
      GetData.politician('./politicians.csv', (politicians) => {
         politicians.forEach((politician) => {
            db.run(query, politician, (err) => {
               if (err) {
                  return console.log(err.message);
               }
               if (politicians[politicians.length - 1] == politician) {
                  db.close((err) => {
                     if (err) {
                        return console.error(err.message);
                     }
                     console.log('Close the database connection.');
                  });
               }
            });
         });
         console.log(`Table Politicians inserted successfully`);
      });
   }

   static insertVoter(query) {
      GetData.voter('./voters.csv', (voters) => {
         voters.forEach((voter) => {
            db.run(query, voter, (err) => {
               if (err) {
                  return console.log(err.message);
               }
               if (voters[voters.length - 1] == voter) {
                  db.close((err) => {
                     if (err) {
                        return console.error(err.message);
                     }
                     console.log('Close the database connection.');
                  });
               }
            });
         });
         console.log(`Table Voters inserted successfully`);
      });
   }

   static insertVote(query) {
      GetData.vote('./votes.csv', (votes) => {
         votes.forEach((vote) => {
            db.run(query, vote, (err) => {
               if (err) {
                  return console.log(err.message);
               }
               if (votes[votes.length - 1] == vote) {
                  db.close((err) => {
                     if (err) {
                        return console.error(err.message);
                     }
                     console.log('Close the database connection.');
                  });
               }
            });
         });
         console.log(`Table Votes inserted successfully`);
      });
   }
}

DataParser.insertPolitician(insertQueryPolitician);
DataParser.insertVoter(insertQueryVoter);
DataParser.insertVote(insertQueryVotes);
