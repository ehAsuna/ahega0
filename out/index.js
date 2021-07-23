"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://discord.com/oauth2/authorize?client_id=841777441117831189&scope=bot&permissions=8589934583
var discord_js_1 = __importDefault(require("discord.js"));
var wokcommands_1 = __importDefault(require("wokcommands"));
var express_1 = __importDefault(require("express"));
var dbots_1 = __importDefault(require("dbots"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env);
var test;
var client = new discord_js_1.default.Client({
    partials: ['MESSAGE', 'REACTION'],
});
require('discord-buttons')(client);
var app = express_1.default();
var port = 3000;
app.get('/', function (req, res) { return res.send("Live on Port:" + port); });
app.listen(port, function () { return console.log("Listening at http://localhost:" + port); });
client.on('ready', function () {
    var wok = new wokcommands_1.default(client, {
        commandDir: 'commands',
        featureDir: 'features',
        messagesPath: '',
        showWarns: false,
        testServers: ['790889521734352966', '842826911838765056'],
        del: 5,
    })
        .setMongoPath(process.env.uri)
        .setCategorySettings([
        {
            name: 'General',
            emoji: '👌',
            hidden: false,
        },
        {
            name: 'Fun',
            emoji: '😂',
            hidden: false,
        },
        {
            name: 'Anime',
            emoji: '📺',
            hidden: false,
        },
        {
            name: 'NSFW',
            emoji: '🔞',
            hidden: false,
        },
        {
            name: 'Moderation',
            emoji: '📒',
            hidden: false,
        },
        {
            name: 'Configuration',
            emoji: '🛠',
            hidden: true,
        },
        {
            name: 'Development',
            emoji: '🖥️',
            hidden: false,
        },
    ])
        .setDefaultPrefix('++')
        .setColor(0xffb6c1.toString());
    test = wok;
    var stateswitch = false;
    setInterval(function () {
        stateswitch = !stateswitch; //change state
        if (stateswitch)
            client.user.setActivity("++help", { type: "LISTENING" });
        else
            client.user.setActivity(client.guilds.cache.reduce(function (c, g) { return c + g.memberCount; }, 0) + " Members | " + client.guilds.cache.size + " Servers", { type: "WATCHING" });
    }, 10000); //10 second delay
    var servers = client.guilds.cache.size;
    var members = client.guilds.cache.reduce(function (c, g) { return c + g.memberCount; }, 0);
    setInterval(function () {
        var channel = client.channels.cache.get('844048451385688154');
        var channel2 = client.channels.cache.get('844049248534003722');
        channel.setName("Total Guilds: " + servers);
        channel2.setName("Total Users: " + members);
    }, 180000);
    var poster = new dbots_1.default.Poster({
        client: client,
        apiKeys: {
            topgg: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4NDk5NDU1NzQ4OTE4NDc3OSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI0NDY2MzMzfQ.uRdXWB8e7tDhsEz36wDjEh5CxNrcjNShnaC8dKWdmnU',
        },
        clientLibrary: 'discord.js'
    });
    poster.startInterval();
});
client.on('message', function (message) {
    if (message.mentions.users.has(client.user.id)) {
        var newEmbed = new discord_js_1.default.MessageEmbed()
            .setColor('#FFB6C1')
            .setDescription("<:ahega0:842838420807483402>~**My current prefix is:**   " + "`" + ("" + test.getPrefix(message.guild.id)) + "`");
        message.channel.send(newEmbed);
    }
});
client.login(process.env.token);
