const sqlite3 = require('sqlite3').verbose();
var express = require("express");
var app = express();
var server = require('http').createServer(app);
const readline = require('readline');
app.disable('etag');
var database = require("./database.js");
//const terminal = require("./terminal.js");

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

  var uID = req.body.userId;
  var uOption = req.body.option;

  //[Temporary?] Allow cross origin POST from html (not restricted to eg. localhost only)
  res.header('Access-Control-Allow-Origin', '*'); 

  try{
    database.APIUser(uID, uOption, res);
  }
  catch(err){
    console.error(err);
  }
  
  
});

app.get('/', function (req, res){
  res.send("Welcome to Merlot CIS\n Only api/user POST is currently set up");
});

app.post('/api/user/sync', function(req, res){
  //???

  res.header('Access-Control-Allow-Origin', '*'); 

  /* Implement in database.js */
  //database.APISync();

});
