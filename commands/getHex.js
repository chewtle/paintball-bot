/**
 * Implements getHex command.
 * 
 * Returns the hex colour of a guild member's highest role.
 *
 * @author Erica H.
 */



const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = (message) => {

    var member, hex, nick, hexName;

    var n = message.content.split(" ");
    var tag = n[n.length - 1];
    if (message.mentions.members.first()) {
        member = message.mentions.members.first();
    } else if (client.users.cache.find(u => u.tag === tag)) {
        member = message.guild.members.cache.get(client.users.cache.find(u => u.tag === tag).id);
    } else {
        member = message.member;
    }

    const role = member.roles.highest;
    if (member.nickname) {
        nick = member.nickname;
    } else {
        nick = member.user.username;
    }

    hex = role.hexColor;
    var n = hex.split("#");
    var urlHex =  n[1];
    let url = "https://www.thecolorapi.com/id?hex="+urlHex;
    let settings = { method: "Get" };

    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            hexName = json.name.value;
            const embed = new MessageEmbed()
                .setColor(hex)
                .setDescription("**"+nick+`**'s hex colour is: **`+hex+`**\nI would call this... **`+hexName+`**!`)
                .setFooter("Provided by The Color API")
                .setTimestamp();
            console.log(member.user.username+`'s colour is `+hex);
            return message.channel.send(embed);
        });
}
