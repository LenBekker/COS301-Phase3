const Pool = require('pg').Pool

//Heroku connection url
//const conn = process.env.DATABASE_URL || pool?;

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'clientinfo', //cis_data
  password: 'password',
  port: 5432,
})

//working
const getUsers = (request, response) => {
  pool.query('SELECT * FROM client ORDER BY ClientID ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//works returns json object
const getUserById = (request, response) => {
  const id = parseInt(request.body.clientid)

  pool.query('SELECT * FROM client WHERE clientid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getActive = (request, response) => {
  const id = parseInt(request.body.clientid)

  pool.query('SELECT active FROM client WHERE clientid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({"status":"success","data":results.rows[0].active});
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({"status":"success","message":`successfully updated user: ${id}`})
    }
  )
}
//works on a post reguest
const deleteUser = (request, response) => {
  const id = parseInt(request.body.clientid)

  pool.query('DELETE FROM client WHERE clientid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({"status":"success","message":`successfully deleted user: ${id}`})
  })
}

//Insert working on post request;
const insert = (request,response) => {
  const uName=request.body.name;
  const uSurname = request.body.surname;
  const uEmail = request.body.email;
  const uPhoneNumber = request.body.phonenumber;
  const uAddress = request.body.address;
 
  const insertQuery = 'INSERT INTO client("name","surname","email","phonenumber","address","active") VALUES($1, $2, $3, $4, $5, $6)';
  pool.query(insertQuery,[uName,uSurname,uEmail,uPhoneNumber,uAddress,'True'], (err,res) => {
    if(err){
        throw err
    }else{
      response.status(200).json({"status":"success","message":"successfully inserted"});
    }
}) 

}
//Working
const Deactivate = (request,response) =>{
  const id = parseInt(request.body.clientid)
  const deactivateQuery='UPDATE client SET active= \'false\'  WHERE clientid = $1';
  pool.query(deactivateQuery,[id],(err,res)=> {
    if(err){
      throw err
    }else{
      response.status(200).json({"status":"success","message":"successfully Deactivated"});
    }
  })
}
//Working
const Reactivate =(request,response) =>{
  const id = parseInt(request.body.clientid);
  const reactivateQuery='UPDATE client SET active = \'true\'  WHERE clientid = $1';
  pool.query(reactivateQuery,[id],(err,res) =>{
    if(err){
      throw err
    }else{
      response.status(200).json({"status":"success","message":"successfully Reactivated"});
    }
  })
}
//not working??????
const FindEmail = (request,response) =>{
  const id = parseInt(request.body.clientid)
  const findemailQuery='SELECT email, name, surname FROM client WHERE clientid = $1';
  pool.query(findemailQuery,[id],(err,res) =>{
    if(err)
    {
      throw err
    }
    if(res.rows[0])
      response.status(200).json({"email": res.rows[0].email, "name":res.rows[0].name, "surname":res.rows[0].surname});
    else
      response.status(200).json({'status':'failed','message':'id does not exist'});

  })

}
//works on post request( bug that alters position in table,does not change ID though)
const UpdateEmail = (request,response) =>{

  const id = parseInt(request.body.clientid);
  const uEmail = request.body.email;
  const updateemailQuery='UPDATE client SET email = $1  WHERE clientid = $2';
  pool.query(updateemailQuery,[uEmail,id],(err,res)=>{
    if(err){
      throw err
    }else{
      response.status(200).json({"status":"success","message":`Email of ClientID: ${id} updated`})
    }
})
}
//Works
const UpdatePhoneNumber = (request,response) =>{
  const id = parseInt(request.body.clientid);
  const uPhoneNumber = parseInt(request.body.phone);
  const updatephonenumberQuery='UPDATE client SET phonenumber = $1  WHERE clientid = $2';
  pool.query(updatephonenumberQuery,[uPhoneNumber,id],(err,res)=>{
    if(err){
      throw err
    }else{
      response.status(200).json({"status":"success","message":`PhoneNumber of ClientID: ${id} updated`})
    }
})
}
//Works
const UpdateAddress = (request,response) =>{
  const id = parseInt(request.body.clientid);
  const uAddress = request.body.address;
  const updateaddressQuery='UPDATE client SET address = $1  WHERE clientid = $2';
  
  pool.query(updateaddressQuery,[uAddress,id],(err,res)=>{
      if(err){
        throw err
      }else{
        response.status(200).json({"status":"success","message":`Address of ClientID: ${id} updated`})
      }
  })
}


module.exports = {
  getUsers,
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

