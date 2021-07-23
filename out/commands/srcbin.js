"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sourcebin_1 = require("sourcebin");
var linguist_1 = __importDefault(require("@sourcebin/linguist"));
var Command = {
    aliases: ['codeurl', 'sbin', 'codelink', 'srcb'],
    category: 'General',
    description: 'Sends a sourcebin of some given code!',
    cooldown: '3s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    //globalCooldown: '5m',
    //minArgs: -1,
    //maxArgs: -1,
    expectedArgs: '<file-language(no abreviations!)> <text to srcbin>',
    permissions: ['SEND_MESSAGES'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        var a1 = args[0].toUpperCase();
        var languages = Object.keys(linguist_1.default.languages);
        languages = languages.map(function (f) { return f.toUpperCase(); });
        if (!languages.includes(a1.toUpperCase()))
            return message.reply('Sorry, that language is invalid or not currently accpeted.');
        var code = args.slice(1).join(' ');
        sourcebin_1.create([
            {
                content: code,
                language: a1,
            },
        ], {
            title: message.author.tag,
            description: message.author.tag + "'s code.",
        }).then(function (bin) {
            return message.reply("Your code is uploaded to " + bin.url);
        });
    }
};
exports.default = Command;
