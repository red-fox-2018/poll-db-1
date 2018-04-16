const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db')
const fs = require('fs')


function insertData(HeaderName,HeaderParty,HeaderLocation,HeaderGrade_current){
    db.serialize(function(){
        var query = `insert into politicians(id,name,party,location,grade_current)
                        values(null,'${HeaderName}','${HeaderParty}','${HeaderLocation}',${HeaderGrade_current});`
    
        // console.log(query)
        db.run(query)

    })
    
    db.close
}

function updateData(id, HeaderName,HeaderParty,HeaderLocation,HeaderGrade_current){
    db.serialize(function(){
        var query = `update politicians set name = '${HeaderName}',
                                            party = '${HeaderParty}',
                                            location = '${HeaderLocation}',
                                            grade_current = ${HeaderGrade_current}
                     where id = ${id};`
    
        // console.log(query)
        db.run(query)

    })
    
    db.close
}

function deleteData(id){
    db.serialize(function(){
        var query = `delete from politicians where id = ${id};`
    
        // console.log(query)
        db.run(query)

    })
    
    db.close
}

// insertData('yasir','salafi','pt',1131231231)
// updateData(21, 'yasirMaulana','D','PT',99809808);
deleteData(21)