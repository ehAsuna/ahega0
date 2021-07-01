//https://discord.com/oauth2/authorize?client_id=841777441117831189&scope=bot&permissions=8589934591
const Discord = require('discord.js');
const superagent = require('superagent');
module.exports = {
  //aliases: ['nsfw'],
  category: 'NSFW',
  description: 'Sends an nsfw picture of whatever you please (from a list of course ;))',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: -1,
  maxArgs: 1,
  expectedArgs: '<type-of-nsfw>',
  permissions: ['SEND_MESSAGES'],


  callback: ({ message, client, args }) => {
    if (!message.channel.nsfw && message.channel.id != '839214352053698600') return message.reply('You can only use this command in an NSFW channel.') 

		let list = ['hass', 'hmidriff', 'pgif', '4k', 'hentai', 'holo', 'hneko', 'neko', 'hkitsune', 'kemonomimi', 'anal', 'hanal', 'gonewild', 'ass', 'pussy', 'thigh', 'hthigh', 'paizuri', 'tentacle', 'boobs', 'hboobs', 'yaoi']

		if(args[0]=='help') return message.reply(`Use ++nsfw <category>, here is a list of every category: ${list.join(', ')}`)

		let count = 0;
		list.forEach(e => {
			if(args[0]==e){
				let lo = new Discord.MessageEmbed()
					.setDescription(`Please Wait...`)
					.setTimestamp()

				message.channel.send(lo).then(m => {

				superagent.get('https://nekobot.xyz/api/image').query({ type: args[0]}).end((err, response) => {

						var embed_nsfw = new Discord.MessageEmbed()
								.setDescription(`:underage:\n**[Image not loading? Click  here~>(${response.body.message})**`)
								.setImage(response.body.message)
								.setFooter(client.footer)
						
						m.edit(embed_nsfw);
				});
			});
			} else count++
		});

		if(count===26) return message.reply('You need to specify a correct search! Use `++nsfw help` for more info.')
	}
}