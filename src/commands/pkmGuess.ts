//import Discord from 'discord.js';
//require('dotenv').config
import { Pokemon } from 'djs-games'
import { ICommand } from '../types/wokcommandstypes'


const Command: ICommand = {
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
    const game = new Pokemon({
      message: message,
      token: process.env.dtoken || "",
    })
    game.start()
  }
}
export default Command;