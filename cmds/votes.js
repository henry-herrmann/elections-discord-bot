const Discord = require("discord.js");
const Permission = require("../utils/Permission");
const Data = require("../utils/Data");
const Index = require("../index")

module.exports = {
    name: "votes",
    execute(client, message, args, em){
        if(Permission.getPermissionLevel(message.member) < 1){
            const embed = new Discord.MessageEmbed()
            .setTitle('Insufficient permissions :warning:')
            .setColor("#ed0909")
            .setDescription(`You are missing the required permissions to execute this command.`)
            .setFooter(Index.footer)
            .setTimestamp();

            message.channel.send({embeds: [embed]})
            return;
        }

        if(args.length == 0){
            const temp = [];

            for(let c of em.getVotes()){
                /*client.guilds.cache.get(Data.senate_discord_id).members.fetch(message.author.id).then(senatemember =>{
                    if(senatemember){
                        temp.push(`- ${senatemember.nickname}(${senatemember.id}) | ${c.sname}`)
                    }
                }) */
                temp.push(`- ${c.id} | ${c.sname}`)
            }

            message.channel.send({content: "Votes:\n" + temp.join("\n")})
        }else if(args.length == 2){
            if(args[0].toLowerCase() == "remove"){
                const vid = args[1];

                if(vid == undefined){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Incorrect usage :warning:')
                    .setColor("#ed0909")
                    .setDescription(`>>> ${Data.prefix}votes (<remove, clear> [<Voter-ID>])`)
                    .setFooter(Index.footer)
                    .setTimestamp();

                    message.channel.send({embeds: [embed]})
                    return;
                }

                em.removeVote(vid);

                const embed = new Discord.MessageEmbed()
                .setTitle('Successfully removed the vote of ' + vid + " :hammer:")
                .setColor("#56d402")
                .setDescription(`The vote of the user with the id: **${vid}**, was removed from the ballot.`)
                .setFooter(Index.footer)
                .setTimestamp();
                message.channel.send({embeds: [embed]})
            }else{
                const embed = new Discord.MessageEmbed()
                .setTitle('Incorrect usage :warning:')
                .setColor("#ed0909")
                .setDescription(`>>> ${Data.prefix}votes (<remove, clear> [<Voter-ID>])`)
                .setFooter(Index.footer)
                .setTimestamp();

                message.channel.send({embeds: [embed]})
                return;
            }
        }else if(args.length == 1){
            if(args[0].toLowerCase() == "clear"){
                const filter = m => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, {max: '1', maxMatches: '1', time: "45000"});

                const robloxEmbed = new Discord.MessageEmbed()
                .setColor("#003bed")
                .setTitle("Prompt will expire in 45 seconds")
                .setDescription("❓ Are you sure you want to clear all votes from the vote database? **Reply with (Yes/No).**")
                .setFooter(Index.footer)
                .setTimestamp();
                message.channel.send({embeds: [robloxEmbed]});

                collector.on("collect", async m =>{
                   if(m.content == "No." || m.content == "No" || m.content == "no" || m.content == "no." || m.content == "nO."){
                       const embed = new Discord.MessageEmbed()
                       .setColor("#ed0909")
                       .setDescription(`❌ Prompt cancelled.`)
                       .setFooter(Index.footer)
                       .setTimestamp();

                       message.channel.send({embeds: [embed]})
                       return;
                    }else if(m.content == "Yes." || m.content == "Yes" || m.content == "yes" || m.content == "yes."){
                        em.clearVotes();

                        var embed = new Discord.MessageEmbed()
                        .setTitle("Votes cleared! :white_check_mark:")
                        .setColor("#56d402")
                        .setDescription(`All votes have been cleared.`)
                        .setFooter(Index.footer)
                        .setTimestamp();

                        message.channel.send({embeds: [embed]})
                    }
                })
            }else{
                const embed = new Discord.MessageEmbed()
                .setTitle('Incorrect usage :warning:')
                .setColor("#ed0909")
                .setDescription(`>>> ${Data.prefix}votes (<remove, clear> [<Voter-ID>])`)
                .setFooter(Index.footer)
                .setTimestamp();
    
                message.channel.send({embeds: [embed]})
                return;
            }
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle('Incorrect usage :warning:')
            .setColor("#ed0909")
            .setDescription(`>>> ${Data.prefix}votes (<remove, clear> [<Voter-ID>])`)
            .setFooter(Index.footer)
            .setTimestamp();

            message.channel.send({embeds: [embed]})
            return;
        }
    }
}