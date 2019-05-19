/*jshint esversion: 6 */

const fs = require("fs");

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(client.user.presence)
    
    let guild = client.guilds.get("INSERT GUILD ID");
    guild.fetchMembers().then(() => {
        let members = guild.members;

        let users = "";

        for (let i = 0; i < guild.memberCount; i++) {
            users += members.get(members.keyArray()[i]).user.tag + "," + members.get(members.keyArray()[i]).id + "\n";
        }

        fs.writeFile("./userList.txt", users, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 
    });
    
    
});

//client key
client.login("INSERT CLIENT ID");

//graceful exit
if (process.platform === "win32") {
	var rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on("SIGINT", function () {
		process.emit("SIGINT");
	});
}


process.on("SIGINT", function () {
	//graceful shutdown
	client.destroy().then(process.exit());
});