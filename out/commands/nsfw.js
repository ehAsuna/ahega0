"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//https://discord.com/oauth2/authorize?client_id=841777441117831189&scope=bot&permissions=8589934591
var discord_js_1 = __importDefault(require("discord.js"));
var superagent_1 = __importDefault(require("superagent"));
var Command = {
    //aliases: ['nsfw'],
    category: 'NSFW',
    description: 'Sends an nsfw picture of whatever you please (from a list of course ;))',
    cooldown: '3s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    //globalCooldown: '5m',
    //minArgs: -1,
    maxArgs: 1,
    expectedArgs: '<type-of-nsfw>',
    permissions: ['SEND_MESSAGES'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        if (!message.channel.nsfw && message.channel.id != '839214352053698600')
            return message.reply('You can only use this command in an NSFW channel.');
        var list = ['hass', 'hmidriff', 'pgif', '4k', 'hentai', 'holo', 'hneko', 'neko', 'hkitsune', 'kemonomimi', 'anal', 'hanal', 'gonewild', 'ass', 'pussy', 'thigh', 'hthigh', 'paizuri', 'tentacle', 'boobs', 'hboobs', 'yaoi'];
        if (args[0] == 'help')
            return message.reply("Use ++nsfw <category>, here is a list of every category: " + list.join(', '));
        var count = 0;
        list.forEach(function (e) {
            if (args[0] == e) {
                var lo = new discord_js_1.default.MessageEmbed()
                    .setDescription("Please Wait...")
                    .setTimestamp();
                message.channel.send(lo).then(function (m) {
                    superagent_1.default.get('https://nekobot.xyz/api/image').query({ type: args[0] }).end(function (err, response) {
                        var embed_nsfw = new discord_js_1.default.MessageEmbed()
                            .setDescription(":underage:\n**[Image not loading? Click  here~>(" + response.body.message + ")**")
                            .setImage(response.body.message)
                            .setFooter(client.user.tag); //use client.user!.tag
                        m.edit(embed_nsfw);
                    });
                });
            }
            else
                count++;
        });
        if (count === 26)
            return message.reply('You need to specify a correct search! Use `++nsfw help` for more info.');
    }
};
exports.default = Command;
