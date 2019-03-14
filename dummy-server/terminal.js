
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
		
		
		case "5":
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
				database.insert(command[1],command[2],command[3],command[4]);
			}
			else{
				console.log("Invalid arguements")
				console.log("add <name> <surname> <email> <pass>");
				
			}

			break;
		}
				
		case "2":
		case "del":{
			if(command.length == 2 )
			{
				database.remove(command[1]);
			}
			else{
				console.log("Invalid arguements")
				console.log("del user");
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
				console.log("Invalid arguements")
				console.log("search user ");
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
				console.log("Invalid arguements")
				console.log("list Entries");
			}
			break;
		}
		default:{
			console.log("============ Commands ============");
			console.log("1) add <name> <surname> <email> <pass>");
			console.log("2) del user ");
			console.log("3) search user ");
			console.log("4) list");
			console.log("5) exit");
			console.log("");



		}
	}
}
}

