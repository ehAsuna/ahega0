"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var superagent_1 = __importDefault(require("superagent"));
var discord_js_1 = __importDefault(require("discord.js"));
var a = {
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
    }
};
var command = {
    aliases: ['booty', 'bootypic', 'bp'],
    category: 'NSFW',
    description: 'Sends a random picture of ASS',
    cooldown: '3s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    //globalCooldown: '5m',
    //minArgs: -1,
    //maxArgs: -1,
    //expectedArgs: '<file-language(no abreviations!)> <text to srcbin>',
    permissions: ['SEND_MESSAGES'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        if (!message.channel.nsfw && message.channel.id != '839214352053698600')
            return message.reply('You can only use this command in an NSFW channel.');
        var lo = new discord_js_1.default.MessageEmbed()
            .setDescription("Please Wait...")
            .setTimestamp();
        message.channel.send(lo).then(function (m) {
            superagent_1.default.get('https://nekobot.xyz/api/image').query({ type: 'ass' }).end(function (err, response) {
                var embed_nsfw = new discord_js_1.default.MessageEmbed()
                    .setDescription(":underage:\n**[Image not loading? Click  here~>(" + response.body.message + ")**")
                    .setImage(response.body.message)
                    .setFooter(client.user.tag); //should be client.user
                m.edit(embed_nsfw);
            });
        });
    }
};
exports.default = command;
