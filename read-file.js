const fs = require('fs')

class ReadFile{
    static read(nameFile,callback){
        fs.readFile(nameFile,'utf-8',function(err,data){
            if(err){
                throw err
            }
            if(nameFile=="politicians.csv"){
                let listArray = data.split("\n")
                let listPoliticians = []
                for(let i=1;i<listArray.length;i++){
                    let perList = listArray[i].split(",")
                    let list = [perList[0],perList[1],perList[2],perList[3]];
                    listPoliticians.push(list)
                }
                callback(listPoliticians)
            }else if(nameFile=="voters.csv"){
                let listArray = data.split("\n")
                let listVoters = []
                for(let i=1;i<listArray.length;i++){
                    let hasilSplit = listArray[i].split(",")
                    let voters = [hasilSplit[0],hasilSplit[1],hasilSplit[2],hasilSplit[3]]
                    listVoters.push(voters)
                }
                callback(listVoters)
            }else if(nameFile=="votes.csv"){
                let listId = data.split("\n")
                let listIdVoters = []
                for(let i=1;i<listId.length;i++){
                    let list = listId[i].split(",")
                    let listVote = [list[0],list[1]]
                    listIdVoters.push(listVote)
                }
                callback(listIdVoters)
            }
        })
    }
}

module.exports = ReadFile