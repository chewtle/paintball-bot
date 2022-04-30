/**
 * Paintball is a Discord bot that provides role-colour-changing functionalities, as well as other useful commands.
 *
 * Features include role-colour-changing, Urban Dictionary definitions, Last.fm integration, and more.
 *
 * @file   File that handles app startup and routing.
 * @author Erica H.
 */



require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
global.client = new Discord.Client();

fs.readdir("./events/", (err, files) => {
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  })
})

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
})

client.login(process.env.BOT_TOKEN);