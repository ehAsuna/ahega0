const Discord = require('discord.js');
const superagent = require('superagent');
module.exports = {
  aliases: ['grab'],
  category: 'NSFW',
  description: 'returns args only in quotes',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: -1,
  //maxArgs: -1,
  //expectedArgs: '<file-language(no abreviations!)> <text to srcbin>',
  permissions: ['SEND_MESSAGES'],


  callback: ({ message, client, args }) => {
		const { MessageEmbed, MessageAttachment, MessageCollector } = require('discord.js');

		const quote = message.content
			.match(/(?:"[^"]*"|^[^"]*$)/)[0]
			.replace(/"/g, "")
		console.log(quote);
		console.log(message.content);
	}
}