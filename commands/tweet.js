const Discord = require('discord.js');
const { NekoBot } = require("nekobot-api");
const api = new NekoBot();
module.exports = {
  aliases: ['twitter'],
  category: 'Fun',
  description: 'Create your own tweet!',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: 1,
  //maxArgs: 1,
  //expectedArgs: '<user@>',
  permissions: ['SEND_MESSAGES'],


  callback: async ({ message, client, args }) => {
		try{
			if(message.content.toLowerCase().includes("@everyone")){
				return message.reply(", seriously someone get a mod he just tried to ping everyone. :rollingeyes:")
			} 
			const content = args.slice(0).join(' ')
			const image = await api.generate("tweet", { username: message.author.tag, text: content});
			const embed = new Discord.MessageEmbed()
			.setColor('#FFB6C1')
			.setImage(image);
		} catch(e){
			console.log(e)
			return message.reply('An error may have occured in the api, or your command usage was wrong.')
		}
  }
}