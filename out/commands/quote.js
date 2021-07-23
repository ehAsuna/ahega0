"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var quote_lib_1 = __importDefault(require("quote-lib"));
var Command = {
    aliases: ['quotes'],
    category: 'Fun',
    description: 'Returns motivational, entrepreneur, education, or programming quotes.',
    cooldown: '2s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    //globalCooldown: '10m', min of 1m!
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<type-of-quote(do ++quote help for categories)>',
    //permissions: ['SEND_MESSAGES'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        var quote = quote_lib_1.default.getByCategory(args[0]);
        var emb = new discord_js_1.default.MessageEmbed()
            .setColor('#FFB6C1')
            .setTitle(quote.category + " Quote")
            .setDescription(quote.quote)
            .setAuthor(quote.author)
            .setTimestamp();
        message.channel.send(emb);
    }
};
exports.default = Command;
