const Discord = require('discord.js');
module.exports = {
  aliases: ['send'],
  category: 'General',
  description: 'Sends a message you told me to.',
  cooldown: '5s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  minArgs: 1,
  //maxArgs: 0,
  expectedArgs: '++send <message(can be any amount allowed by discord)>',
  permissions: ['SEND_MESSAGES'],


  callback: ({ message, client, args }) => {
		if (message.mentions.roles.first() || message.isMemberMentioned()) return message.reply('You are not allowed to ping :rollingeyes:');

		if(message.content.toLowerCase().includes("stupid")){
			message.reply(" you are the stupid one :)");
		} else {
			const content = args.slice(0).join(' ');
			message.delete();
			message.channel.send(content);
		}
  }
}