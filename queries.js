//ALL RESPONSES ARE JSON OBJECTS, OR JSON ARRAYS OF OBJECTS
const promise = require('bluebird'); // or any other Promise/A+ compatible library;

const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(initOptions);
// See also: http://vitaly-t.github.io/pg-promise/module-pg-promise.html

var db1;

if(process.env.DATABASE_URL)
{
  //On Heroku
  const cnheroku = process.env.DATABASE_URL; // + "?ssl=true"; 
  db1 = pgp(cnheroku); // database instance;
}
else
{
  //Heroku Manually
  const cnheroku = "postgres://dfobpdvebyywwn:4a99ec66f412b864f66b0d4dec1df6e06ca52ea61ccf70b14a70087f87b04192@ec2-54-228-252-67.eu-west-1.compute.amazonaws.com:5432/d9g7uhfunct4ve" + "?ssl=true";

  // Local Database connection details;
  const cn = {
    host  :'localhost',
    //host: 'https://merlotcisg7.herokuapp.com', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'clientinfo',
    user: 'me',
    password: 'password'
    //,ssl: 'true'
  };

  db1 = pgp(cn); // database instance;
}


//const db1 = pgp('postgres://me:password@localhost:5432/clientinfo?ssl=true');


const Pool = require('pg').Pool
const csv=require('csvtojson')
var http = require('http')


//connecting to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://me:password@localhost:5432/clientinfo"
})

//returns all users in the database
const getUsers = (request, response) => {
  pool.query('SELECT * FROM client ORDER BY ClientID ASC', (error, results) => {
    if (error) {
      response.status(500).json({"status":"failed","message":"query not executed"});
    }
    response.status(200).json(results.rows)
  })
}

//Returns the user specified by the ID if valid
const getUserById = (request, response) => {
  if(request.body.clientId)
  {
    const id = parseInt(request.body.clientId);
    if (isNaN(id))
    {
      response.status(200).json({'status':'failed','message':'id is NaN'});    
    }
    else
    {
      pool.query('SELECT * FROM client WHERE clientid = $1', [id], (error, results) => {
        if (error) {
          response.status(500).json({"status":"failed","message":"query not executed or invalid clientId"});
        }
        response.status(200).json(results.rows)
      })
    }
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }
}

//Return the user status Active -True/False
const getActive = (request, response) => {
  if(request.body.clientId)
  {
    const id = parseInt(request.body.clientId);
    if (isNaN(id))
    {
      response.status(200).json({'status':'failed','message':'id is NaN'});    
    }
    else
    {
      pool.query('SELECT active FROM client WHERE clientid = $1', [id], (error, results) => {
        if (error) {
          response.status(500).json({"status":"failed","message":"query not executed or invalid clientId"});
        }
        if(results.rows[0])
          response.status(200).json({"status":"success","data":results.rows[0].active});
        else
          response.status(200).json({'status':'failed','message':'id does not exist'});
      })
    }
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }
}

//Deletes a user from the client table given the clientId
const deleteUser = (request, response) => {
  if(request.body.clientId)
  {
    const id = parseInt(request.body.clientId);
    if (isNaN(id))
    {
      response.status(200).json({'status':'failed','message':'id is NaN'});    
    }
    else
    {
      clearLogs();
      pool.query('DELETE FROM client WHERE clientid = $1', [id], (error, results) => {
        if (error) {
          response.status(500).json({"status":"failed","message":"deletion not executed or invalid clientId"});
        }
        response.status(200).json({"status":"success","message":`successfully deleted user: ${id}`})
      })
    }
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }
}

//Inserts a user into the database
const insert = (request,response) => {

  clearLogs();
  if(request.body.name && request.body.surname && request.body.email && request.body.phonenumber && request.body.address)
  {
    const uName=request.body.name;
    const uSurname = request.body.surname;
    const uEmail = request.body.email;
    const uPhoneNumber = request.body.phonenumber;
    const uAddress = request.body.address;
  
    const insertQuery = 'INSERT INTO client("name","surname","email","phonenumber","address","active") VALUES($1, $2, $3, $4, $5, $6) returning clientid';
    pool.query(insertQuery,[uName,uSurname,uEmail,uPhoneNumber,uAddress,'True'], (err,res) => {
      if(err){
          response.status(500).json({"status":"failed","message":"unsuccessful insert"});
      }else{
        //console.log(res.rows[0].clientid)
        notifyCASCreate(res.rows[0].clientid)
        notifyNFCCreate(res.rows[0].clientid)
        notifyFRCreate(res.rows[0].clientid)
        response.status(200).json({"status":"success","message":"successfully inserted"});
      }
    })
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid or missing field(s)"});
  } 

}

//Deactivates the status of a user from true to false.
//Mark/store the user as suspended
//WIll also notify Subsystems to cancel a user account/card
const Deactivate = (request,response) =>{
  clearLogs();
  if(request.body.clientId != null)
  {
    const id = parseInt(request.body.clientId);
    if (isNaN(id))
    {
      response.status(200).json({'status':'failed','message':'id is NaN'});    
    }
    else
    {
      const deactivateQuery='UPDATE client SET active= \'false\'  WHERE clientid = $1';
      pool.query(deactivateQuery,[id],(err,res)=> {
        if(err || res.rowCount < 1){
          response.status(200).json({"status":"false","message":"unsuccessful"});
        }else{
          response.status(200).json({"status":"True","message":"successfully Deactivated"});
          notifyNFCCancel(id)
          notifyFRDelete(id)
          notifyCASDelete(id)
        }
      })
    }
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }
}


//Reactivates the status of a user from false to true.
//Mark/store the user as active
//WIll also notify Subsystems to create a user account/card
const Reactivate =(request,response) =>{
  clearLogs();
  if(request.body.clientId)
  {
    const id = parseInt(request.body.clientId);
    if (isNaN(id))
    {
      response.status(200).json({'status':'failed','message':'id is NaN'});    
    }
    else
    {
      const reactivateQuery='UPDATE client SET active = \'true\'  WHERE clientid = $1';
      pool.query(reactivateQuery,[id],(err,res) =>{
        if(err || res.rowCount < 1){
          response.status(200).json({"status":"false","message":"unsuccessful"});
        }else{
          response.status(200).json({"status":"True","message":"successfully Reactivated"});
           notifyCASCreate(id)
          notifyNFCCreate(id)
          notifyFRCreate(id)
        }
      })
    }
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }
}

//Return the email Address along with the name and surname of a user
//Returning the name and surname for the subsystem
const FindEmail = (request,response) =>{
  clearLogs();
  try{
  if(request.body.clientId)
  {
    const id = parseInt(request.body.clientId);
    if (isNaN(id))
    {
      response.status(200).json({'status':'failed','message':'id is NaN'});    
    }
    else
    {
      const findemailQuery='SELECT email, name, surname FROM client WHERE clientid = $1';
      pool.query(findemailQuery,[id],(err,res) =>{
        if(err)
        {
          response.status(500).json({"status":"failed","message":"query not executed or invalid clientId"});
        }
        if(res.rows[0])
        {
          response.status(200).json({"email": res.rows[0].email, "name":res.rows[0].name, "surname":res.rows[0].surname});
        }
        else
          response.status(200).json({'status':'failed','message':'id does not exist'});      
      })
    }
  }
  else
  {
    //console.log(request.body.clientId);
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }
 } catch (err){
    response.json({'message':'stop breaking my server'});
 } 
}

//Changes/Updates the email of a client based on client ID
const UpdateEmail = (request,response) =>{
  clearLogs();
  if(request.body.clientId && request.body.email)
  {
    const id = parseInt(request.body.clientId);
    if (isNaN(id))
    {
      response.status(200).json({'status':'failed','message':'id is NaN'});    
    }
    else
    {
      const uEmail = request.body.email;
      const updateemailQuery='UPDATE client SET email = $1  WHERE clientid = $2';
      pool.query(updateemailQuery,[uEmail,id],(err,res)=>{
        if(err){
          response.status(500).json({"status":"failed","message":"update not executed or invalid field(s)"});
        }else{
          response.status(200).json({"status":"success","message":`Email of ClientID: ${id} updated`})
        }
      })
    }
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId or missing email"});
  }
}

//Updates the phone number of a user given a clientID
const UpdatePhoneNumber = (request,response) =>{
  clearLogs();
  if(request.body.clientId && request.body.phone)
  {
    const id = parseInt(request.body.clientId);
    if (isNaN(id))
    {
      response.status(200).json({'status':'failed','message':'id is NaN'});    
    }
    else
    {
      const uPhoneNumber = request.body.phone;
      const updatephonenumberQuery='UPDATE client SET phonenumber = $1  WHERE clientid = $2';
      pool.query(updatephonenumberQuery,[uPhoneNumber,id],(err,res)=>{
        if(err){
          response.status(500).json({"status":"failed","message":"update not executed or invalid field(s)"});
        }else{
          response.status(200).json({"status":"success","message":`PhoneNumber of ClientID: ${id} updated`})
        }
      })
    }
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId or missing phone number"});
  }

}


//Updates the address of the client
const UpdateAddress = (request,response) =>{
  clearLogs();
  if(request.body.clientId && request.body.address)
  {
    const id = parseInt(request.body.clientId);
    if (isNaN(id))
    {
      response.status(200).json({'status':'failed','message':'id is NaN'});    
    }
    else
    {
      const uAddress = request.body.address;
      const updateaddressQuery='UPDATE client SET address = $1  WHERE clientid = $2';
      
      pool.query(updateaddressQuery,[uAddress,id],(err,res)=>{
          if(err){
            response.status(500).json({"status":"failed","message":"update not executed or invalid field(s)"});
          }else{
            response.status(200).json({"status":"success","message":`Address of ClientID: ${id} updated`})
          }
      })
    }
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId or missing address"});
  }
}


//inserts a file of users using a CSV file
//from a host directory (could be used for backups)
const insertCSVfilepath= (request,response)=>{

  if(request.body.filepath){
    const csvFilePath = request.body.filepath;

    csv().fromFile(csvFilePath).then((jsonObj)=>{
      //console.log();
    for(i in jsonObj)
    {
      uName=jsonObj[i].name;
      uSurname = jsonObj[i].surname;
      uEmail = jsonObj[i].email;
      uPhoneNumber = jsonObj[i].phonenumber;
      uAddress = jsonObj[i].address;


    const insertQuery = 'INSERT INTO client("name","surname","email","phonenumber","address","active") VALUES($1, $2, $3, $4, $5, $6)';
    db1.query(insertQuery,[uName,uSurname,uEmail,uPhoneNumber,uAddress,'True'])
        .catch(error => {
        console.log('ERROR:', error);
        });
    }
  });

   console.log("successfull upload")
   response.status(200).json({"status":"success","message":"successfully inserted"});
  }
  
}

//EXTERNAL SERVICE  to notify subsystem NFC to cancel card
function notifyNFCCancel(id)
{

      var url= 'merlot-card-authentication.herokuapp.com';
      var data = {
        "clientID" : id
      }

      const options = {
        hostname : url,
       // port : 3000,
        path: '/cancelCard',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      }
    }
      
    var req = http.request(options, function(res) {
     // console.log('Status: ' + res.statusCode);
      //console.log('Headers: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (body) {
      //  console.log('Cancel card response: ' + body);
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(JSON.stringify(data));
    req.end();

};

//EXTERNAL SERVICE  to notify subsystem NFC to create/
function notifyNFCCreate(id)
{

      var url= 'merlot-card-authentication.herokuapp.com';
      var data = {
        "clientID" : id
      }

      const options = {
        hostname : url,
       // port : 3000,
        path: '/createCard',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      }
    }   
      
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (body) {
       // console.log('Create card response: ' + body);
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(JSON.stringify(data));
    req.end();

};

function notifyFRCreate(id)
{

      var url= 'merlot-facial-recognition.herokuapp.com';
      var data = {
              "clientID": id,
              "Message": "New client created"
}

      const options = {
        hostname : url,
       // port : 3000,
        path: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      }
    }   
      
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (body) {
       // console.log('Create card response: ' + body);
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(JSON.stringify(data));
    req.end();

};

function notifyFRDelete(id)
{

      var url= 'merlot-facial-recognition.herokuapp.com';
      var data = {
        "clientID": id,
        "Message": "Client deactivated"
      }

      const options = {
        hostname : url,
       // port : 3000,
        path: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      }
    }   
      
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (body) {
       // console.log('Create card response: ' + body);
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(JSON.stringify(data));
    req.end();

};

function notifyCASDelete(id)
{

      var url= 'enigmatic-tundra-96709.herokuapp.com';
      var data = {
        "clientID": id,
        "Message": "Client deactivated"
      }

      const options = {
        hostname : url,
       // port : 3000,
        path: '/api/accounts/deleteUsers',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      }
    }   
      
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (body) {
      //  console.log('Create card response: ' + body);
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(JSON.stringify(data));
    req.end();

};

function notifyCASCreate(id)
{

      var url= 'enigmatic-tundra-96709.herokuapp.com';
      var data = {
         id
      }

      //console.log("JSON array:::")
      var obj = JSON.parse(id);
      //console.log(JSON.stringify(obj));
      const options = {
        hostname : url,
       // port : 3000,
        path: '/api/accounts/createUsers',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      }
    }   
      
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (body) {
       // console.log('Create client response: ' + body);
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(JSON.stringify(obj));
    req.end();

};

//Function to update logs on a number limit basis
//todo - send request to reporting system
//Still waiting on them
function clearLogs(){

  pool.query('DELETE from auditlog where clientID not in ( Select clientID from auditlog order by clientID desc limit 100)',(err,res)=>{
if (err) {
      console.log("something went wrong");
    }else
    {
  }
  })
}

//Function to update logs on a number limit basis
//todo - send request to reporting system
//Still waiting on them
const getLogs = (request,response)=> {
  pool.query('SELECT * FROM auditlog ORDER BY ClientID ASC', (error, results) => {
    if (error) {
      response.status(500).json({"status":"failed","message":"query not executed"});
    }else
    {
      notifyLogs(JSON.stringify(results.rows));
      response.json(results.rows);
  }
  //notifyLogs(JSON.stringify(results.rows));
  })
}

//Function to notify all the other subsystems about the AuditLogs.
function notifyLogs(result)
{
  //console.log("NotifyLogs")
  var request = require("request");
  var options = { method: 'POST',
  url: 'http://still-oasis-34724.herokuapp.com/uploadLog',
  headers: 
   { 'Postman-Token': '5d1436e7-228e-421b-bb71-5083dabb6b22',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { log_set: 
      { logs: result
      }
    },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  //console.log(body);
});

};
const syncSubSystems= (request,response)=>
{
  var array = {
      "userIds": []
  } ;


   for(var i = 1; i < 1000;i++)
  {
    array.userIds.push(i);
  }
  for(var i = 1; i < 1000;i++)
  {
    //array.push(i);
   notifyNFCCreate(i);
   notifyFRCreate(i);
    //notifyCASCreate(i);
  }
  //console.log(JSON.stringify(array));
    response.status(200).json({"status":"success","message":"Systems Synced"});
    //console.log(JSON.stringify(array))
    notifyCASCreate(JSON.stringify(array));
}



//Exporting modules to index.js to be used for API requests
//Both externally and internally
module.exports = {
  getUsers,
  syncSubSystems,
  getLogs,
  insertCSVfilepath,	
  getUserById,
  getActive,
  deleteUser,
  insert,
  Deactivate,
  Reactivate,
  FindEmail,
  UpdateEmail,
  UpdatePhoneNumber,
  UpdateAddress,
}
