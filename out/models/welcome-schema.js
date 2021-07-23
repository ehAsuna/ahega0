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
var welcomeSchema = new mongoose_1.default.Schema({
    // Guild ID
    _id: reqString,
    channelId: reqString,
    guildId: reqString,
});
exports.default = mongoose_1.default.model('welcome-canvas-tutorial', welcomeSchema);
