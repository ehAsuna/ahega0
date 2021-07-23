import Discord from 'discord.js';
import { ICommand } from '../types/wokcommandstypes';
import djsGames from 'djs-games';

const Command: ICommand = {
  name: 'tictactoe',
  aliases: ['tictac'],
  category: 'Fun',
  description: 'Start a game of tic tac toe!',
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
    const TicTacToe = new djsGames.TicTacToe()
    TicTacToe.startGame(message)
  }
}

export default Command;