const Discord = require("discord.js");
const Permission = require("../utils/Permission");
const Data = require("../utils/Data");
const Index = require("../index")

module.exports = {
    name: "elections",
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

        if(args.length == 1){
            if(args[0].toLowerCase() == "on"){
                em.setElectionStatus(true);

                const embed = new Discord.MessageEmbed()
                .setTitle('Election status set to: on')
                .setColor("#56d402")
                .setFooter(Index.footer)
                .setTimestamp();
                message.channel.send({embeds: [embed]})
            }else if(args[0].toLowerCase() == "off"){
                em.setElectionStatus(false);

                const embed = new Discord.MessageEmbed()
                .setTitle('Election status set to: off')
                .setColor("#56d402")
                .setFooter(Index.footer)
                .setTimestamp();
                message.channel.send({embeds: [embed]})
            }else if(args[0].toLowerCase() == "stats"){
                const candidates = em.getCandidates() != undefined ? em.getCandidates().length : 0;
                const votes = em.getVotes() != undefined ? em.getVotes().length : 0;
                const blacklists = em.getBlacklists() != undefined ? em.getBlacklists().length : 0;

                const embed = new Discord.MessageEmbed()
                .setTitle('Election stats :chart_with_upwards_trend:')
                .setDescription(`__Status:__ **${em.getElectionStatus() == true ? "Enabled" : "Disabled"}\n\n**Votes: **${votes.toString()}**\nCandidates: **${candidates.toString()}**\nBlacklists: **${blacklists.toString()}**`)
                .setColor("#1e46f7")
                .setFooter(Index.footer)
                .setTimestamp();

                message.channel.send({embeds: [embed]});
            }else if(args[0].toLowerCase() == "live"){
                const candidates = em.getCandidates() != undefined ? em.getCandidates().length : 0;
                const votes = em.getVotes() != undefined ? em.getVotes().length : 0;

                const embed = new Discord.MessageEmbed()
                .setTitle('Live election results :tv:')
                .setColor("#1e46f7")
                .addField("Votes", votes.toString(), true)
                .addField("Candidates", candidates.toString(), true)
                .setFooter(Index.footer)
                
                
                message.channel.send({embeds: [embed]}).then((msg) =>{
                    em.setLiveResult(msg.id, msg.channel.id)
                })
            }else{
                const embed = new Discord.MessageEmbed()
                .setTitle('Incorrect usage :warning:')
                .setColor("#ed0909")
                .setDescription(`>>> ${Data.prefix}elections (<on,off,stats)`)
                .setFooter(Index.footer)
                .setTimestamp();
    
                message.channel.send({embeds: [embed]})
                return;
            }
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle('Incorrect usage :warning:')
            .setColor("#ed0909")
            .setDescription(`>>> ${Data.prefix}elections (<on,off,stats)`)
            .setFooter(Index.footer)
            .setTimestamp();
    
            message.channel.send({embeds: [embed]})
            return;
        }
    }
}