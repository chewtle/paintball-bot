/**
 * Implements Last.fm commands.
 * 
 * Sets the Last.fm username of a guild member, or returns the currently playing song of a guild member.
 *
 * @author Erica H.
 */



const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const fs = require("fs");

module.exports = (message) => {

    var n = message.content.split(" ");

    if (n[1] == "set") {
        var lastfm_un = n[2];

        fetch("http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user="+lastfm_un+"&api_key="+process.env.LASTFM_API_KEY+"&format=json", {
            "method": "GET",
            "headers": {
                "User-Agent": "Paintball/1.0 ( "+process.env.EMAIL+" )"
            }
        })
        .then(res => res.json())
        .then((json) => {
            if (json.hasOwnProperty("error")) {
                const embed = new MessageEmbed()
                    .setColor(0xB90000)
                    .setDescription("Please enter a valid Last.fm username.")
                    .addField("Command:", "`!lastfm set <Last.fm username>`", true);
                console.log(message.member.user.username+" entered an invalid Last.fm username");
                return message.channel.send(embed);
            } else {
                var discordID = message.member.user.id;
                var userURL = "https://www.last.fm/user/"+lastfm_un;
                fs.readFile('./lastfm_accounts.json', function (err, data) {
                    var json = JSON.parse(data);
                    json[discordID] = lastfm_un;
                    fs.writeFile('./lastfm_accounts.json', JSON.stringify(json), function(err) {
                        if (err) console.log(err);
                    })
                })
                console.log(message.member.user.username+"'s Last.fm username is set as: "+lastfm_un);
                const embed = new MessageEmbed()
                    .setColor(0xB90000)
                    .setDescription("Your Last.fm username is set to **["+lastfm_un+"]("+userURL+")**");
                return message.channel.send(embed);
            }
        })
    } else if (n[1] == "np") {
        fs.readFile('./lastfm_accounts.json', function (err, data) {
            var json = JSON.parse(data);
            if (json.hasOwnProperty(message.member.user.id)) {

                var lastfm_un = json[message.member.user.id];

                fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+lastfm_un+"&api_key="+process.env.LASTFM_API_KEY+"&limit=1&extended=1&format=json", {
                    "method": "GET",
                    "headers": {
                        "User-Agent": "Paintball/1.0 ( "+process.env.EMAIL+" )"
                    }
                })
                .then(res => res.json())
                .then((json) => {
                    const artistURL = json.recenttracks.track[0].artist.url.replace("(","%28").replace(")","%29");
                    const artistName = json.recenttracks.track[0].artist.name;
                    const image = json.recenttracks.track[0].image[2]['#text'];
                    const trackURL = json.recenttracks.track[0].url.replace("(","%28").replace(")","%29");
                    const trackName = json.recenttracks.track[0].name;
                    const albumName = json.recenttracks.track[0].album['#text'];
        
                    const embed = new MessageEmbed()
                        .setColor(0xB90000)
                        .setTitle(lastfm_un+" is listening to...")
                        .setDescription("**["+trackName+"]("+encodeURI(trackURL)+")** by **["+artistName+"]("+encodeURI(artistURL)+")**\nFrom *"+albumName+"*")
                        .setThumbnail(image)
                        .setFooter("Provided by Last.fm")
                        .setTimestamp();
                    console.log(lastfm_un+' is listening to "'+trackName+'" by '+artistName);
                    return message.channel.send(embed);
                })
            } else {
                const embed = new MessageEmbed()
                    .setColor(0xB90000)
                    .setDescription("Please set a Last.fm username first.")
                    .addField("Command:", "`!lastfm set <Last.fm username>`", true);
                console.log(message.member.user.username+" needs to set a Last.fm username first");
                return message.channel.send(embed);
            }
        })
    }
}
