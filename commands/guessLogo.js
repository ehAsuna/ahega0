const Discord = require('discord.js');
module.exports = {
	name: 'guessTheLogo',
  aliases: ['logoguess', 'guesslogo','logogame'],
  category: 'Fun',
  description: 'Guess the logo game!',
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
		const { GTL } = require('djs-games')
    const game = new GTL({
    message: message,
    token: process.env.dtoken, 
    stopCommand: "stop",
    winFooter: "You Win!",
    winColor: "GREEN",
    loseFooter: "You Lose!",
    loseColor: "RED",
    questionFooter: "Guess the Logo!",
    questionColor: "BLUE",
    })
    game.start()
	}
}