"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = {
    aliases: ['pin', 'star'],
    category: 'Fun',
    description: 'Pins a message to your the starboard on your server',
    //cooldown: '2s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    globalCooldown: '1m',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<message-id>',
    permissions: ['MANAGE_MESSAGES'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        message.channel.send("bruh what");
    }
};
exports.default = Command;
