const Discord = require("discord.js");
const Permission = require("../utils/Permission");
const Data = require("../utils/Data");
const Index = require("../index")

module.exports = {
    name: "candidates",
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

            const cas = em.getCandidates();

            if(cas == undefined){
                const embed = new Discord.MessageEmbed()
                .setTitle("Candidates :orange_book:")
                .setColor("#347aeb")
                .setDescription("No candidates.")
                .setFooter(Index.footer)
                .setTimestamp();

                message.channel.send({embeds: [embed]})
                return;
            }

            for(let c of em.getCandidates()){
                temp.push(`- ${c.name} | ${c.party}`)
            }

            const embed = new Discord.MessageEmbed()
            .setTitle("Candidates :orange_book:")
            .setColor("#347aeb")
            .setDescription(temp.join("\n"))
            .setFooter(Index.footer)
            .setTimestamp();

            message.channel.send({embeds: [embed]})
        }else if(args.length == 3){
            if(args[0].toLowerCase() == "add"){
                const cname = args[1];
                const pname = args[2];

                if(cname == undefined || pname == undefined){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Incorrect usage :warning:')
                    .setColor("#ed0909")
                    .setDescription(`>>> ${Data.prefix}candidates (<add,remove> <Senator-Name> <Party-Name>`)
                    .setFooter(Index.footer)
                    .setTimestamp();

                    message.channel.send({embeds: [embed]})
                    return;
                }

                if(em.candidateExists(cname)){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Candidate already exists :warning:')
                    .setColor("#ed0909")
                    .setFooter(Index.footer)
                    .setTimestamp();

                    message.channel.send({embeds: [embed]})
                    return;
                }
                em.addCandidate(cname, pname);

                const embed = new Discord.MessageEmbed()
                .setTitle('Successfully added the candidate :white_check_mark:')
                .setColor("#56d402")
                .setDescription(`**${cname}** from the __${pname}__ party was added to the candidate pool.`)
                .setFooter(Index.footer)
                .setTimestamp();
                message.channel.send({embeds: [embed]})
            }else{
                const embed = new Discord.MessageEmbed()
                .setTitle('Incorrect usage :warning:')
                .setColor("#ed0909")
                .setDescription(`>>> ${Data.prefix}candidates (<add,remove> <Senator-Name> [<Party-Name>])`)
                .setFooter(Index.footer)
                .setTimestamp();

                message.channel.send({embeds: [embed]})
                return; 
            }
        }else if(args.length == 2){
            if(args[0].toLowerCase() == "remove"){
                const cname = args[1];

                if(cname == undefined){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Incorrect usage :warning:')
                    .setColor("#ed0909")
                    .setDescription(`>>> ${Data.prefix}candidates (<add,remove> <Senator-Name> <Party-Name>`)
                    .setFooter(Index.footer)
                    .setTimestamp();

                    message.channel.send({embeds: [embed]})
                    return;
                }

                if(!em.candidateExists(cname)){
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Candidate does not exist :warning:')
                    .setColor("#ed0909")
                    .setFooter(Index.footer)
                    .setTimestamp();

                    message.channel.send({embeds: [embed]})
                    return;
                }

                em.removeCandidate(cname);

                const embed = new Discord.MessageEmbed()
                .setTitle('Successfully removed the candidate :hammer:')
                .setColor("#56d402")
                .setDescription(`**${cname}** was removed from the candidate pool.`)
                .setFooter(Index.footer)
                .setTimestamp();
                message.channel.send({embeds: [embed]})
            }else{
                const embed = new Discord.MessageEmbed()
                .setTitle('Incorrect usage :warning:')
                .setColor("#ed0909")
                .setDescription(`>>> ${Data.prefix}candidates (<add,remove> <Senator-Name> [<Party-Name>])`)
                .setFooter(Index.footer)
                .setTimestamp();

                message.channel.send({embeds: [embed]})
                return; 
            }
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle('Incorrect usage :warning:')
            .setColor("#ed0909")
            .setDescription(`>>> ${Data.prefix}candidates (<add,remove> <Senator-Name> [<Party-Name>])`)
            .setFooter(Index.footer)
            .setTimestamp();

            message.channel.send({embeds: [embed]})
            return;
        }
    }
}