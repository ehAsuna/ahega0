"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = {
    aliases: ['cemoji', 'newemoji'],
    category: 'Moderation',
    description: 'Create a new emoji!',
    cooldown: '30s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    //globalCooldown: '10m', min of 1m!
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<image-url> <emoji-name>',
    permissions: ['MANAGE_EMOJIS'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        message.guild.emojis.create(args[0], args[1])
            .then(function (emoji) { return message.reply("Create the " + emoji + " called " + emoji.name); })
            .catch(function (reason) { return message.reply('Emoji file too large, Emoji name too long, or unexpected error.'); });
    }
};
exports.default = Command;
