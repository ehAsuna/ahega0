const Discord = require('discord.js');
module.exports = {
	aliases: ['pin', 'star'],
	category: 'Fun',
	description: 'Pins a message to your the starboard on your server',
	//cooldown: '2s',
	hidden: false,
	ownerOnly: false,
	guildOnly: true,
	testOnly: false,
	//slash: true,
	globalCooldown: '1m',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: '<message-id>',
	permissions: ['MANAGE_MESSAGES'],


	callback: ({ message, client, args }) => {

	}
}