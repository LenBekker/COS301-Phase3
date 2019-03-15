
var database = require("./database.js");
exports.AllowInput= function(){
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
		
		
		case "8":
		case "exit":{
			stdin.removeAllListeners('data');
			console.log("============ Stopping Server ============");
			process.exit();
			break;
		}
			
			
		case "1":
		case "add":{
			if(command.length == 5 )
			{
				database.AuditInsert();
				database.insert(command[1],command[2],command[3],command[4]);
			}
			else{
				console.log("Invalid arguments")
				console.log("add <name> <surname> <email> <pass>");
				
			}

			break;
		}
				
		case "2":
		case "del":{
			if(command.length == 2 )
			{
				database.AuditDelete();
				database.remove(command[1]);

			}
			else{
				console.log("Invalid arguments for del user")
				}
			break;
		}
			
		case "3":
		case "search":{
			if(command.length == 2 )
			{
				database.Search(command[1]);
			}
			else{
				console.log("Invalid arguments search user ")
				}
			break;
		}
			
		case "4":
		case "list":{
			if(command.length == 1 )
			{
				database.Display();
			}
			else{
				console.log("Invalid arguments for list Entries")
				}
			break;
		}
		case "5":
		case "updateEmail":{
			 if(command.length == 3)
			 {
			 	database.UpdateEmail(command[1],command[2]);
			 }
			 else{
			 	console.log("Invalid arguments Update email entry")
				 }
			 break;
		}
		case "6":
		case "updatePassword":{
			 if(command.length == 3)
			 {
			 	database.UpdatePassword(command[1],command[2]);
			 }
			 else{
			 	console.log("Invalid arguments for Update Password entry")
					 }
			 break;
		}
		case "7":
		case "listDeleted":{
			 if(command.length == 1)
			 {
			 	database.DisplayDeleted();
			 }
			 else{
			 	console.log("Invalid arguments for deleted table")
						 }
			 break;
		}
		case "8":
		case "ListT":{
			if(command.length == 1 )
			{
				database.DisplayAuditsTimeSpan();
			}
			else{
				console.log("Invalid arguments for list Entries")
				}
			break;
		}	
			

		default:{
			console.log("============ Commands ============");
			console.log("1) add <name> <surname> <email> <pass>");
			console.log("2) del user ");
			console.log("3) search user ");
			console.log("4) list");
			console.log("5) updateEmail <newEmail> <userId>");
			console.log("6) updatePassword <newPassword> <userId>");
			console.log("7) list deleted table")
			console.log("8) List audit timespan");
			console.log("9) Exit");
			console.log("");



		}
	}
}
}

