const Pool = require('pg').Pool

//Heroku connection url
//const conn = process.env.DATABASE_URL || pool?;

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'clientinfo',
  password: 'password',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
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
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
const insert = (request,response) => {
  const uName=request.query['"Name"']
  const uSurname = request.query['"Surname"']
  const uEmail = request.query['"Email"']
  const uPhoneNumber = request.query['"PhoneNumber"']
  const uAddress = request.query['"Address"']
 
  const insertQuery = 'INSERT INTO clients("Name","Surname","Email","PhoneNumber","Address","Active") VALUES($1, $2, $3, $4, $5, $6)';
  pool.query(insertQuery,[uName,uSurname,uEmail,uPhoneNumber,uAddress,'True'], (err,res) => {
    if(err){
        throw err
    }else{
           response.status(200).send();
    }
}) 

}

const Deactivate = (request,response) =>{
  const id = parseInt(request.query['"ClientID"'])
  const deactivateQuery='UPDATE clients SET "Active"= \'False\'  WHERE ClientID = $1';
  pool.query(deactivateQuery,[id],(err,res)=> {
    if(err){
      throw err
    }else{
      response.status(200).send(`ClientID: ${id} deactivated`);
    }
  })
}

const Reactivate =(request,response) =>{
  const id = parseInt(request.query['"ClientID"']);
  const reactivateQuery='UPDATE clients SET "Active"= \'True\'  WHERE ClientID = $1';
  pool.query(reactivateQuery,[id],(err,res) =>{
    if(err){
      throw err
    }else{
      response.status(200).send(`ClientId: ${id} reactivated`);
    }
  })
}

const FindEmail = (request,response) =>{
  const id = parseInt(request.query['"ClientID"']);
  const findemailQuery='SELECT "Email" FROM clients WHERE ClientID = $1';
  pool.query(findemailQuery,[id],(err,res) =>{
    if(err){
      throw err
    }else{
      response.status(200).json(res.rows)
    }
  })

}

const UpdateEmail = (request,response) =>{

  const id = parseInt(request.query['"ClientID"']);
  const uEmail = request.query['"Email"'];
  const updateemailQuery='UPDATE clients SET "Email"= $1  WHERE ClientID = $2';
  pool.query(updateemailQuery,[uEmail,id],(err,res)=>{
    if(err){
      throw err
    }else{
      response.status(200).send(`Email of ClientID: ${id} updated`)
    }
})
}

const UpdatePhoneNumber = (request,response) =>{
  const id = parseInt(request.query['"ClientID"']);
  const uPhoneNumber = request.query['"PhoneNumber"'];
  const updatephonenumberQuery='UPDATE clients SET "PhoneNumber"= $1  WHERE ClientID = $2';
  pool.query(updatephonenumberQuery,[uPhoneNumber,id],(err,res)=>{
    if(err){
      throw err
    }else{
      response.status(200).send(`PhoneNumber of ClientID: ${id} updated`)
    }
})
}

const UpdateAddress = (request,response) =>{
  const id = parseInt(request.query['"ClientID"']);
  const uAddress = request.query['"Address"'];
  const updateaddressQuery='UPDATE clients SET "Address"= $1  WHERE ClientID = $2';
  
  pool.query(updateaddressQuery,[uAddress,id],(err,res)=>{
      if(err){
        throw err
      }else{
        response.status(200).send(`Address of ClientID: ${id} updated`)
      }
  })
}







module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  insert,
  Deactivate,
  Reactivate,
  FindEmail,
  UpdateEmail,
  UpdatePhoneNumber,
  UpdateAddress,


}

