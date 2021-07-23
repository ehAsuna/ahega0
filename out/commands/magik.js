"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importStar(require("discord.js"));
var nekobot_api_1 = require("nekobot-api");
var api = new nekobot_api_1.NekoBot();
var Command = {
    aliases: ['warp', 'distort'],
    category: 'Fun',
    description: 'Distort an image!',
    cooldown: '3s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    //globalCooldown: '5m',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<image-url-OR-user@> <intensity(1-10)>',
    permissions: ['SEND_MESSAGES'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var user, image, embed, image, embed, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!message.mentions.members.first()) return [3 /*break*/, 2];
                        user = void 0;
                        if (args[0] && isNaN(args[0]))
                            user = message.mentions.members.first().user;
                        if (args[0] && !isNaN(args[0])) {
                            user = client.users.cache.get(args[0]);
                            if (!message.guild.members.cache.has(args[0]))
                                return [2 /*return*/, message.reply(':x: User not found.').then(function (msg) { msg.delete({ timeout: 3000 }); }).catch(console.error)];
                        }
                        return [4 /*yield*/, api.generate("magik", { image: user.avatarURL(), intensity: parseInt(args[1]) })];
                    case 1:
                        image = _b.sent();
                        embed = new discord_js_1.default.MessageEmbed()
                            .setColor('#FFB6C1')
                            .setTitle("Distortion level " + args[1] + "!")
                            .setImage(image);
                        message.channel.send(embed);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, api.generate("magik", { image: args[0], intensity: parseInt(args[1]) })];
                    case 3:
                        image = _b.sent();
                        embed = new discord_js_1.MessageEmbed()
                            .setColor('#FFB6C1')
                            .setTitle("Distortion level " + args[1] + "!")
                            .setImage(image);
                        message.channel.send(embed);
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [2 /*return*/, message.reply('An error may have occured in the api, or your command usage was wrong.')];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
};
exports.default = Command;
