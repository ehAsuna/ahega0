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
var discord_js_1 = __importDefault(require("discord.js"));
var Command = {
    aliases: ['p'],
    category: 'Fun',
    description: 'Returns bot and api speeds',
    cooldown: '2s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    //globalCooldown: '10m', min of 1m!
    //minArgs: 0,
    //maxArgs: 0,
    //expectedArgs: '',
    //permissions: ['SEND_MESSAGES'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        var loadEm = new discord_js_1.default.MessageEmbed()
            .setColor('#FFB6C1')
            .setDescription('Loading data...');
        message.channel.send(loadEm).then(function (msg) { return __awaiter(void 0, void 0, void 0, function () {
            var newEmbed;
            return __generator(this, function (_a) {
                msg.delete();
                newEmbed = new discord_js_1.default.MessageEmbed()
                    .setColor('#FFB6C1')
                    .setTitle('Ping Results~')
                    .addFields({ name: 'Latency:', value: msg.createdTimestamp - message.createdTimestamp + "ms", inline: true }, { name: 'API Latency:', value: Math.round(client.ws.ping) + "ms", inline: true })
                    .setTimestamp()
                    .setThumbnail('https://images-ext-1.discordapp.net/external/pnkyYI3Sqp9vmGdhsWP7XmnPwyvmHC65bx1Wdhheh_M/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/841777441117831189/f6378c40a7aac70efe0d2c8ea1a82942.webp');
                message.channel.send(newEmbed);
                return [2 /*return*/];
            });
        }); });
    }
};
exports.default = Command;