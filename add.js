const fs = require('fs')
class Add{
    static read(fileData, callback) {
        fs.readFile(fileData, function (err, data) {
            if (err) {
                console.log('error')
            }
            let politicians_file = data.toString().split('\n')
            callback(politicians_file)
        })
    }
    static politicians(data,callback){
        Add.read(data, function (politicians_file) {
            let result = []
            for (let i = 1; i < politicians_file.length; i++) {
                let name = politicians_file[i].split(',')[0]
                let party = politicians_file[i].split(',')[1]
                let location = politicians_file[i].split(',')[2]
                let grade_current = politicians_file[i].split(',')[3]
                let politician = new Politicians(name,party,location,grade_current)
                result.push(politician)
            }
            callback(result)
        })
    }
    static voters(data, callback) {
        Add.read(data, function (voters_file) {
            let result = []
            for (let i = 1; i < voters_file.length; i++) {
                let first_name = voters_file[i].split(',')[0]
                let last_name = voters_file[i].split(',')[1]
                let gender = voters_file[i].split(',')[2]
                let age = voters_file[i].split(',')[3]
                let voters = new Voters(first_name,last_name,gender,age)
                result.push(voters)
            }
            callback(result)
        })
    }
    static votes(data, callback) {
        Add.read(data, function (votes_file) {
            let result = []
            for (let i = 1; i < votes_file.length; i++) {
                let voterId = votes_file[i].split(',')[0]
                let politicianId = votes_file[i].split(',')[1]
                let votes = new Votes(voterId, politicianId)
                result.push(votes)
            }
            callback(result)
        })
    }
}
class Politicians {
    constructor(name, party, location, grade_current) {
        this.name = name
        this.party = party
        this.location = location
        this.grade_current = grade_current
    }
}
class Voters {
    constructor(first_name, last_name, gender, age) {
        this.first_name = first_name
        this.last_name = last_name
        this.gender = gender
        this.age = age
    }
}
class Votes {
    constructor(voterId, politicianId) {
        this.voterId = voterId
        this.politicianId = politicianId

    }
}

module.exports = Add