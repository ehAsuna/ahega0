import Discord from 'discord.js';
import djsGames from 'djs-games';
import { ICommand } from '../types/wokcommandstypes';

const Command: ICommand = {
  name: 'guessTheNumber',
  aliases: ['numguess', 'guessnumber', 'nguess', 'guessn'],
  category: 'Fun',
  description: 'Guess a number between 1-10!',
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
    const guessTheNumber = new djsGames.GuessTheNumber()
    guessTheNumber.startGame(message)
  }
}

export default Command;