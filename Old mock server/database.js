
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database/merlotInfoSys.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });


exports.insert = function(uName,uSurname,uEmail,uPass){
       db.run(`INSERT INTO Clients(Name,Surname,[E-mail],Password) VALUES(?,?,?,?)`, [uName,uSurname,uEmail,uPass], function(err) {
        if (err) {
                   return console.log(err.message);
                 }
         });
}

exports.remove = function(uID)  {
     db.run('CREATE TABLE IF NOT EXISTS Deleted (userId NVARCHAR(50) NOT NULL, Name NVARCHAR(50) NULL,Surname NVARCHAR(50) NULL,[E-mail] NVARCHAR(50) NULL,Password NVARCHAR(50) NULL)');
    let sql= `SELECT userId,Name,Surname,[E-mail],Password FROM Clients WHERE userId=?`;
    db.get(sql, [uID], (err, row) => {
       if (err) {
      return console.error(err.message);
      }
        db.run(`INSERT INTO Deleted(userId,Name,Surname,[E-mail],Password) VALUES(?,?,?,?,?)`, [row.userId,row.Name,row.Surname,row['E-mail'],row.Password], function(err) {
               if (err) {return console.log(err.message);}
         });
  
      return row? console.log(`Row(s) removed: 1`): console.log(`No client found with the id ${uID}`);

  });

    db.run('DELETE FROM Clients WHERE userId=?',[uID],function(err) {
	   if (err) {     return console.log(err.message);}
	       });
}


exports.Search = function(uID)  {
    let sql= `SELECT userId, Name,Surname,[E-mail],Password FROM Clients WHERE userId=?`;
    db.get(sql, [uID], (err, row) => {

  if (err) {
      	return console.error(err.message);
      }
      return row? console.log(row.userId + "\t"+ row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password): console.log(`No client found with the id ${uID}`);
  });
}

exports.Display = function(){
  let sql= 'SELECT * FROM Clients';

  db.all(sql, [], (err, rows) => {
  if (err) {
       return console.error(err.message);
      }
  rows.forEach((row) => {
   console.log(row.userId+ "\t"+ row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password);
 	});
  });      
}

exports.DisplayDeleted = function(){
  let sql= 'SELECT * FROM Deleted';

  db.all(sql, [], (err, rows) => {
  if (err) {
       return console.error(err.message);
      }
  rows.forEach((row) => {
   console.log(row.userId+ "\t"+ row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password);
  });
  });      
}

//takes the new password as first arguement and userID of the password to be changed
exports.UpdatePassword = function(uPass,uID){
      let sql= `UPDATE Clients SET Password=? WHERE userId=?`;
    db.run(sql, [uPass,uID],function(err) {
     if (err) {     return console.log(err.message);}
     console.log(`Row(s) updated: ${this.changes}`);
         });
}
//takes the new email as first arguement and userID of the password to be changed
exports.UpdateEmail = function(uEmail,uID){
      let sql= `UPDATE Clients SET [E-mail]=? WHERE userId=?`;
    db.run(sql, [uEmail,uID],function(err) {
     if (err) {     return console.log(err.message);}
     console.log(`Row(s) updated: ${this.changes}`);
         });
}

exports.AuditInsert = function(){
  var TriggerInsert = "CREATE TRIGGER IF NOT EXISTS  triggerInsert AFTER INSERT ON Clients BEGIN INSERT INTO Audit (userid, actionPerformed,timeAccessed) VALUES (new.userId,'new client inserted', datetime('now')); END;";
db.run(TriggerInsert,function(err) {
  if (err) { return console.log(err.message);}
});

}

exports.AuditDelete = function(){
var TriggerDelete = "CREATE TRIGGER IF NOT EXISTS  triggerDelete AFTER DELETE ON Clients BEGIN INSERT INTO Audit(userid,actionPerformed,timeAccessed) VALUES (old.userId,'client has been deleted', datetime('now')); END;";
db.run(TriggerDelete,function(err) {
  if (err) { return console.log(err.message);}

});
}


exports.AuditEmailUpdate = function(){
var createTriggerUpdate = "CREATE TRIGGER IF NOT EXISTS  triggerUpdate AFTER UPDATE OF [E-mail] ON Clients BEGIN UPDATE Audit SET actionPerformed = 'Client email been updated' where userId = old.userId; END;";
db.run(createTriggerUpdate,function(err) {

  if (err) { return console.log(err.message);}

});
}

exports.AuditPasswordUpdate = function(){
var createTriggerUpdate = "CREATE TRIGGER IF NOT EXISTS  triggerUpdate AFTER UPDATE OF Password ON Clients BEGIN UPDATE Audit SET actionPerformed = 'Client password been updated' where userId = old.userId; END;";
db.run(createTriggerUpdate,function(err) {

  if (err) { return console.log(err.message);}

});
	
exports.DisplayAuditsTimeSpan = function(){
  let sql= "select * from Audit where timeAccessed>=datetime('now','-30 day')";

  db.all(sql, [], (err, rows) => {
  if (err) {
       return console.error(err.message);
      }
      
  rows.forEach((row) => {
   console.log(row.userId+ "\t"+ row.actionPerformed+ "\t" +row.timeAccessed);
  });
  });      
}

}

