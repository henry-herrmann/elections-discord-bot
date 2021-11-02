require("dotenv").config();
const { Client, Intents} = require("discord.js");
const Discord = require("discord.js");
const allIntents = new Intents(32767);
const client = new Client({intents: [allIntents], fetchAllMembers: true, partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

const Data = require("./utils/Data");
const Permission = require("./utils/Permission")

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const ElectionsManager = require("./utils/ElectionsManager");
const em = new ElectionsManager(db);


client.commands = new Discord.Collection();

const fs = require("fs");
const { ElectionsManger } = require("./utils/ElectionsManager");
const vote = require("./cmds/vote");
const commandFiles = fs.readdirSync("./cmds/").filter(f => f.endsWith(".js"));

for(file of commandFiles){
    const command = require(`./cmds/${file}`);

    client.commands.set(command.name, command);
}

const footer = "Created by Henryhre"


client.login(process.env.TOKEN);

client.once("ready", (ready) =>{
    client.user.setActivity("**DM me with '!vote'", {type: 4});
})

client.on('interactionCreate', async interaction => {
    
    if(interaction.isSelectMenu()){
        if(interaction.component.customId == "vote"){
            const cname = interaction.values[0];

            if(em.hasVoted(interaction.user.id)){
                const embed = new Discord.MessageEmbed()
                .setTitle('You have voted already :warning:')
                .setColor("#ed0909")
                .setFooter(footer)
                .setTimestamp();
    
                interaction.reply({embeds: [embed]})
                return;
            }

            em.vote(interaction.user.id, cname);

            const embed = new Discord.MessageEmbed()
            .setTitle('Successfully voted for ' + cname + " :white_check_mark:")
            .setColor("#56d402")
            .setDescription(`On behalf of the Senate, we thank you for voting.`)
            .setFooter(footer)
            .setTimestamp();
            interaction.reply({embeds: [embed]})

            const log = new Discord.MessageEmbed()
            .setTitle("Vote log")
            .setDescription(`User: <@${interaction.user.id}>\nVoted for: ${cname}`)
            .setFooter(footer)
            .setTimestamp();
            client.channels.cache.get(Data.vote_log).send({embeds: [log]})
        }
    }          
});


client.on("messageCreate", (message) =>{

    if(message.channel instanceof Discord.DMChannel){
        if(!message.content.startsWith("!")) return;
        const args = message.content.substring(1).split(" ");
        const command = args.shift().toLocaleLowerCase();

        if(command == "vote"){
            client.commands.get("vote").execute(client, message, args, em);
        }
    }else{
        if(message.guild.id == Data.senate_discord_id || message.author.id == "282590125408387073"){
            if(!message.content.startsWith(Data.prefix)) return;
            const args = message.content.substring(Data.prefix.length).split(" ");
            const command = args.shift().toLocaleLowerCase();
        
            if(command == "candidates"){
                client.commands.get("candidates").execute(client, message, args, em);
            }else if(command == "votes"){
                client.commands.get("votes").execute(client, message, args, em);
            }else if(command == "blacklist"){
                client.commands.get("blacklist").execute(client, message, args, em);
            }else if(command == "elections"){
                client.commands.get("elections").execute(client, message, args, em);
            }else if(command == "results"){
                client.commands.get("results").execute(client, message, args, em);
            }
        }
    }
    
    
})

module.exports.footer = footer;