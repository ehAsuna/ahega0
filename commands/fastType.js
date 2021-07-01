const Discord = require('discord.js');
module.exports = {
	name: 'fastType',
  aliases: ['speedType', 'fType', 'sType'],
  category: 'Fun',
  description: 'Start a game of speed type!',
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
		const djsGames = require('djs-games')
		const FastTyper = new djsGames.FastTyper()
		FastTyper.startGame(message)
	}
}