/**
 * Calls appropriate bot command implementations to execute bot commands when called by guild members.
 *
 * @author Erica H.
 */



const paintFight = require("../commands/paintFight");
const getHex = require("../commands/getHex");
const paintHelp = require("../commands/paintHelp");
const changeHex = require("../commands/changeHex");
const define = require("../commands/define");
const lastfm = require("../commands/lastfm");
const { MessageEmbed } = require('discord.js');

module.exports = (client, message) => {
    try {

        var mes = message.content.toLowerCase();
        var mesStart = mes.split(" ")[0];
        var user = message.member.user.id;
        
        // Commands with associated files
        if (mesStart == "!paintfight" || mesStart == "!pf") {
            const member = message.mentions.members.first();
            if (!member) {
                const embed = new MessageEmbed()
                    .setColor(0xA5DBD0)
                    .setDescription("Please tag a user.")
                    .addField("Command:", "`!paintfight @<Discord user>`", true);
                console.log(message.member.user.username+" did not tag a user (!paintfight)");
                return message.channel.send(embed);
            } else {
                return paintFight(message);
            }
        }
        else if (mesStart == "!gethex" || mesStart == "!gh") {
            return getHex(message);
        }
        else if (mesStart == "!painthelp" || mesStart == "!ph") {
            return paintHelp(message);
        }
        else if (mesStart == "!changehex" || mesStart == "!ch") {
            if (message.member.permissions.has("MANAGE_ROLES")) {
                if (message.mentions.members.first()) {
                    return changeHex(message);
                } else {
                    const embed = new MessageEmbed()
                        .setColor(0xA5DBD0)
                        .setDescription("Please tag a user.")
                        .addField("Command:", "`!changehex @<Discord user> #<hex colour code>`", true);
                    console.log(message.member.user.username+" did not tag a user (!changehex)");
                    return message.channel.send(embed);
                }
            } else {
                const embed = new MessageEmbed()
                    .setColor(0xA5DBD0)
                    .setDescription("You are not authorized to use `!changehex`.");
                console.log(message.member.user.username+" is not authorized to use !changehex");
                return message.channel.send(embed);
            }
        }
        else if (mesStart == "!d" || mesStart == "!def" || mesStart == "!define") {
            var n = mes.split(" ");
            if (n.length < 2) {
                const embed = new MessageEmbed()
                    .setColor(0x134FE6)
                    .setDescription("Please enter a term.")
                    .addField("Command:", "`!define <term>`", true);
                console.log(message.member.user.username+" did not enter a term to define");
                return message.channel.send(embed);
            } else {
                return define(message);
            }
        }

        // Last.fm integration
        else if (mesStart == "!lastfm" || mesStart == "!lf") {
            var n = mes.split(" ");
            if (n[1] == "set") {
                if (n.length < 3) {
                    const embed = new MessageEmbed()
                        .setColor(0xB90000)
                        .setDescription("Please enter a Last.fm username.")
                        .addField("Command:", "`!lastfm set <Last.fm username>`", true);
                    console.log(message.member.user.username+" did not enter a last.fm username to set");
                    return message.channel.send(embed);
                } else {
                    return lastfm(message);
                }
            }
            else if (n[1] == "np") {
                return lastfm(message);
            } else {
                const embed = new MessageEmbed()
                    .setColor(0xB90000)
                    .addField("Last.fm commands:", "`set`, `np`", true);
                console.log(message.member.user.username+" did not enter a proper command");
                return message.channel.send(embed);
            }
        }

        // Simple commands with no associated files
        else if (mes == "hello paintball" || mes == "hi paintball" || mes == "hey paintball") {
            console.log(message.member.user.username+" says hi");
            return message.channel.send("hey "+message.member.user.username+" ;)");
        }
        else if (mes == "thonk" || mes == "thonque") {
            const think = client.emojis.cache.find(emoji => emoji.name === "spinthink");
            console.log(message.member.user.username+" is thinking...");
            message.channel.send(`${think}`);
        }
        else if (mes == "honk" || mes == "honque") {
            const honk = client.emojis.cache.find(emoji => emoji.name === "honk");
            console.log(message.member.user.username+" HONKS!");
            message.channel.send(`${honk}`);
        }
        else if (mes == "!scream") {
            console.log(message.member.user.username+" is screaming");
            message.channel.send("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        }
    }
    catch(err) {
        console.log("An error occurred. Try reading 'err' here when you want to fix this.");
    }
}
