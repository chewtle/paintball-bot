/**
 * Implements changeHex command.
 * 
 * Changes the colour of the primary role of a guild member using a hex code provided by the message sender.
 *
 * @author Erica H.
 */



const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = (message) => {
    const member = message.mentions.members.first();
    var n = message.content.split(" ");
    var hexCode = n[n.length - 1];

    if (/^#[0-9A-F]{6}$/i.test(hexCode) == false) {
        const embed = new MessageEmbed()
            .setColor(0xA5DBD0)
            .setDescription("Please enter a valid hex code.")
            .addField("Command:", "`!changehex @<Discord user> #<hex colour code>`", true);
        console.log(message.member.user.username+" did not enter a valid hex code");
        return message.channel.send(embed);
    } else {
        var colour = hexCode;
    }

    const role = member.roles.highest;
    const botRole = member.guild.members.cache.get(process.env.BOT_ID).roles.highest;
    if (role.position >= botRole.position) {
        const embed = new MessageEmbed()
            .setColor(0xA5DBD0)
            .setDescription("**"+member.user.username+"**'s role colour cannot be changed.");
        console.log(member.user.username+"'s role colour cannot be changed");
        return message.channel.send(embed);
    }

    role.setColor(colour);
    var m = colour.split("#");
    var urlHex =  m[1];
    fetch("https://www.thecolorapi.com/id?hex="+urlHex, { method: "GET" })
        .then(res => res.json())
        .then((json) => {
            hexName = json.name.value;
            const embed = new MessageEmbed()
                .setColor(colour)
                .setDescription("SPLASH! <@"+member.id+">'s colour was changed to **"+colour+"** / **"+hexName+"**!");
            console.log(`Set colour of `+member.user.username+` to ${colour}`);
            return message.channel.send(embed);
        });
}
