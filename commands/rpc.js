const Discord = require('discord.js');
module.exports = {
	name: 'rpc',
  aliases: ['rockpaperscissors'],
  category: 'Fun',
  description: 'Play me in rock paper scissors!',
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
		const RockPaperScissors = new djsGames.RockPaperScissors()
 		RockPaperScissors.startGame(message)
	}
}