/**
 * Implements paintFight command.
 * 
 * Randomly changes the colour of the primary role of a guild member.
 *
 * @author Erica H.
 */



const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = (message) => {
    const member = message.mentions.members.first();

    const role = member.roles.highest;
    const botRole = member.guild.members.cache.get(process.env.BOT_ID).roles.highest;
    if (role.position >= botRole.position) {
        const embed = new MessageEmbed()
            .setColor(0xA5DBD0)
            .setDescription("**"+member.user.username+"**'s role colour cannot be changed.");
        console.log(member.user.username+"'s role colour cannot be changed");
        return message.channel.send(embed);
    }

    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    role.setColor('#'+randomColor);

    fetch("https://www.thecolorapi.com/id?hex="+randomColor, { method: "GET" })
        .then(res => res.json())
        .then((json) => {
            hexName = json.name.value;
            const embed = new MessageEmbed()
                .setColor("#"+randomColor)
                .setDescription("SPLOOSH! <@"+member.id+">'s colour was changed to **#"+randomColor+"** / **"+hexName+"**!");
            console.log(`Set color of `+member.user.username+` to #${randomColor}`);
            return message.channel.send(embed);
        })
}
