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

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors());//Middleware for CORS 
//Setup connect to postgres database(must exist) and create table if does not exist
dbsetup.psqlSetup();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/Web/index.html'));
});

app.post('/', (req, res) => {
  var data = req.body;
  console.log(data);
  var feedback = formatContent(req,res);
})



function formatContent(req,res)
{
    switch(req.body.option)
    {
        case "getUsers"://works
        return db.getUsers(req,res);

        case "getUserById"://works
        return db.getUserById(req,res);

        case "getActive"://works
        return db.getActive(req,res);

        case "getEmail"://does not work
        return db.FindEmail(req,res);

        case "insert"://works
        return db.insert(req,res);

        case "delete"://works 
        return db.deleteUser(req,res);

        case "updateEmail"://works 
        return db.UpdateEmail(req,res);

        case "updatePhone"://works
        return db.UpdatePhoneNumber(req,res);

        case "updateAddress"://works
        return db.UpdateAddress(req,res);

        case "reactivate"://???
        return db.Reactivate(req,res);

        case "deactivate"://???
        return db.Deactivate(req,res);


        default:{
            return res.status(200).json({ 'status':'failed','message':'Invalid Type'})
        }
    }
}

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


/* TEMORARY HTTP POST USING JSON TEST */

const data = JSON.stringify({
  option : 'insert',
  name: 'Peter',
  surname: 'Griffin',
  email: 'peter.griff@familymail.com',
  phonenumber: '5550112',
  address: '31 Spooner Street'
})

const data2 = JSON.stringify({
  option : 'getEmail',
  clientid: "1"
})

const options = {
  hostname : "localhost",
  port : 3000,
  path : "/",
  method : "POST",
  headers : {
      'Content-Type': 'application/json',
      'Content-Length': data2.length
  }
}

http.request(options, (res) =>{
  res.on('data', (chunk) => {
    console.log(`Response Body: ${chunk}`);
  });
}).write(data2);

