const fs = require('fs');

function read_politicians() {
  let politicians = fs.readFileSync('politicians.csv', 'utf-8').split('\n').slice(1);
  if (politicians[politicians.length - 1].length === 0) {
    politicians.pop();
  }
  for (var i = 0; i < politicians.length; i++) {
    politicians[i] = politicians[i].split(',');
  }
  return politicians;
}


function read_voters() {
  let voters = fs.readFileSync('voters.csv', 'utf-8').split('\n').slice(1);
  if (voters[voters.length - 1].length === 0) {
    politicians.pop();
  }
  for (var i = 0; i < voters.length; i++) {
    voters[i] = voters[i].split(',');
  }
  return voters;
}

function read_votes() {
  let votes = fs.readFileSync('votes.csv', 'utf-8').split('\n').slice(1);
  if (votes[votes.length - 1].length === 0) {
    votes.pop();
  }
  for (var i = 0; i < votes.length; i++) {
    votes[i] = votes[i].split(',');
  }
  return votes;
}

let politicians = read_politicians();
let voters = read_voters();
let votes = read_votes()



module.exports = {politicians, voters, votes}
