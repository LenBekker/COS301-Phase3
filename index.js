const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbsetup = require('./dbSetup.js')
const db = require('./queries.js')
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//Setup connect to postgres database(must exist) and create table if does not exist
dbsetup.psqlSetup();

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
