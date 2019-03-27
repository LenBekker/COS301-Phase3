Implementation(s) to test server API calls
* Static Web Page
  * Open index.html
* REST testing with postman https://www.getpostman.com/downloads/
* WIP implementation 3 eg. Java Interface

**Requirements:**
  * Running NodeJS server locally on port 8080
  * OR using herokuapp at https://merlotcisg7.herokuapp.com/
   
**API Services**
  * Give userID get E-mail/Password
    * POST to url http://serverURI/api/user (eg. http://localhost:8080/api/user) with request body
      
      (As below, value1 is the userId and value2 = {1 for Get E-Mail, 2 for Get Password})
      >userId=value1&option=value2
  
  * Sync user-list
    * Spec changed after demo. Reimplementation required.
