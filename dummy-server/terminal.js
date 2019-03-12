var db = null;
exports.AllowInput= function(database){
	//Allow the terminal to multitask by creating another process decicated to listening for commands
	var stdin = process.openStdin();
	stdin.addListener("data", function(d) {
	  	var commands = d.toString().trim();
	  	commands = commands.split(" ");
	  	if(commands.length == 1)
	  		output= command(commands)
	  	else
	  		output = command(commands);
	  	if(output == false){
	  		console.log(false);
	  	}
	});

function command(command){
	var cmd = command[0];
	switch(cmd){
		
		
		case "5":
		case "exit":{
			stdin.removeAllListeners('data');
			console.log("============ Stopping Server ============");
			process.exit();
			break;
		}
			
			
		case "1":
		case "add ":{
			if(command.length == 6 )
			{
				insert(array[1],array[2],array[3],array[4],array[5]);
			}
			else{
				console.log("Invalid arguements")
				console.log("add <userID> <name> <surname> <email> <pass>");
				
			}
			break;
		}
			
		case "2":
		case "del ":{
			if(command.length == 2 )
			{
				remove(array[1]);
			}
			else{
				console.log("Invalid arguements")
				console.log("del <userID>");
			}
			break;
		}
			
		case "3":
		case "search ":{
			if(command.length == 2 )
			{
				search(array[1]);
			}
			else{
				console.log("Invalid arguements")
				console.log("add <userID> ");
			}
			break;
		}
			
		case "4":
		case "list ":{
			if(command.length == 6 )
			{
				Display();
			}
			else{
				console.log("Invalid arguements")
				console.log("list Entries");
			}
			break;
		}
		default:{
			console.log("============ Commands ============");
			console.log("1) add <userID> <name> <surname> <email> <pass>");
			console.log("4) exit");
			console.log("");



		}
	}
}
}

function insert(uId,uName,uSurname,uEmail,uPass){
       db.run(`INSERT INTO Clients(userId,Name,Surname,[E-mail],Password) VALUES(?,?,?,?,?)`, [uId,uName,uSurname,uEmail,uPass], function(err) {
        if (err) {
                   return console.log(err.message);
                 }
         });
}

function remove(uID)
  {
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


function Search(uID)
  {
    let sql= `SELECT userId,Name,Surname,[E-mail],Password FROM Clients WHERE userId=?`;
    db.get(sql, [uID], (err, row) => {

  if (err) {
      	return console.error(err.message);
      }
      return row? console.log(row.userId+ "\t" +row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password): console.log(`No client found with the id ${uID}`);
  });
  }

 function Display(){
  let sql= "SELECT * FROM Clients";

  db.all(sql, [], (err, rows) => {
  if (err) {
      throw err;
      }
     // console.log(rows);
  rows.forEach((row) => {
   console.log(row.userId+ "\t" +row.Name+ "\t" +row.Surname+ "\t" +row['E-mail']+ "\t" +row.Password);
 });
  });      
  }
