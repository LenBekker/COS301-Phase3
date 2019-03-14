The server can execute CRUD operations but also serves as an API for other modules to use.

**Prerequisites**
* Nodejs v10.15.3 https://nodejs.org/en/download/

**Install:**
```
    npm ci
```

**Test:**
```
    npm test
```

**Run:**
```
    npm start
```


**Commands:**
```
    1 | add
    2 | del
    3 | search
    4 | list
    5 | updateEmail
    6 | updatePassword
    7 | list
    8 | Exit
```

**Example Command #**
    
* Inserts [Name, Surname, E-mail, Password]:
    
    * [Input]  
    
            1 Pete Smith P.Smith@gmail.com p@ssWorD1979
        or
        
            add Pete Smith P.Smith@gmail.com p@ssWorD1979
        > Inserts Pete into table.
    
* Delete [userId]:

    * [Input] 

            2 754
        or
                                    
            del 754
        > Deletes row where UserId == 754
    
* Search [userId]:
    
    * [Input] 
            
            3 753
        or
          
            search 753
        > Returns row where UserId == 754
    
* List:
    
    * [Input]
    
            4
        or
        
            list
        > Returns all rows
        
 * UpdateEmail [E-mail,userId]:
 
    * [Input]
        5  P.Smithnew@gmail.com 1
        or 
        
            updateEmail P.Smithnew@gmail.com 1
        
         > updates pete old email to new email address


 * UpdatePassword [Password,userId]:
 
    * [Input]
    
             5  newPasfdrre^$%6 1
        
        or 
                
                updatePassword P.Smithnew@gmail.com 1
                
         > updates pete old passwod to new password
         
         
 * List:
    
    * [Input]
    
            7
        or
        
            listDeleted
        > Returns all deleted rows        
