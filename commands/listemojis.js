const Discord = require('discord.js');
module.exports = {
  aliases: ['liste', 'emojilist'],
  category: 'Fun',
  description: 'Sends every emoji in the discord server.',
  //cooldown: '2s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  globalCooldown: '5m',
  //minArgs: 0,
  //maxArgs: 0,
  //expectedArgs: '',
  permissions: ['MANAGE_EMOJIS'],


  callback: ({ message, client, args }) => {
    if(message.member.permissions.has('ADMIN')){
			const newEmbed = new Discord.MessageEmbed()
			.setColor('#FFB6C1')
			.setDescription('You have no cutom server emotes.')
			try{
					const emojiList = message.guild.emojis.cache.map(e=>e.toString()).join(" ");
					message.channel.send(emojiList, {split: {char: ' ' }});
			} catch(err){
					message.channel.send(newEmbed);
			}
	}
  }
}