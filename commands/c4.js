const Discord = require('discord.js');
module.exports = {
	name: 'connect4',
  aliases: ['c4', 'con4'],
  category: 'Fun',
  description: 'Start a game of connect 4!',
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
		const ConnectFour = new djsGames.ConnectFour()
		ConnectFour.startGame(message)
	}
}