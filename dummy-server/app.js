const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('../database/merlotInfoSys.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });


//For debugging test only
db.serialize(() => {
    db.each(`SELECT userId as id,
                    Name as name
             FROM Clients`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });

  
// close the database connection
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });

