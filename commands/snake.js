const Discord = require('discord.js');
module.exports = {
	name: 'snake',
  aliases: ['snek'],
  category: 'Fun',
  description: 'Play a game of snake!',
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
		const SnakeGame = new djsGames.SnakeGame()
		SnakeGame.startGame(message)	
	}
}