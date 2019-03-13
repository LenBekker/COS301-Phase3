const sqlite3 = require('sqlite3').verbose();
var express = require("express");
var app = express();
var server = require('http').createServer(app);
const readline = require('readline');
app.disable('etag');
const terminal = require("./terminal.js");

//Allow encoded body
app.use(express.urlencoded({extended: true})); 
app.use(express.json());  

//port to listen on

  var PORT = 8080;
  server.listen(PORT);

/*
 userID email/password API calls
  //Option 1 = Get Email 
  //Option 2 = Get Password

 Body-key inputs:
 eg. 
    id = 123456
    option = 2
*/
app.post('/api/user', function(req, res){
  var uID = req.body.id;
  var uOption = req.body.option;

  res.header('Access-Control-Allow-Origin', '*'); //Temporary to allow cross origin POST from html

  db.serialize(function() 
  {
    var stmt = db.prepare("SELECT [E-mail], Password FROM Clients WHERE userId=(?)");
    stmt.get(uID, function(err, row)
    {
        if(row != undefined)
        {
          if(uOption == 1)
          {
            res.send(row['E-mail']);
            //LOG?
          }
          if(uOption == 2)
          {
            res.send(row.Password);
            //LOG?
          }
        }
        else
          console.log("Undefined?");
    });
    stmt.finalize();
  });
});

app.post('/api/user/sync', function(req, res){
  //Sync users in caller database to be same as client information system
});


// open database in memory
// let db = new sqlite3.Database('../database/merlotInfoSys.db', (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to the in-memory SQlite database.');
//   });
terminal.AllowInput();
