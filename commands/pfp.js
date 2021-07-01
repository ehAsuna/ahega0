const Discord = require('discord.js');
module.exports = {
  aliases: ['profilepicture', 'av', 'avatar'],
  category: 'Fun',
  description: 'Sends every emoji in the discord server.',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<@user>',
  permissions: ['SEND_MESSAGES'],


  callback: ({ message, client, args }) => {
    let user;
		if (!args[0]) user = message.author;
		if (args[0] && isNaN(args[0])) user = message.mentions.users.first();
		if (args[0] && !isNaN(args[0])) {
			user = client.users.cache.get(args[0]);

			if (!message.guild.members.cache.has(args[0]))
				return message.reply(':x: User not found.').then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
		}

		if (!user.avatarURL())
			return message.reply(`:x: ${user.tag} profile photo not found.`).then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
		let embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setDescription(
				`[PNG](${user.avatarURL({
					format: 'png'
				})}) **|** [JPG](${user.avatarURL({
					format: 'jpg'
				})}) **|** [WEBP](${user.avatarURL({ 
					format: 'webp' 
				})}) **|** [GIF](${user.avatarURL({
					format: 'gif'
				})})`
			)
			.setImage(user.avatarURL({ dynamic: true }) + '?size=2048') //Size :D
			.setTimestamp()
			.setAuthor(user.tag, user.avatarURL());

		message.channel.send(embed);
  }
}