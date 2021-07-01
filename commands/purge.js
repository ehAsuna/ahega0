const Discord = require('discord.js');
module.exports = {
  aliases: ['delete', 'erase'],
  category: 'Moderation',
  description: 'Deletes a number of messages in the current channel.',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<#-to-delete>',
  permissions: ['MANAGE_MESSAGES'],


  callback: async ({ message, client, args }) => {
		if(isNaN(args[0])) return message.reply("Please enter a number.").then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);

		if(args[0] > 100) return message.reply("You can't delete more than 100 messages!").then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);

		if(args[0] < 1) return message.reply("You must delete at least 1 message!").then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);

		await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
				message.channel.bulkDelete(messages);
		});

		const newEmbed = new Discord.MessageEmbed()
		.setColor('#FFB6C1')
		.setDescription(`Deleting ${args[0]} messages!`)
		.setTimestamp();
		message.channel.send(newEmbed).then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
  }
}