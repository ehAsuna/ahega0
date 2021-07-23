"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var rr_1 = require("../features/rr");
var message_1 = __importDefault(require("../models/message"));
var Command = {
    aliases: ['reactionrole', 'reactionr', 'rrole', 'reactionroles'],
    category: 'Configuration',
    description: 'Create reaction roles for your server!',
    cooldown: '30s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    //globalCooldown: '10m', min of 1m!
    minArgs: 3,
    expectedArgs: '<Emoji> <Role name, tag, or ID> <Role display name>',
    requiredPermissions: ['ADMINISTRATOR'],
    callback: function (_a) {
        var message = _a.message, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var guild, emoji, role, displayName, newRole, emojiName_1, fetchedMessage, newLine, content, split, a, obj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guild = message.guild;
                        if (!guild.me.hasPermission('MANAGE_ROLES')) {
                            message.reply('The bot requires access to manage roles to work correctly');
                            return [2 /*return*/];
                        }
                        emoji = args.shift() // 🎮
                        ;
                        role = args.shift() // Warzone
                        ;
                        displayName = args.join(' ') // 'Warzone game nights'
                        ;
                        if (role.startsWith('<@&')) {
                            role = role.substring(3, role.length - 1);
                            console.log(role);
                        }
                        newRole = guild.roles.cache.find(function (r) {
                            return r.name === role || r.id === role;
                        }) || null;
                        if (!newRole) {
                            message.reply("Could not find a role for \"" + role + "\"");
                            return [2 /*return*/];
                        }
                        role = newRole;
                        if (emoji.includes(':')) {
                            emojiName_1 = emoji.split(':')[1];
                            emoji = guild.emojis.cache.find(function (e) {
                                return e.name === emojiName_1;
                            }).toString(); //might not work idk
                        }
                        fetchedMessage = rr_1.fetchCache(guild.id)[0];
                        if (!fetchedMessage) {
                            message.reply('An error occurred, please try again');
                            return [2 /*return*/];
                        }
                        newLine = emoji + " " + displayName;
                        content = fetchedMessage.content;
                        if (content.includes(emoji)) {
                            split = content.split('\n');
                            for (a = 0; a < split.length; ++a) {
                                if (split[a].includes(emoji)) {
                                    split[a] = newLine;
                                }
                            }
                            content = split.join('\n');
                        }
                        else {
                            content += "\n" + newLine;
                            fetchedMessage.react(emoji);
                        }
                        fetchedMessage.edit(content);
                        obj = {
                            guildId: guild.id,
                            channelId: fetchedMessage.channel.id,
                            messageId: fetchedMessage.id,
                        };
                        return [4 /*yield*/, message_1.default.findOneAndUpdate(obj, __assign(__assign({}, obj), { $addToSet: {
                                    roles: {
                                        emoji: emoji,
                                        roleId: role.id,
                                    },
                                } }), {
                                upsert: true,
                            })];
                    case 1:
                        _b.sent();
                        rr_1.addToCache(guild.id, fetchedMessage, emoji, role.id);
                        return [2 /*return*/];
                }
            });
        });
    },
};
exports.default = Command;
