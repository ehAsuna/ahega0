"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_beautify_1 = __importDefault(require("js-beautify"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var sourcebin_1 = require("sourcebin");
function getSource(s) {
    //if(!s.includes("code.org")) return message.reply("Use the **link of the project.**").delete({timeout: 3500});
    var gameid = s.match(/studio\.code\.org\/projects\/[a-z]+\/([^/\t\n\r ]+)(\/[a-z]*)?(?![^\t\n\r ]+)([^]*)/);
    return node_fetch_1.default("https://studio.code.org/v3/sources/" + gameid[1] + "/main.json").then(function (r) { return r.text(); });
}
var Command = {
    aliases: ["grepC"],
    category: 'General',
    description: 'Returns entire CODE of a code.org game or app lab project.',
    cooldown: '5s',
    hidden: false,
    ownerOnly: false,
    guildOnly: true,
    testOnly: false,
    //slash: true,
    //globalCooldown: '10m', min of 1m!
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<link of project> !!APP OR GAME LAB ONLY!!',
    //permissions: ['SEND_MESSAGES'],
    callback: function (_a) {
        var message = _a.message, client = _a.client, args = _a.args;
        try {
            message.reply('Fetching source...').then(function (replee) {
                var gameid = args[0].match(/studio\.code\.org\/projects\/[a-z]+\/([^/\t\n\r ]+)(\/[a-z]*)?(?![^\t\n\r ]+)([^]*)/);
                Promise.all([node_fetch_1.default("https://studio.code.org/v3/channels/" + gameid[1]).then(function (res) { return res.json(); }), node_fetch_1.default("https://studio.code.org/v3/sources/" + gameid[1] + "/main.json").then(function (res) { return res.json(); })]).then(function (_a) {
                    var metadata = _a[0], source = _a[1];
                    if (!metadata.name || metadata.name.trim() === "") {
                        metadata.name = "Project Code";
                    }
                    var k = js_beautify_1.default(source.source, { indent_size: 2, space_in_empty_paren: true });
                    sourcebin_1.create([
                        {
                            name: "index.js",
                            content: k,
                            language: "JAVASCRIPT",
                        },
                    ], {
                        title: metadata.name,
                        description: "Source code for the " + metadata.name + " code.org project.",
                    }).then(function (bin) {
                        replee.delete();
                        message.channel.send({
                            "embed": {
                                "title": metadata.name + " Source Code",
                                "url": bin.url,
                                "color": "BLACK",
                                "thumbnail": {
                                    "url": "https://studio.code.org" + metadata.thumbnailUrl
                                },
                                "author": {
                                    "name": message.author.tag,
                                    "icon_url": message.author.avatarURL(),
                                },
                                "footer": {
                                    "text": "Fetched Project Created At"
                                },
                                "timestamp": new Date(metadata.createdAt.match(/(.+)\+00:00$/)[1]),
                                "fields": [
                                    {
                                        "name": "Size",
                                        "value": source.source.length + " bytes",
                                        "inline": true,
                                    },
                                    {
                                        "name": "Type",
                                        "value": metadata.projectType,
                                        "inline": true,
                                    }
                                ]
                            }
                        });
                    });
                });
            });
        }
        catch (e) {
            return message.reply("An error occured. Make sure to use the **link** of the project.");
        }
    }
};
exports.default = Command;
