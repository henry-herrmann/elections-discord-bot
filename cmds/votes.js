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
                    .setDescription(`>>> ${Data.prefix}votes (<remove> <Voter-ID>)`)
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
                .setDescription(`>>> ${Data.prefix}votes (<remove> <Voter-ID>)`)
                .setFooter(Index.footer)
                .setTimestamp();

                message.channel.send({embeds: [embed]})
                return;
            }
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle('Incorrect usage :warning:')
            .setColor("#ed0909")
            .setDescription(`>>> ${Data.prefix}votes (<remove> <Voter-ID>)`)
            .setFooter(Index.footer)
            .setTimestamp();

            message.channel.send({embeds: [embed]})
            return;
        }
    }
}