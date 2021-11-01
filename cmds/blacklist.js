const Discord = require("discord.js");
const Permission = require("../utils/Permission");
const Data = require("../utils/Data");
const Index = require("../index")

module.exports = {
    name: "blacklist",
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

            const cas = em.getBlacklists();

            if(cas == undefined){
                const embed = new Discord.MessageEmbed()
                .setTitle("Blacklists :clipboard:")
                .setDescription("No blacklists.")
                .setFooter(Index.footer)
                .setTimestamp();

                message.channel.send({embeds: [embed]})
                return;
            }

            for(let c of em.getBlacklists()){
                temp.push(`- ${c.id}`)
            }

            const embed = new Discord.MessageEmbed()
            .setTitle("Blacklists :clipboard:")
            .setDescription(temp.join("\n"))
            .setFooter(Index.footer)
            .setTimestamp();

            message.channel.send({embeds: [embed]})
        }else if(args.length == 2){
            if(args[0].toLowerCase() == "add"){
                const vid = args[1];

                if(vid == undefined){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Incorrect usage :warning:')
                    .setColor("#ed0909")
                    .setDescription(`>>> ${Data.prefix}blacklist (<add, remove> <User-ID>)`)
                    .setFooter(Index.footer)
                    .setTimestamp();

                    message.channel.send({embeds: [embed]})
                    return;
                }

                if(em.isBlacklisted(vid)){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('User is already blacklisted :warning:')
                    .setColor("#ed0909")
                    .setFooter(Index.footer)
                    .setTimestamp();

                    message.channel.send({embeds: [embed]})
                    return;
                }

                em.blacklistUser(vid);

                const embed = new Discord.MessageEmbed()
                .setTitle('Successfully blacklisted the user :white_check_mark:')
                .setColor("#56d402")
                .setDescription(`The user id **${vid}** was banned from submitting votes.`)
                .setFooter(Index.footer)
                .setTimestamp();
                message.channel.send({embeds: [embed]})

            }else if(args[0].toLowerCase() == "remove"){
                const vid = args[1];

                if(vid == undefined){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Incorrect usage :warning:')
                    .setColor("#ed0909")
                    .setDescription(`>>> ${Data.prefix}blacklist (<add, remove> <User-ID>)`)
                    .setFooter(Index.footer)
                    .setTimestamp();

                    message.channel.send({embeds: [embed]})
                    return;
                }

                if(!em.isBlacklisted(vid)){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('User is not blacklisted :warning:')
                    .setColor("#ed0909")
                    .setFooter(Index.footer)
                    .setTimestamp();

                    message.channel.send({embeds: [embed]})
                    return;
                }

                em.removeBlacklist(vid);

                const embed = new Discord.MessageEmbed()
                .setTitle('Successfully unblacklisted the user :white_check_mark:')
                .setColor("#56d402")
                .setDescription(`The user id **${vid}** is now able submit votes again.`)
                .setFooter(Index.footer)
                .setTimestamp();
                message.channel.send({embeds: [embed]})
            }else{
                const embed = new Discord.MessageEmbed()
                .setTitle('Incorrect usage :warning:')
                .setColor("#ed0909")
                .setDescription(`>>> ${Data.prefix}blacklist (<add, remove> <User-ID>)`)
                .setFooter(Index.footer)
                .setTimestamp();

                message.channel.send({embeds: [embed]})
                return;
            }
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle('Incorrect usage :warning:')
            .setColor("#ed0909")
            .setDescription(`>>> ${Data.prefix}blacklist (<add, remove> <User-ID>)`)
            .setFooter(Index.footer)
            .setTimestamp();

            message.channel.send({embeds: [embed]})
            return;
        }
    }
}