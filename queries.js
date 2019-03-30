const Pool = require('pg').Pool
const csv=require('csvtojson')
var http = require('http')


//Heroku connection url
//const conn = process.env.DATABASE_URL || pool?;

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'cis_data', //cis_data
  password: 'password',
  port: 5432,
})

const pool2 = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'cis_data', //cis_data
  password: 'password',
  port: 5432,
})

//working
const getUsers = (request, response) => {
  pool.query('SELECT * FROM client ORDER BY ClientID ASC', (error, results) => {
    if (error) {
      response.status(500).json({"status":"failed","message":"query not executed"});
    }
    response.status(200).json(results.rows)
  })
}

//works returns json object
const getUserById = (request, response) => {
  if(request.body.clientId)
  {
    const id = parseInt(request.body.clientId)

    pool.query('SELECT * FROM client WHERE clientid = $1', [id], (error, results) => {
      if (error) {
        response.status(500).json({"status":"failed","message":"query not executed or invalid clientId"});
      }
      response.status(200).json(results.rows)
    })
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }
}

const getActive = (request, response) => {
  if(request.body.clientId)
  {
    const id = parseInt(request.body.clientId)

    pool.query('SELECT active FROM client WHERE clientid = $1', [id], (error, results) => {
      if (error) {
        response.status(500).json({"status":"failed","message":"query not executed or invalid clientId"});
      }
      response.status(200).json({"status":"success","data":results.rows[0].active});
    })
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }

}

//header params??
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        response.status(500).json({"status":"failed","message":"query not executed or invalid fields"});
      }
      response.status(200).json({"status":"success","message":`successfully updated user: ${id}`})
    }
  )
}


//works on a post reguest
const deleteUser = (request, response) => {
  if(request.body.clientId)
  {
    const id = parseInt(request.body.clientId)

    pool.query('DELETE FROM client WHERE clientid = $1', [id], (error, results) => {
      if (error) {
        response.status(500).json({"status":"failed","message":"deletion not executed or invalid clientId"});
      }
      response.status(200).json({"status":"success","message":`successfully deleted user: ${id}`})
    })
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }
}

//Insert working on post request;
const insert = (request,response) => {
  if(request.body.name && request.body.surname && request.body.email && request.body.phonenumber && request.body.address)
  {
    const uName=request.body.name;
    const uSurname = request.body.surname;
    const uEmail = request.body.email;
    const uPhoneNumber = request.body.phonenumber;
    const uAddress = request.body.address;
  
    const insertQuery = 'INSERT INTO client("name","surname","email","phonenumber","address","active") VALUES($1, $2, $3, $4, $5, $6)';
    pool.query(insertQuery,[uName,uSurname,uEmail,uPhoneNumber,uAddress,'True'], (err,res) => {
      if(err){
          response.status(500).json({"status":"failed","message":"unsuccessful insert"});
      }else{
        response.status(200).json({"status":"success","message":"successfully inserted"});
      }
    })
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid or missing field(s)"});
  } 

}
//Working
const Deactivate = (request,response) =>{
  if(request.body.clientId != null)
  {
    const id = parseInt(request.body.clientId)
    const deactivateQuery='UPDATE client SET active= \'false\'  WHERE clientid = $1';
    pool.query(deactivateQuery,[id],(err,res)=> {
      if(res.rowCount < 1 || err){
        response.status(200).json({"status":"false","message":"unsuccessful"});
      }else{
        response.status(200).json({"status":"True","message":"successfully Deactivated"});
      }
    })
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }
}
//Working
const Reactivate =(request,response) =>{
  if(request.body.clientId != null)
  {
    const id = parseInt(request.body.clientId);
    const reactivateQuery='UPDATE client SET active = \'true\'  WHERE clientid = $1';
    pool.query(reactivateQuery,[id],(err,res) =>{
      if(res.rowCount < 1 || err){
        response.status(200).json({"status":"false","message":"unseccessfull"});
      }else{
        //console.log(res) 
        notifyNFC(id);
        response.status(200).json({"status":"True","message":"successfully Reactivated"});
      }
    })
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }
}
//
const FindEmail = (request,response) =>{
  if(request.body.clientId)
  {
    const id = parseInt(request.body.clientId)
    const findemailQuery='SELECT email, name, surname FROM client WHERE clientid = $1';
    pool.query(findemailQuery,[id],(err,res) =>{
      if(err)
      {
        response.status(500).json({"status":"failed","message":"query not executed or invalid clientId"});
      }
      
      if(res.rows[0])
        response.status(200).json({"email": res.rows[0].email, "name":res.rows[0].name, "surname":res.rows[0].surname});
      else
        response.status(200).json({'status':'failed','message':'id does not exist'});
      
    })
  }
  else
  {
    console.log(request.body.clientId);
    response.status(200).json({"status":"failed","message":"invalid clientId"});
  }

}
//works on post request( bug that alters position in table,does not change ID though)
const UpdateEmail = (request,response) =>{
  if(request.body.clientId && request.body.email)
  {
    const id = parseInt(request.body.clientId);
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
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId or missing email"});
  }
}
//Works
const UpdatePhoneNumber = (request,response) =>{
  if(request.body.clientId && request.body.phone)
  {
  const id = parseInt(request.body.clientId);
  const uPhoneNumber = parseInt(request.body.phone);
  const updatephonenumberQuery='UPDATE client SET phonenumber = $1  WHERE clientid = $2';
  pool.query(updatephonenumberQuery,[uPhoneNumber,id],(err,res)=>{
    if(err){
      response.status(500).json({"status":"failed","message":"update not executed or invalid field(s)"});
    }else{
      response.status(200).json({"status":"success","message":`PhoneNumber of ClientID: ${id} updated`})
    }
  })
  }
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId or missing phone number"});
  }

}
//Works
const UpdateAddress = (request,response) =>{
  if(request.body.clientId && request.body.address)
  {
    const id = parseInt(request.body.clientId);
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
  else
  {
    response.status(200).json({"status":"failed","message":"invalid clientId or missing address"});
  }
}









const insertCSV = (request,response)=>{ 

const csvFilePath='./test.csv'
		csv()
		.fromFile(csvFilePath)
		.then((jsonObj)=>{
		   //console.log();
	for(i in jsonObj)
	{
  	 uName=jsonObj[i].name;
	 uSurname = jsonObj[i].surname;
	 uEmail = jsonObj[i].email;
	 uPhoneNumber = jsonObj[i].phonenumber;
	 uAddress = jsonObj[i].address;
 

  const insertQuery = 'INSERT INTO client("name","surname","email","phonenumber","address","active") VALUES($1, $2, $3, $4, $5, $6)';
  pool2.query(insertQuery,[uName,uSurname,uEmail,uPhoneNumber,uAddress,'True'])
}
})
		console.log("successfull upload")
		response.status(200).json({"status":"success","message":"successfully inserted"});
} 

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
 pool2.query(insertQuery,[uName,uSurname,uEmail,uPhoneNumber,uAddress,'True'])
}
})
   console.log("successfull upload")
   response.status(200).json({"status":"success","message":"successfully inserted"});
  }
  
}










function notifyNFC(id)
{

   var url= 'https://merlot-card-authentication.herokuapp.com';
  const data = JSON.stringify({
  clientID: id
});

const options = {
  hostname : "https://merlot-card-authentication.herokuapp.com",
  port : 3000,
  path : "/createCard",
  method : "POST",
  headers : {
      'Content-Type': 'application/json',
      'Content-Length': data.length
  }
}

http.request(options, (res) =>{
  res.on('data', (chunk) => {
    console.log(`Response Body: ${chunk}`);
  })
}).write(data);
console.log(data)
}

module.exports = {
  getUsers,
  insertCSV,
  insertCSVfilepath,	
  getUserById,
  updateUser,
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
