<br>

## API Documentation

  ```CIS_URL = ``` https://merlotcisg7.herokuapp.com/

| Endpoint  | API              | Method 	|Option Parameter| Parameters  | Response   | 
|:--------: |:------------     | :--:  	  | ----------- |-------------|----------|
| /         |Add New Client    | POST   	| insert      |option: string <br/> name: string <br/> surname: string <br/> email: string <br/> phoneNumber:  string <br/> address: string <br/>| status: string <br> message: string |
|           |Deactivate Client | POST     | deactivate  |option: string <br/> clientId: string | status: string <br> message: string|
|           |Reactivate Client | POST   	| reactivate  |option: string <br/> clientId: string | status: string <br> message: string  |
|           |Get Email         | POST   	| getEmail    |option: string <br/> clientId: string | email: string <br> name: string <br> surname: string  |

### Example Usage

REQUEST: Add New Client

  ```javascript 
    var http = require('http');

    const data = JSON.stringify({
      option : 'insert',
      name: 'Peter',
      surname: 'Griffin',
      email: 'peter.griff@familymail.com',
      phonenumber: '5550112',
      address: '31 Spooner Street'
    })

    const options = {
      hostname : CIS_URL,
      port : CIS_PORT,
      path : "/",
      method : "POST",
      headers : {
          'Content-Type': 'application/json',
          'Content-Length': data.length
      }
    }

    http.request(options, (res) =>{
      res.on('data', (chunk) => {
        console.log(`Response Body: ${chunk}`);
      });
    }).write(data);
  ```

  RESPONSE: Add New Client 
      
    * Successful
  ```javascript
    {
      "status":"success",
      "message":"successfully inserted"
    }
  ```

    * Failed
  ```javascript
    {
      "status":"failed",
      "message":"invalid or missing field(s)" || "message":"unsuccessful insert"
    }
  ```

  REQUEST: Get Email
  ```javascript
    var http = require('http');
    
    const data = JSON.stringify({
      option : 'getEmail',
      clientid: "1"
    })

    const options = {
      hostname : CIS_URL,
      port : CIS_PORT,
      path : "/",
      method : "POST",
      headers : {
          'Content-Type': 'application/json',
          'Content-Length': data.length
      }
    }

    http.request(options, (res) =>{
      res.on('data', (chunk) => {
        console.log(`Response Body: ${chunk}`);
      });
    }).write(data);
  ```

  RESPONSE: Get Email    

    * Successful
  ```javascript
    {
      "email": "peter.griff@fgmail.com",
      "name": "Peter",
      "surname": "Griffin"
    }
  ```

    * Failed
  ```javascript
    {
      "status":"failed",
      "message":"id does not exist"
    }
  ```
