const sqlite3 = require('sqlite3').verbose();
var express = require("express");
var app = express();
var server = require('http').createServer(app);
const readline = require('readline');
app.disable('etag');

//port to listen on

  var PORT = 8080;
  server.listen(PORT);

// open database in memory
let db = new sqlite3.Database('../database/merlotInfoSys.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });


//create input/output interface for terminal
  const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

  // Get process.stdin as the standard input object.
var standard_input = process.stdin;
standard_input.setEncoding('utf-8');

        console.log("Your options are the following :");
        console.log("Option 1 : add a new entry");
        console.log("Option 2 : delete a entry");
        console.log("Option 3 : search entries");
        console.log("Option 4 : List entries");
        console.log("Option 5 : quit");


// When user input data and click enter key.
standard_input.on('data', function (data) 
{
    
        
        if(data == 1)
        {
           function insert(uId,uName,uSurname,uEmail,uPass){

                    db.run(`INSERT INTO Clients(userId,Name,Surname,[E-mail],Password) VALUES(?,?,?,?,?)`, [uId,uName,uSurname,uEmail,uPass], function(err) {
                   if (err) {
                            return console.log(err.message);
                         }
                       });
              }
        }
        if(data == 2)
        {
          //add entry to data base
           //add entry to data base
          //delete entries 
          //copy data to new table the delete from current table

          function remove(uID)
          {
            db.run('SELECT userId FROM Clients Where userId =? ',[uID],function(err) {
                   if (err) {return console.log(err.message);}
                       });


            let sql = 'SELECT userId FROM Clients Where userId =(?) ';
            db.all(sql, [uID], (err, rows) => { if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.Name);
  });
        }
        if(data == 3)
        {
          //add entry to data base
          function Search(uID)
          {
            let sql= `SELECT (userId,Name,Surname,[E-mail],Password) FROM Clients WHERE userId=?`;
            db.get(sql, [uID], (err, row) => {
          if (err) {
              throw err;
              }
              return row
    ? console.log(row.userId, row.Name)
    : console.log(`No client found with the id ${uID}`);
         
          });


            

          }

          Search('123');
        }
        if(data == 4)
        {
          function Display(){
          let sql= "SELECT * FROM Clients";

          db.all(sql, [], (err, rows) => {
          if (err) {
              throw err;
              }
             // console.log(rows);
          rows.forEach((row) => {
           console.log(row.userId+ "\t" +row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password);
         });
          });      
          }
        }
    // User input exit.
    if(data === 5){
        // Program exit.
        console.log("User input complete, program exit.");
        db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });

        process.exit();
    }

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

