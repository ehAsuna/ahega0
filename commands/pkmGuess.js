const Discord = require('discord.js');
require('dotenv').config

module.exports = {
	name: 'pokemonGuess',
  aliases: ['whosthatpokemon', 'gpkm', 'pkmg'],
  category: 'Fun',
  description: 'Guess a pokemon!',
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
		const { Pokemon } = require('djs-games')
    const game = new Pokemon({
    	message: message,
    	token: process.env.dtoken,
    })
    game.start()
	}
}