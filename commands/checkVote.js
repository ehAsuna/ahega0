const Discord = require('discord.js');
const { NekoBot } = require("nekobot-api");
const api = new NekoBot();
module.exports = {
  //aliases: ['warp', 'distort'],
  category: 'General',
  description: 'Checks if you have voted.',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  // minArgs: 1,
  // maxArgs: 1,
  // expectedArgs: '<user@>',
  permissions: ['SEND_MESSAGES'],


  callback: async ({ message, client, args }) => {
		
	}
}