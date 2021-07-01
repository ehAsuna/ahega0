const Discord = require('discord.js');
const { NekoBot } = require("nekobot-api");
const api = new NekoBot();
module.exports = {
  aliases: ['warp', 'distort'],
  category: 'Fun',
  description: 'Distort an image!',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: '<image-url-OR-user@> <intensity(1-10)>',
  permissions: ['SEND_MESSAGES'],


  callback: async ({ message, client, args }) => {
		try{
			if(message.mentions.members.first()){
				let user; 

				if (args[0] && isNaN(args[0])) user = message.mentions.members.first();
				if (args[0] && !isNaN(args[0])) {
					user = client.users.cache.get(args[0]);

					if (!message.guild.members.cache.has(args[0]))
						return message.reply(':x: User not found.').then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
				}

				const image = await api.generate("magik", { image: user.avatarURL(), intensity: args[1] });
				const embed = new Discord.MessageEmbed()
				.setColor('#FFB6C1')
				.setTitle(`Distortion level ${args[1]}!`)
				.setImage(image);
				messagee.channel.send(embed)
			} else {
				const image = await api.generate("magik", { image: args[0], intensity: args[1] });
				const embed = new MessageEmbed()
				.setColor('#FFB6C1')
				.setTitle(`Distortion level ${args[1]}!`)
				.setImage(image);
				message.channel.send(embed)
			}
		} catch(e){
			console.log(e)
			return message.reply('An error may have occured in the api, or your command usage was wrong.')
		}
  }
}