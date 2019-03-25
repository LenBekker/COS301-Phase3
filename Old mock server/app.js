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

  var PORT = process.env.PORT || 8080;
  server.listen(PORT);
  console.log("Service is running on port: " + PORT);

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

  let db = new sqlite3.Database('database/merlotInfoSys.db', (err) => 
  {
    if (err) 
    {
      return console.error(err.message);
    }
  });

  var uID = req.body.userId;
  var uOption = req.body.option;

  //[Temporary?] Allow cross origin POST from html (not restricted to eg. localhost only)
  res.header('Access-Control-Allow-Origin', '*'); 

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
            console.log("API Request from userId: " + uID + " for E-mail, responded with " + row['E-mail']);
          }
          if(uOption == 2)
          {
            res.send(row.Password);
            console.log("API Request from userId: " + uID + " for Password, responded with " + row.Password);
          }
        }
        else
        {
          console.error("FAILED API Request from userId: " + uID);
          res.status('404').send('User or Option Invalid');
        }
    });
    stmt.finalize();
    db.close();
  });
});

app.post('/api/user/sync', function(req, res){
  //Sync users in caller database to be same as client information system
  //Assuming this means they want all the clients in the clients table

  let db = new sqlite3.Database('database/merlotInfoSys.db', (err) => 
  {
    if (err) 
    {
      return console.error(err.message);
    }
  });

  //[Temporary?] Allow cross origin POST from html (not restricted to eg. localhost only)
  res.header('Access-Control-Allow-Origin', '*'); 

  let sql= 'SELECT * FROM Clients';

  db.all(sql, [], (err, rows) => {
    if (err) {
          res.status('500').send("Database error occured");
          return console.error(err.message);
        }
    console.log("API Sync Request");
    res.send(rows);        
  });

  db.close();
});

terminal.AllowInput();
