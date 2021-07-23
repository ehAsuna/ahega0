"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var reqString = {
    type: String,
    required: true,
};
var messageSchema = new mongoose_1.default.Schema({
    guildId: reqString,
    channelId: reqString,
    messageId: reqString,
    roles: [
        {
            emoji: reqString,
            roleId: reqString,
        },
    ],
});
exports.default = mongoose_1.default.model('tutorial-message-schema', messageSchema);
