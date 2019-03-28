# COS301-Phase3

## API Documentation

### Integration 


| Endpoint  | API              | Method 	| Parameters  | Response   | 
|:--------: |:------------     | :--:  	  | -------------|----------|
| /         |Add New Client    | POST   	| option: string <br/> name: string <br/> surname: string <br/> email: string <br/> phoneNumber:  string <br/> address: string <br/> | email: string <br> name: string <br> surname: string |
|           |Deactivate Client | POST     | option: string <br/> clientId: string | status: integer <br> message: string  |
|           |Reactivate Client | POST   	| option: string <br/> clientId: string | status: integer <br> message: string  |
