/**
 * Implements define command.
 * 
 * Uses the Urban Dictionary API to define a word provided by the message sender.
 *
 * @author Erica H.
 */



const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = (message) => {

    var term = message.content.substr(message.content.indexOf(" ") + 1);

    fetch("https://mashape-community-urban-dictionary.p.rapidapi.com/define?term="+term, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then((json) => {
        if (json.list.length == 0) {
            console.log("No UD results for: "+term);
            const embed = new MessageEmbed()
                .setColor(0x134FE6)
                .setDescription("No Urban Dictionary results for: **"+term+"**");
            return message.channel.send(embed);

        } else {
            var def = json.list[0].definition;
            def = def.split("[").join("");
            def = def.split("]").join("");

            var ex = json.list[0].example;
            ex = ex.split("[").join("");
            ex = ex.split("]").join("");

            const embed = new MessageEmbed()
                .setTitle(json.list[0].word)
                .setURL(json.list[0].permalink)
                .setColor(0x134FE6)
                .setDescription(def)
                .addField("Example", ex, true)
                .setFooter("Provided by Urban Dictionary")
                .setTimestamp();
            console.log(message.member.user.username+` searched for: `+term);
            return message.channel.send(embed);
        }
    })
    .catch(err => {
        console.error(err);
    });
}
