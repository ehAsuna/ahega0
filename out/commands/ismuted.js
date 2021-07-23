"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var muted_schema_1 = __importDefault(require("../models/muted-schema"));
var Command = {
    aliases: ['ism', 'muted'],
    category: 'Moderation',
    description: 'Check if a user is muted.',
    cooldown: '5s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    //globalCooldown: '5m',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<user-id>',
    permissions: ['ADMINISTRATOR'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var guild, id, members, target, isInDiscord, currentMute, embed, date;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guild = message.guild;
                        id = args[0];
                        if (isNaN(id)) {
                            id = message.mentions.users.first().id;
                        }
                        return [4 /*yield*/, guild.members.fetch()];
                    case 1:
                        members = _b.sent();
                        target = members.get(id);
                        isInDiscord = !!target;
                        return [4 /*yield*/, muted_schema_1.default.findOne({
                                userId: id,
                                guildId: guild.id,
                                current: true,
                            })];
                    case 2:
                        currentMute = _b.sent();
                        embed = new discord_js_1.MessageEmbed()
                            .setAuthor("Mute info for " + (target ? target.user.tag : id), target ? target.user.displayAvatarURL() : '')
                            .addField('Currently muted', currentMute ? 'Yes' : 'No')
                            .addField('Is in Discord', isInDiscord ? 'Yes' : 'No');
                        if (currentMute) {
                            date = new Date(currentMute.expires);
                            embed
                                .addField('Muted by', "<@" + currentMute.staffId + ">")
                                .addField('Muted for', currentMute.reason.toLowerCase())
                                .addField('Mute expires', date.toLocaleString() + " EST");
                        }
                        message.reply(embed);
                        return [2 /*return*/];
                }
            });
        });
    }
};
exports.default = Command;
