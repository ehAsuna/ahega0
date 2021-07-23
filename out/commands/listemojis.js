"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var Command = {
    aliases: ['liste', 'emojilist'],
    category: 'Fun',
    description: 'Sends every emoji in the discord server.',
    //cooldown: '2s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    globalCooldown: '5m',
    //minArgs: 0,
    //maxArgs: 0,
    //expectedArgs: '',
    permissions: ['MANAGE_EMOJIS'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        if (message.member.permissions.has('ADMINISTRATOR')) { //change this to ADMINISTRATOR
            var newEmbed = new discord_js_1.default.MessageEmbed()
                .setColor('#FFB6C1')
                .setDescription('You have no cutom server emotes.');
            try {
                var emojiList = message.guild.emojis.cache.map(function (e) { return e.toString(); }).join(" ");
                message.channel.send(emojiList, { split: { char: ' ' } });
            }
            catch (err) {
                message.channel.send(newEmbed);
            }
        }
    }
};
exports.default = Command;
