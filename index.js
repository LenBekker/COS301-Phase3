//libraries that need to used.
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbsetup = require('./dbSetup.js')
const db = require('./queries.js')
var path = require('path');
var http = require('http');
const fs = require('fs');
const cors = require('cors')
const port = process.env.PORT || 3000;

//Setup connect to postgres database and create table if does not exist
dbsetup.psqlSetup();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors()); //Middleware for CORS library 

// Static Home Page
const HomePage = path.join(__dirname, '/Web');
app.use("/", express.static(HomePage));

app.post('/', (req, res) => {
  var data = req.body;
  //console.log(data);
  var feedback = formatContent(req,res);
})

//Menu options that the CIS system offers.
function formatContent(req,res)
{
    switch(req.body.option)
    {
        case "getUsers":
        return db.getUsers(req,res);

        case "getUserById":
        return db.getUserById(req,res);

        case "getActive":
        return db.getActive(req,res);

        case "getEmail":
        return db.FindEmail(req,res);

        case "insert":
        return db.insert(req,res);

        case "delete":
        return db.deleteUser(req,res);

        case "updateEmail":
        return db.UpdateEmail(req,res);

        case "updatePhone":
        return db.UpdatePhoneNumber(req,res);

        case "updateAddress":
        return db.UpdateAddress(req,res);

        case "reactivate":
        return db.Reactivate(req,res);

        case "deactivate":
        return db.Deactivate(req,res);

        case "insertCSV":
        return db.insertCSV(req,res);
        
        case "insertCSVfilepath":
        return db.insertCSVfilepath(req,res);

        case "getLogs":
        return db.getLogs(req,res);

        default:{
            return res.status(200).json({ 'status':'failed','message':'Invalid Type'})
        }
    }
}

module.exports = app.listen(port, () => {
console.log(`App running on port ${port}.`)
})

/* TEMORARY HTTP POST USING JSON TEST */
//mock data of a client that will be inserted
const data = JSON.stringify({
  option : 'insert',
  name: 'Peter',
  surname: '',
  email: 'peter.griff@familymail.com',
  phonenumber: '5550112',
  address: '31 Spooner Street'
})

const data2 = JSON.stringify({
  option : 'getEmail',
  clientId: "1"
})

const options = {
  hostname : "localhost",
  port : 3000,
  path : "/",
  method : "POST",
  headers : {
      'Content-Type': 'application/json',
      'Content-Length': data.length
  }
}
