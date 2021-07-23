const Discord = require('discord.js');
module.exports = {
	aliases: ['song', 'ply'],
	category: 'Music',
	description: 'Plays music in your current VC!',
	//cooldown: '2s',
	hidden: false,
	ownerOnly: false,
	guildOnly: true,
	testOnly: false,
	//slash: true,
	globalCooldown: '1m',
	//minArgs: 1,
	//maxArgs: 1,
	//expectedArgs: '<message-id>',
	//permissions: ['SEND_MESSAGES'],


	callback: ({ message, client, args }) => {

	}
}