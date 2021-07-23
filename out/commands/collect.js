"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = {
    aliases: ['grab'],
    category: 'NSFW',
    description: 'returns args only in quotes',
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
        var quote = message.content
            .match(/(?:"[^"]*"|^[^"]*$)/)[0]
            .replace(/"/g, "");
        console.log(quote);
        console.log(message.content);
    }
};
exports.default = Command;
