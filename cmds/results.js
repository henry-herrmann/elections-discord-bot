const Discord = require("discord.js");
const Permission = require("../utils/Permission");
const Data = require("../utils/Data");
const Index = require("../index");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const chartJSNodeCanvas = new ChartJSNodeCanvas({width: 500, height: 500, backgroundColour: 'white'});

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
        }else if(args.length == 1){
            if(args[0].toLowerCase() == "chart"){
                const array = em.getResultArray();

                (async () =>{

                    var backcolors = [];
                    var labels = [];
                    var data = [];
    
                    for(const c of array){
                        var color = random_rgba();
                        backcolors.push(color);
                        labels.push(c.name);
                        data.push(c.votes.toString());
                    }
                    
                    const chartData = {
                        labels: labels,
                        datasets: [{
                          label: 'My First dataset',
                          data: data,
                          backgroundColor: backcolors,
                          borderColor: backcolors,
                          borderWidth: 1
                        }]
                      };
                      
                    const config = {
                        type: 'pie',
                        data: chartData,
                        options: {}
                    };

                    var dataURL = await chartJSNodeCanvas.renderToDataURL(config)
                    var data = dataURL.replace(/^data:image\/\w+;base64,/, "");
    
                    var buffer = new Buffer.from(data, "base64");
                    const attach = new Discord.MessageAttachment(buffer);
    
                    message.channel.send({files: [attach]})  
                })();
            }
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle('Incorrect usage :warning:')
            .setColor("#ed0909")
            .setDescription(`>>> ${Data.prefix}results\n${Data.prefix}results <chart>`)
            .setFooter(Index.footer)
            .setTimestamp();

            message.channel.send({embeds: [embed]})
            return;
        }
    }
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;


    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ', 1)';
}
