const Discord = require('discord.js');
module.exports = {
  aliases: ['tinyurl', 'littlelink', 'shortenurl', 'surl'],
  category: 'General',
  description: 'Shortens a sent url using the tinyurl api.',
  cooldown: '10s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<url>',
  //permissions: ['SEND_MESSAGES'],


  callback: async ({ message, client, args }) => {
  const tinyurl = require("tinyurl-api");
	const reg = new RegExp(/^((?:https?:)?\/\/)?((?:www|m)\.)?/g)
	if (reg.test == false) return message.reply('Please send a valid URL to shorten.')

	const url = await tinyurl(args[0]);
	message.channel.send('Here is your tiny URL: '+url)
	
	}
}