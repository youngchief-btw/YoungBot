const fs = require("fs");
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();
const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, MessageAttachment, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core-discord");
const execSync = require("child_process").execSync;
const querystring = require("querystring");
const fetch = require("node-fetch");
const { exec } = require("child_process");
const express = require("express");
const app = express();
const cmd = require("node-cmd");
const Sentry = require("@sentry/node");
const ttt = require("discord.js-tictactoe");
let jsoning = require("jsoning");
let db = new jsoning("../db.json");
// const Constants = require('discord.js/src/util/Constants.js')
// Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`

Sentry.init({ dsn: process.env.SentryProjectURL }); // Sentry setup

app.get("/", (request, response) => {
  response
    .status(200)
    .send(
      "<style>* { font-family: sans-serif; }</style><center><h1>YoungBot</h1></center>"
    );
});

app.get("*", (request, response) => {
  response
    .status(404)
    .send(
      "<style>* { font-family: sans-serif; }</style><h1>404 - File Not Found</h1>"
    );
});

app.listen(process.env.PORT);

const userAgent =
  "|| youngchief btw ツ \n|| https://youngchief-btw.now.sh/\n|| Project: YoungBot\n|| Github: @youngchief-btw\n|| Glitch: @youngchief_btw";

function miniCPU() {
  process.exit();
  process.kill();
  process.abort();
}

const yca = {
  link: async function() {}
};

var discord = {}; // Declare `discord` object
discord.username = "@youngchief btw ツ";
discord.tag = 5228;
discord.fullUsername = discord.username + discord.tag;
discord.server = {};
discord.server.inviteCode = "myuyJqH";
discord.server.URL = "discord.gg/" + discord.server.inviteCode;

function log(...desc) {
  const d = new Date();
  if (typeof desc == Array) {
    desc = desc.join("");
  }
  cmd.run("mkdir .YoungBot");
  fs.appendFile(
    ".YoungBot/Log.txt",
    d.getUTCDay() +
      "-" +
      d.getUTCMonth() +
      "-" +
      d.getUTCFullYear() +
      " " +
      d.getUTCHours() +
      ":" +
      d.getUTCMinutes() +
      ":" +
      d.getUTCSeconds() +
      ":" +
      d.getUTCMilliseconds() +
      " | " +
      desc +
      "\n",
    function(err) {
      if (err)
        console.log(
          "An error occured while logging. Report the following to " +
            discord.server.URL +
            "\n" +
            err
        );
    }
  );
}

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

const prefix = "!^";

// const constant = require("discord.js/src/util/Constants.js");
// constant.DefaultOptions.ws.properties.$browser = "Discord iOS";

client.on("debug", console.log);

client.on("ready", () => {
  console.log("discord.js || I am ready for duty...");
  client.user.setStatus("online");
  console.log("discord.js || Set status to 'Online'");
  client.user.setAFK(false);
  console.log("discord.js || Set AFK to 'false'");
  client.user
    .setActivity("you use !^invite", {
      type: "LISTENING"
      // browser: "DISCORD IOS"
    })
    .then(presence =>
      console.log(`Activity set to "Watching ${presence.activities[0].name}"`)
    )
    .catch(console.error);
});

// Create an event listener for messages
client.on("message", async message => {
  if (message.author.bot) return;

  let guildid = message.guild.id;
  let authorid = message.author.id;
  let key = authorid;

  // see if user exists
  // in the future, this is gonna be easier with Jsoning#has

  let all = db.all();
  if (!all[key]) {
    // user doesn't exist
    db.set(key, { user: { xp: 0, lvl: 1 } });
    return;
  }

  let userinfo = db.get(key);
  let xp = userinfo.user.xp;
  let lvl = userinfo.user.lvl;

  xp = xp + 5;
  let userobj = { user: { xp: xp, lvl: lvl } };
  let setvalue = db.set(key, userobj);

  let xplimit = lvl * lvl + 75;

  // progress to the next level
  if (xp > xplimit) {
    xp = 0;
    xplimit = lvl * lvl + 75;
    lvl++;
    if (message.guild.id === "698841420412354581") {
      const channel = message.member.guild.channels.cache.find(
        ch => ch.name === "bot-spam"
      );
      /* channel.send(`${message.member}, you've progressed to Level ${lvl}! GG!`); */
    } else {
      /* message.reply(`you've progressed to Level ${lvl}! GG!`); */
    }

    userobj = { user: { xp: xp, lvl: lvl } };
    setvalue = db.set(key, userobj);
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.content.startsWith(prefix + "points")) {
    message.channel.send(`
**XP**
[${xp}/${xplimit}]

**Level**
[${lvl}]`);
  }

  if (message.content.startsWith(prefix + "eval")) {
    if (message.author.id !== "683552393253879829") return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

  // || Help!!
  if (message.content.toLowerCase() === prefix + "help") {
    message.channel.send(
      "**Help!**\n**" +
        prefix +
        "ping** | Returns your ping\n**" +
        prefix +
        "invite** | Return an invite to invite me and an invite to my creator's Discord\n**" +
        prefix +
        "ws** | Return the website.\n**" +
        prefix +
        "donate** | Wanna donate to the creator? (I need someone to help test that things go smooth, DM **<@683552393253879829>**)\n**" +
        prefix +
        "avatar** | Link to your avatar if no one is tagged\n**" +
        prefix +
        "dog** | Return a random dog!\n**" +
        prefix +
        "cat** | Return a cat!"
    );
  }

  // || Ping, Pong
  if (message.content.toLowerCase().toLowerCase() === prefix + "ping") {
    const ping = Date.now() - message.createdTimestamp;
    message.channel.send("**Pong!**\nYour ping is **" + ping + "ms**");
  }

  // || Bot Invite Link
  if (message.content.toLowerCase().toLowerCase() === prefix + "invite") {
    message.channel.send(
      "https://discord.com/oauth2/authorize?client_id=688201741824688198&scope=bot&permissions=8\nhttps://discord.gg/myuyJqH"
    );
  }

  // || Remote Control from Discord
  if (
    message.content.toLowerCase() === prefix + "rc refresh" &&
    message.author.id === "683552393253879829"
  ) {
    message.reply("Refreshing...");
    cmd.run("refresh");
  }

  if (
    message.content.toLowerCase() === prefix + "rc miniCPU" &&
    message.author.id === "683552393253879829"
  ) {
    message.reply("Now killing processes...");
    miniCPU();
  }

  // || Website

  if (message.content.toLowerCase() === prefix + "ws") {
    message.channel.send(
      "Here is **<@683552393253879829>**'s website link\nhttps://youngchief.tk\n**<@688201741824688198>** has none atm, but will get one soon!"
    );
  }

  // Set Status for YoungBot
  if (
    message.content.toLowerCase() === prefix + "status online" &&
    message.author.id === "683552393253879829"
  ) {
    client.user.setStatus("online");
    message.reply("I set my status to 'Online'");
  }

  if (
    message.content.toLowerCase() === prefix + "status idle" &&
    message.author.id === "683552393253879829"
  ) {
    client.user.setStatus("idle");
    message.reply("I set my status to 'Idle'");
  }

  if (
    message.content.toLowerCase() === prefix + "status invisible" &&
    message.author.id === "683552393253879829"
  ) {
    client.user.setStatus("invisible");
    message.reply("I set my status to 'Invisible'");
  }

  if (
    message.content.toLowerCase() === prefix + "status dnd" &&
    message.author.id === "683552393253879829"
  ) {
    client.user.setStatus("dnd");
    message.reply("I set my status to 'Do not Disturb'");
  }

  if (
    message.content.toLowerCase() === prefix + "activity playing" &&
    message.author.id === "683552393253879829"
  ) {
    client.user
      .setActivity("you using !^invite", {
        type: "PLAYING",
        url: "https://youngbot.glitch.me/"
      })
      .then(presence =>
        console.log(`Activity set to ${presence.activities[0].name}`)
      )
      .catch(console.error);
    message.reply("I set my activity to 'Playing'");
  }

  if (
    message.content.toLowerCase() === prefix + "activity streaming" &&
    message.author.id === "683552393253879829"
  ) {
    client.user
      .setActivity("you using !^invite", {
        type: "STREAMING",
        url: "https://twitch.tv/youngchiefbtw"
      })
      .then(presence =>
        console.log(`Activity set to ${presence.activities[0].name}`)
      )
      .catch(console.error);
    message.reply("I set my activity to 'Streaming'");
  }

  if (
    message.content.toLowerCase() === prefix + "activity listening" &&
    message.author.id === "683552393253879829"
  ) {
    client.user
      .setActivity("you using !^invite", {
        type: "LISTENING",
        url: "https://youngbot.glitch.me/"
      })
      .then(presence =>
        console.log(`Activity set to ${presence.activities[0].name}`)
      )
      .catch(console.error);
    message.reply("I set my activity to 'Listening'");
  }

  if (
    message.content.toLowerCase() === prefix + "activity watching" &&
    message.author.id === "683552393253879829"
  ) {
    client.user
      .setActivity("you using !^invite", {
        type: "WATCHING",
        url: "https://youngbot.glitch.me/"
      })
      .then(presence =>
        console.log(`Activity set to ${presence.activities[0].name}`)
      )
      .catch(console.error);
    message.reply("I set my activity to 'Watching'");
  }

  // Setting AFK

  if (
    message.content.toLowerCase() === prefix + "afk true" &&
    message.author.id === "683552393253879829"
  ) {
    client.user.setAFK(true);
    message.reply("I set AFK status to 'true'");
  }

  if (
    message.content.toLowerCase() === prefix + "afk false" &&
    message.author.id === "683552393253879829"
  ) {
    client.user.setAFK(false);
    message.reply("I set AFK status to 'false'");
  }

  // Logs out, terminates the connection to Discord, and destroys the client.
  if (
    message.content.toLowerCase() === prefix + "destroy" &&
    message.author.id === "683552393253879829"
  ) {
    // client.destory();
    miniCPU();
  }

  // || What is my avatar?
  if (command === "avatar") {
    if (!message.mentions.users.size) {
      const attachment = await new MessageAttachment(
        message.author.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 2048
        })
      );

      return message.channel.send(
        `Your avatar: <${message.author.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 2048
        })}> ${await message.channel.send(attachment)};`
      );
    }
    const avatarList = message.mentions.users.map(user => {
      return `**${user.tag}**'s avatar: <${user.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 2048
      })}>`;
    });
    message.channel.send(avatarList);
  }

  if (message.content.toLowerCase() === prefix + "cat") {
    const { file } = await fetch("https://aws.random.cat/meow").then(response =>
      response.json()
    );
    const attachment = new MessageAttachment(file);
    message.channel.send("URL: **" + file + "**");
    message.channel.send(attachment);
  }

  if (message.content.toLowerCase() === prefix + "donate") {
    message.channel.send(
      "I'm super glad you wanna donate!!\n**https://donate.youngchief.tk/**"
    );
  }

  // || Args Test
  if (command === "args-info") {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}!`
      );
    } else if (args[0] === "foo") {
      return message.channel.send("bar");
    }

    message.channel.send(`First argument: ${args[0]}`);
  }

  // ||
  if (message.content === prefix + "rip") {
    const attachment = new MessageAttachment("https://i.imgur.com/w3duR07.png");
    message.channel.send(attachment);
  }

  if (message.content.toLowerCase() === prefix + "dog") {
    const { url } = await fetch("https://random.dog/woof.json").then(response =>
      response.json()
    );
    const attachment = new MessageAttachment(url);
    message.channel.send("URL: **" + url + "**");
    message.channel.send(attachment);
  }

  if (message.content.startsWith().toLowerCase() === prefix + "spotify") {
    message.reply("You are not allowed to access this");
  }
});

// || Server Welcome for my server
client.on("guildMemberAdd", member => {
  if (client.message.guild.id === "687890772468563998") {
    const channel = member.guild.channels.cache.find(ch => ch.name === "logs");
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
  }
});

client.on("shardError", error => {
  console.error("A websocket connection encountered an error:", error);
});

process.on("unhandledRejection", error => {
  console.error("Unhandled promise rejection:", error);
});

client.login(process.env.Discord_Token); // Log YoungBot into Discord ツ

octokit.userAgent = userAgent; // Octokit wants a userAgent string to pass with Github API request
octokit.auth = process.env.Github_PersonalAccessToken;

// miniCPU(); // For lowering the CPU %, so that the container doesn't go crazy ツ
