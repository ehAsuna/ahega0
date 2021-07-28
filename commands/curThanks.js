const thankSchema = require('../models/thank-schema');
module.exports = {
	//name: 'thank',
  aliases: ['curThanks', 'currentThanks', 'totalThanks'],
  category: 'General',
  description: 'Get total thanks. If nothing is returned then the user provided has 0 thanks.',
  cooldown: '1s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<user@-or-userId(if none fetches yours)>',
  //permissions: ['ADMINISTRATOR'],
  callback: async ({ message, args }) => {
		let user;
		if (!args[0]) user = message.author;
		if (args[0] && isNaN(args[0])) user = message.mentions.users.first();
		if (args[0] && !isNaN(args[0])) {
			user = client.users.cache.get(args[0]);

			if (!message.guild.members.cache.has(args[0]))
				return message.reply(':x: User not found.').then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
		}
		
		thankSchema.findOne({userId: user.id}).then(async document => {
			const Discord = require('discord.js')

			let thankEmbed = new Discord.MessageEmbed()
			.setColor('#FFB6C1')
			.setTitle(`${user.username}'s Total Thanks'`)
			.addFields(
					{name: 'Thanks:', value: document.total},
			)
			.setTimestamp()
			.setThumbnail(user.avatarURL());

			message.channel.send(thankEmbed);
		});
	},
}