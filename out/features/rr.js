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
exports.addToCache = exports.fetchCache = void 0;
var message_1 = __importDefault(require("../models/message"));
var cache = {}; // { guildId: [message, { Emoji: RoleID }] }
var fetchCache = function (guildId) { return cache[guildId] || []; };
exports.fetchCache = fetchCache;
function addToCache(guildId, message, emoji, roleId) {
    return __awaiter(this, void 0, void 0, function () {
        var array;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    array = cache[guildId] || [message, {}];
                    if (emoji && roleId) {
                        array[1][emoji] = roleId;
                    }
                    return [4 /*yield*/, message.channel.messages.fetch(message.id, true, true)];
                case 1:
                    _a.sent();
                    cache[guildId] = array;
                    return [2 /*return*/];
            }
        });
    });
}
exports.addToCache = addToCache;
function handleReaction(reaction, user, adding) {
    return __awaiter(this, void 0, void 0, function () {
        var message, guild, _a, fetchedMessage, roles, toCompare, _i, _b, key, role, member;
        return __generator(this, function (_c) {
            message = reaction.message;
            guild = message.guild;
            _a = fetchCache(guild.id), fetchedMessage = _a[0], roles = _a[1];
            if (!fetchedMessage) {
                return [2 /*return*/];
            }
            if (fetchedMessage.id === message.id &&
                guild.me.hasPermission('MANAGE_ROLES')) {
                toCompare = reaction.emoji.id || reaction.emoji.name;
                for (_i = 0, _b = Object.keys(roles); _i < _b.length; _i++) {
                    key = _b[_i];
                    if (key === toCompare) {
                        role = guild.roles.cache.get(roles[key]);
                        if (role) {
                            member = guild.members.cache.get(user.id);
                            if (adding) {
                                member.roles.add(role);
                            }
                            else {
                                member.roles.remove(role);
                            }
                        }
                        return [2 /*return*/];
                    }
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.default = (function (client) { return __awaiter(void 0, void 0, void 0, function () {
    var results, _i, results_1, result, guildId, channelId, messageId, roles, guild, channel, cacheMessage, skipCache, fetchedMessage, newRoles, _a, roles_1, role, emoji, roleId, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                client.on('messageReactionAdd', function (reaction, user) {
                    handleReaction(reaction, user, true);
                });
                client.on('messageReactionRemove', function (reaction, user) {
                    handleReaction(reaction, user, false);
                });
                return [4 /*yield*/, message_1.default.find()];
            case 1:
                results = _b.sent();
                _i = 0, results_1 = results;
                _b.label = 2;
            case 2:
                if (!(_i < results_1.length)) return [3 /*break*/, 13];
                result = results_1[_i];
                guildId = result.guildId, channelId = result.channelId, messageId = result.messageId, roles = result.roles;
                return [4 /*yield*/, client.guilds.cache.get(guildId)];
            case 3:
                guild = _b.sent();
                if (!!guild) return [3 /*break*/, 5];
                console.log("Removing guild ID \"" + guildId + "\" from the database");
                return [4 /*yield*/, message_1.default.deleteOne({ guildId: guildId })];
            case 4:
                _b.sent();
                return [2 /*return*/];
            case 5: return [4 /*yield*/, guild.channels.cache.get(channelId)];
            case 6:
                channel = _b.sent();
                if (!!channel) return [3 /*break*/, 8];
                console.log("Removing channel ID \"" + channelId + "\" from the database");
                return [4 /*yield*/, message_1.default.deleteOne({ channelId: channelId })];
            case 7:
                _b.sent();
                return [2 /*return*/];
            case 8:
                _b.trys.push([8, 10, , 12]);
                cacheMessage = true;
                skipCache = true;
                return [4 /*yield*/, channel.messages.fetch(messageId, cacheMessage, skipCache)];
            case 9:
                fetchedMessage = _b.sent();
                if (fetchedMessage) {
                    newRoles = {};
                    for (_a = 0, roles_1 = roles; _a < roles_1.length; _a++) {
                        role = roles_1[_a];
                        emoji = role.emoji, roleId = role.roleId;
                        newRoles[emoji] = roleId;
                    }
                    cache[guildId] = [fetchedMessage, newRoles];
                }
                return [3 /*break*/, 12];
            case 10:
                e_1 = _b.sent();
                console.log("Removing message ID \"" + messageId + "\" from the database");
                return [4 /*yield*/, message_1.default.deleteOne({ messageId: messageId })];
            case 11:
                _b.sent();
                return [3 /*break*/, 12];
            case 12:
                _i++;
                return [3 /*break*/, 2];
            case 13: return [2 /*return*/];
        }
    });
}); });
