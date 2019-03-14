The server can execute CRUD operations but also serves as an API for other modules to use.

**Prerequisites**
* Nodejs v10.15.3 https://nodejs.org/en/download/
* (Might need to explicitly install sqlite3 and express from npm?)

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
    1) Insert
    2) Delete
    3) Search
    4) List
    5) Exit
```

**Example Command #**
    
* Insert [userId, Name, Surname, E-mail, Password]:
    
    * [Input]  
    
            1 Pete Smith P.Smith@gmail.com p@ssWorD1979
        > Inserts Pete into table.
    
* Delete [userId]:

    * [Input] 

            2 754
        > Deletes row where UserId == 754
    
* Search [userId]:
    
    * [Input] 
            
            3 753
        > Returns row where UserId == 754
    
* List:
    
    * [Input]
    
            4
        > Returns all rows
