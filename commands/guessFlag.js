const Discord = require('discord.js');
module.exports = {
	name: 'guessTheFlag',
  aliases: ['flagguess', 'guessflag', 'flaggame'],
  category: 'Fun',
  description: 'Guess the flag of the country.',
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
		const { GTF } = require('djs-games');
    const game = new GTF({
			message: message,
			token: process.env.dtoken, 
			stopCommand: "stop", 
			winFooter: "You Win!", 
			winColor: "GREEN",
			loseFooter: "You Lose!", 
			loseColor: "RED",
			questionFooter: "Guess the Flag!",
			questionColor: "BLUE",
    })
		
    game.start();
	}
}