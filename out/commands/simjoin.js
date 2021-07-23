"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = {
    permissions: ['ADMINISTRATOR'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        client.emit('guildMemberAdd', message.member);
    },
};
exports.default = Command;
