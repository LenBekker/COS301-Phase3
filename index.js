const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries.js')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


try {
      
      app.post('/users', db.insert);
      app.put('/users/deactivate',db.Deactivate);
      app.put('/users/reactivate',db.Reactivate);
      app.put('/users/updateemail',db.UpdateEmail);
      app.put('/users/updateaddress',db.UpdateAddress);
      app.put('/users/updatephonenumber',db.UpdatePhoneNumber);
      app.get('users/findemail',db.FindEmail);//need to fix this function
}catch(msg) {
console.log("Ignored");
}

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
