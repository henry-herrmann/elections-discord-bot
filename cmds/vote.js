const Discord = require("discord.js");
const Data = require("../utils/Data");
const Index = require("../index");
const Permission = require("../utils/Permission")

module.exports = {
    name: "vote",
    execute(client, message, args, em){
        if(args.length == 0){
            client.guilds.cache.get(Data.senate_discord_id).members.fetch(message.author.id).then(senatemember =>{
                if(senatemember){
                    if(senatemember.roles.cache.some(r => r.id == "852773216896024607") || senatemember.roles.cache.some(r => r.id == "852773176604754002")){
                        if(em.getElectionStatus() == false){
                            if(Permission.getPermissionLevel(senatemember) < 1){
                                const embed = new Discord.MessageEmbed()
                                .setTitle('Elections are currently closed. :lock:')
                                .setColor("#ed0909")
                                .setFooter(Index.footer)
                                .setTimestamp();
                    
                                message.author.send({embeds: [embed]})
                                return; 
                            }
                        }
                        if(em.isBlacklisted(message.author.id)){
                            const embed = new Discord.MessageEmbed()
                            .setTitle('You are banned from submitting votes. :x:')
                            .setColor("#ed0909")
                            .setFooter(Index.footer)
                            .setTimestamp();
                
                            message.author.send({embeds: [embed]})
                            return; 
                        }
                        if(em.hasVoted(message.author.id)){
                            const embed = new Discord.MessageEmbed()
                            .setTitle('You have voted already. :x:')
                            .setColor("#ed0909")
                            .setFooter(Index.footer)
                            .setTimestamp();
                
                            message.author.send({embeds: [embed]})
                            return; 
                        }  
                        
                        const options = [];
            
                        for(let c of em.getCandidates()){
                            options.push({
                                label: c.name,
                                description: c.party,
                                value: c.name
                            })
                        }
            
                        const row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageSelectMenu()
                            .setCustomId("vote")
                            .setPlaceholder("No candidate selected.")
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions([
                                options
                            ])
                        )
            
                        const embed = new Discord.MessageEmbed()
                        .setTitle('Please vote for one of the candidates listed below. :ballot_box:')
                        .setDescription("To vote, click on the menu below and select your candidate. Thank you.")
                        .setColor("#1e46f7")
                        .setFooter(Index.footer)
                        .setTimestamp();
                
                        
                        message.channel.send({embeds: [embed], components: [row]})
                    }else{
                        const embed = new Discord.MessageEmbed()
                        .setTitle('Only Citizens and Upper Class Citizens are entitled to vote! :warning:')
                        .setColor("#ed0909")
                        .setFooter(Index.footer)
                        .setTimestamp();
            
                        message.author.send({embeds: [embed]})
                        return; 
                    }
                }
            })
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle('Too many arguments :warning:')
            .setColor("#ed0909")
            .setDescription(`__Only__ DM this bot with **!vote**`)
            .setFooter(Index.footer)
            .setTimestamp();

            message.author.send({embeds: [embed]})
            return;
        }
    }
}