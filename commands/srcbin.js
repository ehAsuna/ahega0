const Discord = require('discord.js');
module.exports = {
  aliases: ['codeurl', 'sbin', 'codelink', 'srcb'],
  category: 'General',
  description: 'Sends a sourcebin of some given code!',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: -1,
  //maxArgs: -1,
  expectedArgs: '<file-language(no abreviations!)> <text to srcbin>',
  permissions: ['SEND_MESSAGES'],


  callback: ({ message, client, args }) => {
		const { create } = require("sourcebin");
		const linguist = require('@sourcebin/linguist');
		let a1 = args[0].toUpperCase();
		let languages = Object.keys(linguist.languages);
		languages = languages.map(f=>{ return f.toUpperCase(); });
		if (!languages.includes(a1.toUpperCase())) return message.reply('Sorry, that language is invalid or not currently accpeted.');
		
		let code = args.slice(1).join(' ');
    
		create([
			{
				content: code,
				language: a1,
			},
		],
			{
				title: message.author.tag,
				description: `${message.author.tag}'s code.`,
			},
		).then((bin) =>
			message.reply(
				`Your code is uploaded to ${bin.url}`
			)
		);
  }
}