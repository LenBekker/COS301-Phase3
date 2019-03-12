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
terminal.AllowInput(db);
/*

  // Get process.stdin as the standard input object.
var standard_input = process.stdin;
standard_input.setEncoding('utf-8');

     


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
          function remove(uID)
          {
             db.run('CREATE TABLE IF NOT EXISTS Delete_Clients (userId NVARCHAR(50) NOT NULL, Name NVARCHAR(50) NULL,[E-mail] NVARCHAR(50) NULL,Password NVARCHAR(50) NULL)');
            let sql= `SELECT userId,Name,Surname,[E-mail],Password FROM Clients WHERE userId=?`;
            db.get(sql, [uID], (err, row) => {
               if (err) {
              return console.error(err.message);
              }
             
              return row? console.log(row.userId+ "\t" +row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password): console.log(`No client found with the id ${uID}`);
          db.run(`INSERT INTO Delete_Clients(userId,Name,Surname,[E-mail],Password) VALUES(?,?,?,?,?)`, [row.userId,row.Name,row.Surname,row['E-mail'],row.Password], function(err) {
                   if (err) {return console.log(err.message);}
                       });
          });
                         
            db.run('DELETE FROM Clients WHERE userId=?',[uID],function(err) {
                   if (err) {     return console.log(err.message);}
                       });

            
          }
        }
        if(data == 3)
        {
          //search using clientID
         function Search(uID)
          {
            let sql= `SELECT userId,Name,Surname,[E-mail],Password FROM Clients WHERE userId=?`;
            db.get(sql, [uID], (err, row) => {
             
          if (err) {
              return console.error(err.message);
              }
              return row? console.log(row.userId+ "\t" +row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password): console.log(`No client found with the id ${uID}`);
         
          });


            

          }
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

*/
