import { ICommand } from "../types/wokcommandstypes";
import djsGames from 'djs-games'

const Command: ICommand = {
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
    const RockPaperScissors = new djsGames.RockPaperScissors()
    RockPaperScissors.startGame(message)
  }
}
export default Command;