/**
 * Implements paintHelp command.
 * 
 * Returns a MessageEmbed describing the usage of every other function the bot provides.
 *
 * @author Erica H.
 */



const { MessageEmbed, Message } = require('discord.js');

module.exports = (message) => {

    var n = message.content.split(" ");

    if (n.length != 2) {
        const embed = new MessageEmbed()
            .setTitle(`Paintball Commands`)
            .setColor(0xA5DBD0)
            .setDescription("Type `!painthelp <command>` for more info on a command.\n```\nchangehex\ndefine\ngethex\nlastfm\npaintfight\nscream```");
        console.log(`Help box brought up by `+message.member.user.username);
        return message.channel.send(embed);
    } else {
        var command = n[1];
        console.log(message.member.user.username+" is getting help with: "+command);
        if (command == "changehex") {
            const embed = new MessageEmbed()
                .setColor(0xA5DBD0)
                .setDescription("Changes the colour (you can choose) of a member (you can choose). Please pay first!")
                .addField("Command:", "`!changehex @<Discord user> #<hex colour code>` (shortcut: `!ch`)", true);
            return message.channel.send(embed);
        } else if (command == "define") {
            const embed = new MessageEmbed()
                .setColor(0xA5DBD0)
                .setDescription("Let Urban Dictionary define a word (or phrase) for you.")
                .addField("Command:", "`!define <term>` (shortcut: `!d` or `!def`)", true);
            return message.channel.send(embed);
        } else if (command == "gethex") {
            const embed = new MessageEmbed()
                .setColor(0xA5DBD0)
                .setDescription("Get a name for your (or someone else's) role colour.")
                .addField("Command:", "`!gethex` or `!gethex @<Discord user>` (shortcut: `!gh`)", true);
            return message.channel.send(embed);
        } else if (command == "lastfm") {
            const embed = new MessageEmbed()
                .setColor(0xA5DBD0)
                .setDescription("Show what you're listening to on Last.fm. (shortcut: `!lf`)")
                .addFields(
                    { name: "Set Last.fm username:", value: "`!lastfm set <Last.fm username>`"},
                    { name: "See what's playing:", value: "`!lastfm np`"}
                );
            return message.channel.send(embed);
        } else if (command == "paintfight") {
            const embed = new MessageEmbed()
                .setColor(0xA5DBD0)
                .setDescription("Changes the colour (random) of a member (you can choose). Please pay first!")
                .addField("Command:", "`!paintfight @<Discord user>` (shortcut: `!pf`)", true);
            return message.channel.send(embed);
        } else if (command == "scream") {
            const embed = new MessageEmbed()
                .setColor(0xA5DBD0)
                .setDescription("SCREAM!!!!!!!!!!")
                .addField("Command:", "`!scream`", true);
            return message.channel.send(embed);
        }
    }
}
