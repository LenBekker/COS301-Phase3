
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('../database/merlotInfoSys.db', (err) => {
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
     db.run('CREATE TABLE IF NOT EXISTS Delete_Clients (userId NVARCHAR(50) NOT NULL, Name NVARCHAR(50) NULL,[E-mail] NVARCHAR(50) NULL,Password NVARCHAR(50) NULL)');
    let sql= `SELECT userId,Name,Surname,[E-mail],Password FROM Clients WHERE userId=?`;
    db.get(sql, [uID], (err, row) => {
       if (err) {
      return console.error(err.message);
      }

      return row? console.log(row.userId+ "\t" +row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password): console.log(`No client found with the id ${uID}`);
  db.run(`INSERT INTO Delete_Clients(userId,Name,Surname,[E-mail],Password) VALUES(?,?,?,?,?)`, [row.userId,row.Name,row.Surname,row['E-mail'],row.Password], function(err) {
	   if (err) {return console.log(err.message);}
	       });
  });

    db.run('DELETE FROM Clients WHERE userId=?',[uID],function(err) {
	   if (err) {     return console.log(err.message);}
	       });
}


exports.Search = function(uID)  {
    let sql= `SELECT Name,Surname,[E-mail],Password FROM Clients WHERE userId=?`;
    db.get(sql, [uID], (err, row) => {

  if (err) {
      	return console.error(err.message);
      }
      return row? console.log(row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password): console.log(`No client found with the id ${uID}`);
  });
}

exports.Display = function(){
  let sql= 'SELECT * FROM Clients';

  db.all(sql, [], (err, rows) => {
  if (err) {
       return console.error(err.message);
      }
      
  rows.forEach((row) => {
   console.log(row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password);
 	});
  });      
}
