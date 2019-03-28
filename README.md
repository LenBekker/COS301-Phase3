# COS301-Phase3

## API Documentation


| Endpoint  | API              | Method 	|Option Parameter| Parameters  | Response   | 
|:--------: |:------------     | :--:  	  | -------------|-------------|----------|
| /         |Add New Client    | POST   	| insert     |option: string <br/> name: string <br/> surname: string <br/> email: string <br/> phoneNumber:  string <br/> address: string <br/> | email: string <br> name: string <br> surname: string |
|           |Deactivate Client | POST     | deactivate |option: string <br/> clientId: string | status: integer <br> message: string  |
|           |Reactivate Client | POST   	| reactivate|option: string <br/> clientId: string | status: integer <br> message: string  |

### Example Usage

Add New Client Request
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

```


