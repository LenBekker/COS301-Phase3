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
    5 | exit
    
not yet implemented
    6 | update
    7 | log
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
        
* Update:
    
    * [Input]
    
            placeholder
        or
        
            placeholder
        > Does something
        
* Log:

    * [Input]
    
            placeholder2
        or
        
            placeholder2
        > Does something else
