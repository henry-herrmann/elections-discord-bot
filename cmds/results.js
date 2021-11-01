const Discord = require("discord.js");
const Permission = require("../utils/Permission");
const Data = require("../utils/Data");
const Index = require("../index")

module.exports = {
    name: "results",
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
            const results = em.getResults();

            const embed = new Discord.MessageEmbed()
            .setTitle("Results :bar_chart:")
            .setColor("#347aeb")
            .setDescription(results)
            .setFooter(Index.footer)
            .setTimestamp();

            message.channel.send({embeds: [embed]})
            return;
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle('Incorrect usage :warning:')
            .setColor("#ed0909")
            .setDescription(`>>> .results`)
            .setFooter(Index.footer)
            .setTimestamp();

            message.channel.send({embeds: [embed]})
            return;
        }
    }
}