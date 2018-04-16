/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/
/*jshint -W083*/
/*jshint -W138*/

const fs = require('fs');

class GetData {

  static politician(file, callback){
    console.log(file);
    fs.readFile('politicians.csv', 'utf8', (err, data) => {
      let politician = data.trim().split('\n').map(x => x.split(',')).splice(1);
      if (err) throw err;
      else {
        callback(politician);
      }
    });
  }

  static voter(file, callback){
    fs.readFile('voters.csv', 'utf8', (err, data) => {
      let voter = data.trim().split('\n').map(x => x.split(',')).splice(1);
      if (err) throw err;
      else {
        callback(voter);
      }
    });
  }

  static vote(file, callback){
    fs.readFile('votes.csv', 'utf8', (err, data) => {
      let votes = data.trim().split('\n').map(x => x.split(',')).splice(1);
      if (err) throw err;
      else {
        callback(votes);
      }
    });
  }
}

module.exports = GetData;
