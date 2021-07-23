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
var muteSchema = new mongoose_1.default.Schema({
    userId: reqString,
    guildId: reqString,
    reason: reqString,
    staffId: reqString,
    staffTag: reqString,
    expires: {
        type: Date,
        required: true,
    },
    current: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('mutes-testing', muteSchema);
